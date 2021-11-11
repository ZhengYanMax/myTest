"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _index = _interopRequireDefault(require("../store/index"));

var _Layout = _interopRequireDefault(require("../views/Layout"));

var _Login = _interopRequireDefault(require("../views/Login"));

var _Goods = _interopRequireDefault(require("../views/Goods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Center = function Center() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/Center'));
  });
};

var Advert = function Advert() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/Advert'));
  });
};

var Params = function Params() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../views/Params'));
  });
};

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '',
  name: 'Layout',
  component: _Layout["default"],
  meta: {
    isLogin: true
  },
  children: [{
    path: '/',
    name: 'Goods',
    component: _Goods["default"]
  }, {
    path: '/center',
    name: 'Center',
    component: Center
  }, {
    path: '/advert',
    name: 'Advert',
    component: Advert
  }, {
    path: '/params',
    name: 'Params',
    component: Params
  }]
}, {
  path: '/login',
  name: 'Login',
  component: _Login["default"]
}];
var router = new _vueRouter["default"]({
  routes: routes
});
var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location, onResolve, onReject) {
  undefined;
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
};

var _default = router;
exports["default"] = _default;