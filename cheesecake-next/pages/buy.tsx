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
    const checkoutProducts = products.filter(item => item.quantity).map(item => ({ price: item.price, quantity: item.quantity }));
    if (!isArray(checkoutProducts)) {
      alert('Cart is empty!');
      return;
    }
    const response = await fetch(`/api/checkout`,{
        method: "POST",
        body: JSON.stringify({
          line_items: checkoutProducts,
          metadata: { checkout: products },
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
        <Flex dir='column'>
            <Catalog checkout={products} setCheckout={setProducts} />
            <Checkout checkout={products} />
        </Flex>
        <Button onClick={checkout}>Checkout</Button>
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
