class Theme {
  static theme = {};

  static setTheme(theme) {
    Theme.theme = theme;
  }
}

const theme = new Theme();

export default theme;
