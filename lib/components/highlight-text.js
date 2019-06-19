"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _classnames = _interopRequireDefault(require("classnames"));

var _string = require("../utils/string");

require("./highlight-text.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HighlightText = function HighlightText(_ref) {
  var tokens = _ref.tokens;
  return tokens ? _react.default.createElement("div", null, tokens.map(function (part, i) {
    return _react.default.createElement("span", {
      key: i,
      className: (0, _classnames.default)({
        'matchingToken': part.isMatch
      })
    }, part.token);
  })) : null;
};

var _default = (0, _recompose.compose)((0, _recompose.withProps)(function (_ref2) {
  var text = _ref2.text,
      search = _ref2.search;
  return {
    tokens: text ? (0, _string.splitMatching)(text, search) : undefined
  };
}))(HighlightText);

exports.default = _default;