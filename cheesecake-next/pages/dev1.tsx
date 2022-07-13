import { motion, MotionStyle } from 'framer-motion';
import React from 'react';

//redux
import {connect} from 'react-redux';
import {LOGOUT, AUTHORIZE} from '../actions/userAction';
import { wrapper } from '../store';

export const getServerSideProps = wrapper.getServerSideProps(store => ({req, res, ...etc}): any => {
  return {};
});

const App: React.FC<any> = (props: any) => {
    const icon = {
        hidden: {
          opacity: 0,
          pathLength: 0,
          fill: "rgba(255, 255, 255, 0)"
        },
        visible: {
          opacity: 1,
          pathLength: 1,
          fill: "rgba(255, 255, 255, 1)"
        }
      };

    const bodyStyle = {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '500px',
        background: 'linear-gradient(180deg, rgb(253, 83, 253), rgb(245, 166, 223))',
    };

    const containerStyle = {
        width: '150px',
        height: '150px',
        display: 'flex',
        placeContent: 'center',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '30px',
    };

    const itemStyle: MotionStyle = {
        width: '56%',
        overflow: 'visible',
        stroke: '#fff',
        strokeWidth: 2,
        strokeLinejoin: 'round',
        strokeLinecap: 'round',
    };

    return (
        <>
            <div style={bodyStyle}>
                <div style={containerStyle}>
                    <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    style={itemStyle}
                    >
                    <motion.path
                        d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                        transition={{
                        default: { duration: 2, ease: "easeInOut" },
                        fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                        }}
                    />
                    </motion.svg>
                </div>
            </div>
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
