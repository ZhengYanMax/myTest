"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _request = _interopRequireDefault(require("../utils/request"));

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = {
  getLogin: function getLogin(params) {
    return _request["default"].post(_base["default"].login, params);
  },
  getResult: function getResult(params) {
    return _request["default"].post(_base["default"].result, params);
  },
  getGoodsList: function getGoodsList(params) {
    return _request["default"].get(_base["default"].goodsList, {
      params: params
    });
  },

  /**
   * 搜索接口 search
   */
  getSearch: function getSearch(params) {
    return _request["default"].get(_base["default"].search, {
      params: params
    });
  },
  getCategory: function getCategory(params) {
    return _request["default"].get(_base["default"].Category, {
      params: params
    });
  },
  getDeleteItem: function getDeleteItem(params) {
    return _request["default"].get(_base["default"].deleteItem, {
      params: params
    });
  },
  getAddItem: function getAddItem(params) {
    return _request["default"].get(_base["default"].addItem, {
      params: params
    });
  },
  getEditGoods: function getEditGoods(params) {
    return _request["default"].get(_base["default"].editGoods, {
      params: params
    });
  },

  /**
   * 规格参数列表  page:1
   */
  getParamsList: function getParamsList(params) {
    //params={page:xxx}
    return _request["default"].get(_base["default"].paramsList, {
      params: params
    });
  },

  /**
   * 规格参数搜索 search
   */
  getParamsSearch: function getParamsSearch(params) {
    return _request["default"].get(_base["default"].paramsSearch, {
      params: params
    });
  },
  getAddParams: function getAddParams(params) {
    return _request["default"].get(_base["default"].addParams, {
      params: params
    });
  },

  /**
   * 
   *规格参数列表删除 id 
   */
  deleteParams: function deleteParams(params) {
    return _request["default"].get(_base["default"].deleteParams, {
      params: params
    });
  },

  /**
   * 获取类目--规格参数
   */
  getItemCategory: function getItemCategory(params) {
    return _request["default"].get(_base["default"].getCategory, {
      params: params
    });
  },

  /**
   * 查询规格参数 
   * search
   */
  searchParams: function searchParams(params) {
    return _request["default"].get(_base["default"].searchParams, {
      params: params
    });
  },

  /**
    * 批量删除 idArr=[]
    */
  deleteGoods: function deleteGoods(params) {
    return _request["default"].get(_base["default"].deleteGoods, {
      params: params
    });
  }
};
var _default = api;
exports["default"] = _default;