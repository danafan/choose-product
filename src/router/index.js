import Vue from "vue";
import Router from "vue-router";

const tab_menu = (resolve) => require(["@/pages/tab_menu"], resolve);
const login = (resolve) => require(["@/pages/login"], resolve);
const index = (resolve) => require(["@/pages/Index/index"], resolve);
const notice_page = (resolve) => require(["@/pages/NoticePage/notice_page"], resolve);
const goods_detail = (resolve) => require(["@/pages/GoodsDetail/goods_detail"], resolve);
const selected = (resolve) => require(["@/pages/Selected/selected"], resolve);
const car_page = (resolve) => require(["@/pages/CarPage/car_page"], resolve);
const supplier = (resolve) => require(["@/pages/Supplier/supplier"], resolve);
const supplier_detail = (resolve) => require(["@/pages/Supplier/supplier_detail"], resolve);
const supply_chain = (resolve) => require(["@/pages/SupplyChain/supply_chain"], resolve);
const chain_message_page = (resolve) => require(["@/pages/SupplyChain/pages/chain_message_page"], resolve);
const chain_goods_page = (resolve) => require(["@/pages/SupplyChain/pages/chain_goods_page"], resolve);
const chain_audit_page = (resolve) => require(["@/pages/SupplyChain/pages/chain_audit_page"], resolve);
const edit_goods = (resolve) => require(["@/pages/SupplyChain/pages/GoodsPages/edit_goods"], resolve);
const image_setting = (resolve) => require(["@/pages/SupplyChain/pages/GoodsPages/image_setting"], resolve);
const chain_supplier_page = (resolve) => require(["@/pages/SupplyChain/pages/chain_supplier_page"], resolve);
const add_edit_supplier = (resolve) => require(["@/pages/SupplyChain/pages/SupplierPages/add_edit_supplier"], resolve);
const chain_supplier_detail = (resolve) => require(["@/pages/SupplyChain/pages/SupplierPages/supplier_detail"], resolve);
const chain_setting_page = (resolve) => require(["@/pages/SupplyChain/pages/chain_setting_page"], resolve);
const edit_record = (resolve) => require(["@/pages/SupplyChain/pages/SettingPages/edit_record"], resolve);
const chain_permissions_page = (resolve) => require(["@/pages/SupplyChain/pages/chain_permissions_page"], resolve);
const chain_feekback_page = (resolve) => require(["@/pages/SupplyChain/pages/chain_feekback_page"], resolve);

Vue.use(Router);

const router = new Router({
  routes: [
  {
    path: "/login",
    name: "登录",
    component: login
  },
  {
    path: "/tab_menu",
    component: tab_menu,
    name: "",
    children: [
    {
      path: "/notice_page",
      name: "公告详情",
      component: notice_page
    },
    {
      path: "/index",
      name: "首页",
      component: index
    },
    {
      path: "/goods_detail",
      name: "选品详情",
      component: goods_detail
    },
    {
      path: "/selected",
      name: "已选",
      component: selected
    },
    {
      path: "/car_page",
      name: "待选记录",
      component: car_page
    },
    {
      path: "/supplier",
      name: "供应商",
      component: supplier
    },
    {
      path: "/supplier_detail",
      name: "供应商详情",
      component: supplier_detail
    },
    {
      path: "/supply_chain",
      name: "供应链中心",
      component: supply_chain,
      children: [
      {
        path: "/chain_message_page",
        name: "公告",
        component: chain_message_page
      },
      {
        path: "/chain_goods_page",
        name: "商品管理",
        meta:{
         keep_alive:true,
         use_cache:false
        },
        component: chain_goods_page,
      },
      {
        path: "/chain_audit_page",
        name: "商品审核",
        component: chain_audit_page
      },
      {
        path: "/edit_goods",
        name: "上传/编辑商品",
        meta:{
          is_back:true
        },
        component: edit_goods
      },
      {
        path: "/image_setting",
        name: "图片管理",
        meta:{
          is_back:true
        },
        component: image_setting
      },
      {
        path: "/chain_supplier_page",
        name: "供应商",
        meta:{
         keep_alive:true,
         use_cache:false
        },
       component: chain_supplier_page
     },
     {
      path: "/add_edit_supplier",
      name: "添加/编辑供应商",
      meta:{
        is_back:true
      },
      component: add_edit_supplier
    },
    {
      path: "/chain_supplier_detail",
      name: "供应商详情",
      meta:{
        is_back:true
      },
      component: chain_supplier_detail
    },
    {
      path: "/chain_setting_page",
      name: "配置",
      component: chain_setting_page
    },
    {
      path: "/edit_record",
      name: "修改记录",
      meta:{
        is_back:true
      },
      component: edit_record
    },
    {
      path: "/chain_permissions_page",
      name: "权限",
      component: chain_permissions_page
    },
    {
      path: "/chain_feekback_page",
      name: "反馈",
      component: chain_feekback_page
    },
    ]
  },
  ],
},
],
});

// router.beforeEach((to, from, next) => {
//   if (to.path == "/") {
//     let menulist = Store.state.menu_list;
//     Store.commit('setActiveIndex',0);
//     next(`/${menulist[0].web_url}`);
//   }else{
//     next();
//   }
// });

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default router;
