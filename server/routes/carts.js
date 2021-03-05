const config = require('dotenv').config()
const express = require('express')
const router = express.Router()
const axios = require('axios')
const jwt = require('../utils/jwt');

const SECRET_KEY = process.env.SECRET_KEY

router.put('/:cart_id/item', async function(req, res, next) {
  const auth_token = req.headers['x-auth-token'];

  let authData
  try {
    authData = await jwt.parseToken(auth_token)
  } catch (err) {
    res.status(403).json({"message":"AUTH ERROR"})
  }

  let body = {
    line_item: {
      product_id: req.body.lineitem.product_id,
      variant_id: req.body.lineitem.variant_id,
      quantity: req.body.lineitem.quantity,
      list_price: req.body.lineitem.sale_price
    }
  }
 
  const url = `https://api.bigcommerce.com/stores/${authData.store_id}/v3/carts/${req.params.cart_id}/items/${req.body.lineitem.id}`

  try {
    const response = await axios.put(url, JSON.stringify(body),
      {
      headers: {
        'X-Auth-Token': authData.auth_token,
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({"message":err.message})
  }
});

module.exports = router;
