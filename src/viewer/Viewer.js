import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parseYoutubeId from './parse-youtube-id';
import './Viewer.css';

export default class Viewer extends Component {
  constructor() {
    super();
    this.refAutogrowBox = null;
    this.setAutogrowBoxRef = (e) => {
      this.refAutogrowBox = e;
    };
    this.selectAndCopyAutogrow = () => {
      if (!this.refAutogrowBox) return;
      this.refAutogrowBox.select();
      document.execCommand('copy');
    };
  }

  render() {
    const { youtube, date, message } = this.props;
    const youtubeId = parseYoutubeId(youtube);
    const time = date && date.getTime();
    const messageEncoded = encodeURI(message);
    const queryString = `embed?t=${time}&v=${youtubeId}&m=${messageEncoded}`;
    const embedAttrs = {
      src: queryString,
      width: 700,
      height: 180,
      frameBorder: 0,
    };
    const attributes = `width="${embedAttrs.width}" `
      + `height="${embedAttrs.height}" `
      + `frameborder="${embedAttrs.frameBorder}"`;
    const embedSource = `<iframe src="${window.location.href}${queryString}" ${attributes}></iframe>`;
    return (
      <div>
        <iframe
          title="embed"
          {...embedAttrs}
        />
        <div className="box-autogrow">
          <textarea
            className="inp-autogrow"
            ref={this.setAutogrowBoxRef}
            value={embedSource}
            readOnly
          />
          <button
            className="btn-copy"
            type="button"
            onClick={this.selectAndCopyAutogrow}
          >
            COPY
          </button>
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {
  youtube: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};

Viewer.defaultProps = {
  youtube: '',
  date: null,
};
