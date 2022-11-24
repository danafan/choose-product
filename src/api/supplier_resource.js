import http from "./request.js";
let path = {
  getSupplierIndex: "supplier/supplier/getsupplierindex",      //供应商后台首页
  supplierIndex:'supplier/supplier/supplier_index',            //供应商列表
  supplierInfo:'supplier/supplier/info',                       //供应商基本信息
  getSupplierGoods:'supplier/supplier/getsuppliergoods',       //款式资料列表
  checkStatus:'supplier/supplier/upanddown',                   //上下架
} 
export default {
  //供应商后台首页
  getSupplierIndex(params) {
    return http.get(path.getSupplierIndex, params);
  },
  //供应商列表
  supplierIndex(params) {
    return http.get(path.supplierIndex, params);
  },
  //供应商基本信息
  supplierInfo(params) {
    return http.get(path.supplierInfo, params);
  },
  //款式资料列表
  getSupplierGoods(params) {
    return http.get(path.getSupplierGoods, params);
  },
  //上下架
  checkStatus(params) {
    return http.post(path.checkStatus, params);
  },
 
};
