"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var position = function position() {
  if (document.selection) {
    var range = document.selection.createRange();
    return {
      top: range.offsetTop,
      left: range.offsetLeft
    };
  } else if (window.getSelection) {
    var _window$getSelection$ = window.getSelection().getRangeAt(0).getBoundingClientRect(),
        top = _window$getSelection$.top,
        left = _window$getSelection$.left,
        width = _window$getSelection$.width;

    return {
      top: top,
      left: left + width
    };
  } else {
    return {
      top: 0,
      left: 0
    };
  }
};

var _default = position;
exports.default = _default;