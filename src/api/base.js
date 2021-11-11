const base = {
    host: "http://localhost:8888",
    login: '/api/login',
    result: '/api/register',
    goodsList:'/api/projectList',
    search:'/api/search',
    Category :'/api/backend/itemCategory/selectItemCategoryByParentId',
    addItem:'/api/backend/item/insertTbItem',
    deleteItem:'/api/backend/item/deleteItemById',
    upload:'/api/upload',
    editGoods:'/api/backend/item/updateTbItem',
    paramsList:"/api/backend/itemParam/selectItemParamAll",
    paramsSearch:'/api/params/search',
    addParams:"/api/backend/itemParam/insertItemParam",
    getCategory:"/api/category/data",//选择类目--获取规格参数配置信息 cid
    deleteParams:"/api/params/delete",//规格参数-删除
    searchParams:"/api/params/search",
    deleteGoods:"/api/batchDelete",
  }

  export default base;