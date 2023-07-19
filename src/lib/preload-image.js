// @ts-check

/**
 * @param {string} src
 * @returns {void}
 */
export default function preloadImage(src) {
  const img = new Image();
  img.src = src;
}
