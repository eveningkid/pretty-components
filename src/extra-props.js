/**
 * You may wonder: *why?*
 * Why having a function that only returns its argument without any side-effect?
 *
 * Readability.
 *
 * When you read `functionA(..., { isOpened: true })`, an object is passed to
 * it but who knows what's going to happen with this one.
 * By explicitely writing "extraProps(...)", anyone reading this will know
 * what this is for.
 */
function extraProps(props) {
  return props;
}

module.exports = extraProps;
