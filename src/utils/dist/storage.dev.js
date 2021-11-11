"use strict";

var _index = _interopRequireDefault(require("../store/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userinfo = localStorage.getItem('userinfo');

if (userinfo) {
  userinfo = JSON.parse(userinfo);

  _index["default"].commit('loginModule/setUser', userinfo);
}