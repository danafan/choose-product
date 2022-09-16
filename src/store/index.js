import Vue from "vue";
import Vuex from "vuex";
import { Message } from "element-ui";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    car_goods:localStorage.getItem("car_goods")?JSON.parse(localStorage.getItem("car_goods")):[],     //购物车列表
    domain:localStorage.getItem("domain")?localStorage.getItem("domain"):"",
  },
  mutations: {
    //设置购物车
    setCarGoods(state, arg) {
      let {goods_items,type} = arg;
      let arr = []; 
      let index_list = [];
      state.car_goods.map((item,index) => {
        goods_items.map(child => {
          if(item.price == child.price){
            arr.push(child);
            index_list.push(index);
          }
        })
      })
      if(type == 'del'){    //删除
        let car_goods = state.car_goods;
        for(let i = index_list.length - 1;i >= 0;i --){
          car_goods.splice(index_list[i],1);
        }
        state.car_goods = car_goods;
        Message({
          type: "success",
          message: '已删除！',
        });
      }else{                //添加
        if(arr.length > 0){
          Message({
            type: "warning",
            message: '商品已存在，请勿重复加入',
          });
        }else{
          let car_goods = state.car_goods;
          car_goods.unshift(goods_items[0]);
          state.car_goods = car_goods;
          Message({
            type: "success",
            message: '已加入待选!',
          });
        }
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
