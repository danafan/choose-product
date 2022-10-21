<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import resource from './api/resource.js'
  export default {
    created() {
      if(!localStorage.getItem("cache")){
        //获取用户信息
        this.getUserInfo();
      }else{
        this.$router.replace('/tab_menu');
      }
    },
    watch:{
      $route:function(n,o){
        document.title = n.name;
      }
    },
    methods: {
        //获取用户信息
        getUserInfo() {
          resource.getUserInfo().then((res) => {
            if (res.data.code == 1) {
              localStorage.setItem("cache",true);
              let data = res.data.data;
              localStorage.setItem("ding_user_id", data.ding_user_id);
              localStorage.setItem("ding_user_name", data.ding_user_name);
              localStorage.setItem("secret_key", data.secret_key);
              localStorage.setItem("login_token", data.login_token);
              let domain = data.img_domain;
              this.$store.commit('setDomain',domain);
              localStorage.setItem("domain",domain);
              //获取导航和公告
              this.getMenuNotice();
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        },
        //获取导航和公告
        getMenuNotice(){
          resource.getMenuNotice().then(res => {
            if(res.data.code == 1){
              let data = res.data.data;
              let menu_list = data.menu_list;
              
              this.$store.commit("setMenuList", menu_list);
              localStorage.setItem("menu_list",JSON.stringify(menu_list))

              this.$store.commit("setPath", menu_list[0].web_url);
              localStorage.setItem("active_path",menu_list[0].web_url);
              this.$store.commit("setIndex", 0);
              localStorage.setItem("active_index",0);

              this.$store.commit("setNoticeList", data.notice_list);
              localStorage.setItem("notice_list",JSON.stringify(data.notice_list))

              this.$router.replace('tab_menu');
            }else{
              this.$message.warning(res.data.msg);
            }
          })
        },
      },
    };
  </script>