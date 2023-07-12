<template>
  <div class="vogue_widget">
    <div class="vogue_title flex ac jsb">
      <div>爆款专区</div>
    </div>
    <div class="seamless_box">
      <vue-seamless-scroll
      :data="hot_sell_goods"
      :class-option="classOption"
      class="warp"
      >
      <ul class="ul-item">
        <li class="li-item" v-for="(item, index) in hot_sell_goods" :key="index" @click="getDetail(item.style_id)">
          <el-image class="goods_img" :src="domain + item.img" fit="scale-down"></el-image>
          <div class="hot_sell_item_title table_header_text">{{item.title}}</div>
          <div class="hot_sell_item_price">¥{{item.cost_price}}</div>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>

</div>

</template>

<script>
  import vueSeamlessScroll from 'vue-seamless-scroll'

  import resource from '../api/resource.js'
  export default {
    components: {
      vueSeamlessScroll
    },
    data () {
      return {
        hot_sell_goods:[],        //爆款列表
        listData: [1, 2, 3, 4, 5, 6],
        classOption: {
          limitMoveNum: 2,
          direction: 3,
        }
      }
    },
    computed:{
      //图片前缀
      domain(){
        return this.$store.state.domain;
      }
    },
    created(){
      //爆款列表
      this.hotSellGoods();
    },
    methods:{
      //爆款列表
      hotSellGoods(){
        resource.hotSellGoods().then(res => {
          if(res.data.code == 1){
              this.hot_sell_goods = res.data.data;
          }else{
            this.$message.warning(res.data.msg);
          }
        })
      },
      //点击跳转详情
      getDetail(style_id){
        console.log(style_id)
        let active_path = `/goods_detail?style_id=${style_id}`;
        const routeData = this.$router.resolve(active_path);
        window.open(routeData.href);
      },
    }
  }
</script>

<style lang="less" scoped>
  .vogue_widget{
    margin-bottom: 10px;
  }
  .vogue_title{
    border-radius: 18px 18px 0 0;
    background: #FFF3E9;
    width: 100%;
    height: 30px;
    padding-left: 26px;
    padding-right: 26px;
    color: #333333;
    font-size: 14px;
  }
  .seamless_box{
    border-radius: 0 0 18px 18px;
    background: #ffffff;
    padding: 10px;
  }
  .warp {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      &.ul-item {
        display: flex;
        .li-item {
          border:1px solid #F9BF8B;
          width: 180px;
          margin-right: 54px;
          .goods_img{
            width: 180px;
            height: 180px;
          }
          .hot_sell_item_title{
            padding-left: 8px;
            padding-right: 8px;
            width: 100%;
            text-align: center;
            font-size: 12px;
            color: #333333;
          }
          .hot_sell_item_price{
            line-height: 30px;
            width: 100%;
            text-align: center;
            color: #F37605;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>