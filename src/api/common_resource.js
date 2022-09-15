import http from "./request.js";
let path = {
  ajaxCateList: "setting/ajax_cate_list",     //所有类目列表接口
  ajaxViewShop:'Common/ajaxViewShop',		  //获取所有店铺列表
};
export default {
  //所有类目列表接口
  ajaxCateList(params) {
    return http.get(path.ajaxCateList, params);
  },
  //获取所有店铺列表
  ajaxViewShop(params) {
    return http.get(path.ajaxViewShop, params);
  },
};
