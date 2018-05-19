class Injector {
  constructor() {
    this.pendingStylesheets = [];
    this.renderedStylesheets = [];
    this.styleVariables = {};
    this.stylesDOMContainer = this.generateStylesDOMContainer();
    this.replaceSelectorByStyleVariable = this.replaceSelectorByStyleVariable.bind(this);
  }

  /**
   * Register a given stylesheet and call for rendering.
   *
   * @param {Stylesheet} stylesheet
   */
  static registerStylesheet(stylesheet) {
    Injector._instance.pendingStylesheets.push(stylesheet);
    Injector._instance.renderStyles()
  }

  /**
   * Register any variable that can be used later on inside .pss files.
   *
   * @param {object} variablesSet
   */
  static registerStyleVariables(variablesSet) {
    Injector._instance.styleVariables = Object.assign(
      Injector._instance.styleVariables,
      variablesSet,
    );
  }

  /**
   * Generate a <style> tag and append it to the current document's <head>.
   * This container will be used to inject all generated styles.
   */
  generateStylesDOMContainer() {
    const styleBlock = window.document.createElement('style');
    styleBlock.type = 'text/css';
    styleBlock.id = 'pretty';
    window.document.head.appendChild(styleBlock);
    return styleBlock;
  }

  /**
   * Render a given stylesheet.
   *
   * @param {Stylesheet} stylesheet
   */
  renderStylesheet(stylesheet) {
    if (!this.renderedStylesheets.includes(stylesheet.identifier)) {
      const generatedCSS = stylesheet
        .toCSS()
        .replace(/\$(\w|\d)*/g, this.replaceSelectorByStyleVariable);

      this.stylesDOMContainer.innerHTML += generatedCSS;
      this.renderedStylesheets.push(stylesheet.identifier);
    }
  }

  /**
   * Given a selector i.e. variable name, will return its associated match
   * found inside `this.styleVariables`.
   *
   * @param {string} match
   * @return {string}
   */
  replaceSelectorByStyleVariable(match) {
    // Require `substr` to remove the '$' sign
    return this.styleVariables[match.substr(1)] || match;
  }

  /**
   * Will render stylesheets pending to be rendered.
   */
  renderStyles() {
    for (const stylesheet of this.pendingStylesheets) {
      this.renderStylesheet(stylesheet);
    }

    for (let index = 0; index < this.pendingStylesheets.length; index++) {
      this.pendingStylesheets.splice(index, 1);
    }
  }
}

Injector._instance = new Injector();

module.exports = Injector;
