<template>
  <div class="container">
    <div class="page_header">
      <!-- logo -->
      <img class="logo_icon" src="../static/logo_icon.png" v-if="path == '/supply_chain'">
      <!-- 公告 -->
      <div class="message_box" v-else>
        <div class="message_icon_box" @click="show_list = !show_list">
          <img class="message_icon" src="../static/message_icon.png">
          <div class="num">3</div>
        </div>
        <div class="message_content">这是消息消息这是消息消息这是消息消息</div>
        <div class="list_box" v-if="show_list == true">
          <div class="message_row">
            <div class="value">这是消息消息这是消息消息这是消息消息</div>
            <div class="time">2022-09-12 12:00</div>
          </div>
          <div class="message_row">
            <div class="value">这是消息消息这是消息消息这是消息消息</div>
            <div class="time">2022-09-12 12:00</div>
          </div>
          <div class="message_row">
            <div class="value">这是消息消息这是消息消息这是消息消息</div>
            <div class="time">2022-09-12 12:00</div>
          </div>
          <div class="message_row">
            <div class="value">这是消息消息这是消息消息这是消息消息</div>
            <div class="time">2022-09-12 12:00</div>
          </div>
        </div>
      </div>
      <div class="header_right">
        <div class="tab_item" :class="{'active_tab':active_index == index}" v-for="(item,index) in menu_list" @click="active_index = index">{{item.name}}</div>
        <img class="user_img" src="../static/user_img.png">
        <div class="user_name">{{username}}</div>
        <div class="line"></div>
        <div class="login_out">退出</div>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
        </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <div class="page_foot"></div>
  </div>
</template>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .page_header {
    background: #ffffff;
    width: 100%;
    padding-left: 60rem;
    padding-right: 60rem;
    height: 48rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo_icon{
      width: 90rem;
      height: 34rem;
    }
    .message_box{
      position: relative;
      width: 300rem;
      height: 48rem;
      display: flex;
      align-items: center;
      .message_icon_box{
        margin-right: 8rem;
        position: relative;
        width: 13rem;
        height: 12rem;
        .message_icon{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .num{
          position: absolute;
          top: -10rem;
          right: -10rem;
          border-radius:50%;
          background: #F22E00;
          height: 14rem;
          line-height: 14rem;
          padding-left: 3rem;
          padding-right: 3rem;
          font-size: 12rem;
          color: #ffffff;
        }
      }
      .message_content{
        flex: 1;
        font-size: 12rem;
        color: var(--color);
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .list_box{
        background: #ffffff;
        position: absolute;
        left: 0;
        bottom: -90rem;
        width: 350rem;
        height: 90rem;
        z-index: 9;
        overflow-y: scroll;
        .message_row{
          border-bottom: 1px solid #DEDEDE;
          width: 100%;
          height: 28rem;
          display: flex;
          align-items: center;
          font-size: 12rem;
          color: #666666;
          padding-left: 10rem;
          padding-right: 10rem;
          .value{
            flex: 1;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .time{
            margin-left: 10rem;
            white-space:normal;
          }
        }
      }
    }
    .header_right{
      display: flex;
      align-items: center;
      font-size: 14rem;
      color: #333333;
      .tab_item{
        margin-right: 30rem;
      }
      .active_tab{
        color: var(--color);
      }
      .user_img{
        margin-left: 14rem;
        margin-right: 10rem;
        width: 24rem;
        height: 24rem;
      }
      .line{
        margin-left: 8rem;
        margin-right: 8rem;
        width: 1px;
        height: 14rem;
        background: var(--color);
      }
    }
  }
  .content {
    background-color: #f6f6f6;
    width: 100%;
    flex: 1;
    position: relative;
  }
  .page_foot {
    background-color: #ffffff;
    width: 100%;
    height: 30px;
  }
}
</style>
<script>
  export default {
    data() {
      return {
        username: "彪子", //用户名
        menu_list:[{
          name:'首页',
          path:'/index'
        },{
          name:'已选',
          path:'/selected'
        },{
          name:'供应商',
          path:'/supplier'
        },{
          name:'供应链中心',
          path:'/supply_chain'
        }],     //导航列表
        active_index:0,
        path:"",
        show_list:false
      };
    },
    watch:{
      active_index:function(n,o){
        this.$router.push(this.menu_list[n].path);
      },
      $route:function(to,from){
        this.path = this.$route.path;
      }
    },
    created() {
      this.$router.push('/index')
    },
    methods: {

    }
  };
</script>















