import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Web from './modules/web/components/Web';
import Secure from './modules/secure/components/Secure';
import Tickets from './modules/tickets/components/Tickets';
import Performance from './modules/performance/components/Performance';
import Performances from './components/Performances';
import 'react-toastify/dist/ReactToastify.css';
import './ignore.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route key="secure" exact path="/secure" component={Secure} />
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
  }
}

export default App;
