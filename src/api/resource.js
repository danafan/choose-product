import http from "./request.js";
let path = {
  loginOut:'loginquit',                               //退出登录
  getAppKey:'scancodes/getappkey',                    //获取appkey
  getUserInfo:'scancodes/getuserinfo',                //获取用户信息
  getMenuNotice:'access/mymenu',                      //获取导航列表和公告
  noticeInfo:'notice/info',                           //公告详情
  getGoodsList: "home/getgoodslist",                  //首页商品列表
  moreImgStyle:'home/moreimgstyle',                   //获取更多风格图
  moreImgCommodity:'home/moreimgcommodity',           //获取封面图
  chooseBeforGetImg:'home/choosebeforgetimg',         //选款前获取轮播图
  chooseGoods:'home/choosegoods',                     //选款
  confirmFeekBack:'feedback/add',                     //提交反馈
  getGoodsInfo:'selectcart/selectedinfo',             //获取商品详情
  addSelectCart:'home/addselectcart',                 //加入购物车
  getCarList:'selectcart/getwaitselect',              //获取购物车列表
  removeCarGoods:'selectcart/removewaitselect',       //删除购物车
  addSelected:'selectcart/addselected',
  getSelected:'selected/getselected',                 //获取已选列表
  selectedInfo:'selected/selectedinfo',               //已选详情
  undoSelected:'selected/revocationselected',         //撤销已选
  cancelSelected:'selected/cancelselected',           //取消已选
  supplierList:'supplier/index',                      //获取供应商列表
  supplierInfo:'supplier/info',                       //供应商基本信息
  supplierGoods:'supplier/goods',                     //供应商商品列表
} 
export default {
  //退出登录
  loginOut(params) {
    return http.get(path.loginOut, params);
  },
  //获取appkey
  getAppKey(params) {
    return http.get(path.getAppKey, params);
  },
  //获取用户信息
  getUserInfo(params) {
    return http.post(path.getUserInfo, params);
  },
  //获取导航列表和公告
  getMenuNotice(params) {
    return http.get(path.getMenuNotice, params);
  },
  //公告详情
  noticeInfo(params) {
    return http.get(path.noticeInfo, params);
  },
  //首页商品列表
  getGoodsList(params) {
    return http.get(path.getGoodsList, params);
  },
  //获取更多风格图
  moreImgStyle(params) {
    return http.post(path.moreImgStyle, params);
  },
  //获取封面图
  moreImgCommodity(params) {
    return http.post(path.moreImgCommodity, params);
  },
  //选款前获取轮播图
  chooseBeforGetImg(params) {
    return http.get(path.chooseBeforGetImg, params);
  },
  //选款
  chooseGoods(params) {
    return http.post(path.chooseGoods, params);
  },
  //提交反馈
  confirmFeekBack(params) {
    return http.post(path.confirmFeekBack, params);
  },
  //获取商品详情
  getGoodsInfo(params) {
    return http.get(path.getGoodsInfo, params);
  },
  //加入购物车
  addSelectCart(params) {
    return http.post(path.addSelectCart, params);
  },
  //购物车列表
  getCarList(params) {
    return http.get(path.getCarList, params);
  },
  //删除购物车
  removeCarGoods(params) {
    return http.post(path.removeCarGoods, params);
  },
  //购物车批量选中
  addSelected(params) {
    return http.post(path.addSelected, params);
  },
  //获取已选列表
  getSelected(params) {
    return http.get(path.getSelected, params);
  },
  //已选详情
  selectedInfo(params) {
    return http.get(path.selectedInfo, params);
  },
  //撤销已选
  undoSelected(params) {
    return http.post(path.undoSelected, params);
  },
  //取消已选
  cancelSelected(params) {
    return http.post(path.cancelSelected, params);
  },
  //获取供应商列表
  supplierList(params) {
    return http.get(path.supplierList, params);
  },
  //供应商基本信息
  supplierInfo(params) {
    return http.get(path.supplierInfo, params);
  },
  //供应商商品列表
  supplierGoods(params) {
    return http.get(path.supplierGoods, params);
  },
};
