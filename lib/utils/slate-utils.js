"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OBJECT_TYPES = exports.NODE_TYPES = exports.replaceCurrentText = exports.currentWord = exports.selectInRanges = exports.currentText = exports.parentPath = exports.currentPath = exports.currentFocus = exports.currentNode = exports.nodeByPath = void 0;

var _string = require("./string");

var nodeByPath = function nodeByPath(editor, path) {
  return editor.value.document.getNode(path);
};

exports.nodeByPath = nodeByPath;

var currentNode = function currentNode(editor) {
  return nodeByPath(editor, parentPath(currentPath(editor)));
};

exports.currentNode = currentNode;

var currentFocus = function currentFocus(editor) {
  return editor.value.selection.focus;
};

exports.currentFocus = currentFocus;

var currentPath = function currentPath(editor) {
  return editor.value.selection.focus.path;
};

exports.currentPath = currentPath;

var parentPath = function parentPath(path) {
  return path.slice(0, -1);
};

exports.parentPath = parentPath;

var currentText = function currentText(editor) {
  return nodeByPath(editor, currentPath(editor));
};

exports.currentText = currentText;

var selectInRanges = function selectInRanges(editor, start, end) {
  editor.moveAnchorTo(start);
  editor.moveFocusTo(end);
};

exports.selectInRanges = selectInRanges;

var currentWord = function currentWord(editor) {
  var _currentFocus = currentFocus(editor),
      offset = _currentFocus.offset;

  return (0, _string.getCurrentWord)(currentText(editor).text, offset - 1, offset - 1);
};

exports.currentWord = currentWord;

var replaceCurrentText = function replaceCurrentText(editor, textValue) {
  var _currentText = currentText(editor),
      text = _currentText.text;

  selectInRanges(editor, 0, text.length);
  editor.insertText(textValue);
};

exports.replaceCurrentText = replaceCurrentText;
var NODE_TYPES = {
  BLOCK1: 'block1',
  BLOCK2: 'block2'
};
exports.NODE_TYPES = NODE_TYPES;
var OBJECT_TYPES = {
  block: 'block',
  inline: 'inline',
  text: 'text',
  leaf: 'leaf',
  document: 'document',
  value: 'value'
};
exports.OBJECT_TYPES = OBJECT_TYPES;