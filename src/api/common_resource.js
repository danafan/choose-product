import http from "./request.js";
let path = {
  ajaxCateList: "setting/ajax_cate_list",     //所有类目列表接口
};
export default {
  //所有类目列表接口
  ajaxCateList(params) {
    return http.get(path.ajaxCateList, params);
  },
};
