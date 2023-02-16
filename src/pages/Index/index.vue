<template>
	<div class="padding_page ddd">
		<div class="index_container">
			<div class="padding_page_content">
				<SearchWidget page_path="index_history" @callback="searchFn" placeholder="搜索款式编码、标题、款号、供应商"/>
				<el-card class="card_box" id="card_box">
					<ScreeningWidget id="screen_widget" v-if="show_screen" :total_num="total" @callback="screenFn"/>
					<div class="scroll_view" v-if="goods_list.length > 0">
						<div class="goods_list">
							<GoodsItem :info="item" @setStatus="setStatus" v-for="item in goods_list" @callback="getList"/>
							<div class="padding_item" v-for="i in 6-(goods_list.length%6) == 6?0:6-(goods_list.length%6)"></div>
						</div>
						<PaginationWidget :total="total" :page="page" :pagesize="pagesize" @checkPage="checkPage"/>
					</div>
					<EmptyPage :is_loading="loading" v-else/>
				</el-card>
			</div>
			<CarWidget :is_fixed="true"/>
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
				total:0,		//总数量
				page:1,			//页码
				pagesize:30,			//页码
				search:"",
				arg:{}
				
			}
		},
		created(){
			let arg = {
				page:this.page,
				pagesize:this.pagesize
			} 
			//获取列表
			this.getList(arg);
		},
		methods:{
			//搜索
			searchFn(value){
				this.page = 1;
				this.search = value;
				this.arg = {
					page:this.page
				} 
				//获取列表
				this.getList(this.arg);
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
			//设置已加入
			setStatus(style_id){
				this.goods_list.map(item => {
					if(item.style_id == style_id){
						item.in_cart = 1; 
					}
				})
			}
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
.ddd{
	overflow-y: scroll;
}
.index_container{
	position: relative;
	width: 1725rem;
	height: 100%;
}
.index_container::-webkit-scrollbar{display:none}
.padding_page_content{
	position: absolute;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	.card_box{
		.scroll_view{
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
.padding_page_content::-webkit-scrollbar{display:none}
</style>










