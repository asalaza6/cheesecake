import { Heading } from '@chakra-ui/react';
import React from 'react';

//redux
import {connect} from 'react-redux';
import {LOGOUT, AUTHORIZE} from '../actions/userAction';
import { wrapper } from '../store';

export const getServerSideProps = wrapper.getServerSideProps(store => ({req, res, ...etc}): any => {
  return {};
});

const App: React.FC<any> = (props: any) => {
  return (
    <>
        <Heading>
            Buy (Coming Soon)
        </Heading>
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
