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
import ApproveReviews from './modules/review/components/ApproveReviews';
import FullReview from './modules/review/components/FullReview';
import PostReview from './modules/review/components/PostReview';
import MoviesListPage from './modules/movies/components/MoviesListPage';
import MovieEditPage from './modules/movies/components/MovieEditPage';
import AddMovie from './modules/movies/components/AddMovie';
import SurveysListPage from './modules/survey/components/SurveysListPage';
import CreateSurvey from './modules/survey/components/CreateSurvey';
import SurveyResults from './modules/survey/components/SurveyResults';
import ManagePerformancesPage from './modules/performance/components/ManagePerformancesPage';
import ManagePerformancePage from './modules/performance/components/ManagePerformancePage';
import CreatePerformance from './modules/performance/components/CreatePerformance';
import SecureNavBar from './components/SecureNavBar';
import Loader from './components/Loader';

const PrivateRoute = ({ render: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => parseInt(rest.role, 10) > 0 ? <Component {...props} /> : <div>You should not have come here!</div>}
  />
);

PrivateRoute.propTypes = {
  render: PropTypes.func
};

const App = ({ role }) => (
  <React.Fragment>
    <Loader />
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          key="secure"
          role={role}
          path="/secure"
          render={() => (
            <React.Fragment>
              <SecureNavBar />
              <div id="secure" className="container">
                <Switch>
                  <Route exact path="/secure/performances" component={ManagePerformancesPage} />
                  <Route exact path="/secure/performances/create" component={CreatePerformance} />
                  <Route exact path="/secure/performances/:performanceId" component={ManagePerformancePage} />
                  <Route exact path="/secure/surveys" component={SurveysListPage} />
                  <Route exact path="/secure/surveys/create" component={CreateSurvey} />
                  <Route exact path="/secure/surveys/:id" component={SurveyResults} />
                  <Route exact path="/secure/movies" component={MoviesListPage} />
                  <Route exact path="/secure/movies/new" component={AddMovie} />
                  <Route exact path="/secure/movies/:id" component={MovieEditPage} />
                  <Route exact path="/secure/reviews/:id" component={FullReview} />
                  <Route exact path="/secure/reviews" component={ApproveReviews} />
                  <Route exact path="/secure" component={Secure} />
                  <Route path="/secure/*" render={() => <div>404 Niet gevonden.</div>} />
                </Switch>
              </div>
            </React.Fragment>
          )}
        />
        <Route render={() => (
          <React.Fragment>
            <Switch>
              <Route key="web" exact path="/web" component={Web} />
              <Route key="postReview" exact path="/web/movie/:movieId/reviews/post" component={PostReview} />
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

const mapStateToProps = ({ user: { role } }) => ({
  role
});

export default connect(mapStateToProps)(App);
