import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Web from './modules/web/components/Web';
import Secure from './modules/secure/components/Secure';
import Tickets from './modules/tickets/components/Tickets';
import Performance from './modules/performance/components/Performance';
import Performances from './components/Performances';
import 'react-toastify/dist/ReactToastify.css';
import './ignore.css';

const PrivateRoute = ({ render: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => parseInt(rest.loggedInAs, 10) > 0 ? <Component {...props} /> : <div>You should not have come here!</div>}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func
};

const App = ({ loggedInAs }) => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          key="secure"
          exact
          loggedInAs={loggedInAs}
          path="/secure"
          render={() => (
            <React.Fragment>
              <Switch>
                <Route exact path="" component={Secure} />
              </Switch>
            </React.Fragment>
          )}
        />
        <Route render={() => (
          <React.Fragment>
            <Switch>
              <Route key="web" exact path="/web" component={Web} />
              <Route key="performance" exact path="/web/performance/:performanceId" component={Performance} />
              <Route key="performances" exact path="/web/performances/:movieId" component={Performances} />
            </Switch>
          </React.Fragment>
        )}
        />
        <Route key="tickets" exact path="/tickets" component={Tickets} />
      </Switch>
    </BrowserRouter>
    <ToastContainer />
  </React.Fragment>
);

const mapStateToProps = ({ entities: { user: { loggedInAs } } }) => ({
  loggedInAs
});

export default connect(mapStateToProps)(App);
