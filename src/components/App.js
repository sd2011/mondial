import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Enter from '../containers/Enter';
import Index from '../containers/Index';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path =  '/:email' component={Index} />
              <Route path =  '/' component={Enter} />
            </Switch>
          </div>
        </BrowserRouter>

    );
  }
}

export default App;
