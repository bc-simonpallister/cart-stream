import React, { useContext }from 'react'
import { CartEventsContext } from '../context/CartEventsProvider'
import { ListGroup, h5 } from 'react-bootstrap'
import SelectedCartItem from './SelectedCartItem'

export default function SelectedCart() {

  const { currentCart } = useContext(CartEventsContext)

  function renderLineItems(){
    if (currentCart){
      return currentCart.cart.line_items.physical_items.map((item) => (
        <SelectedCartItem key={item.id} item={item} cart_id={currentCart.id}/>
      ))
    } else {
      return (
        <ListGroup.Item>No Cart Selected</ListGroup.Item>
      )
    }
  }

  return (
    <div className="d-flex flex-column p-2 flex-grow-1"  >
      <ListGroup> 
        <ListGroup.Item><h5>{currentCart ? currentCart.cart.email === "" ? "Guest Customer" : currentCart.cart.email : ""}</h5></ListGroup.Item>
        {renderLineItems()}
        {currentCart ? <ListGroup.Item className="float-end"><h5>{currentCart.cart.currency.code} {currentCart.cart.base_amount.toFixed(2)}</h5></ListGroup.Item> : ""}
      </ListGroup>
    </div>
  )
}
