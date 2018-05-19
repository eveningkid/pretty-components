function formatProps(Component, props) {
  // Used to check whether or not a boolean prop, about to be transformed
  // into a string, is mentionned as a boolean property in `propTypes`.
  // If so, we don't need to cast its value.
  const propTypes = Component.propTypes || {};

  // `props` is read-only so we return a new set of props
  const formattedProps = {};
  for (const [propName, propValue] of Object.entries(props)) {
    // Fix *Received `false|true` for a non-boolean attribute* React warning
    if (typeof propValue === 'boolean' && !(propName in propTypes) && propValue) {
      formattedProps[propName] = propValue.toString();
    } else {
      formattedProps[propName] = propValue;
    }
  }
  return formattedProps;
}

module.exports = formatProps;
