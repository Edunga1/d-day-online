import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './home/Home';
import Embed from './embed/Embed';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/embed" component={Embed} />
        </div>
      </Router>
    );
  }
}

export default App;
