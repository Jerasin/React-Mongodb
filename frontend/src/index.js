import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import reducers from './reducers';
import logger from 'redux-logger';

import { persistStore, persistReducer , createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

import { composeWithDevTools } from 'redux-devtools-extension';

import {parse, stringify} from 'flatted'


export const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState),
  
)

const persistConfig = {
  key: 'root',
  whitelist: ['stockReducer'],
  storage,
  transforms: [transformCircular]
}


const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer , composeWithDevTools(applyMiddleware(thunk,logger)));

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

export default store;
