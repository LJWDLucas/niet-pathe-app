import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import reducer from './redux/reducer';
import * as serviceWorker from './serviceWorker';
import { setUser } from './actions/actions';

const middleware = process.env.NODE_ENV === 'production'
  ? applyMiddleware(thunk)
  : composeWithDevTools(applyMiddleware(thunk));

const store = createStore(reducer, middleware);

const root = document.getElementById('root');

const auth = root.getAttribute('data-auth');
const loggedInAs = root.getAttribute('data-logged-in-as');
const role = root.getAttribute('data-role');

class InitApp extends React.Component {
  componentWillMount() {
    this.props.initializeApp();
  }

  render() {
    return <App />;
  }
}

const mapDispatchToProps = dispatch => ({
  initializeApp: () => dispatch(setUser(auth, loggedInAs, role))
});

const WrappedApp = connect(null, mapDispatchToProps)(InitApp);

const ProviderApp = () => (
  <Provider store={store}>
    <WrappedApp />
  </Provider>
);

ReactDOM.render(<ProviderApp />, document.getElementById('root'));

serviceWorker.unregister();
