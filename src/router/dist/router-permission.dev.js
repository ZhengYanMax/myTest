"use strict";

var _index = _interopRequireDefault(require("./index"));

var _index2 = _interopRequireDefault(require("../store/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_index["default"].beforeEach(function (to, from, next) {
  // console.log('to', to);
  // console.log('from', from);
  if (to.matched.some(function (item) {
    return item.meta.isLogin;
  })) {
    var token = _index2["default"].state.loginModule.userinfo.token; // console.log('仓库的token数据',token);

    if (token) {
      next();
    } else {
      next('/login');
    }
  } else {
    console.log('不需要登录');
    next();
  }
});