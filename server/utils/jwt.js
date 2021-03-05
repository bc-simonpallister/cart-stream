const jwt = require('jsonwebtoken');

function parseToken(token){
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, authData) => {
      if (err){
        reject(err)
      } else {
        resolve(authData);
      }
    })
  })
}

function validateToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({message:'Not Allowed'});
  }

}

module.exports = {
  validateToken,
  parseToken
}