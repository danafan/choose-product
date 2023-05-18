<template>
  <div class="container" @click="closeFn">
    <div class="page_header">
      <!-- logo -->
      <img class="logo_icon" src="../static/logo_icon.png" v-if="active_path == '/supply_chain' || notice_list.length == 0">
      <!-- 公告 -->
      <el-popover placement="bottom-end" width="420" trigger="hover" v-else>
        <el-table :data="notice_list" max-height="180px" size="mini" :show-header="false" @row-click="noticeDetail">
          <el-table-column width="248" property="notice_content" label="内容">
            <template slot-scope="scope">
              <div class="table_notice content" :class="{'time':scope.row.read_status == 1}">{{scope.row.notice_title}}</div>
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
            <div class="num" v-if="nuread_num > 0">{{nuread_num}}</div>
          </div>
          <div class="message_content">{{notice_list[0].notice_title}}</div>
        </div>
      </el-popover>
      <div class="header_right">
        <div class="tab_item" :class="{'active_tab':active_index == index}" v-for="(item,index) in menu_list" @click="checkIndex(index)">{{item.menu_name}}</div>
        <div v-if="user_type == 2">
          <el-dropdown @command="edit_dialog = true">
            <div style="display: flex;align-items: center">
             <img class="user_img" src="../static/user_img.png">
             <div class="user_name">{{ding_user_name}}</div>
           </div>
           <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="display: flex;align-items: center" v-else>
        <img class="user_img" src="../static/user_img.png">
        <div class="user_name">{{ding_user_name}}</div>
      </div>
      <div class="line"></div>
      <el-popconfirm
      title="确认退出？"
      @confirm="loginOut"
      >
      <div slot="reference" class="login_out">退出</div>
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
<!-- 修改密码 -->
<el-dialog width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close @close="editDialog" :visible.sync="edit_dialog">
  <div slot="title" class="dialog_title">
    <div>修改密码</div>
    <img class="close_icon" src="../static/close_icon.png" @click="edit_dialog = false">
  </div>
  <div class="dialog_content">
    <el-form size="mini" label-width="100px">
      <el-form-item label="供应商名称：">
        {{supplier_name}}
      </el-form-item>
      <el-form-item label="用户名：">
        <div>{{ding_user_name}}</div>
      </el-form-item>
      <el-form-item label="旧密码：" required>
        <el-input style="width: 200px" v-model="old_password" maxlength="20" placeholder="请输入旧密码">
        </el-input>
      </el-form-item>
      <el-form-item label="新密码：" required>
        <el-input style="width: 200px" v-model="password" maxlength="20" placeholder="请输入新密码">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码：" required>
        <el-input style="width: 200px" v-model="confirm_password" maxlength="20" placeholder="请确认密码">
        </el-input>
      </el-form-item>
    </el-form>
  </div>
  <div slot="footer" class="dialog_footer">
    <el-button size="small" @click="edit_dialog = false">取消</el-button>
    <el-button type="primary" size="small" @click="commitFn">确定</el-button>
  </div>
</el-dialog>
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
          font-size: 14rem!important;
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
    cursor: pointer;
    font-size: 12rem;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

  }
  .dialog_content{
    padding: 24px 40px;
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
  import supplierResource from '../api/supplier_resource.js'
  export default {
    data() {
      return {
        active_index:0,
        // username: "",           //用户名
        edit_dialog:false,      //修改密码弹窗
        old_password:"",        //旧密码
        password:"",            //新密码
        confirm_password:"",    //确认密码
      };
    },
    created() {
      this.getNotice();
      // this.username = sessionStorage.getItem("ding_user_name");
      let path = window.location.hash.split('#/')[1].indexOf('?') > -1?window.location.hash.split('#/')[1].split('?')[0]:window.location.hash.split('#/')[1];
      if(path == 'tab_menu'){
        this.active_index = 0;
      }else if(path == 'goods_detail'){
        if(this.$route.query.page_path == 'supplier'){
          this.active_index = 2;
        }else{
          this.active_index = 0;
        }
      }else if(this.user_type == '1' && this.getActiveIndex(path) == -1){
        if(path == 'supplier_detail'){  //供应商详情
          this.active_index = 2;
        }else if(path == 'chain_audit_page' || path == 'chain_goods_page' || path == 'b_z_promotion_page' || path == 'chain_supplier_page' || path == 'chain_message_page' || path == 'chain_setting_page' || path == 'chain_feekback_page' || path == 'chain_permissions_page' || path == 'setting_record_page'){
          this.active_index = 3;
        }
      }else{
        this.active_index = this.getActiveIndex(path);
      }
      //判断是刚登录进来的直接进入首页
      if(path == 'tab_menu'){
       if(this.user_type == '2'){
        this.$router.push('/gys_index')
      }else{
        this.$router.push('/index')
      }
    }
  },
  computed: {
      //供应商名称
    supplier_name() {
      return this.$store.state.supplier_name;
    },
      //用户类型
    user_type() {
      return this.$store.state.user_type;
    },
      //导航列表
    menu_list() {
      return this.$store.state.menu_list;
    },
      //公告列表
    notice_list() {
      return this.$store.state.notice_list;
    },
      //未读公告数
    nuread_num() {
      return this.$store.state.nuread_num;
    },
      //当前路由
    active_path() {
      return this.$store.state.active_path;
    },
      //用户名称
    ding_user_name() {
      return this.$store.state.ding_user_name;
    },
  },
  methods: {
      //获取当前选中的下标
    getActiveIndex(path){
      return this.menu_list.findIndex(item => {
        return item.web_url == path
      })
    },
      //全局关闭筛选项下拉
    closeFn(){
      this.$store.commit("setScreen", false);
    },
      //获取公告列表
    getNotice(){
      this.$store.dispatch('getNotice')
    },
      //点击切换导航
    checkIndex(index){
      this.active_index = index;
      let active_path = this.menu_list[index].web_url;
      this.$router.push(active_path);
    },
      //查看公告
    noticeDetail(row, column, event){
        //获取公告详情
      let arg = {
        notice_id:row.notice_id
      }
      resource.noticeInfo(arg).then(res => {
        if(res.data.code == 1){
            //获取公告列表
          this.getNotice();
          let active_path = `/notice_page?notice_id=${row.notice_id}`;
          const routeData = this.$router.resolve(active_path);
          window.open(routeData.href);
        }else{
          this.$message.warning(res.data.msg);
        }
      })
    },
      //关闭修改密码弹窗
    editDialog(){
      this.old_password = "";
      this.password = "";
      this.confirm_password = "";
    },
      //点击提交修改密码
    commitFn(){
      if(this.old_password == ''){
        this.$message.warning('请输入旧密码!');
        return;
      }else if(this.password == ''){
        this.$message.warning('请输入新密码!');
        return;
      }else if(this.confirm_password == ''){
        this.$message.warning('请确认密码!');
        return;
      }else if(this.password !== this.confirm_password){
        this.$message.warning('确认密码和新密码不一致!');
        return;
      }
      let arg = {
        old_password:this.old_password,
        password:this.password,
        confirm_password:this.confirm_password
      }
      supplierResource.editPwd(arg).then(res => {
        if(res.data.code == 1){
          this.edit_dialog = false;
          this.$message.success(res.data.msg);
          sessionStorage.clear();
          this.$router.replace('/login');
        }else{
          this.$message.warning(res.data.msg);
        }
      })
    },
      //退出
    loginOut(){
      let user_id = sessionStorage.getItem("ding_user_id");
      let arg = {
        user_id:user_id
      }
      resource.loginOut(arg).then(res => {
        if(res.data.code == 1){
          this.$message.success(res.data.msg);
          sessionStorage.clear();
          this.$router.replace('/login');
        }else{
          this.$message.warning(res.data.msg);
        }
      })
    }
  }
};
</script>















