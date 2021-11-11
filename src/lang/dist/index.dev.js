"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _elementUi = _interopRequireDefault(require("element-ui"));

var _vueI18n = _interopRequireDefault(require("vue-i18n"));

var _en = _interopRequireDefault(require("element-ui/lib/locale/lang/en"));

var _zhCN = _interopRequireDefault(require("element-ui/lib/locale/lang/zh-CN"));

var _en2 = _interopRequireDefault(require("./en"));

var _zh = _interopRequireDefault(require("./zh"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_vue["default"].use(_vueI18n["default"]); // 准备翻译的语言环境信息


var messages = {
  en: _objectSpread({}, _en2["default"], {}, _en["default"]),
  zh: _objectSpread({}, _zh["default"], {}, _zhCN["default"])
}; // 通过选项创建 VueI18n 实例

var _i18n = new _vueI18n["default"]({
  locale: 'en',
  // 设置地区
  messages: messages // 设置地区信息

}); //加载element语言


_vue["default"].use(_elementUi["default"], {
  i18n: function i18n(key, value) {
    return _i18n.t(key, value);
  }
});

var _default = _i18n;
exports["default"] = _default;