const http = require('http')
const path = require('path')
const express = require('express')
const socketIo = require('socket.io')
const config = require('dotenv').config()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cart = require('./models/carts')
const customer = require('./models/customers')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

//Routes
const userRouter = require('./routes/users');
const setupRouter = require('./routes/setup');

//Constants
const SECRET_KEY = process.env.SECRET_KEY
const PORT = process.env.PORT || 3000

//Configure Express
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/users', userRouter);
app.use('/setup', setupRouter);


//Configure Socket.io
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5000"
  }
})

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
.on('connection', (socket) => {

  const {store_id} = socket.decoded

  socket.join(store_id)
  //io.to(.store_id).emit('cart_event', 'test message') 
  console.log(`${store_id} / ${socket.id} connected...`)

  socket.on('disconnect', (reason) => {
    console.log(`${store_id} disconnected - ${reason}`)
  })
  socket.on('cart_event', data => {
    console.log(`Incoming message: ${data}`)
  })
})

// Listener for cart webhook
app.post('/listen', validateToken, async (req, res) => {

  //Immediately respond to the webhook
  res.json()

  const { body } = req

  const store_id = body.producer.split('/')[1]
  const cartId = body.scope.split('/')[1] === cart ? body.data.id : body.data.cartId
  console.log('cartId', cartId)

  const cartData = await cart.getCart(cartId, req.auth)
  const customerData = cartData.data.customer_id > 0 ? await customer.getCustomer(cartData.data.customer_id, req.auth) : []

  const data = {
    id: uuidv4(),
    date: new Date(),
    cartId: cartId,
    req: [body],
    cart: [cartData.data], 
    customer: customerData.data
  }

  io.to(store_id).emit('cart_event', data) 
  console.log(`meesage sent to ${store_id}`)
})

async function validateToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;


    let authData
    try {
      authData = await authJWT(bearerToken)
      req.auth = authData
    } catch (err) {
      res.status(403).json({message:'Not Allowed'});
    }

    next();
  } else {
    res.status(403).json({message:'Not Allowed'});
  }

}

function authJWT(token){
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, authData) => {
      if (err){
        reject(err)
      } else {
        resolve(authData);
      }
    })
  })
}

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))