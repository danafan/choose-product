<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import resource from './api/resource.js'
  import * as dd from 'dingtalk-jsapi';
  export default {
    created() {

      this.getUserInfo();
      return;

      let user_type = sessionStorage.getItem("user_type");
      if(user_type != '2'){ //内部
        if(dd.env.platform != 'notInDingTalk'){ //是钉钉环境
          //获取code
          this.getCode();
        }else{                                  //不是钉钉环境
          this.getUserInfo();
        }
      }
    },
    watch:{
      $route:function(n,o){
        document.title = n.name;
      }
    },
    methods: {
        //获取code
      getCode(){
        dd.ready(() => {
          dd.runtime.permission.requestAuthCode({
            corpId: "ding7828fff434921f5b",
            onSuccess: res =>{
                      //获取钉钉用户信息
              let code = res.code;
              this.GetDingUserInfo(code);
            },
            onFail : err => {
              alert('dd error: ' + JSON.stringify(err));
            }
          });
        });
      },
          //钉钉获取用户信息
      GetDingUserInfo(code){
        resource.dingLogin({code:code}).then(res => {
          if(res.data.code == 1){
            this.getUserInfo();
          }else{
            this.$message.warning(res.data.msg);
          }
        })
      },
        //获取用户信息
      getUserInfo() {
        resource.getUserInfo().then((res) => {
          if (res.data.code == 1) {
            sessionStorage.setItem("cache",true);
            let data = res.data.data;
            sessionStorage.setItem("user_type", data.user_type);
            sessionStorage.setItem("ding_user_id", data.ding_user_id);
            sessionStorage.setItem("ding_user_name", data.ding_user_name);
            sessionStorage.setItem("secret_key", data.secret_key);
            sessionStorage.setItem("login_token", data.login_token);
            let user_info = {
              user_type:data.user_type,
              ding_user_id:data.ding_user_id,
              ding_user_name:data.ding_user_name,
              login_token:data.login_token,
              secret_key:data.secret_key
            }
            this.$store.commit('setToken',user_info);
            let domain = data.img_domain;
            this.$store.commit('setDomain',domain);
            sessionStorage.setItem("domain",domain);
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
            sessionStorage.setItem("menu_list",JSON.stringify(menu_list))
            if(window.location.hash.split('#/')[1] == ''){
              this.$router.replace('/tab_menu')
            }
          }else{
            this.$message.warning(res.data.msg);
          }
        })
      },
    },
  };
</script>