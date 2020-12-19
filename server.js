const http = require('http')
const path = require('path')
const express = require('express')
const socketIo = require('socket.io')
const config = require('dotenv').config()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cart = require('./models/orders')


//Routes
const userRouter = require('./routes/users');
const { createSocket } = require('dgram')

const SECRET_KEY = process.env.SECRET_KEY


const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())
app.use('/users', userRouter);

const server = http.createServer(app)
const io = socketIo(server)

io.use(function(socket, next){
  if (socket.handshake.query && socket.handshake.query.token){
    jwt.verify(socket.handshake.query.token, SECRET_KEY, function(err, decoded) {
      if (err) return next(new Error('Unable to authenticate token'));
      socket.decoded = decoded;
      next();
    });
  }
  else {
    next(new Error('Unable to authenticate token'));
  }    
})
.on('connection', async (socket) => {
  console.log(socket.decoded.store_id)
  socket.join(socket.decoded.store_id)
  console.log('Client connected...')
})


// Listener for cart webhook
app.post('/listen', validateToken, async (req, res) => {

  //Immediately respond to the webhook
  res.json()

  const store_id = req.body.store_id
  console.log(store_id)

  //io.join(store_id)
  //const cartData = cart.getOrder(id,)

  const data = {
    request: req.body,
    store_id,
    token: req.token //NEED TO SEND THE CART WITH THIS STUFF
  }

  io.to(store_id).emit('lineitem', data) //NEED TO CHANGE THIS TO SEND 'TO' A ROOM, based on store_id
})

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

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))