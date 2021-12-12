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

import Home from './components/Home';

toast.configure()

function App(props) {
  
  return (
    <Router>
      <Switch>
      <Route exact path = "/" render={(props)=>{
        return <Home {...props}/>
        }
      }/>
      </Switch>
    </Router>
  );
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch) =>{
  return {
    
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
