import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parseYoutubeId from './parse-youtube-id';

export default class Viewer extends Component {
  render() {
    const { youtube, date } = this.props;
    const youtubeId = parseYoutubeId(youtube);
    const time = date && date.getTime();
    const src = `embed?t=${time}&v=${youtubeId}`;
    const embedAttrs = {
      src,
      width: 700,
      height: 180,
      frameBorder: 0,
    };
    const attributes = `width="${embedAttrs.width}" `
      + `height="${embedAttrs.height}" `
      + `frameborder="${embedAttrs.frameBorder}"`;
    const embedSource = `<iframe src="${window.location.href}${src}" ${attributes}></iframe>`;
    return (
      <div>
        <div>
          <iframe
            title="embed"
            {...embedAttrs}
          />
        </div>
        <div>
          <input
            type="text"
            value={embedSource}
            readOnly
          />
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
