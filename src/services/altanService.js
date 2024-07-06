
const fetch = require('node-fetch');

const generateAccessToken = async () => {
  const production = 'NWlQY2EzZXdnd1NRTG42WGFrMGhaSGlIS0pHTmhJdmU6MTFGaUVHSGFIUG83SDRoWA=='; /** llave de producción **/
  //const production = 'WkdwVUlkVHVQQVdUQ0JxSlpHNjllS2ljNlNyVjRocXg6eUtuSGhMZVVFc0doU1psWA=='; /** llave de prueba **/
  const url = 'https://altanredes-prod.apigee.net/v1/oauth/accesstoken?grant-type=client_credentials';
  
  try {
    console.log("Solicitando Access Token...");
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${production}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener el Access Token');
    }

    const data = await response.json();
    // console.log(data);
    return data.accessToken;
    // return data.access_token;
    
  } catch (error) {
    console.error('Error al obtener el Access Token:', error);
    throw new Error('Error al obtener el Access Token');
  }
};


//RECARGA
const sendRechargeRequest = async (accessToken, msisdn, offer) => {
    const url_production = 'https://altanredes-prod.apigee.net/cm/v1/products/purchase'; /** llave de producción **/
    //const url_production = 'https://altanredes-prod.apigee.net/cm-sandbox/v1/products/purchase'; /** llave de prueba **/
  
    try {

      const response = await fetch(url_production, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          msisdn: msisdn,
          offerings: [offer],
          startEffectiveDate: '',
          expireEffectiveDate: '',
          scheduleDate: ''
        })
      });
      // return response;

      if (!response.ok) {
        throw new Error('Error al enviar la solicitud de recarga');
      }
      
      const data = await response.json();
      // console.log(data);
      return data;

    } catch (error) {
      console.error('Error al enviar la solicitud de recarga:', error);
      throw new Error('Error al enviar la solicitud de recarga');
    }
  };

module.exports = {
  generateAccessToken,
  sendRechargeRequest
};
