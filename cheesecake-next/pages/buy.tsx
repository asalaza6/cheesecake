import { Button, Flex, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';

//redux
import {connect} from 'react-redux';
import {LOGOUT, AUTHORIZE} from '../actions/userAction';
import { Checkout } from '../components';
import Catalog from '../components/Catalog';
import { wrapper } from '../store';
import { LineItem, isArray } from '../util';

export const getServerSideProps = wrapper.getServerSideProps(store => ({req, res, ...etc}): any => {
  return {};
});

const App: React.FC<any> = (props: any) => {
  const [products, setProducts] = useState<LineItem[]>([]);

  const checkout = async () => {
    const checkoutProducts = products.filter(item => item.quantity);
    if (!isArray(checkoutProducts)) {
      alert('Cart is empty!');
      return;
    }
    const line_items = checkoutProducts.map(item => ({ price: item.price, quantity: item.quantity }));
    const metadata = checkoutProducts.reduce((reducer, reducerItem) => {
      reducer[`${reducerItem.name}-${reducerItem.metadata?.flavors || reducerItem.metadata?.type}`] = JSON.stringify(reducerItem);
      return reducer;
    }, {});
    const response = await fetch(`/api/checkout`,{
        method: "POST",
        body: JSON.stringify({
          line_items,
          metadata,
        })
    });
    const parseRes = await response.json();
    window.location = parseRes;
  }
  return (
    <>
        <Heading>
            Buy (Coming Soon)
        </Heading>
        <Flex direction='column' width='80%'>
          <Flex dir='row'>
            <Catalog checkout={products} setCheckout={setProducts} />
          </Flex>
          <Flex dir='row'>
            <Checkout checkout={products} />
          </Flex>
        </Flex>
        
        <Button onClick={checkout} size='lg' colorScheme='pink'>Checkout</Button>
    </>
  );
}
const mapStateToProps = state => ({
  username: state.user.username,
  auth: state.user.auth
});

const mapDispatchToProps = (dispatch) =>{
  return {
      // addUser : (username, id) => dispatch({type: ADD_USER,payload: {username, id}}),
      authorize: (auth) => dispatch({type: AUTHORIZE, payload: {auth}}),
      logout: ()=>dispatch({type: LOGOUT})
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
