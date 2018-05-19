const React = require('react');
const Injector = require('./injector');
const classNameFromProps = require('./classname-from-props');
const formatProps = require('./format-props');

// export default style(Component, stylesheet);
function style(Component, stylesheet, extraProps={}) {
  // Only register a stylesheet when it's being used
  Injector.registerStylesheet(stylesheet);

  return function (props) {
    const className = classNameFromProps(stylesheet, props);
    const formattedProps = formatProps(Component, props);
    return React.createElement(
      Component,
      Object.assign({}, formattedProps, extraProps, {
        className: [className, props.className]
          .filter(className => className)
          .join(' ')
      })
    );
  };
}

module.exports = style;
