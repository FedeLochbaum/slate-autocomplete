"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = exports.emptyObjectToArray = exports.isEmptyObject = exports.isEmpty = void 0;

var isEmpty = function isEmpty(array) {
  return !array || array.length === 0;
};

exports.isEmpty = isEmpty;

var isEmptyObject = function isEmptyObject(obj) {
  return !obj || Object.keys(obj).length === 0;
};

exports.isEmptyObject = isEmptyObject;

var emptyObjectToArray = function emptyObjectToArray(obj) {
  return isEmptyObject(obj) ? [] : obj;
};

exports.emptyObjectToArray = emptyObjectToArray;

var toArray = function toArray(o) {
  return Array.isArray(o) ? o : [o];
};

exports.toArray = toArray;