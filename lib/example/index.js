"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _slateReact = require("slate-react");

var _recompose = require("recompose");

var _handlers = require("./handlers");

var _slate = require("slate");

var _countriesAutoCompletePlugin = _interopRequireDefault(require("./countries-auto-complete-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_countriesAutoCompletePlugin.default];

var Example = function Example(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      renderNode = _ref.renderNode;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_slateReact.Editor, {
    value: value,
    plugins: plugins,
    onChange: onChange,
    renderNode: renderNode
  }), plugins.filter(function (_ref2) {
    var component = _ref2.component;
    return !!component;
  }).map(function (_ref3, index) {
    var Comp = _ref3.component;
    return _react.default.createElement(Comp, {
      key: index
    });
  }));
};

var _default = (0, _recompose.compose)((0, _recompose.withState)('value', 'setValue', function (_ref4) {
  var object = _ref4.object;
  return _slate.Value.fromJSON(object);
}), (0, _recompose.withHandlers)(_handlers.handlers))(Example);

exports.default = _default;