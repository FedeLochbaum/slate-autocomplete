"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _object = require("../utils/object.js");

var _reactPortal = require("react-portal");

var _constants = require("../utils/constants");

var _caretPosition = _interopRequireDefault(require("../utils/caret-position"));

var _suggestionItem = _interopRequireDefault(require("./suggestion-item"));

require("./suggestion-portal.css");

var _slateUtils = require("../utils/slate-utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VISIBLE = 'visible';
var HIDDEN = 'hidden';

var isSelectKey = function isSelectKey(keyCode) {
  return keyCode === _constants.Key.ENTER || keyCode === _constants.Key.TAB;
};

var SuggestionPortal =
/*#__PURE__*/
function (_Component) {
  _inherits(SuggestionPortal, _Component);

  function SuggestionPortal(props) {
    var _this;

    _classCallCheck(this, SuggestionPortal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SuggestionPortal).call(this));

    _defineProperty(_assertThisInitialized(_this), "contentRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "state", {
      filteredSuggestions: []
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.adjustPosition();
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      _this.adjustPosition();
    });

    _defineProperty(_assertThisInitialized(_this), "setCallbackSuggestion", function (newIndex) {
      var callback = _this.props.callback;
      var filteredSuggestions = _this.state.filteredSuggestions;
      callback.suggestion = filteredSuggestions.length ? filteredSuggestions[newIndex] : undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "setFilteredSuggestions", function (filteredSuggestions) {
      _this.setState({
        filteredSuggestions: filteredSuggestions
      });

      _this.setCallbackSuggestion(_this.state.selectedIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "nextDownIndex", function () {
      var _this$state = _this.state,
          filteredSuggestions = _this$state.filteredSuggestions,
          selectedIndex = _this$state.selectedIndex;
      return selectedIndex + 1 === filteredSuggestions.length ? 0 : selectedIndex + 1;
    });

    _defineProperty(_assertThisInitialized(_this), "nextUpIndex", function () {
      var _this$state2 = _this.state,
          filteredSuggestions = _this$state2.filteredSuggestions,
          selectedIndex = _this$state2.selectedIndex;
      return (selectedIndex === 0 ? filteredSuggestions.length : selectedIndex) - 1;
    });

    _defineProperty(_assertThisInitialized(_this), "updateSelection", function (newIndex) {
      _this.setState({
        selectedIndex: newIndex
      });

      _this.setCallbackSuggestion(newIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "updateFilteredSuggestion", function (editor) {
      _this.setState({
        selectedIndex: 0
      });

      _this.setFilteredSuggestions(_this.getFilteredSuggestions(editor));
    });

    _defineProperty(_assertThisInitialized(_this), "onEnter", function (onEnter, next, suggestion, editor) {
      if (suggestion) {
        onEnter(suggestion, editor);
      } else {
        next();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event, editor, next) {
      var keyCode = event.keyCode;
      var _this$props$callback = _this.props.callback,
          suggestion = _this$props$callback.suggestion,
          onEnter = _this$props$callback.onEnter;
      var filteredSuggestions = _this.state.filteredSuggestions;

      if (_this.isOpen() && !(0, _object.isEmpty)(filteredSuggestions)) {
        if (keyCode === _constants.Key.DOWN) {
          event.preventDefault();

          _this.updateSelection(_this.nextDownIndex());
        } else if (keyCode === _constants.Key.UP) {
          event.preventDefault();

          _this.updateSelection(_this.nextUpIndex());
        } else if (isSelectKey(keyCode)) {
          event.preventDefault();

          _this.closePortal();

          return _this.onEnter(onEnter, next, suggestion, editor);
        }
      }

      _this.closePortal();

      return next();
    });

    _defineProperty(_assertThisInitialized(_this), "getFilteredSuggestions", function (editor) {
      var _this$props = _this.props,
          resultSize = _this$props.callback.resultSize,
          suggestions = _this$props.suggestions,
          filterSuggestions = _this$props.filterSuggestions,
          totalText = _this$props.totalText;
      var lowerCaseWord = (totalText ? (0, _slateUtils.currentText)(editor).text : (0, _slateUtils.currentWord)(editor)).toLowerCase();
      var currentSuggestions = suggestions.filter(function (suggestion) {
        return suggestion.toLowerCase().indexOf(lowerCaseWord) !== -1 && suggestion.toLowerCase() !== lowerCaseWord;
      });
      return (filterSuggestions ? filterSuggestions(currentSuggestions) : currentSuggestions).slice(0, resultSize);
    });

    _defineProperty(_assertThisInitialized(_this), "matchTrigger", function () {
      var _this$props2 = _this.props,
          editor = _this$props2.callback.editor,
          shouldHandleNode = _this$props2.shouldHandleNode;
      return !(0, _object.isEmptyObject)(editor) && !(0, _object.isEmptyObject)((0, _slateUtils.currentPath)(editor)) && shouldHandleNode(editor, (0, _slateUtils.currentNode)(editor));
    });

    _defineProperty(_assertThisInitialized(_this), "isOpen", function () {
      return _this.contentRef.current.style.visibility === VISIBLE;
    });

    _defineProperty(_assertThisInitialized(_this), "adjustPosition", function () {
      var menu = _this.contentRef.current;

      if (_this.matchTrigger()) {
        var pos = (0, _caretPosition.default)();
        var _window = window,
            scrollX = _window.scrollX,
            scrollY = _window.scrollY;

        _this.openPortal();

        menu.style.opacity = 1;
        menu.style.top = "".concat(pos.top + scrollY, "px");
        menu.style.left = "".concat(pos.left + scrollX, "px");
      } else {
        _this.closePortal();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "openPortal", function () {
      var menu = _this.contentRef.current;
      menu.style.visibility = VISIBLE;
    });

    _defineProperty(_assertThisInitialized(_this), "closePortal", function () {
      var menu = _this.contentRef.current;
      menu.style.visibility = HIDDEN;
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _this$state3 = _this.state,
          filteredSuggestions = _this$state3.filteredSuggestions,
          selectedIndex = _this$state3.selectedIndex;
      return _react.default.createElement(_reactPortal.Portal, {
        isOpened: true
      }, _react.default.createElement("div", {
        ref: _this.contentRef,
        className: 'suggestionPortal'
      }, _react.default.createElement("ul", null, filteredSuggestions.map(function (suggestion, index) {
        return _react.default.createElement(_suggestionItem.default, {
          key: suggestion,
          totalText: _this.props.totalText,
          index: index,
          suggestion: suggestion,
          selectedIndex: selectedIndex,
          setSelectedIndex: _this.updateSelection,
          callback: _this.props.callback
        });
      }))));
    });

    var _callback = props.callback,
        _suggestions = props.suggestions,
        _filterSuggestions = props.filterSuggestions;
    _callback.onKeyDown = _this.onKeyDown;
    _callback.isOpen = _this.isOpen;
    _callback.closePortal = _this.closePortal;
    _callback.updateFilteredSuggestion = _this.updateFilteredSuggestion;
    _this.state = {
      selectedIndex: 0,
      filteredSuggestions: (_filterSuggestions ? _filterSuggestions(_suggestions) : _suggestions).slice(0, _callback.resultSize)
    };
    _callback.suggestion = _this.state.filteredSuggestions[_this.state.selectedIndex];
    return _this;
  }

  return SuggestionPortal;
}(_react.Component);

var _default = SuggestionPortal;
exports.default = _default;