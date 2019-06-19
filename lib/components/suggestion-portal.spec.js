"use strict";

var _react = _interopRequireDefault(require("react"));

var _suggestionPortal = _interopRequireDefault(require("./suggestion-portal"));

var _enzyme = require("enzyme");

var _slate = require("slate");

var _slateUtils = require("../utils/slate-utils");

var _constants = require("../utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var simpleValueWithText = function simpleValueWithText(text) {
  return {
    object: _slateUtils.OBJECT_TYPES.value,
    isVoid: false,
    document: {
      object: _slateUtils.OBJECT_TYPES.document,
      nodes: [{
        object: _slateUtils.OBJECT_TYPES.block,
        type: _slateUtils.NODE_TYPES.BLOCK1,
        nodes: [{
          object: _slateUtils.OBJECT_TYPES.text,
          leaves: [{
            object: _slateUtils.OBJECT_TYPES.leaf,
            text: text,
            marks: []
          }]
        }]
      }]
    }
  };
};

var editorWithValue = function editorWithValue(value) {
  return new _slate.Editor({
    onChange: jest.fn(),
    readOnly: false,
    value: _slate.Value.fromJSON(value)
  });
};

describe('SuggestionPortal', function () {
  var onEnter = function onEnter(suggestion, editor) {
    (0, _slateUtils.replaceCurrentText)(editor, suggestion);
  };

  var state = _slate.Value.fromJSON({});

  var editor = editorWithValue(simpleValueWithText(''));
  var callback = {
    onEnter: onEnter,
    editor: editor
  };
  var totalText = true;
  var suggestions = ['one', 'two', 'three'];

  var shouldHandleNode = function shouldHandleNode() {
    return true;
  };

  var props = {
    callback: callback,
    totalText: totalText,
    suggestions: suggestions,
    shouldHandleNode: shouldHandleNode,
    state: state
  };
  var wrapped = (0, _enzyme.mount)(_react.default.createElement(_suggestionPortal.default, props));
  describe('#setCallbackSuggestion', function () {
    var instance = wrapped.instance();
    instance.setCallbackSuggestion(1);
    it('should update the current suggestion', function () {
      var suggestion = instance.props.callback.suggestion;
      expect(suggestion).toEqual('two');
    });
  });
  describe('#getFilteredSuggestions', function () {
    var instance = wrapped.instance();
    var nEditor = editorWithValue(simpleValueWithText('tw'));
    it('should return an array of new suggestions', function () {
      expect(instance.getFilteredSuggestions(nEditor)).toEqual(['two']);
    });
  });
  describe('#nextDownIndex', function () {
    describe('when the current index is first one', function () {
      var instance = wrapped.instance();
      it('should update the index to next one', function () {
        instance.setState({
          selectedIndex: 0
        });
        expect(instance.nextDownIndex()).toEqual(1);
      });
    });
    describe('when the current index is last one', function () {
      var instance = wrapped.instance();
      it('should update the index to first one', function () {
        instance.setState({
          selectedIndex: suggestions.length - 1
        });
        expect(instance.nextDownIndex()).toEqual(0);
      });
    });
  });
  describe('#nextUpIndex', function () {
    describe('when the current index is last one', function () {
      var instance = wrapped.instance();
      it('should update the index to next one', function () {
        instance.setState({
          selectedIndex: suggestions.length - 1
        });
        var selectedIndex = instance.state.selectedIndex;
        expect(instance.nextUpIndex()).toEqual(selectedIndex - 1);
      });
    });
    describe('when the current index is first one', function () {
      var instance = wrapped.instance();
      it('should update the index to first one', function () {
        instance.setState({
          selectedIndex: 0
        });
        expect(instance.nextUpIndex()).toEqual(suggestions.length - 1);
      });
    });
  });
  describe('#matchTrigger', function () {
    describe('when have the current node matches', function () {
      var instance = wrapped.instance();
      it('should return true', function () {
        expect(instance.matchTrigger()).toEqual(true);
      });
    });
    describe('when the current node does not matches', function () {
      it('should return false', function () {
        var newEditor = editorWithValue(_slate.Value.fromJSON({}));
        var newWrapped = (0, _enzyme.mount)(_react.default.createElement(_suggestionPortal.default, _extends({}, props, {
          callback: _objectSpread({}, props.callback, {
            editor: newEditor
          })
        })));
        var instance = newWrapped.instance();
        expect(instance.matchTrigger()).toEqual(false);
      });
    });
  });
  describe('#onKeyDown', function () {
    var event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };
    var next = jest.fn();
    var instance = wrapped.instance();
    var nEditor = editorWithValue('tw');
    describe('when press UP key', function () {
      it('should update the selectedIndex', function () {
        instance.setState({
          filteredSuggestions: suggestions,
          selectedIndex: 1
        });
        instance.onKeyDown(_objectSpread({}, event, {
          keyCode: _constants.Key.UP
        }), nEditor, next);
        expect(instance.state.selectedIndex).toEqual(0);
      });
    });
    describe('when press DOWN key', function () {
      it('should update the selectedIndex', function () {
        instance.setState({
          filteredSuggestions: suggestions,
          selectedIndex: 0
        });
        instance.onKeyDown(_objectSpread({}, event, {
          keyCode: _constants.Key.DOWN
        }), nEditor, next);
        expect(instance.state.selectedIndex).toEqual(1);
      });
    });
    describe('when press ENTER key', function () {
      it('should update the current actor name with suggestion', function () {
        instance.setState({
          filteredSuggestions: suggestions,
          selectedIndex: 0
        });
        var _instance$props$callb = instance.props.callback,
            suggestion = _instance$props$callb.suggestion,
            editor2 = _instance$props$callb.editor;
        instance.onKeyDown(_objectSpread({}, event, {
          keyCode: _constants.Key.ENTER
        }), editor2, next);
        expect((0, _slateUtils.currentText)(editor2).text).toEqual(suggestion);
      });
    });
    describe('when press TAB key', function () {
      it('should update the current actor name with suggestion', function () {
        instance.setState({
          filteredSuggestions: suggestions,
          selectedIndex: 0
        });
        var _instance$props$callb2 = instance.props.callback,
            suggestion = _instance$props$callb2.suggestion,
            editor2 = _instance$props$callb2.editor;
        instance.onKeyDown(_objectSpread({}, event, {
          keyCode: _constants.Key.TAB
        }), editor2, next);
        expect((0, _slateUtils.currentText)(editor2).text).toEqual(suggestion);
      });
    });
  });
});