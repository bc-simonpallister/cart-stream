import React, { useContext, useState } from 'react'
import { CartEventsContext } from '../context/CartEventsProvider'
import { useSocket } from '../context/SocketProvider';
import { ListGroup, small, h5, h6, Badge, InputGroup, FormControl } from 'react-bootstrap'
import Moment from 'react-moment';
import 'moment-timezone'

export default function CartEvents() {

  const { cartEvents, currentIndex } = useContext(CartEventsContext)
  const [ filter, setFilter ] = useState('')

  const { socketStatus, systemMessage } = useSocket()

  function getItems(cart) {
    return cart.line_items.physical_items.map(line_item => line_item.quantity).reduce((sum, quantity) => sum+quantity)
  }

  function updateDate(unixTime){
    const update = new Date(unixTime*1000)
    return (
        <Moment date={update} format="DD MMM yy h:mm:ssa"/> 
      )
  }

  // This bit need some work!

  function renderCarts(carts){

    console.log(filter)

    const filteredCarts = carts.filter(
      event=>event.cart.email.includes(filter) 
    )
    
    console.log(filteredCarts)

    return filteredCarts.map((event,index) => (
      <ListGroup.Item
        key={event.id}
        action
        onClick={()=>currentIndex(index)}
        active={event.isSelected}
      >
        <div>
          <h5><Badge className="ms-1" variant="info">{event.cart.currency.code} {event.cart.cart_amount.toFixed(2)}</Badge> </h5>
          <h6>{event.cart.email === '' ? 'Guest' : event.cart.email}</h6>
        </div>
        <div>
          <span className="me-1">{getItems(event.cart)} Items</span>
        </div>
        <div>
          <small style={{textTransform: 'capitalize'}}>Last event: {event.req.scope.split('/')[2]} { updateDate(event.req.created_at)}</small>
        </div>
      </ListGroup.Item>
      ))
  }

  return (
    <div className="d-flex flex-column mx-1 p-2" style={{ width: '450px' }}>
      <InputGroup className="mb-2">
        <FormControl
          placeholder="Search"
          onChange={(e)=> {
            setFilter(e.target.value)
            currentIndex(-1)
          }}
        />
      </InputGroup>
      <ListGroup className="flex-grow-1 overflow-auto">
        {renderCarts(cartEvents)}
      </ListGroup>
      <ListGroup>
        <ListGroup.Item className="text-center">{systemMessage}</ListGroup.Item>
      </ListGroup>
      <Badge variant={socketStatus === 'Connected' ? "success" : socketStatus === 'Disconnected' ? "danger" : "info" } className="mb-1 pt-2"><h5>{socketStatus}</h5></Badge>
      
    </div>
  )
}

