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
								<div class="info_lable">7天发货率：</div>
								<div class="info_value">{{supplier_info.delivery_rate}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">7天退货率：</div>
								<div class="info_value">{{supplier_info.refund_rate}}</div>
							</div>
							<div class="info_item">
								<div class="info_lable">30天退货率：</div>
								<div class="info_value">{{supplier_info.refund_rate_30}}</div>
							</div>
						</div>
					</div>
					<ScreeningWidget id="screen_widget" v-if="show_screen" :total_num="total" page_type="supplier" @callback="screenFn"/>
					<div class="scroll_view" v-if="goods_list.length > 0">
						<div class="goods_list">
							<GoodsItem :info="item" @setStatus="setStatus" v-for="item in goods_list" @enlargeFn="enlargeFn"/>
							<div class="padding_item" v-for="i in 6-(goods_list.length%6) == 6?0:6-(goods_list.length%6)"></div>
						</div>
						<PaginationWidget :total="total" :page="page" :pagesize="pagesize" :show_multiple="false" @checkPage="checkPage"/>
					</div>
					<EmptyPage :is_loading="loading" v-else/>
				</el-card>
			</div>
			<CarWidget :is_fixed="true"/>
		</div>
		<!-- 点击放大 -->
		<el-dialog :visible.sync="enlarge_dialog" :show-close="false" custom-class="custom_class">
			<div slot="title" class="dialog_title" style="justify-content: flex-end;">
				<img class="close_icon" src="../../static/close_icon.png" @click="enlarge_dialog = false">
			</div>
			<div class="flex">
				<GoodsItem :info="enlarge_item" @setStatus="setStatus" :is_enlarge="true"/>
				<div class="chart_box flex fc ac jsa" v-loading="chart_loading">
					<div>在售店铺数（含有销量）：{{shop_data.length}}个</div>
					<el-table size="mini" :data="shop_data" tooltip-effect="dark" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="280"v-loading="chart_loading">
						<el-table-column label="店铺" prop="shop_name"></el-table-column>
						<el-table-column label="30天销量" prop="xssl_30"></el-table-column>
						<el-table-column label="7天销量" prop="xssl_7"></el-table-column>
						<el-table-column label="店铺链接">
							<template slot-scope="scope">
								<el-button type="text" @click="openStore(scope.row.url)">进入</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-radio-group size="small" @input="checkChart" v-model="chart_value">
						<el-radio-button label="30">30天销量趋势图</el-radio-button>
						<el-radio-button label="7">7天销量趋势图</el-radio-button>
					</el-radio-group>
					<div class="charts_div" id="chart" v-if="!chart_loading"></div>
				</div>
			</div>
		</el-dialog>
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
				arg:{},
				enlarge_dialog:false,
				enlarge_item:{},
				chartBox:null,
				chart_loading:false,
				shop_data:[],
				chart_value:'30',					//趋势图表切换
				seven_days:[],
				seven_sale_nums:[],
				thirty_days:[],
				thirty_sale_nums:[]
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
			//点击放大
			enlargeFn(info){
				this.enlarge_item = info;
				this.enlarge_dialog = true;
				this.chart_loading = true;
				resource.styleSaleNum({style_id:info.style_id}).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.chart_loading = false;
						var echarts = require("echarts");
						this.$nextTick(() => {
							this.seven_days = data.seven_days;				//7天日期数组
							this.seven_sale_nums = data.seven_sale_nums;	//7天销量数组
							this.thirty_days = data.thirty_days;			//30天日期数组
							this.thirty_sale_nums = data.thirty_sale_nums;	//30天销量数组
							this.shop_data = data.shop;						//在售店铺数
							//切换图表
							this.checkChart();
						})
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换图表
			checkChart(){
				var echarts = require("echarts");
				var chart = document.getElementById('chart');
				this.zstChart = echarts.getInstanceByDom(chart)
				if (this.chartBox == null) { 
					this.chartBox = echarts.init(chart);
				}
				this.chartBox.setOption(this.lineSetOptions(`${this.chart_value}天销量走势图`,this.chart_value == 30?this.thirty_days:this.seven_days,this.chart_value == 30?this.thirty_sale_nums:this.seven_sale_nums));
			},
			//折线图配置
			lineSetOptions(title,x_axis,series_data){
				return {
					title: {
						text: title
					},
					tooltip: {
						trigger: 'axis',
						formatter: function (params) {
							let tip = "";
							if(params != null && params.length > 0) {
								tip = "日期：" + params[0].axisValue + "</br>"
								+ "销量：" + params[0].value;
							}
							return tip;
						},
						backgroundColor:"rgba(0,0,0,.8)",
						textStyle:{
							color:"#ffffff"
						},
						borderColor:"rgba(0,0,0,0.7)",
						axisPointer: {            
							type: 'shadow'        
						}
					},
					xAxis: {
						type: 'category',
						data: x_axis
					},
					yAxis: {
						type: 'value',
						name: '销量'
					},
					series: 
					{
						data: series_data,
						type: 'line'
					}
					
				}
			},
			//点击进入店铺详情
			openStore(store_url){
				window.open(store_url)
			},
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
			setStatus(goods_id){
				this.goods_list.map(item => {
					if(item.goods_id == goods_id){
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
<style type="text/css" lang="less">
	.custom_class{
		width: 960rem!important;
	}
</style>
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
.chart_box{
	width: 500rem;
	.charts_div{
		width: 500rem;
		height: 300rem;
	}
}
</style>










