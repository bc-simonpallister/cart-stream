import { Box, Small, Grid, Link, GridItem, Tooltip } from '@bigcommerce/big-design'
import { BaselineHelpIcon } from '@bigcommerce/big-design-icons'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import EventIcon from '@material-ui/icons/Event';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const CartEvent = ({event}) =>{

  const {req, cart} = event

  const handleClick = (index, e) => {
    console.log(event.cart[index])
  }

  return (
    <Box border="box" borderRadius="normal" padding="medium">
      <Grid gridColumns="15px auto 15px auto 15px" marginBottom="medium">
        <GridItem>
          <PersonRoundedIcon size="xsmall"/>
        </GridItem>
        <GridItem>
          <Link href="#"><Small>{cart.email === '' ? "Guest" : cart[0].email}</Small></Link>
        </GridItem>
        <GridItem>
          <AccessTimeRoundedIcon/>
        </GridItem>
        <GridItem>
          <Small color="secondary40">{event.date}</Small>
        </GridItem>
      </Grid>

      {req.map((eventItem, index) => {
        if (index > 0 && index === req.length){
          
        }
        const cart = event.cart[index]
        const date = new Date(eventItem.created_at * 1000)
        const event_type = eventItem.scope.split('/')[3]
        const line_items = cart.line_items.physical_items.length + cart.line_items.digital_items.length + cart.line_items.gift_certificates.length + cart.line_items.custom_items.length 
        const physical_items = cart.line_items.physical_items.map(
          value => value.quantity).reduce( (sum, current) =>  sum + current, 0
        )
        const digital_items = cart.line_items.digital_items.map(
          value => value.quantity).reduce( (sum, current) =>  sum + current, 0
        )
        const custom_items = cart.line_items.custom_items.map(
          value => value.quantity).reduce( (sum, current) =>  sum + current, 0
        )
        const gift_certificates = cart.line_items.gift_certificates.map(
          value => value.quantity).reduce( (sum, current) =>  sum + current, 0
        )
        const total_items = physical_items + custom_items + digital_items + gift_certificates
        return (
          <Grid gridColumns="15px 50px 100px 8px auto 8px auto 18px" grid key={index}>
            <GridItem><Small color="secondary40" ><EventIcon /></Small></GridItem>
            <GridItem><Small margin="xxSmall">{date.toLocaleTimeString()}</Small></GridItem>
            <GridItem><Small margin="xxSmall">item {event_type}</Small></GridItem>
            <GridItem>
              <Tooltip trigger={<BaselineHelpIcon color="secondary40" size="medium"/>} placement="top">
                (Currency) Cart Subtotal / Cart Total
              </Tooltip>
            </GridItem>
            <GridItem>
              <Small margin="xxSmall">({cart.currency.code}) {cart.base_amount.toFixed(2)}/{cart.cart_amount.toFixed(2)} </Small>
            </GridItem>
            <GridItem>
              <Tooltip trigger={<BaselineHelpIcon color="secondary40" size="medium"/>} placement="top">
                No of Line Items / Total Items
              </Tooltip>
            </GridItem>
            <GridItem>
              <Small margin="xxSmall">{line_items} / {total_items} </Small>
            </GridItem>
            <GridItem>
              <Link onClick={(e) => handleClick(index, e)} href="#"><ShoppingCartIcon  color="primary" size="medium"/></Link>
            </GridItem>
          </Grid>
        )   
      })}
    </Box>
  )
}

export default CartEvent
