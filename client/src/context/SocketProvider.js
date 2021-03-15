import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import dotenv from 'dotenv'

dotenv.config()

const ENDPOINT = "http://localhost:3000";
// const store_id = 'e73sh90yy2'
// const auth_token = 'syhrfbk25vci5avdz8ln8yo61ygt83e'
const store_id = process.env.REACT_APP_STORE_ID
const auth_token = process.env.REACT_APP_ACCESS_TOKEN

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState()
  const [token, setToken] = useState()
  const [socketStatus, setSocketStatus] = useState('Disconnected')
  const [systemMessage, setSystemMessage] = useState('')

  console.log(auth_token, store_id )

  useEffect(() => {

    let newSocket

    if (!token){

      fetch(`${ENDPOINT}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Store-Id': store_id,
          'X-Auth-token': auth_token
        }
      })
      .then(res => res.json())
      .then(data => {
        setSocketStatus('Connecting')
        const { token } = data
        setToken(token)
        newSocket = io(ENDPOINT, {
          query: {token}
        });
        setSocket(newSocket)
        newSocket.connect()
        newSocket.on('connect', () => {
          setSocketStatus('Connected')
          newSocket.on('system', (message) => {
            setSystemMessage(message)
          })
        })
        newSocket.on('disconnect', (reason) => {
          setSocketStatus('Disconnected')
        })
      })
      return () => newSocket.close()
    }
  }, [token])

  return (
    <SocketContext.Provider value={{socket, socketStatus, token, systemMessage}}>
      {children}
    </SocketContext.Provider>
  )
}

