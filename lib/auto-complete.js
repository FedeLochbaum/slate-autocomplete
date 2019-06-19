"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _suggestionPortal = _interopRequireDefault(require("./components/suggestion-portal"));

var _slateUtils = require("./utils/slate-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var matchTrigger = function matchTrigger(editor, shouldHandleNode) {
  return (0, _slateUtils.currentPath)(editor) && shouldHandleNode(editor, (0, _slateUtils.currentNode)(editor));
};

var autocompletePluginCreator = function autocompletePluginCreator(opts) {
  var shouldHandleNode = opts.shouldHandleNode,
      onEnter = opts.onEnter,
      renderPortal = opts.renderPortal,
      resultSize = opts.resultSize,
      totalText = opts.totalText;
  var callback = {
    onEnter: onEnter,
    resultSize: resultSize
  };

  var shouldNodeComponentUpdate = function shouldNodeComponentUpdate(previousProps, props, editor, next) {
    if (matchTrigger(editor, shouldHandleNode)) {
      callback.updateFilteredSuggestion(editor);
    }

    return next();
  };

  var onChange = function onChange(editor, next) {
    callback.editor = editor;
    next();
  };

  var onKeyDown = function onKeyDown(event, editor, next) {
    var closePortal = callback.closePortal,
        isOpen = callback.isOpen;

    if (matchTrigger(editor, shouldHandleNode)) {
      return callback.onKeyDown(event, editor, next);
    } else if (isOpen()) {
      closePortal();
    }

    return next();
  };

  return {
    onChange: onChange,
    shouldNodeComponentUpdate: shouldNodeComponentUpdate,
    onKeyDown: onKeyDown,
    component: function component(props) {
      return renderPortal ? renderPortal(_suggestionPortal.default, _objectSpread({}, props, opts, {
        callback: callback
      })) : _react.default.createElement(_suggestionPortal.default, _extends({}, props, opts, {
        callback: callback
      }));
    }
  };
};

var _default = autocompletePluginCreator;
exports.default = _default;