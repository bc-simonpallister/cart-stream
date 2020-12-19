const axios = require('axios')

async function getOrder(id, authData) {
  try {
    const response = await axios.get(`https://api.bigcommerce.com/stores/${authData.store_id}/v3/orders/${id}`, {
      headers: {
        'X-Auth-Token': authData.auth_token,
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      }
    });
    return response.data;
  } catch (err) {
    console.log(err)
    errUtils.ResponseError(err.response.status, {message:err.message})
  }

}


module.exports = {
  getOrder
}