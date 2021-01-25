const axios = require('axios')

async function getCart(id, authData) {
  try {
    const response = await axios.get(`https://api.bigcommerce.com/stores/${authData.store_id}/v3/carts/${id}`, {
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

async function updateLineItem(id, authData) {
  try {
    const response = await axios.get(`https://api.bigcommerce.com/stores/${authData.store_id}/v3/carts/${id}`, {
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

async function addLineItem(id, authData) {
  try {
    const response = await axios.get(`https://api.bigcommerce.com/stores/${authData.store_id}/v3/carts/${id}`, {
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
  getCart,
  updateLineItem,
  addLineItem
}