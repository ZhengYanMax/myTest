"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

require("./plugins/element.js");

require("./assets/css/reset.css");

require("./router/router-permission");

require("./assets/css/iconfont.css");

require("./utils/storage");

var _index = _interopRequireDefault(require("./lang/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Vue.use(Element)
_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  i18n: _index["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');