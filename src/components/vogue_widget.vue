<template>
  <div class="vogue_widget">
    <div class="vogue_title flex ac jsb" :class="[{'title_radius':!screen_open},{'border_bottom':screen_open}]" @click.stop="screen_open = !screen_open">
      <div class="flex">
        <div class="banner_item pointer" :class="{'active_banner_item':banner_index == 0}" @click.stop="banner_index = 0">爆款专区</div>
        <div class="banner_item pointer" :class="{'active_banner_item':banner_index == 4}" @click.stop="banner_index = 4">白坯二开</div>
        <div class="banner_item pointer" :class="{'active_banner_item':banner_index == 1}" @click.stop="banner_index = 1">新品热销</div>
        <div class="banner_item pointer" :class="{'active_banner_item':banner_index == 2}" @click.stop="banner_index = 2">降价精选</div>
        <div class="banner_item pointer" :class="{'active_banner_item':banner_index == 3}" @click.stop="banner_index = 3">
          <img class="warning_icon" src="../static/warning_active.png" v-if="banner_index == 3">
          <img class="warning_icon" src="../static/warning_data.png" v-if="price_warning_list.length > 0 && banner_index != 3">
          <img class="warning_icon" src="../static/warning_null.png" v-if="price_warning_list.length == 0 && banner_index != 3">
          <div>控价预警</div>
        </div>
      </div>
      <div class="selected_right">
        <div>{{screen_open?'收起':'展开'}}</div>
        <img class="down_arrow" :class="{'rotate':screen_open == true}" src="../static/down_arrow.png">
      </div>
    </div>
    <div class="carousel_box flex ac relative" v-loading="loading" v-if="screen_open">
      <img class="check_arrow pointer" src="../static/check_left_arrow.png" @click.stop="checkArrow('1')" v-if="goods_list.length > 0">
      <div class="flex-1 ac jc" :class="{'flex':goods_list.length == 0}">
        <div v-if="goods_list.length == 0 && !loading">暂无数据</div>
        <el-carousel indicator-position="none" arrow="never" ref="hotCarousel" :autoplay="false" @change="changeIndicator">
          <el-carousel-item v-for="(array_item,index) in goods_list" :key="index">
            <!-- 控价预警 -->
            <div class="width-100 flex jsb" v-if="banner_index == 3">
              <div class="li-item pointer" v-for="item in array_item" :key="item.style_id" @click.stop="getDetail(item.style_id)">
                <img class="goods_img" :data-obj="JSON.stringify(item)" :src="domain + item.img" style="object-fit: scale-down;">
                <el-tooltip class="item" effect="dark" :content="`${item.supplier_name}：供应商款号：${item.style_name}`" placement="top">
                  <div class="hot_sell_item_title table_header_text" :data-obj="JSON.stringify(item)">{{item.supplier_name}}：供应商款号：{{item.style_name}}</div>
                </el-tooltip>
                <div class="flex jc ac">
                  <div class="hot_sell_item_price" :data-obj="JSON.stringify(item)" @click.stop="$emit('enlargeFn',{type:'vogue_widget',goods_id:item.goods_id})">{{item.num}}家店铺低于控价</div>
                </div>
              </div>
              <div class="li-item" v-for="j in 7 - array_item.length"></div>
            </div>
            <!-- 除控价预警外的数据 -->
            <div class="width-100 flex jsb" v-else>
              <div class="li-item pointer" v-for="item in array_item" :key="item.style_id" @click.stop="getDetail(item.style_id)">
                <img class="goods_img" :data-obj="JSON.stringify(item)" :src="domain + item.img" style="object-fit: scale-down;">
                <div class="hot_sell_item_title table_header_text" :data-obj="JSON.stringify(item)">{{item.title}}</div>
                <div class="flex jc ac">
                  <div class="hot_sell_item_price" :data-obj="JSON.stringify(item)" v-if
                  ="banner_index == 2">¥{{item.before_price}}&nbsp&nbsp→&nbsp&nbsp</div>
                  <div class="hot_sell_item_price" :data-obj="JSON.stringify(item)">¥{{item.cost_price}}</div>
                </div>
              </div>
              <div class="li-item" v-for="j in 7 - array_item.length"></div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="absolute indicator" v-if="goods_list.length > 0">{{current_index + 1}}/{{goods_list.length}}</div>
      <img class="check_arrow pointer" src="../static/check_right_arrow.png" @click.stop="checkArrow('2')" v-if="goods_list.length > 0">
    </div>
  </div>

</template>

<script>

  import resource from '../api/resource.js'
  export default {
    data () {
      return {
        banner_index:0,           //0:爆款专区；1:新品热销；2:降价精选；3:控价预警；4:白坯二开
        current_index:0,          //当前幻灯片的索引
        goods_list:[],            //当前显示的商品列表
        hot_list:[],              //爆款列表
        new_list:[],              //新品热销
        reduction_price_list:[],  //降价精选
        price_warning_list:[],    //控价预警
        tofo_list:[],             //白坯二开
        screen_open:true,
        loading:false,
      }
    },
    computed:{
      //图片前缀
      domain(){
        return this.$store.state.domain;
      }
    },
    watch:{
      banner_index:function(n,o){
        if(n != o){
          switch(n){
          case 0:
            this.goods_list = this.hot_list;
            break;
          case 1:
            this.goods_list = this.new_list;
            break;
          case 2:
            this.goods_list = this.reduction_price_list;
            break;
          case 3:
            this.goods_list = this.price_warning_list;
            break;
          case 4:
            this.goods_list = this.tofo_list;
            break;
          }
          this.current_index = 0;
        }
      }
    },
    created(){
      //爆款列表
      this.hotSellGoods();
    },
    methods:{
      //爆款列表
      hotSellGoods(){
        this.loading = true;
        resource.hotSellGoods().then(res => {
          if(res.data.code == 1){
            this.loading = false;
            let hot_sell_goods = res.data.data;
            let hot_list = hot_sell_goods.hot_list;
            this.hot_list = this.groupArray(hot_list, 7);

            let new_list = hot_sell_goods.new_list;
            this.new_list = this.groupArray(new_list, 7);

            let reduction_price_list = hot_sell_goods.reduction_price_list;
            this.reduction_price_list = this.groupArray(reduction_price_list, 7);

            let price_warning_list = hot_sell_goods.price_warning_list;
            this.price_warning_list = this.groupArray(price_warning_list, 7);

            let tofo_list = hot_sell_goods.tofo_list;
            this.tofo_list = this.groupArray(tofo_list, 7);

            this.goods_list = this.hot_list;
          }else{
            this.$message.warning(res.data.msg);
          }
        })
      },
      //切换当前展示的幻灯片
      changeIndicator(index){
        this.current_index = index;
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
  .vogue_widget .el-carousel__container{
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
    padding-right: 26px;
    color: #333333;
    font-size: 14px;
    .banner_item{
      border-radius: 18px 18px 0 0;
      width: 140rem;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14rem;
      color: #666666;
    }
    .warning_icon{
      margin-right: 4rem;
      width: 15rem;
      height: 14rem;
    }
    .active_banner_item{
      background: #F37605;
      color: #FFFFFF;
      font-weight: bold;
    }
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
  .border_bottom{
    border-bottom: 1px solid #F37605;
  }
  .indicator{
    top:16rem;
    right: 29rem;
    font-size: 16rem;
    color: #FFD7B6;
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
      color: #F37605;
      font-size: 12rem;
    }
  }
</style>