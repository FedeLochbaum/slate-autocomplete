"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlers = void 0;

var _react = _interopRequireDefault(require("react"));

var _Block = _interopRequireDefault(require("../components/Block/Block"));

var _slateUtils = require("../utils/slate-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handlers = {
  onChange: function onChange(_ref) {
    var setValue = _ref.setValue,
        _onChange = _ref.onChange;
    return function (_ref2) {
      var value = _ref2.value;
      setValue(value);

      if (_onChange) {
        _onChange(value);
      }
    };
  },
  renderNode: function renderNode() {
    return function (props, editor, next) {
      var type = props.node.type;
      var Component = componentsByNodeType[type];
      return Component ? _react.default.createElement(Component, props) : next();
    };
  }
};
exports.handlers = handlers;

var componentsByNodeType = _defineProperty({}, _slateUtils.NODE_TYPES.BLOCK1, _Block.default);