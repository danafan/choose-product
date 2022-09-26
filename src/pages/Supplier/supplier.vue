<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<SearchWidget @callback="searchFn" placeholder="供应商搜索"/>
			<el-card class="card_box" id="card_box">
				<div class="list_content" :style="{height: scroll_height}">
					<div class="supplier_item" v-for="item in supplier_list">
						<div class="text_info">
							<div class="info_item">供应商：{{item.supplier_name}}</div>
							<div class="info_item">供应商编码：{{item.supplier_code}}</div>
							<div class="info_item">主营：{{item.main_business}}</div>
							<div class="info_item">结算方式：{{item.supply_monthly_settlement == 1?'月结':'现结'}}</div>
							<div class="info_item">评级：<span>{{item.grade_name}}</span></div>
						</div>
						<div class="image_list">
							<el-image :z-index="2006" class="image_item" :src="domain + i.img" fit="scale-down" v-for="i in item.goods_list" @click="getDetail(i.style_id)"></el-image>
						</div>
						<div class="detail_box">
							<div class="detail_button" @click="supplierDetail(item.supplier_id)">查看更多</div>
						</div>
					</div>
				</div>
				<PaginationWidget id="pagination" :total="total" :page="page" @checkPage="checkPage"/>
			</el-card>
		</div>
	</div>
</template>
<script>
	import resource from '../../api/resource.js'

	import SearchWidget from '../../components/search_widget.vue'
	import PaginationWidget from '../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				supplier_list:[],		//供应商列表
				total:0,				//总数
				page:1,
				scroll_height:0
			}
		},
		destroyed() {
			window.removeEventListener("resize", () => {});
		},
		created(){
			//获取供应商列表
			this.supplierList();
		},
		mounted() {
    		//获取表格最大高度
    		this.onResize();
    		window.addEventListener("resize", this.onResize());
    	},
    	computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
		},
    	methods: {
    		//监听屏幕大小变化
    		onResize() {
    			this.$nextTick(() => {
    				let card_box_height = document.getElementById("card_box").offsetHeight;
    				let pagination_height = document.getElementById("pagination").offsetHeight;
    				this.scroll_height =
    				card_box_height -
    				pagination_height -
    				55 +
    				"px";
    			});
    		},
			//搜索
			searchFn(value){
				this.search = value;
				this.page = 1;
				//获取供应商列表
				this.supplierList();
			},
			//获取供应商列表
			supplierList(){
				let arg = {
					search:this.search,
					page:this.page,
					pagesize:10
				}
				resource.supplierList(arg).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.supplier_list = data.data;
						this.total = data.total;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},	
			//翻页
			checkPage(val) {
				this.page = val;
				//获取供应商列表
				this.supplierList();
			},
			//点击跳转商品详情
    		getDetail(style_id){
    			const routeData = this.$router.resolve(`/goods_detail?style_id=${style_id}`);
    			window.open(routeData.href);
    		},
			//点击跳转供应商详情
			supplierDetail(supplier_id){
				const routeData = this.$router.resolve(`/supplier_detail?supplier_id=${supplier_id}`);
				window.open(routeData.href);
			}
		},
		components:{
			SearchWidget,
			PaginationWidget
		}
	}
</script>
<style lang="less" scoped>
.padding_page_content{
	width: 1440rem;
	height: 100%;display: flex;
	flex-direction: column;
	.card_box{
		flex:1;
		.list_content{
			height: 200px;
			overflow-y: scroll;
			.supplier_item{
				margin-bottom: 18rem;
				border: 1px solid #F0F0F0;
				width: 100%;
				height: 220rem;
				display: flex;
				padding: 10rem 0;
				.text_info{
					width: 200rem;
					padding-left: 30rem;
					padding-right: 30rem;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-around;
					.info_item{
						font-size:12rem;
						color: #333333;
						span{
							color: var(--color);
							font-weight: bold;
						}
					}
				}
				.image_list{
					flex:1;
					display: flex;
					.image_item{
						margin-right: 20rem;
						width: 202rem;
						height: 202rem;
					}
				}
				.detail_box{
					width: 108rem;
					display: flex;
					align-items: center;
					justify-content: center;
					.detail_button{
						border:1px solid var(--color);
						border-radius:4rem;
						background: #FEEDDD;
						width: 64rem;
						text-align: center;
						height: 32rem;
						line-height: 32rem;
						font-size:12rem;
						color: var(--color);
					}
				}
			}
		}
	}
}
</style>