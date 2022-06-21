import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
//redux
import { connect } from 'react-redux';
//components

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LandingPage, Dev1, Dev2, Dev3, Dev4, Buy } from './screens';

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
        <Route exact path = "/buy" render={Buy}/>
        <Route exact path = "/dev1" render={Dev1}/>
        <Route exact path = "/dev2" render={Dev2}/>
        <Route exact path = "/dev3" render={Dev3}/>
        <Route exact path = "/dev4" render={Dev4}/>
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
