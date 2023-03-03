<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import resource from './api/resource.js'
  export default {
    created() {
      
      // this.getUserInfo();
      // return;
      
      let user_type = localStorage.getItem("user_type");
      if(!localStorage.getItem("cache") && user_type != '2'){
        this.getUserInfo();
      }
      
      if(window.location.hash.split('#/')[1] == ''){
        this.$router.replace('/tab_menu')
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
              localStorage.setItem("user_type", data.user_type);
              localStorage.setItem("ding_user_id", data.ding_user_id);
              localStorage.setItem("ding_user_name", data.ding_user_name);
              localStorage.setItem("secret_key", data.secret_key);
              localStorage.setItem("login_token", data.login_token);
              let user_info = {
                user_type:data.user_type,
                ding_user_id:data.ding_user_id,
                login_token:data.login_token,
                secret_key:data.secret_key
              }
              this.$store.commit('setToken',user_info);
              let domain = data.img_domain;
              this.$store.commit('setDomain',domain);
              localStorage.setItem("domain",domain);
              //获取导航
              this.getMenuNotice();
            } else {
              this.$message.warning(res.data.msg);
            }
          });
        },
        //获取导航
        getMenuNotice(){
          resource.getMenuNotice().then(res => {
            if(res.data.code == 1){
              let data = res.data.data;
              let menu_list = data.menu_list;
              
              this.$store.commit("setMenuList", menu_list);
              localStorage.setItem("menu_list",JSON.stringify(menu_list))

              this.$router.replace('tab_menu');
            }else{
              this.$message.warning(res.data.msg);
            }
          })
        },
      },
    };
  </script>