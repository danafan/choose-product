<template>
	<div class="padding_page ddd">
		<div class="supplier_detail_container">
			<div class="padding_page_content">
				<SearchWidget page_path="supplier_detai" @callback="searchFn" placeholder="供应商详情搜索"/>
				<el-card class="card_box" id="card_box">
					<div class="top_content" id="top_content">
						<div class="info_row">
							<div class="info_item">
								<div class="info_lable">供应商：</div>
								<div class="info_value">{{supplier_info.supplier_name}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">供应商编码：</div>
								<div class="info_value">{{supplier_info.supplier_code}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">核心供应商：</div>
								<div class="info_value">{{supplier_info.is_core==1?'是':'否'}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">主营：</div>
								<div class="info_value">{{supplier_info.main_business}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">结算方式：</div>
								<div class="info_value">{{supplier_info.supply_monthly_settlement == 1?'月结':'现结'}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">介绍：</div>
								<el-tooltip class="item" effect="dark" :content="supplier_info.description" placement="top-end">
									<div class="info_value">{{supplier_info.description}}</div>
								</el-tooltip>
							</div>
						</div>
						<div class="info_line"></div>
						<div class="info_row">
							<div class="info_item">
								<div class="info_lable">代发：</div>
								<div class="info_value">{{supplier_info.supply_replace_send == 1?'是':'否'}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">入仓：</div>
								<div class="info_value">{{supplier_info.supply_warehousing == 1?'是':'否'}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">退货：</div>
								<div class="info_value">{{supplier_info.supply_return_goods == 1?'是':'否'}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">拍照：</div>
								<div class="info_value">{{supplier_info.supply_photograph == 1?'是':'否'}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">评级：</div>
								<div class="info_value">{{supplier_info.grade_name}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">7天销量：</div>
								<div class="info_value">{{supplier_info.sales_num_7}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">30天销量：</div>
								<div class="info_value">{{supplier_info.sales_num_30}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">发货率：</div>
								<div class="info_value">{{supplier_info.delivery_rate}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">退货率：</div>
								<div class="info_value">{{supplier_info.refund_rate}}</div>
							</div>
						</div>
					</div>
					<ScreeningWidget id="screen_widget" v-if="show_screen" :total_num="total" page_type="supplier" @callback="screenFn"/>
					<div class="scroll_view" v-if="goods_list.length > 0">
						<div class="goods_list">
							<GoodsItem :info="item" @setStatus="setStatus" v-for="item in goods_list"/>
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
	import resource from '../../api/resource.js'

	import SearchWidget from '../../components/search_widget.vue'
	import ScreeningWidget from '../../components/screening_widget.vue'
	import GoodsItem from '../../components/goods_item.vue'
	import PaginationWidget from '../../components/pagination_widget.vue'
	import CarWidget from '../../components/car_widget.vue'
	import EmptyPage from '../../components/empty_page.vue'
	export default{
		data(){
			return{
				supplier_id:"",				//供应商ID
				supplier_info:{},			//基本信息
				loading:true,
				goods_list:[],	//商品列表
				total:0,		//总数量
				page:1,			//页码
				pagesize:30,
				search:"",
				show_screen:true,
				arg:{}
			}
		},
		created(){
			this.supplier_id = this.$route.query.supplier_id;
			//供应商基本信息
			this.supplierInfo();
			let arg = {
				page:this.page,
				pagesize:this.pagesize
			} 
			//获取列表
			this.getList(arg);
		},
		methods:{
			//供应商基本信息
			supplierInfo(){
				let arg = {
					supplier_id:this.supplier_id
				}
				resource.supplierInfo(arg).then(res => {
					if(res.data.code == 1){
						this.supplier_info = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
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
				arg.pagesize = 30;
				arg.search = this.search;
				arg.supplier_id = this.supplier_id;
				this.loading = true;
				resource.supplierGoods(arg).then(res => {
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
.supplier_detail_container{
	position: relative;
	width: 1725rem;
	height: 100%;
}
.supplier_detail_container::-webkit-scrollbar{display:none}
.padding_page_content{
	position: absolute;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	// overflow-y: scroll;
	.card_box{
		.top_content{
			margin-bottom: 20rem;
			border: 1px solid #DEDEDE;
			padding-left: 10rem;
			padding-right: 10rem;
			.info_row{
				display: flex;
				align-items: center;
				padding-top: 8rem;
				padding-bottom: 8rem;
				.info_item{
					width: 220rem;
					display: flex;
					align-items: center;
					font-size: 12rem;
					.info_lable{
						color: #999999;
					}
					.info_value{
						flex:1;
						color: #333333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
			.info_line{
				width: 100%;
				border-bottom: 1px solid #DEDEDE;
			}
		}
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










