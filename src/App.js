import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './home/Home';
import Embed from './embed/Embed';

const BASE_URL = process.env.PUBLIC_URL;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path={`${BASE_URL}/`} component={Home} />
          <Route path={`${BASE_URL}/embed`} component={Embed} />
        </div>
      </Router>
    );
  }
}

export default App;
