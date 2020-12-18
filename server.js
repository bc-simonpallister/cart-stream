const http = require('http')
const path = require('path')
const express = require('express')
const socketIo = require('socket.io')
const config = require('dotenv').config()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

const server = http.createServer(app)
const io = socketIo(server)


app.post('/listen', (req, res) => {
  res.json(req.body)
  console.log(req.body)
  io.emit('lineitem', req.body)
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

io.on('connection', async () => {
  console.log('Client connected...');
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))