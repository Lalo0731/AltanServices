const { validationResult } = require('express-validator');
const { generateAccessToken, sendRechargeRequest } = require('../services/altanService');
const db = require('../db/altanDB');

const handlePostRequest = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { MSISDN, OFFERID, AMOUNT, KEY } = req.body;

  try {
    const dbResult = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM Stores WHERE `comerce_key` = ?", [KEY], (err, results) => {
            if (err) {
                // return res.status(500).json({ error: 'Error de base de datos' });
                reject({ status: 500, message: 'Error de base de datos' });
            } else if (results.length === 0) {
                // return res.status(401).json({ error: 'Clave no válida' });
                reject({ status: 401, message: 'Clave no válida' });
            } else {
                resolve(results);
            }
        });
    });


    // Si la clave es válida, proceder con la generación del Access Token y la solicitud de recarga
    const accessToken = await generateAccessToken();

    // console.log("Access Token generado:", accessToken);

    const rechargeResponse = await sendRechargeRequest(accessToken, MSISDN, OFFERID );

    const orderID = rechargeResponse.order.id;

    // console.log("ORDER ID: ", orderID);

    const insertRecharge = await new Promise((resolve, reject) => {

      const query = "INSERT INTO recharges (order_id, offerings, amount, MSISDN, comerce_key) VALUES (?, ?, ?, ?, ?)";
      const values = [orderID, OFFERID, AMOUNT, MSISDN, KEY];

      db.query(query, values, (err, results) => {
        if(err){
          reject({ status: 500, message: "Error al guardar en la base de datos"});
        } else{
          resolve(results)
        }

      });
    });

    console.log("insertRecharge",insertRecharge);

    // Si todo está bien, envía la respuesta exitosa
    res.status(200).json({ message: 'Datos recibidos correctamente', data: { MSISDN, OFFERID, AMOUNT, orderID } });

  } catch (error) {
    const { status = 500, message = 'Error interno' } = error;
    res.status(status).json({ error: message });
  }

};

module.exports = {
  handlePostRequest,
};
