const { fromCamelToDash } = require('pretty-components-formatter');

// Stylesheet:
// {
//   '__root': 'aa',
//   'size:big': 'aa--size-big',
//   'blueText': 'aa--blue-text'
// }
//
// Props:
// {
//   size: 'big',
//   blueText: true,
// }
//
// `propsToList`: ['size:big', 'blue-text']
// `classNameFromProps`: 'aa aa--size-big aa--blue-text'

/**
 * { size: 'big', blueText: true } => ['size:big', 'blue-text']
 *
 * @param {object} props
 * @return {array}
 */
function propsToList(props) {
  const properties = Object.entries(props);
  const list = [];
  for (let [propName, propValue] of properties) {
    propName = fromCamelToDash(propName);
    const propValueType = typeof propValue;
    switch (propValueType) {
      case 'string':
      case 'number':
        if (propValueType === 'string') {
          propValue = fromCamelToDash(propValue);
        }
        list.push(`${propName}:${propValue}`);
        break;
      case 'boolean':
        if (propValue) {
          list.push(propName);
        }
        break;

      default:
        // pass
    }
  }
  return list;
}

/**
 * From a stylesheet and a list of props, return necessary classnames.
 *
 * @param {Stylesheet} stylesheet
 * @param {object} props
 * @return {string}
 */
function classNameFromProps(stylesheet, props) {
  const classNamesMap = stylesheet.classNamesMap();
  const propsList = propsToList(props);
  const classNames = [];
  classNames.push(classNamesMap.__root);
  for (const propName of propsList) {
    if (propName in classNamesMap) {
      classNames.push(classNamesMap[propName]);
    }
  }
  return classNames.join(' ');
}

module.exports = classNameFromProps;
