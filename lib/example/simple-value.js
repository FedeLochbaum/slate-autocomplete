"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slateUtils = require("../utils/slate-utils");

var _default = {
  object: 'value',
  isVoid: false,
  document: {
    object: 'document',
    nodes: [{
      object: _slateUtils.OBJECT_TYPES.block,
      type: _slateUtils.NODE_TYPES.BLOCK1,
      nodes: [{
        object: 'text',
        leaves: [{
          object: 'leaf',
          text: '',
          marks: []
        }]
      }]
    }]
  }
};
exports.default = _default;