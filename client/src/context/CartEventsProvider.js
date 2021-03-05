import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useSocket } from './SocketProvider';
import useLocalStorage from '../hooks/useLocalStorage'

export const CartEventsContext = React.createContext()

export const MESSAGE_TYPE = {
  CART_EVENT: 'cart_event'
}

export function useCartEvents() {
  return useContext(CartEventsContext)
}

export function CartEventsProvider( {children}) {

  //const [cartEvents, setCartEvents] = useLocalStorage('carts', [])
  const [cartEvents, setCartEvents] = useState([])
  const [selectedCartEventIndex, setSelectedCartEventIndex] = useState()

  const { socket } = useSocket()

  const addEvent = useCallback( (cart_event) => {

    console.log(cart_event)
    setCartEvents(prevEvents => {
      const index = prevEvents.findIndex(event => event.id === cart_event.id)
      if ( index <0 ){
        return [cart_event, ...prevEvents]
      } else {
        prevEvents[index].req = cart_event.req
        prevEvents[index].cart = cart_event.cart
        prevEvents[index].customer = cart_event.customer
        return [...prevEvents]
      }
    })

  }, [setCartEvents])

  const carts = cartEvents.map((cart,index)=>{
    cart.isSelected = index === selectedCartEventIndex
    return cart
  })

  useEffect(() => {
    if (socket == null) return

    socket.on(MESSAGE_TYPE.CART_EVENT, addEvent)

  },[socket, addEvent])

  const value= {
    cartEvents: carts,
    setCartEvents: setCartEvents,
    currentIndex: setSelectedCartEventIndex,
    currentCart: carts[selectedCartEventIndex],
  }

  return (
    <CartEventsContext.Provider value={value}>
      {children}
    </CartEventsContext.Provider>
  )
}
