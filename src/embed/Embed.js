import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { interval } from 'rxjs';
import './Embed.css';
import parseQueryString from './parse-query-string';
import { toTimerString, toMsString } from './timer-utils';

const MS_DAY = 86400000;
const MS_HOUR = 3600000;
const MS_MINUTE = 60000;
const MS_SECOND = 1000;

export default class Embed extends Component {
  state = {
    timer: '',
  };

  componentDidMount() {
    this.tick$ = interval(32).subscribe(() => {
      let diff = this.time - new Date();
      const days = Math.floor(diff / MS_DAY);
      diff %= MS_DAY;
      const hours = Math.floor(diff / MS_HOUR);
      diff %= MS_HOUR;
      const minutes = Math.floor(diff / MS_MINUTE);
      diff %= MS_MINUTE;
      const seconds = Math.floor(diff / MS_SECOND);
      diff %= MS_SECOND;
      const timer = toTimerString(days)
        + toTimerString(hours)
        + toTimerString(minutes)
        + toTimerString(seconds)
        + toMsString(diff);
      this.setState({ timer });
    });
  }

  render() {
    const { location: { search } } = this.props;
    const { v: youtubeId, t: time, m: message } = parseQueryString(search);
    const src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    const { timer = '' } = this.state;
    const siteUrl = `${window.location.origin}${process.env.PUBLIC_URL}`;
    this.time = time;
    return (
      <div className="embed">
        <iframe
          title="embed youtube"
          className="iframe-youtube"
          src={src}
          width="320"
          height="180"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="wrap-timer">
          <span>{decodeURI(message || '')}</span>
          <span className="txt-timer">{timer}</span>
        </div>
        <a
          className="link-site"
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {siteUrl}
        </a>
      </div>
    );
  }
}

Embed.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};
