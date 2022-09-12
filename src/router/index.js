import Vue from "vue";
import Router from "vue-router";

const tab_menu = (resolve) => require(["@/pages/tab_menu"], resolve);
const index = (resolve) => require(["@/pages/Index/index"], resolve);
const selected = (resolve) => require(["@/pages/Selected/selected"], resolve);
const supplier = (resolve) => require(["@/pages/Supplier/supplier"], resolve);
const supplier_detail = (resolve) => require(["@/pages/Supplier/supplier_detail"], resolve);
const supply_chain = (resolve) => require(["@/pages/SupplyChain/supply_chain"], resolve);

Vue.use(Router);

const router = new Router({
  routes: [
  {
    path: "/",
    component: tab_menu,
    name: "导航页",
    children: [
    {
      path: "/index",
      name: "首页",
      component: index
    },
    {
      path: "/selected",
      name: "选中",
      component: selected
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
      component: supply_chain
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
