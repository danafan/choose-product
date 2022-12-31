import http from "./request.js";
let path = {
  getSupplierIndex: "supplier/supplier/getsupplierindex",      //供应商后台首页
  supplierIndex:'supplier/supplier/supplier_index',            //供应商列表
  supplierInfo:'supplier/supplier/info',                       //供应商基本信息
  getSupplierGoods:'supplier/supplier/getsuppliergoods',       //款式资料列表
  checkStatus:'supplier/supplier/upanddown',                   //上下架
  addAllProductStyle:'supplier/supplier/addallproductstyle',   //导入
  addProductStyle:'supplier/supplier/addproductstyle',         //单条添加
  getOnepro:'supplier/supplier/getonepro',                      //查看
  editProductStyle:'supplier/supplier/editproductstyle',        //编辑
  returnEditGoods:'supplier/supplier/returneditgoods',          //重新提交
  styleImageList:'supplier/supplier/styleimagelist',            //获取风格图列表
  addStyleImg:'supplier/supplier/addstyleimg',                  //上传风格图
  editStyleImg:'supplier/supplier/editstyleimg',                //修改风格图
  delStyleImg:'supplier/supplier/delstyleimg',                  //删除风格图
  uploadImgList:'supplier/supplier/uploadimglist',              //规格图列表
  editUploadImg:'supplier/supplier/edituploadimg',              //编辑规格图
  addUploadImg:'supplier/supplier/adduploadimg',                //添加规格图
  delUploadImg:'supplier/supplier/deluploadimg',                //删除规格图
  changeMainImg:'supplier/supplier/styleimgchangemain',              //设为主图
  editPwd:'supplier/supplier/edit_pwd',                         //修改密码
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
  //导入
  addAllProductStyle(params) {
    return http.post(path.addAllProductStyle, params);
  },
  //单条添加
  addProductStyle(params) {
    return http.post(path.addProductStyle, params);
  },
  //查看
  getOnepro(params) {
    return http.get(path.getOnepro, params);
  },
  //编辑详情
  editProductStyleGet(params) {
    return http.get(path.editProductStyle, params);
  },
  //编辑
  editProductStylePost(params) {
    return http.post(path.editProductStyle, params);
  },
  //重新提交详情
  returnEditGoodsGet(params) {
    return http.get(path.returnEditGoods, params);
  },
  //重新提交
  returnEditGoodsPost(params) {
    return http.post(path.returnEditGoods, params);
  },
  //获取风格图列表
  styleImageList(params) {
    return http.get(path.styleImageList, params);
  },
  //上传风格图
  addStyleImg(params) {
    return http.post(path.addStyleImg, params);
  },
  //修改风格图获取详情
  editStyleImgGet(params) {
    return http.get(path.editStyleImg, params);
  },
  //修改风格图
  editStyleImgPost(params) {
    return http.post(path.editStyleImg, params);
  },
  //删除风格图
  delStyleImg(params) {
    return http.get(path.delStyleImg, params);
  },
  //规格图列表
  uploadImgList(params) {
    return http.get(path.uploadImgList, params);
  },
  //编辑规格图详情
  editUploadImgGet(params) {
    return http.get(path.editUploadImg, params);
  },
  //编辑规格图
  editUploadImgPost(params) {
    return http.post(path.editUploadImg, params);
  },
  //添加规格图
  addUploadImg(params) {
    return http.post(path.addUploadImg, params);
  },
  //删除规格图
  delUploadImg(params) {
    return http.get(path.delUploadImg, params);
  },
  //设为主图
  changeMainImg(params) {
    return http.post(path.changeMainImg, params);
  },
  //修改密码
  editPwd(params) {
    return http.post(path.editPwd, params);
  },
 
};
