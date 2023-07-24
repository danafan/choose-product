<template>
  <div class="vogue_widget">
    <div class="vogue_title flex ac jsb" :class="{'title_radius':!screen_open}" @click.stop="screen_open = !screen_open">
      <div>爆款专区</div>
      <div class="selected_right">
        <div>{{screen_open?'收起':'展开'}}</div>
        <img class="down_arrow" :class="{'rotate':screen_open == true}" src="../static/down_arrow.png">
      </div>
    </div>
    <div class="carousel_box flex ac" v-if="screen_open">
      <img class="check_arrow pointer" src="../static/check_left_arrow.png" @click="checkArrow('1')">
      <div class="flex-1">
        <el-carousel indicator-position="none" arrow="never" ref="hotCarousel" :autoplay="false">
          <el-carousel-item v-for="(array_item,index) in hot_sell_goods" :key="index">
            <div class="width-100 flex jsb">
              <div class="li-item pointer" v-for="item in array_item" :key="item.style_id" @click="getDetail(item.style_id)">
                <img class="goods_img" :data-obj="JSON.stringify(item)" :src="domain + item.img" style="object-fit: scale-down;">
                <div class="hot_sell_item_title table_header_text" :data-obj="JSON.stringify(item)">{{item.title}}</div>
                <div class="hot_sell_item_price" :data-obj="JSON.stringify(item)">¥{{item.cost_price}}</div>
              </div>
              <div class="li-item" v-for="j in 7 - array_item.length"></div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <img class="check_arrow pointer" src="../static/check_right_arrow.png" @click="checkArrow('2')">
    </div>
  </div>

</template>

<script>

  import resource from '../api/resource.js'
  export default {
    data () {
      return {
        hot_sell_goods:[],        //爆款列表
        screen_open:true,
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
            let hot_sell_goods = res.data.data;
            this.hot_sell_goods = this.groupArray(hot_sell_goods, 7);
          }else{
            this.$message.warning(res.data.msg);
          }
        })
      },
      //切分数组
      groupArray(array, subGroupLength) {
        let index = 0;
        let newArray = [];
        while(index < array.length) {
          newArray.push(array.slice(index, index += subGroupLength));
        }
        return newArray;
      },
      //切换左右
      checkArrow(type){
        if(type == '1'){
          this.$refs.hotCarousel.prev();
        }else{
          this.$refs.hotCarousel.next();
        }
      },
      //点击跳转详情
      getDetail(style_id){
        let active_path = `/goods_detail?style_id=${style_id}`;
        const routeData = this.$router.resolve(active_path);
        window.open(routeData.href);
      }

    }
  }
</script>
<style type="text/css">
  .el-carousel__container{
    height: 248rem!important;
  }
</style>
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
    .selected_right{
      display: flex;
      align-items: center;
      cursor:pointer;
      font-size: 12px;
      color:#666666;
      .down_arrow{
        margin-left: 5rem;
        transform: rotate(-90deg);
        width: 7rem;
        height: 4rem;
      }
      .rotate{
        transform: rotate(0deg);
      }
    }
  }
  .title_radius{
    border-radius: 18px;
  }
  .carousel_box{
    background: #ffffff;
    .check_arrow{
      margin-right: 25rem;
      margin-left: 25rem;
      width: 28rem;
      height: 28rem;
    }
  }
  .li-item {
    padding-top: 10rem;
    background: #ffffff;
    width: 180rem;
    .goods_img{
      margin-bottom: 6rem;
      width: 180rem;
      height: 180rem;
    }
    .hot_sell_item_title{
      margin-bottom: 6rem;
      width: 100%;
      text-align: center;
      font-size: 12rem;
      color: #333333;
    }
    .hot_sell_item_price{
      margin-bottom: 10rem;
      width: 100%;
      text-align: center;
      color: #F37605;
      font-size: 12rem;
    }
  }
</style>