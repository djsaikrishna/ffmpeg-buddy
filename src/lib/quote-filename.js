// @ts-check

/**
 * @param {string} filename
 * @returns {string}
 */
export default function quoteFilename(filename) {
  if (filename.indexOf(" ") === -1) {
    return filename.replace(/'/g, "\\'");
  } else {
    return "'" + filename.replace(/'/g, "'\\''") + "'";
  }
}
