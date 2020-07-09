import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App/App';
import reducer from "./redux/reducer";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import 'antd/dist/antd.min.css';

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

