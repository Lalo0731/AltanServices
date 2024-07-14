const { validationResult } = require('express-validator');
const { generateAccessToken, sendRechargeRequest } = require('../services/altanService');
const db = require('../db/altanDB');
const bcrypt = require('bcrypt');

const handlePostRequest = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { msisdn, offerId, amount, comerce_key } = req.body;
  msisdn = msisdn.replace(/^\+?52/, '');

  const currentDate = new Date().toISOString().slice(0, 10);

  try {
    const dbResult = await new Promise((resolve, reject) => {

      db.query("SELECT * FROM stores WHERE comerce_key = ?", [comerce_key], (err, results) => {
        if (err) {
          reject({ status: 500, message: 'Error de base de datos' });
        } else if (results.length === 0) {
          reject({ status: 401, message: 'Clave no válida' });
        } else {
          resolve(results[0]);
        }
      });
    });

    // console.log("dbResult", dbResult);

    // Si la clave es válida, proceder con la generación del Access Token y la solicitud de recarga
    const accessToken = await generateAccessToken();

    // console.log("Access Token generado:", accessToken);

    const rechargeResponse = await sendRechargeRequest(accessToken, msisdn, offerId );

    const orderID = rechargeResponse.order.id;

    // console.log("ORDER ID: ", orderID);

    const insertRecharge = await new Promise((resolve, reject) => {

      const query = "INSERT INTO recharges (order_id, offerings, amount, MSISDN, comerce_key, date_recharge) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [orderID, offerId, amount, msisdn, comerce_key, currentDate];

      db.query(query, values, (err, results) => {
        if(err){
          reject({ status: 500, message: "Error al guardar en la base de datos"});
        } else{
          resolve(results)
        }

      });
    });

    // console.log("insertRecharge",insertRecharge);

    // Si todo está bien, envía la respuesta exitosa
    res.status(200).json({ message: 'success', msisdn: msisdn, orderID });
    // }

  } catch (error) {
    const { status = 500, message = 'Error interno' } = error;
    res.status(status).json({ error: message });
  }

};

module.exports = {
  handlePostRequest,
};
