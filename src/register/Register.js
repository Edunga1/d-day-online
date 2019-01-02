import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import './Register.css';
import afterDays from './after-days';

export default class Register extends Component {
  state = {
    youtube: 'https://www.youtube.com/watch?v=yXQViqx6GMY',
  };

  constructor() {
    super();
    this.onYoutubeChange$ = new Subject();
    this.onYearChange$ = new Subject().pipe(map(x => Number(x)));
    this.onMonthChange$ = new Subject().pipe(map(x => x - 1));
    this.onDayChange$ = new Subject().pipe(map(x => Number(x)));
  }

  componentDidMount() {
    const { onChange } = this.props;
    const after10days = afterDays(new Date(), 10);
    const year = after10days.getFullYear();
    const month = after10days.getMonth() + 1;
    const day = after10days.getDate();
    const { youtube } = this.state;

    this.setState({
      year,
      month,
      day,
    });

    combineLatest(
      this.onYearChange$.pipe(startWith(year)),
      this.onMonthChange$.pipe(startWith(month)),
      this.onDayChange$.pipe(startWith(day)),
      this.onYoutubeChange$.pipe(startWith(youtube)),
    ).pipe(
      map(arr => ({
        date: new Date(arr[0], arr[1] - 1, arr[2]),
        youtube: arr[3],
      })),
    ).subscribe(state => onChange({ ...state }));
  }

  componentWillUnmount() {
    this.onYearChange$.complete();
    this.onMonthChange$.complete();
    this.onDayChange$.complete();
    this.onYoutubeChange$.complete();
  }

  render() {
    const {
      youtube, year, month, day,
    } = this.state;
    const onYoutubeChange = e => this.onYoutubeChange$.next(e.target.value);
    const onYearChange = e => this.onYearChange$.next(e.target.value);
    const onMonthChange = e => this.onMonthChange$.next(e.target.value);
    const onDayChange = e => this.onDayChange$.next(e.target.value);
    return (
      <div className="register">
        <div>
          <input
            className="inp-youtube"
            type="text"
            defaultValue={youtube}
            onChange={onYoutubeChange}
            placeholder="youtube URL"
          />
        </div>
        <div>
          <input type="number" min="1" max="9999" placeholder="Year" defaultValue={year} onChange={onYearChange} />
          <input type="number" min="1" max="12" placeholder="Month" defaultValue={month} onChange={onMonthChange} />
          <input type="number" min="1" max="31" placeholder="Day" defaultValue={day} onChange={onDayChange} />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  onChange: PropTypes.func.isRequired,
};
