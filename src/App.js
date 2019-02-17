import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Web from './modules/web/components/Web';
import Secure from './modules/secure/components/Secure';
import Tickets from './modules/tickets/components/Tickets';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route key="secure" exact path="/secure" component={Secure} />
          <Route key="web" exact path="/web" component={Web} />
          <Route key="tickets" exact path="/tickets" component={Tickets} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
