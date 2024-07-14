const { validationResult } = require('express-validator');
const db = require('../db/altanDB');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const insertStore = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { name } = req.body;
  const comerce_key = name+"Spot";

  try {

    const encryptedComerceKey = await bcrypt.hash(comerce_key, saltRounds);

    const insertDataStore = await new Promise((resolve, reject) => {

      const query = "INSERT INTO stores (name, comerce_key) VALUES (?, ?)";
      const values = [name, encryptedComerceKey];

      db.query(query, values, (err, results) => {
        if(err){
          reject({ status: 500, message: "Error al guardar en la base de datos"});
        } else{
          resolve(results)
        }

      });
    });

    console.log("insertDataStore",insertDataStore);

    // Si todo está bien, envía la respuesta exitosa
    res.status(200).json({ message: 'success', encryptedComerceKey });

  } catch (error) {
    const { status = 500, message = 'Error interno' } = error;
    res.status(status).json({ error: message });
  }

};

module.exports = {
    insertStore,
};
