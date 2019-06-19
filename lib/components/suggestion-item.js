"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _highlightText = _interopRequireDefault(require("./highlight-text"));

require("./suggestion-item.css");

var _slateUtils = require("../utils/slate-utils");

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

var SuggestionItem =
/*#__PURE__*/
function (_Component) {
  _inherits(SuggestionItem, _Component);

  function SuggestionItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SuggestionItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SuggestionItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function (event) {
      var _this$props = _this.props,
          suggestion = _this$props.suggestion,
          _this$props$callback = _this$props.callback,
          closePortal = _this$props$callback.closePortal,
          onEnter = _this$props$callback.onEnter,
          editor = _this$props$callback.editor;
      event.preventDefault();
      event.stopPropagation();

      if (editor) {
        closePortal();
        onEnter(suggestion, editor);
        editor.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function () {
      return _this.props.setSelectedIndex(_this.props.index);
    });

    _defineProperty(_assertThisInitialized(_this), "currentText", function () {
      var _this$props2 = _this.props,
          editor = _this$props2.callback.editor,
          totalText = _this$props2.totalText;
      return editor && (0, _slateUtils.currentPath)(editor) ? totalText ? (0, _slateUtils.currentText)(editor).text : (0, _slateUtils.currentWord)(editor) : '';
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _this$props3 = _this.props,
          index = _this$props3.index,
          selectedIndex = _this$props3.selectedIndex,
          suggestion = _this$props3.suggestion;
      return _react.default.createElement("li", {
        className: index === selectedIndex ? 'selected' : undefined,
        onClick: _this.onClick,
        onMouseEnter: _this.onMouseEnter
      }, _react.default.createElement(_highlightText.default, {
        text: suggestion,
        search: _this.currentText()
      }));
    });

    return _this;
  }

  return SuggestionItem;
}(_react.Component);

var _default = SuggestionItem;
exports.default = _default;