import React, { useState }from 'react'
import { Form, InputGroup, ListGroup, Button } from 'react-bootstrap'
import { useSocket } from '../context/SocketProvider'

export default function SelectedCartItem(props) {

  //const { currentCart } = useContext(CartEventsContext)
  const [lineitem, setLineItem] = useState(props.item)

  const { token } = useSocket()

  function saveLineItem(e){
    e.preventDefault()

    fetch(`http://localhost:3000/carts/${props.cart_id}/item`, {
      method: 'PUT',
      body: JSON.stringify({ lineitem }),
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token' : token
      },
    })
      .then(res => res.json())
      .then(json => setLineItem(lineitem)) ///need to update to returned lineitem
  }

  const { item } = props

  return (
    <ListGroup.Item key={item.id} action>
      <Form onSubmit={saveLineItem}> 
        <ListGroup horizontal="sm">
          <ListGroup.Item style={{width: "160px", textAlign: "center"}}>

            <InputGroup>
              <Form.Control 
                onChange={(e)=>setLineItem({ ...lineitem, quantity: e.target.value})} 
                defaultValue={item.quantity}
                className="text-center"
              />
            </InputGroup>

          </ListGroup.Item>
          <ListGroup.Item style={{width: "100%"}}>{item.name}</ListGroup.Item>
          <ListGroup.Item className="text-end" style={{width: "250px"}}>

            <InputGroup>
              <Form.Control 
                defaultValue={item.sale_price.toFixed(2)}
                className="text-right"
                onChange={(e)=>setLineItem({ ...lineitem, sale_price: e.target.value})} 
              />
            </InputGroup>
            
          </ListGroup.Item>
          <ListGroup.Item className="text-end" style={{width: "150px"}}>{item.extended_sale_price.toFixed(2)}</ListGroup.Item>
          <ListGroup.Item>
            <Button type="submit" variant="outline-primary">Save</Button>
          </ListGroup.Item>
        </ListGroup>
      </Form>
    </ListGroup.Item>
  )
}
