"use strict";

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../example/index"));

var _react2 = require("@storybook/react");

var _simpleValue = _interopRequireDefault(require("../example/simple-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)('Slate Autocomplete', module).add('A simple countries autocomplete', function () {
  return _react.default.createElement(_index.default, {
    object: _simpleValue.default
  });
});