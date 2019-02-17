import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Web from './modules/web/components/Web';
import Secure from './modules/secure/components/Secure';
import Tickets from './modules/tickets/components/Tickets';
import Performance from './components/Performance';
import Performances from './components/Performances';
import './ignore.css';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
