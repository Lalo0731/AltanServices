const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto si tu base de datos no está en localhost
  user: 'root', // Cambia esto por tu usuario de MySQL
  password: '', // Cambia esto por tu contraseña de MySQL
  database: 'altan' // Cambia esto por el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos como id ' + connection.threadId);
});

module.exports = connection;
