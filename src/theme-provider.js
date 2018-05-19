const React = require('react');
const ThemeContext = require('./theme-context');

class ThemeProvider extends React.Component {
  // on theme change
  // reload styles
  render() {
    const props = this.props;
    const theme = props.theme;
    delete props.theme;
    const otherProps = props;
    return React.createElement(
      ThemeContext.Provider,
      Object.assign({ value: theme }, otherProps)
    );
  }
}

module.exports = ThemeProvider;
