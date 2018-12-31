/**
 * @param {string} str
 * @return {string} youtube video id. if invalid, returns empty string
 */
const parseYoutubeId = (str) => {
  const youtubeIdMatch = typeof str === 'string' && str.match(/v=(\w+)/);
  const youtubeId = (
    youtubeIdMatch
    && youtubeIdMatch.length >= 2
    && youtubeIdMatch[1]
  ) || '';
  return youtubeId;
};

export default parseYoutubeId;
