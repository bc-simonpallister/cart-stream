const config = require('dotenv').config()
const express = require('express')
const router = express.Router()
const axios = require('axios')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

router.post('/init', async function(req, res, next) {
  const store_id = req.headers['x-store-id'];
  const auth_token = req.headers['x-auth-token'];

  if (!store_id || !auth_token){
    return res.status(403).json({"message" : "No credentials"})
  }

  //  TODO

  // try {
  //   const response = await axios.get(`https://api.bigcommerce.com/stores/${store_id}/v3/customers?limit=1`, {
  //     method: 'get',
  //     headers: {
  //       'X-Auth-Token': auth_token,
  //       'Content-Type' : 'application/json',
  //       'Accept' : 'application/json'
  //     }
  //   })
  //   jwt.sign({auth_token,store_id}, SECRET_KEY, { expiresIn: '30d' }, (err, token) => {
  //     res.json({token: token})
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.status(403).json({"message":"Failed to authenticate user"})
  // }
});

module.exports = router;