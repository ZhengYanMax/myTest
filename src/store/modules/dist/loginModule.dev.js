"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  namespaced: true,
  state: {
    userinfo: {
      token: '',
      user: ''
    }
  },
  mutations: {
    setUser: function setUser(state, payload) {
      state.userinfo = payload;
    },
    deleteUser: function deleteUser(state) {
      state.userinfo = {
        token: '',
        user: ''
      };
    }
  }
};
exports["default"] = _default;