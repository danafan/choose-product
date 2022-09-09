import Vue from "vue";
import Vuex from "vuex";
import { Message } from "element-ui";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    car_goods:localStorage.getItem("car_goods")?JSON.parse(localStorage.getItem("car_goods")):[],     //购物车列表
  },
  mutations: {
    //设置购物车
    setCarGoods(state, goods_item) {
      let arr = state.car_goods.filter(item => {
        return item.price == goods_item.price;
      })
      if(arr.length > 0){
        Message({
          type: "warning",
          message: '商品已存在，请勿重复加入',
        });
      }else{
        let car_goods = state.car_goods;
        car_goods.push(goods_item)
        state.car_goods = car_goods;
      }
      
    },
  },
  actions: {},
});
export default store;
