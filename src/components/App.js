import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Enter from '../containers/Enter';
import Index from '../containers/Index';
import Scores from '../containers/Scores';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path = '/index/scores' component={Scores} />
              <Route path =  "/index/:email" component={Index} />
              <Route path =  '/' component={Enter} />
            </Switch>
          </div>
        </BrowserRouter>

    );
  }
}

export default App;
