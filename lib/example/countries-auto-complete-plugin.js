"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _autoComplete = _interopRequireDefault(require("../auto-complete"));

var _slateUtils = require("../utils/slate-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var suggestions = ["Afganistán", "Albania", "Argentina", "España", "Estonia", "India", "Israel", "Portugal", "Singapur", "Turquía", "Ucrania"];

var _default = (0, _autoComplete.default)({
  suggestions: suggestions,
  resultSize: 5,
  totalText: true,
  shouldHandleNode: function shouldHandleNode(editor, currentNode) {
    return true;
  },
  onEnter: function onEnter(suggestion, editor) {
    (0, _slateUtils.replaceCurrentText)(editor, suggestion);
  }
});

exports.default = _default;