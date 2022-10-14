import Vue from "vue";
import Vuex from "vuex";
import { Message } from "element-ui";
import resource from '../api/resource.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    menu_list:localStorage.getItem("menu_list")?JSON.parse(localStorage.getItem("menu_list")):[],             //导航列表
    car_goods_num:0,     //购物车商品数量
    domain:localStorage.getItem("domain")?localStorage.getItem("domain"):"",
    active_path:localStorage.getItem("active_path")?localStorage.getItem("active_path"):"",       //当前的导航地址
    active_index:localStorage.getItem("active_index")?localStorage.getItem("active_index"):"",       //当前的导航地址
    screen_open:false,    //查询条件下拉框是否展开
    notice_list:[],     //公告列表
  },
  mutations: {
    //设置导航列表
    setMenuList(state, menu_list){
      state.menu_list = menu_list;
    },
    //设置公告列表
    setNoticeList(state, notice_list){
      state.notice_list = notice_list;
    },
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
    },
    //设置当前路由地址
    setPath(state, path){
      state.active_path = path;
    },
    //设置当前亮下标
    setIndex(state, active_index){
      state.active_index = active_index;
    },
    //设置查询条件是否展开
    setScreen(state, status){
      state.screen_open = status;
    },
  },
  actions: {
    // 获取公告列表
    getNotice (context) {
      resource.showNotice().then(res => {
       if(res.data.code == 1){
         context.commit('setNoticeList', res.data.data.list)
       }else{
        Message.warning(res.data.msg);
       }
     })
    }
  }
});
export default store;
