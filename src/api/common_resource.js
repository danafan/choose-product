import http from "./request.js";
let path = {
  ajaxCateList: "api/setting/ajax_cate_list",                    //类目列表
  ajaxViewShop:'api/Common/ajaxViewShop',		                     //店铺列表
  ajaxSupplierList:'api/supplier_manager/ajax_supplier_list',    //供应商列表
  ajaxMarketList:'api/setting/ajax_market_list',                 //市场列表
  ajaxStyleList:'api/setting/ajax_shooting_style_list',          //拍摄风格列表
  ajaxClassList:'api/setting/ajax_class_list',                   //分类列表
  dingUpload:'api/supplier_manager/ding_upload',                 //上传表格
  dingDel:'api/supplier_manager/ding_del',                       //删除表格
  uploadFile:'api/common/upload',                                //上传图片
  delFile:'api/common/del_file',                                 //删除图片
  ajaxSupplierGradeList:'api/supplier_manager/ajax_supplier_grade_list',  //供应商等级列表
  getScreenList:'api/home/getscreenlist',                       //筛选项列表
  supplierScreenList:'supplier/supplier/getscreenlist',         //供应商筛选项列表
  getAllDemandSendType:'api/home/getalldemandsendtype',         //获取所有需求/发货类型
  getUserList:'api/selected/getuserlist',                       //获取所有用户列表
  getDeptList:'api/selected/getdeptlist',                       //获取部门列表
  ajaxSupplierMaintainer:'api/supplier_manager/ajax_supplier_maintainer', //供应商维护人
  ajaxRoleList:'api/user/ajaxrolelist',                             //获取角色列表
  getHtmlGoods:'api/productstyle/gethtmlgoods',           //创建商品资料获取信息
  ajaxSeasonList:'api/setting/ajax_season_list',          //获取季节列表

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
  //上传表格
  dingUpload(params) {
    return http.post(path.dingUpload, params);
  },
  //删除表格
  dingDel(params) {
    return http.post(path.dingDel, params);
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
  //供应商筛选项列表
  supplierScreenList(params) {
    return http.get(path.supplierScreenList, params);
  },
  //获取所有需求/发货类型
  getAllDemandSendType(params) {
    return http.get(path.getAllDemandSendType, params);
  },
  //获取所有用户列表
  getUserList(params) {
    return http.get(path.getUserList, params);
  },
  //获取部门列表
  getDeptList(params) {
    return http.get(path.getDeptList, params);
  },
  //供应商维护人
  ajaxSupplierMaintainer(params) {
    return http.get(path.ajaxSupplierMaintainer, params);
  },
  //获取角色列表
  ajaxRoleList(params) {
    return http.get(path.ajaxRoleList, params);
  },
   //创建商品资料获取信息
  getHtmlGoods(params) {
    return http.post(path.getHtmlGoods, params);
  },
  //获取季节列表
  ajaxSeasonList(params) {
    return http.get(path.ajaxSeasonList, params);
  },
};
