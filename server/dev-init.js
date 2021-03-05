const localtunnel = require('localtunnel')
const config = require('dotenv').config()
const axios = require('axios');
const { json } = require('body-parser');
const SUBDOMAIN = 'cart-stream';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const STORE_ID = process.env.STORE_ID;

(async () => {
  const tunnel = await localtunnel({ port: 3000, subdomain: SUBDOMAIN });




  try {
    console.log("Fetching token")
    const loginResponse = await axios.post(`http://localhost:3000/users/login`, null, 
    {
      headers : {
        'X-Store-Id': STORE_ID,
        'X-Auth-token': ACCESS_TOKEN      
      }
    })

    const data = {
      destination: tunnel.url+ "/listen",
      headers : {
          authorization : `Bearer ${loginResponse.data.token}`
      },
      "is_active": true    
    }

    console.log('Updating webhook')
    const orderResponse = await axios.put(`https://api.bigcommerce.com/stores/${STORE_ID}/v2/hooks/21174212`, 
      JSON.stringify(data),
      {
        headers: {
          'X-Auth-Token': 'syhrfbk25vci5avdz8ln8yo61ygt83e',
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        }
      }
    )
    console.log('Webhook updated to: '+orderResponse.data.destination);
  } catch (err) {
    console.log(err)
  }

})();
