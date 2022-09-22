import http from "./request.js";
let path = {
  getGoodsList: "home/getgoodslist",                  //首页商品列表
  moreImgStyle:'home/moreimgstyle',                   //获取更多风格图
  moreImgCommodity:'home/moreimgcommodity',           //获取封面图
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
};
