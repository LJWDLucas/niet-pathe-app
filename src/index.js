import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import reducer from './redux/reducer';
import * as serviceWorker from './serviceWorker';

const middleware = process.env.NODE_ENV === 'production'
  ? applyMiddleware(thunk)
  : composeWithDevTools(applyMiddleware(thunk));

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
serviceWorker.unregister();
