<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<SearchWidget page_path="index_history" @callback="searchFn" placeholder="首页搜索"/>
			<el-card class="card_box" id="card_box">
				<ScreeningWidget id="screen_widget" v-if="show_screen" :total_num="total" @callback="screenFn"/>
				<div class="scroll_view" :style="{height:max_height}" v-if="goods_list.length > 0">
					<div class="goods_list">
						<GoodsItem :info="item" v-for="item in goods_list" @callback="getList"/>
						<div class="padding_item" v-for="i in 5-(goods_list.length%5) == 5?0:5-(goods_list.length%5)"></div>
					</div>
					<PaginationWidget :total="total" :page="page" @checkPage="checkPage"/>
				</div>
				<EmptyPage :style="{height:max_height}" :is_loading="loading" v-else/>
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
	import EmptyPage from '../../components/empty_page.vue'

	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				loading:true,
				show_screen:true,
				goods_list:[],	//商品列表
				max_height:0,
				total:0,		//总数量
				page:1,			//页码
				search:"",
				arg:{}
				
			}
		},
		destroyed() {
			window.removeEventListener("resize", () => {});
		},
		created(){
			let arg = {
				page:this.page
			} 
			//获取列表
			this.getList(arg);
		},
		mounted() {
    		//获取表格最大高度
    		this.onResize();
    		window.addEventListener("resize", this.onResize());
    	},
    	methods:{
			//监听屏幕大小变化
			onResize() {
				this.$nextTick(() => {
					let card_box_height = document.getElementById("card_box").offsetHeight;
					let screen_widget_height = document.getElementById("screen_widget").offsetHeight;
					this.max_height =
					card_box_height -
					screen_widget_height -
					50 +
					"px";
				});
			},
			//搜索
			searchFn(value){
				this.page = 1;
				this.search = value;
				let arg = {
					page:this.page
				} 
				//获取列表
				this.getList(arg);
				//重新加载筛选条件
				this.show_screen = false;
				this.$nextTick(() => {
					this.show_screen = true;
				})
			},
			//查询条件回调
			screenFn(arg){
				this.page = 1;
				this.arg = arg;
				let obj = {...this.arg,...{page:this.page}};
				//获取列表
				this.getList(obj);
			},
			//翻页
			checkPage(val) {
				this.page = val;
				let obj = {...this.arg,...{page:this.page}};
				//获取列表
				this.getList(obj);
			},
			//获取列表
			getList(arg){
				arg.search = this.search;
				this.loading = true;
				resource.getGoodsList(arg).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.goods_list = data.data;
						this.total = data.total;
						this.loading = false;
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
			CarWidget,
			EmptyPage
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
		display: flex;
		flex-direction: column;
		.scroll_view{
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
}
</style>










