import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
//redux
import {connect} from 'react-redux';
//components

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {LandingPage} from './screens/LandingPage';
import {Home} from './screens/Home';

toast.configure()

/**
 * Initial App
 * @param {*} props 
 * @returns 
 */
function App(props: any) {
  
  return (
    <Router>
      <Switch>
        <Route exact path = "/" render={LandingPage}/>
        <Route exact path = "/dev" render={Home}/>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) =>{
  return {
    
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
