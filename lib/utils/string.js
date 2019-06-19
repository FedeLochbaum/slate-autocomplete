"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentWord = exports.equalsIgnoreCase = exports.splitMatching = exports.containsIgnoreCase = exports.NEW_LINE = exports.dotSplitTail = exports.dotSplit = void 0;

var _ramda = require("ramda");

var _object = require("./object");

var _escapeStringRegexp = _interopRequireDefault(require("escape-string-regexp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dotSplit = (0, _ramda.pipe)((0, _ramda.when)((0, _ramda.test)(/\./), (0, _ramda.split)('.')), _object.toArray);
exports.dotSplit = dotSplit;

var dotSplitTail = function dotSplitTail(str) {
  var idx = str.lastIndexOf('.');
  return str.lastIndexOf('.') > -1 ? str.substring(idx + 1) : str;
};

exports.dotSplitTail = dotSplitTail;
var NEW_LINE = '\n';
exports.NEW_LINE = NEW_LINE;

var containsIgnoreCase = function containsIgnoreCase(string, token) {
  return !!string && string.toLowerCase().indexOf(token.toLowerCase()) >= 0;
};

exports.containsIgnoreCase = containsIgnoreCase;

var splitMatching = function splitMatching(text, searchText) {
  return text.split(new RegExp("(".concat((0, _escapeStringRegexp.default)(searchText), ")"), 'ig')).filter(function (part) {
    return part !== '';
  }).map(function (part) {
    return {
      token: part,
      isMatch: equalsIgnoreCase(part, searchText)
    };
  });
};

exports.splitMatching = splitMatching;

var equalsIgnoreCase = function equalsIgnoreCase(a, b) {
  return a.toUpperCase() === b.toUpperCase();
};

exports.equalsIgnoreCase = equalsIgnoreCase;

var getCurrentWord = function getCurrentWord(text, index, initialIndex) {
  if (text[index] === " " || text[index] === undefined) return "";

  if (index < initialIndex) {
    return getCurrentWord(text, index - 1, initialIndex) + text[index];
  }

  if (index > initialIndex) {
    return text[index] + getCurrentWord(text, index + 1, initialIndex);
  }

  return getCurrentWord(text, index - 1, initialIndex) + text[index] + getCurrentWord(text, index + 1, initialIndex);
};

exports.getCurrentWord = getCurrentWord;