import axios from '../utils/request'
import base from './base'



const api = {
  getLogin(params) {
    return axios.post(base.login, params)
  },
  getResult(params) {
    return axios.post(base.result,
      params)
  },
  getGoodsList(params) {
    return axios.get(base.goodsList, {
      params
    })
  },
  /**
   * 搜索接口 search
   */
  getSearch(params) {
    return axios.get(base.search, {
      params
    })
  },
  getCategory(params) {
    return axios.get(base.Category, {
      params
    })
  },
  getDeleteItem(params) {
    return axios.get(base.deleteItem, {
      params
    })
  },
  getAddItem(params) {
    return axios.get(base.addItem, {
      params
    })
  },
  getEditGoods(params) {
    return axios.get(base.editGoods, {
      params
    })
  },
  /**
   * 规格参数列表  page:1
   */
  getParamsList(params) { //params={page:xxx}
    return axios.get(base.paramsList, {
      params
    })
  },
  /**
   * 规格参数搜索 search
   */
  getParamsSearch(params) {
    return axios.get(base.paramsSearch, {
      params
    })
  },
  getAddParams(params) {
    return axios.get(base.addParams, {
      params
    })
  },

  /**
   * 
   *规格参数列表删除 id 
   */
  deleteParams(params) {
    return axios.get(base.deleteParams, {
      params
    })
  },
  /**
   * 获取类目--规格参数
   */
  getItemCategory(params) {
    return axios.get(base.getCategory, {
      params
    })
  },
  /**
   * 查询规格参数 
   * search
   */
  searchParams(params) {
    return axios.get(base.searchParams, {
      params
    })
  },

    /**
      * 批量删除 idArr=[]
      */
     deleteGoods(params){
      return axios.get(base.deleteGoods,{params})
    },

}
export default api