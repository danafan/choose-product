<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<SearchWidget @callback="searchFn" placeholder="输入供应商名称搜索"/>
			<el-card class="card_box" id="card_box" v-loading="loading">
				<div class="list_content" :style="{height: scroll_height}" v-if="supplier_list.length > 0">
					<div class="supplier_item" v-for="item in supplier_list">
						<div class="text_info">
							<div class="info_item">供应商：{{item.supplier_name}}</div>
							<div class="info_item">供应商编码：{{item.supplier_code}}{{item.supplier_code}}{{item.supplier_code}}{{item.supplier_code}}</div>
							<div class="info_item">主营：{{item.main_business}}</div>
							<div class="info_item">结算方式：{{item.supply_monthly_settlement == 1?'月结':'现结'}}</div>
							<div class="info_item">供应商等级：<span>{{item.grade_name}}</span></div>
							<div class="info_item">介绍：{{item.description}}</div>
						</div>
						<div class="line"></div>
						<div class="text_info">
							<div class="info_item">30天销量：{{item.sales_num_30}}</div>
							<div class="info_item">7天销量：{{item.sales_num_7}}</div>
							<div class="info_item">发货率：{{item.delivery_rate}}</div>
							<div class="info_item">退货率：{{item.refund_rate}}</div>
							<div class="info_item">&nbsp</div>
							<div class="info_item">&nbsp</div>
						</div>
						<div class="image_list">
							<div v-for="i in item.goods_list" @click="getDetail(i.style_id)">
								<el-image :z-index="2006" class="image_item" :src="domain + i.img" fit="scale-down" v-if='i.img'></el-image>
								<img class="image_item" src="../../static/load_failure.png" v-else>
							</div>
						</div>
						<div class="detail_box">
							<div class="detail_button" @click="supplierDetail(item.supplier_id)">查看更多</div>
						</div>
					</div>
				</div>
				<EmptyPage :style="{height:scroll_height}" toast="暂无数据～" :is_loading="loading" v-else/>
				<PaginationWidget id="pagination" :total="total" :page="page" @checkPage="checkPage"/>
			</el-card>
			<CarWidget/>
		</div>
	</div>
</template>
<script>
	import resource from '../../api/resource.js'

	import SearchWidget from '../../components/search_widget.vue'
	import EmptyPage from '../../components/empty_page.vue'
	import CarWidget from '../../components/car_widget.vue'
	import PaginationWidget from '../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				loading:true,
				supplier_list:[],		//供应商列表
				total:0,				//总数
				page:1,
				scroll_height:0,
				search:""
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
				this.loading = true;
				resource.supplierList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
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
				let active_path = `/goods_detail?style_id=${style_id}&page_path=supplier`;
				const routeData = this.$router.resolve(active_path);
				window.open(routeData.href);
			},
			//点击跳转供应商详情
			supplierDetail(supplier_id){
				let active_path = `/supplier_detail?supplier_id=${supplier_id}`;
				const routeData = this.$router.resolve(active_path);
				window.open(routeData.href);
			}
		},
		components:{
			SearchWidget,
			EmptyPage,
			CarWidget,
			PaginationWidget
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
				.line{
					background:#F3F3F3;
					width: 1px;
					height: 100%;
				}
				.text_info{
					width: 150rem;
					padding-left: 20rem;
					padding-right: 20rem;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-around;
					.info_item{
						width: 100%;
						font-size:12rem;
						color: #333333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
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
						width: 180rem;
						height: 180rem;
						cursor: pointer;
					}
				}
				.detail_box{
					width: 88rem;
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
						cursor:pointer;
					}
				}
			}
		}
		.list_content::-webkit-scrollbar{display:none}
	}
}
</style>