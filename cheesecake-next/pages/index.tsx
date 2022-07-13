import { Flex, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

//redux
import {connect} from 'react-redux';
import {LOGOUT, AUTHORIZE} from '../actions/userAction';
import { LandingButton, Layout, Slideshow } from '../components';
import { wrapper } from '../store';

export const getServerSideProps = wrapper.getServerSideProps(store => ({req, res, ...etc}): any => {
  return {};
});

const App: React.FC<any> = (props: any) => {
  const router = useRouter();

  const goToBuy = () => {
    router.push('/buy');
  }

  return (
    <>
      <Slideshow />
      <Flex dir='row' justify='center' minH='50px'>
        <Flex style={{ fontSize: '25pt', fontWeight: 'bold' }}>
          Buy Now
        </Flex>
        <IconButton aria-label='Buy Now' onClick={goToBuy} size='lg' colorScheme='blue' marginRight={'25px'} marginLeft='25px' icon={<AiOutlineShoppingCart />} />
        <Flex style={{ fontSize: '25pt', fontWeight: 'bold' }}>
          Buy Now
        </Flex>
        <IconButton aria-label='Buy Now' onClick={goToBuy} size='lg' colorScheme='blue' marginRight={'25px'} marginLeft='25px' icon={<AiOutlineShoppingCart />} />
        <Flex style={{ fontSize: '25pt', fontWeight: 'bold' }}>
          Buy Now
        </Flex>
        <IconButton aria-label='Buy Now' onClick={goToBuy} size='lg' colorScheme='blue' marginRight={'25px'} marginLeft='25px' icon={<AiOutlineShoppingCart />} />
        <Flex style={{ fontSize: '25pt', fontWeight: 'bold' }}>
          Buy Now
        </Flex>
        <IconButton aria-label='Buy Now' onClick={goToBuy} size='lg' colorScheme='blue' marginRight={'25px'} marginLeft='25px' icon={<AiOutlineShoppingCart />} />
      </Flex>
      <LandingButton />
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
