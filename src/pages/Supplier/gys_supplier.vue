<template>
	<div class="padding_page ddd">
		<div class="supplier_detail_container">
			<div class="padding_page_content">
				<SearchWidget page_path="supplier_detai" @callback="searchFn" placeholder="搜索款号"/>
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
						</div>
					</div>
					<ScreeningWidget id="screen_widget" v-if="show_screen" :total_num="total" page_type="gys_supplier" @callback="screenFn"/>
					<div class="scroll_view" v-if="goods_list.length > 0">
						<div class="goods_list">
							<GoodsItem @reload="getList(arg)" :info="item" v-for="item in goods_list"/>
							<div class="padding_item" v-for="i in 6-(goods_list.length%6) == 6?0:6-(goods_list.length%6)"></div>
						</div>
						<PaginationWidget :total="total" :page="page" :pagesize="pagesize" @checkPage="checkPage"/>
					</div>
					<EmptyPage :is_loading="loading" v-else/>
				</el-card>
			</div>
		</div>
	</div>
</template>
<script>
	import resource from '../../api/supplier_resource.js'

	import SearchWidget from '../../components/search_widget.vue'
	import ScreeningWidget from '../../components/screening_widget.vue'
	import GoodsItem from '../../components/gys_goods_item.vue'
	import PaginationWidget from '../../components/pagination_widget.vue'
	import EmptyPage from '../../components/empty_page.vue'
	export default{
		data(){
			return{
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
				resource.supplierInfo().then(res => {
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
				this.loading = true;
				resource.supplierIndex(arg).then(res => {
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
						color: #333333;
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










