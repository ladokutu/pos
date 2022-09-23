import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import "bulma/css/bulma.css";
//import "./index.css";


import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from '../src/Reducers';
import thunk from 'redux-thunk';
//import axios from "axios";


const store = createStore(reducers, applyMiddleware(thunk));
//axios.defaults.withCredentials = true


ReactDOM.render(
  
	  <Provider store={store}>
		<App />
	  </Provider>
  ,
  document.getElementById('root')
);