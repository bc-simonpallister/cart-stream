import React from "react"
import io from "socket.io-client"
import { Panel, Badge, Grid} from '@bigcommerce/big-design'
import CartEvent from './CartEvent'
const ENDPOINT = "http://localhost:3000";
const auth_token = 'syhrfbk25vci5avdz8ln8yo61ygt83e';
const store_id = 'e73sh90yy2';


class Stream extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      token: '',
      status: 'Disconnected',
      events: []
    }

  } 

  async componentDidMount() {
    let { token } = this.state
    if (token === ''){

      fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Store-Id': store_id,
          'X-Auth-token': auth_token
        }
      })
      .then(res => res.json())
      .then(data => {
        const { token } = data
        this.setState({token})
        this.setState({status:'Connecting'})

        const socket = io(ENDPOINT, {
          query: {token}
        });
        socket.on('connect', () => {
          this.setState({status:'Connected'})
          console.log('Connected to server. Id : '+socket.id)
        })
        socket.on('discconnect', (reason) => {
          this.setState({status:'Disconnected'})
          console.log('Disconnected from server...'+reason)
        })
        socket.on('ping', () => {
          console.log('ping')
        })

        socket.on('cart_event', (cart_event) => {
          const {events} = this.state

          const index = events.findIndex(event => event.cartId === cart_event.cartId)
          if ( index <0 ){
            events.unshift(cart_event)
          } else {
            events[index].req.unshift(cart_event.req[0])
            events[index].cart.unshift(cart_event.cart[0])
            events[index].customer = cart_event.customer
          }

          this.setState({events: events})
        })

      })
    }
  }


  render () {

    return (
      <div>
        <Panel header="Cart Stream Events">
          <Grid gridColumns="repeat(2, min-content)">
            <Badge variant={this.state.status === 'Connected' ? "success" : "warning"} label={this.state.status}/>
          </Grid>
          <Grid marginTop="medium">
            {this.state.events.map((event, index) => (
              <CartEvent key={index} event={event}/>
            ))}
          </Grid>
        </Panel>
      </div>
    )
  }

}

export default Stream