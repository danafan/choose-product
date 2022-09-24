import Vue from "vue";
import Vuex from "vuex";
import { Message } from "element-ui";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    car_goods_num:0,     //购物车商品数量
    domain:localStorage.getItem("domain")?localStorage.getItem("domain"):"",
  },
  mutations: {
    //设置购物车
    setCarGoods(state, arg) {
      let {type,num} = arg;
      if(type == 'add' || type == 'del'){    //添加或删除
        state.car_goods_num += num;
      }else{                                 //重置
         state.car_goods_num = num;
      }
    },
    //设置图片前缀
    setDomain(state, domain){
      state.domain = domain;
    }
  },
  actions: {},
});
export default store;
