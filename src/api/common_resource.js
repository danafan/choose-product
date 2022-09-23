import http from "./request.js";
let path = {
  ajaxCateList: "setting/ajax_cate_list",                    //类目列表
  ajaxViewShop:'Common/ajaxViewShop',		                     //店铺列表
  ajaxSupplierList:'supplier_manager/ajax_supplier_list',    //供应商列表
  ajaxMarketList:'setting/ajax_market_list',                 //市场列表
  ajaxStyleList:'setting/ajax_shooting_style_list',          //拍摄风格列表
  ajaxClassList:'setting/ajax_class_list',                   //分类列表
  uploadFile:'common/upload',                                //上传图片
  delFile:'common/del_file',                                 //删除图片
  ajaxSupplierGradeList:'supplier_manager/ajax_supplier_grade_list',  //供应商等级列表
  getScreenList:'home/getscreenlist',                       //筛选项列表
  getAllDemandSendType:'home/getalldemandsendtype',         //获取所有需求/发货类型
}
export default {
  //类目列表
  ajaxCateList(params) {
    return http.get(path.ajaxCateList, params);
  },
  //店铺列表
  ajaxViewShop(params) {
    return http.get(path.ajaxViewShop, params);
  },
  //供应商列表
  ajaxSupplierList(params) {
    return http.get(path.ajaxSupplierList, params);
  },
  //市场列表
  ajaxMarketList(params) {
    return http.get(path.ajaxMarketList, params);
  },
  //拍摄风格列表
  ajaxStyleList(params) {
    return http.get(path.ajaxStyleList, params);
  },
  //分类列表
  ajaxClassList(params) {
    return http.get(path.ajaxClassList, params);
  },
  //上传图片
  uploadFile(params) {
    return http.post(path.uploadFile, params);
  },
  //删除图片
  delFile(params) {
    return http.post(path.delFile, params);
  },
  //供应商等级列表
  ajaxSupplierGradeList(params) {
    return http.get(path.ajaxSupplierGradeList, params);
  },
  //筛选项列表
  getScreenList(params) {
    return http.get(path.getScreenList, params);
  },
  //获取所有需求/发货类型
  getAllDemandSendType(params) {
    return http.get(path.getAllDemandSendType, params);
  },
};
