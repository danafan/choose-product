import http from "./request.js";
let path = {
  getGoodsList: "home/getgoodslist",                  //首页商品列表
  moreImgStyle:'home/moreimgstyle',                   //获取更多风格图
  moreImgCommodity:'home/moreimgcommodity',           //获取封面图
  chooseBeforGetImg:'home/choosebeforgetimg',         //选款前获取轮播图
  chooseGoods:'home/choosegoods',                     //选款
  confirmFeekBack:'feedback/add',                     //提交反馈
  getGoodsInfo:'selectcart/selectedinfo',             //获取商品详情
}
export default {
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
};
