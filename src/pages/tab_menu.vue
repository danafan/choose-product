<template>
  <div class="container">
    <div class="page_header">
      <!-- logo -->
      <img class="logo_icon" src="../static/logo_icon.png" v-if="active_path == '/supply_chain' || notice_list.length == 0">
      <!-- 公告 -->
      <el-popover placement="bottom-end" width="420" trigger="hover" v-else>
        <el-table :data="notice_list" size="mini" :show-header="false" @row-click="noticeDetail">
          <el-table-column width="248" property="notice_content" label="内容">
            <template slot-scope="scope">
              <div class="table_notice content">{{scope.row.notice_title}}</div>
            </template>
          </el-table-column>
          <el-table-column property="add_time" label="时间">
            <template slot-scope="scope">
              <div class="table_notice time">{{scope.row.add_time}}</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="message_box" slot="reference">
          <div class="message_icon_box">
            <img class="message_icon" src="../static/message_icon.png">
            <div class="num">{{notice_list.length}}</div>
          </div>
          <div class="message_content">{{notice_list[0].notice_title}}</div>
        </div>
      </el-popover>
      <div class="header_right">
        <div class="tab_item" :class="{'active_tab':active_index == index}" v-for="(item,index) in menu_list" @click="checkIndex(index)">{{item.menu_name}}</div>
        <img class="user_img" src="../static/user_img.png">
        <div class="user_name">{{username}}</div>
        <div class="line"></div>
        <el-popconfirm
        title="确认退出？"
        @confirm="loginOut"
        >
        <div slot="reference" class="login_out">退出</div>
        <!-- <el-button slot="reference">删除</el-button> -->
      </el-popconfirm>
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
    border-bottom: 1px solid #F3F3F3;
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
    .header_right{
      display: flex;
      align-items: center;
      font-size: 14rem;
      color: #333333;
      .tab_item{
        margin-right: 30rem;
        cursor:pointer;
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
      .login_out{
        cursor:pointer;
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
.table_notice{
  font-size: 12rem;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.content{
  color: #666666;
}
.time{
  color: #999999;
}
</style>
<script>
  import resource from '../api/resource.js'
  export default {
    data() {
      return {
        username: "", //用户名
      };
    },
    created() {
      this.username = localStorage.getItem("ding_user_name");
      this.$router.push(this.active_path)
    },
    computed: {
      //导航列表
      menu_list() {
        return this.$store.state.menu_list;
      },
      //公告列表
      notice_list() {
        return this.$store.state.notice_list;
      },
      //当前路由
      active_path() {
        return this.$store.state.active_path;
      },
      //当前高亮下标
      active_index() {
        return this.$store.state.active_index;
      },
    },
    methods: {
      //点击切换导航
      checkIndex(index){
        this.$store.commit("setIndex", index);
        localStorage.setItem("active_index",index);
        let active_path = this.menu_list[index].web_url;
        localStorage.setItem("active_path",active_path);
        this.$store.commit("setPath", active_path);
        this.$router.push(active_path);
      },
      //查看公告
      noticeDetail(row, column, event){
        let active_path = `/notice_page?notice_id=${row.notice_id}`;
        localStorage.setItem("active_path",active_path);
        this.$store.commit("setPath", active_path);
        const routeData = this.$router.resolve(active_path);
        window.open(routeData.href);
      },
      loginOut(){
        let user_id = localStorage.getItem("ding_user_id");
        let arg = {
          user_id:user_id
        }
        resource.loginOut(arg).then(res => {
          if(res.data.code == 1){
            this.$message.success(res.data.msg);
            localStorage.clear();
            this.$router.replace('/login');
          }else{
            this.$message.warning(res.data.msg);
          }
        })
        console.log("asd")
      }
    }
  };
</script>















