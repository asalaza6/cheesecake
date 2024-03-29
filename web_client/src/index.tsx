import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider } from "@chakra-ui/react";
import {Provider} from 'react-redux';
import {store,persistor} from './store';
import {PersistGate} from 'redux-persist/es/integration/react';
//console.log('ChakraProvider', ChakraProvider);
import Fonts from './fonts';
import theme from './theme';


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading = {null} persistor={persistor}>
      <ChakraProvider theme={theme}>
          <Fonts />
          <App />
      </ChakraProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
