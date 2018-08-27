
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('../bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
// import 'semantic-ui-css/semantic.min.css';
//
// import '../less/style.css';
// import { LIST } from './constants';
// import rootReducer from './reducers';
// import { modelRest } from './actions';
// import Layout from './containers/Layout';
//
// // const store = createStore(rootReducer,applyMiddleware(thunk,createLogger()));
// const store = createStore(rootReducer,applyMiddleware(thunk));
// store.dispatch( modelRest('activity', 'LIST') );
// store.dispatch( modelRest('company', 'LIST') );
// store.dispatch( modelRest('service', 'LIST') );
// store.dispatch( modelRest('withdrawal', 'LIST') );
//
//
// render( <Provider store={store}><Layout/></Provider>, document.getElementById('app') );
