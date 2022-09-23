<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<SearchWidget page_path="index_history" @callback="searchFn" placeholder="首页搜索"/>
			<el-card class="card_box">
				<ScreeningWidget :total_num="goods_list.length" @callback="screenFn"/>
				<div class="goods_list">
					<GoodsItem :info="item" v-for="item in goods_list" @callback="getList"/>
					<div class="padding_item" v-for="i in 5-(goods_list.length%5) == 5?0:5-(goods_list.length%5)"></div>
				</div>
				<PaginationWidget :total="total" :page="arg.page" @checkPage="checkPage"/>
			</el-card>
			<CarWidget/>
		</div>
	</div>
</template>
<script>
	import SearchWidget from '../../components/search_widget.vue'
	import ScreeningWidget from '../../components/screening_widget.vue'
	import GoodsItem from '../../components/goods_item.vue'
	import PaginationWidget from '../../components/pagination_widget.vue'
	import CarWidget from '../../components/car_widget.vue'

	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				goods_list:[],	//商品列表
				total:0,		//总数量
				arg:{
					page:1
				},		//查询条件
				
			}
		},
		created(){
			//获取列表
			this.getList();
		},
		methods:{
			//搜索
			searchFn(value){
				let obj = {search:value};
				this.arg = {...this.arg,...obj};
				//获取列表
				this.getList();
			},
			//查询条件回调
			screenFn(arg){
				this.arg = {...this.arg,...arg};
				//获取列表
				this.getList();
			},
			//翻页
			checkPage(val) {
				this.arg.page = val;
				//获取列表
				this.getList();
			},
			//获取列表
			getList(){
				resource.getGoodsList(this.arg).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.goods_list = data.data;
						this.total = data.total;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
		},
		components:{
			SearchWidget,
			ScreeningWidget,
			GoodsItem,
			PaginationWidget,
			CarWidget
		}
	}
</script>
<style lang="less" scoped>
.padding_page_content{
	width: 1440rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	.card_box{
		flex:1;
		overflow-y: scroll;
		.goods_list{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.padding_item{
				width: 265rem;
			}
		}
	}
}
</style>










