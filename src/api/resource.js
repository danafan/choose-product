import http from "./request.js";
let path = {
  dingLogin:'ding_login',
  showNotice:'api/index/show_notice',                     //页面顶部公告列表
  loginOut:'api/loginquit',                               //退出登录
  supplierLogin:'api/supplier_login',                     //供应商登录
  getAppKey:'api/scancodes/getappkey',                    //获取appkey
  getUserInfo:'api/scancodes/getuserinfo',                //获取用户信息
  getMenuNotice:'api/access/mymenu',                      //获取导航列表和公告
  noticeInfo:'api/index/notice_info',                     //公告详情
  getGoodsList: "api/home/getgoodslist",                  //首页商品列表
  moreImgStyle:'api/home/moreimgstyle',                   //获取更多风格图
  moreImgCommodity:'api/home/moreimgcommodity',           //获取封面图
  chooseBeforGetImg:'api/home/choosebeforgetimg',         //选款前获取轮播图
  chooseGoods:'api/home/choosegoods',                     //选款
  confirmFeekBack:'api/feedback/add',                     //提交反馈
  getGoodsInfo:'api/selectcart/selectedinfo',             //获取商品详情
  addSelectCart:'api/home/addselectcart',                 //加入购物车
  getCarList:'api/selectcart/getwaitselect',              //获取购物车列表
  removeCarGoods:'api/selectcart/removewaitselect',       //删除购物车
  addSelected:'api/selectcart/addselected',
  getSelected:'api/selected/getselected',                 //获取已选列表
  selectedExport:'api/selected/allselectedderive',            //已选导出
  selectedInfo:'api/selected/selectedinfo',               //已选详情
  undoSelected:'api/selected/revocationselected',         //撤销已选
  cancelSelected:'api/selected/cancelselected',           //取消已选
  supplierList:'api/supplier/index',                      //获取供应商列表
  supplierInfo:'api/supplier/info',                       //供应商基本信息
  supplierGoods:'api/supplier/goods',                     //供应商商品列表
  hotDataIndex:'supplier/productstyle/hotdataindex',      //爆款主推款列表
  pushHostData:'supplier/productstyle/pushhostdata',      //推爆款
  twoFourTitle:'api/home/twofourtitle',                   //切换24小时不提示
  getUserName:'api/selected/getusername',                 //获取需求人
} 
export default {
  //钉钉登陆
  dingLogin(params) {
    return http.get(path.dingLogin, params);
  },
  //页面顶部公告列表
  showNotice(params) {
    return http.get(path.showNotice, params);
  },
  //退出登录
  loginOut(params) {
    return http.get(path.loginOut, params);
  },
  // 供应商登录
  supplierLogin(params) {
    return http.post(path.supplierLogin, params);
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
  //已选导出
  selectedExport(params) {
    return http.get(path.selectedExport, params);
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
  //爆款主推款列表
  hotDataIndex(params) {
    return http.get(path.hotDataIndex, params);
  },
  //推爆款
  pushHostData(params) {
    return http.post(path.pushHostData, params);
  },
  //切换24小时不提示
  twoFourTitle(params) {
    return http.get(path.twoFourTitle, params);
  },
  //获取所有需求人
  getUserName(params) {
    return http.get(path.getUserName, params);
  },
};
