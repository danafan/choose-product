<template>
	<div class="login_container">
		<img class="login_page_back" src="../static/login_page_back.png">
		<div class="login_content">
			<div class="content_left">
				<img class="login_big_back" src="../static/login_big_back.png">
				<img class="login_small_back" src="../static/login_small_back.png">
			</div>
			<div class="content_right">
				<div class="content">
          <div class="tab_row">
            <div class="tab_item" @click="active_tab = 'gys'">
              <div class="tab_text" :class="{'active_tab_text':active_tab == 'gys'}">供应商登录</div>
              <div class="active_line" v-if="active_tab == 'gys'"></div>
            </div>
            <div class="tab_item" @click="active_tab = 'sm'">
              <div class="tab_text" :class="{'active_tab_text':active_tab == 'sm'}">扫码登录</div>
              <div class="active_line" v-if="active_tab == 'sm'"></div>
            </div>
          </div>
          <div class="text">{{active_tab == 'gys'?'用户名密码':'钉钉扫码一键'}}登录</div>
          <div class="gys_box" v-if="active_tab == 'gys'">
            <input class="login_input" ref="userName" autofocus v-model="user_name" placeholder="请输入用户名称" maxlength="20" @keyup.enter="login">
            <input class="login_input" type="password" v-model="password" placeholder="请输入登录密码" maxlength="20" @keyup.enter="login">
            <div class="login" @click="login">登录</div>
          </div>
          <div v-if="active_tab == 'sm'">
            <div id="container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.login_container{
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 .login_page_back{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.login_content{
  width: 1510rem;
  height: 780rem;
  background: #FFFFFF;
  border-radius: 8rem;
  z-index: 9;
  display: flex;
  .content_left{
   position: relative;
   height: 780rem;
   flex:1;
   display: flex;
   align-items: center;
   padding-left: 48rem;
   .login_big_back{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .login_small_back{
    width: 713rem;
    height: 632rem;
    z-index: 11;
  }
}
.content_right{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 780rem;
  padding-right: 70rem;
  .content{
    background: #FFFFFF;
    border-radius: 8rem;
    border: 1px solid #EBEBEB;
    width: 478rem;
    height: 532rem;
    padding-top:30rem;
    .gys_box{
      display: flex;
      flex-direction: column;
      align-items: center;
      .login_input{
        box-sizing: border-box;
        margin-top: 32rem;
        outline: none;
        border:none;
        width: 380rem;
        height: 52rem;
        background: #FFF8EE;
        border-radius: 6rem;
        padding: 0 22rem;
        font-size: 16rem;
      }
      .login{
        margin-top: 60px;
        width: 380rem;
        text-align: center;
        height: 42rem;
        line-height: 42rem;
        background: #F37605;
        border-radius: 4rem;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
      }
    }
    .tab_row{
      margin-bottom: 36rem;
      display: flex;
      align-items: center;
      justify-content:space-around;
      .tab_item{
        cursor: pointer;
        height: 40rem;
        display: flex;
        align-items: center;
        justify-content:center;
        position: relative;
        .tab_text{
          font-size: 18px;
          font-weight: bold;
          color: #666666;
        }
        .active_tab_text{
          color: #333333;
        }
        .active_line{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4rem;
          background: var(--color);
        }
      }
    }
    .text{
     color: var(--color);
     font-size: 24rem;
     font-weight: 500;
     width: 100%;
     text-align: center;
   }
 }
}
}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data() {
			return {
        active_tab:"gys",     //登录类型
        user_name:"",         //用户名
        password:"",          //密码
      };
    },
    watch:{
      active_tab:function(n,o){
        if(n == 'sm'){
          this.getAppKey();
        }else{
          this.$nextTick(() => {
            this.$refs.userName.focus();
          })
        }
      }
    },
    methods: {
      getAppKey() {
        resource.getAppKey().then((res) => {
         if (res.data.code == "1") {
          let appKey = res.data.data.appkey;
          this.ddLoginInit(appKey);
        } else {
          this.$message.warning(res.data.msg);
        }
      });
      },
      ddLoginInit(appKey) {
        let url = `${location.origin}/api/scancodes/ewmlogin`;
			// let url = "http://selectiontest.92nu.com/api/scancodes/ewmlogin";
      const goto = encodeURIComponent(
       `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appKey}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`
       );
      window.DDLogin({
       id: "container",
       goto: goto,
       style: "border:none;background-color:#FFFFFF;margin:0 auto;",
        		width: "100%", //官方参数 365
        		height: "300", //官方参数 400
          });
      let handleMessage = (event) => {
       let origin = event.origin;
       if (origin == "https://login.dingtalk.com") {
        const loginTmpCode = event.data;
        window.location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appKey}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}&loginTmpCode=${loginTmpCode}`;
      }
    };
    if (typeof window.addEventListener != "undefined") {
     window.addEventListener("message", handleMessage, false);
   } else if (typeof window.attachEvent != "undefined") {
     window.attachEvent("onmessage", handleMessage);
   }
 },
     //点击登录
     login(){
      if(this.user_name == ''){
        this.$message.warning('请输入用户名');
        return;
      }else if(this.password == ''){
        this.$message.warning('请输入密码');
        return;
      }
      let arg = {
        username:this.user_name,
        password:this.password
      }
      resource.supplierLogin(arg).then(res => {
        if (res.data.code == "1") {
          localStorage.setItem("cache",true);
          let data = res.data.data;
          localStorage.setItem("user_type", data.user_type);
          localStorage.setItem("ding_user_id", data.ding_user_id);
          localStorage.setItem("ding_user_name", data.ding_user_name);
          localStorage.setItem("secret_key", data.secret_key);
          localStorage.setItem("login_token", data.login_token);
          localStorage.setItem("supplier_name", data.supplier_name);
          let user_info = {
            user_type:data.user_type,
            ding_user_id:data.ding_user_id,
            login_token:data.login_token,
            secret_key:data.secret_key,
            supplier_name:data.supplier_name,
          }
          this.$store.commit('setToken',user_info);
          let domain = data.img_domain;
          this.$store.commit('setDomain',domain);
          localStorage.setItem("domain",domain);

          let menu_list = [{
            menu_name:'首页',
            web_url:"gys_index"
          },{
            menu_name:'供应商',
            web_url:"gys_supplier"
          },{
            menu_name:'款式资料',
            web_url:"style_info"
          }]

          this.$store.commit("setMenuList", menu_list);
          localStorage.setItem("menu_list",JSON.stringify(menu_list))

          this.$store.commit("setPath", menu_list[0].web_url);
          localStorage.setItem("active_path",menu_list[0].web_url);
          this.$store.commit("setIndex", 0);
          localStorage.setItem("active_index",0);

          this.$router.replace('tab_menu');
        } else {
          this.$message.warning(res.data.msg);
        }
      })


      
    }
  },
}
</script>
