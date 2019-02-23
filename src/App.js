import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Web from './components/Web';
import Secure from './components/Secure';
import Tickets from './components/Tickets';
import Performance from './modules/performance/components/Performance';
import Performances from './components/Performances';
import 'react-toastify/dist/ReactToastify.css';
import './ignore.css';
import BackButton from './components/BackButton';
import ApproveReviews from './modules/review/components/ApproveReviews';
import FullReview from './modules/review/components/FullReview';

const PrivateRoute = ({ render: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => parseInt(rest.loggedInAs, 10) > 0 ? <Component {...props} /> : <div>You should not have come here!</div>}
  />
);

PrivateRoute.propTypes = {
  render: PropTypes.func
};

const App = ({ loggedInAs }) => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          key="secure"
          loggedInAs={loggedInAs}
          path="/secure"
          render={() => (
            <React.Fragment>
              <Switch>
                <Route exact path="/secure/reviews/:id" component={FullReview} />
                <Route exact path="/secure/reviews" component={ApproveReviews} />
                <Route exact path="/secure" component={Secure} />
                <Route path="/secure/*" render={() => <div>404 Niet gevonden.</div>} />
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
        <Route path="*" render={() => <div>404 Niet gevonden.</div>} />
      </Switch>
    </BrowserRouter>
    <ToastContainer />
  </React.Fragment>
);

const mapStateToProps = ({ entities: { user: { loggedInAs } } }) => ({
  loggedInAs
});

export default connect(mapStateToProps)(App);
