import React from 'react'
import CartEvents from './CartEvents'
import SelectedCart from './SelectedCart'

export default function Dashboard() {
  return (
    <div className="bg-light p-3">
      <div className="d-flex " style={{ height: '97vh' }}>
        <CartEvents/>
        <SelectedCart/>
      </div>
    </div>
  )
}
