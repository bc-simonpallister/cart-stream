const localtunnel = require('localtunnel')
const config = require('dotenv').config()
const axios = require('axios');
const { json } = require('body-parser');
const SUBDOMAIN = 'cart-stream';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const STORE_ID = process.env.STORE_ID;

(async () => {
  const tunnel = await localtunnel({ port: 3000, subdomain: SUBDOMAIN });

  const data = {
      scope: "store/cart/lineItem/*",
      destination: tunnel.url+ "/listen",
      headers : {
          authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoX3Rva2VuIjoic3locmZiazI1dmNpNWF2ZHo4bG44eW82MXlndDgzZSIsInN0b3JlX2lkIjoiZTczc2g5MHl5MiIsImlhdCI6MTYwOTIxNjQ5NSwiZXhwIjoxNjExODA4NDk1fQ.UJQbAh6spROKVf3wYOTg9IcPZH6KEJhI3_XzfiIbENU"
      }    
  }

  try {
    const response = await axios.put(`https://api.bigcommerce.com/stores/${STORE_ID}/v2/hooks/21174212`, 
      JSON.stringify(data),
      {
        headers: {
          'X-Auth-Token': 'syhrfbk25vci5avdz8ln8yo61ygt83e',
          'X-Auth-Client': 'odowlij4qsmka693e1zh9nip6kne5oj',
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        }
      }
    )
    console.log('Webhook updated to: '+response.data.destination);
  } catch (err) {
    console.log(err)
  }

})();
