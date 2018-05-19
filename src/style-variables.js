const Injector = require('./injector');

/**
 * Set any variable that can be used later on inside .pss files.
 * e.g: color: $primary;
 *
 * @param {object} variablesSet
 */
function styleVariables(variablesSet) {
  Injector.registerStyleVariables(variablesSet);
}

module.exports = styleVariables;
