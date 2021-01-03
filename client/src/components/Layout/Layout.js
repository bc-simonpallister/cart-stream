import Stream from '../Stream'
import Cart from '../Cart'
import Customer from '../Customer'
import './Layout.css'

import { H1, H2, Grid, GridItem} from '@bigcommerce/big-design'

const Layout =({children}) =>{

  const template = `
    "head head" 50px
    "stream cart" 
    / 4fr 2fr;
  `;

  return(
    <Grid gridTemplate={template} margin="medium">
      <GridItem gridArea="head">
        <H1>React Real-Time Cart Stream</H1>
      </GridItem>
      <GridItem gridArea="stream">
        <Stream/>
      </GridItem>
      <GridItem gridArea="cart">
        <Cart/>
        <Customer/>
      </GridItem>
    </Grid>


  )
}

export default Layout;
