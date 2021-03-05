import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default function CartEventItem({event}) {
  return (
    <ListGroup.Item>
      {event.id}
    </ListGroup.Item>
  )
}
