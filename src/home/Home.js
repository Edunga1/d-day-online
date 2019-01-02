import React, { Component } from 'react';
import { Subject } from 'rxjs';
import './Home.css';
import Register from '../register/Register';
import Viewer from '../viewer/Viewer';

export default class Home extends Component {
  state = {
    youtube: '',
  }

  constructor() {
    super();
    this.onRegisterChange$ = new Subject();
    this.onRegisterChange$.subscribe(obj => this.setState(obj));
  }

  render() {
    const { youtube, date } = this.state;
    return (
      <div className="home">
        <Viewer youtube={youtube} date={date} />
        <div className="box-register">
          <Register onChange={obj => this.onRegisterChange$.next(obj)} />
        </div>
      </div>
    );
  }
}
