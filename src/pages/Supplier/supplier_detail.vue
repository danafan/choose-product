<template>
	<div class="padding_page scroll-y" ref="paddingPageContent" @click.stop>
		<div class="supplier_detail_container">
			<div class="padding_page_content">
				<SearchWidget id="search_box" page_path="supplier_detai" @callback="searchFn" placeholder="输入款式编码、款号、标题关键字、进行搜索 "/>
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
								<div class="info_lable space-nowrap">主营：</div>
								<el-tooltip popper-class="tooltip_class" effect="dark" :content="supplier_info.main_business" placement="top-end">
									<div class="info_value table_header_text">{{supplier_info.main_business}}</div>
								</el-tooltip>
							</div>
							<div class="info_item">
								<div class="info_lable">结算方式：</div>
								<div class="info_value" v-if="supplier_info.supply_monthly_settlement == 0">现结</div>
								<div class="info_value" v-if="supplier_info.supply_monthly_settlement == 1">月结</div>
								<div class="info_value" v-if="supplier_info.supply_monthly_settlement == 2">半月结</div>
							</div>
							<div class="info_item">
								<div class="info_lable space-nowrap">介绍：</div>
								<el-tooltip popper-class="tooltip_class" effect="dark" :content="supplier_info.description" placement="top-end">
									<div class="info_value table_header_text">{{supplier_info.description}}</div>
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
						<div class="goods_list" id="goods_list">
							<GoodsItem :info="item" :showOffShelf="arg.check_status == 5" @setStatus="setStatus" v-for="item in goods_list" @callback="getList" @enlargeFn="enlargeFn"/>
							<div class="padding_item" v-for="i in 6-(goods_list.length%6) == 6?0:6-(goods_list.length%6)"></div>
						</div>
						<PaginationWidget :total="total" :page="page" :pagesize="pagesize" :show_multiple="false" @checkPage="checkPage"/>
					</div>
					<EmptyPage :is_loading="loading" v-else/>
				</el-card>
			</div>
			<FixedButtons :permission="[2,3]" @clipboardCallback="toClipboard"/>
		</div>
		<!-- 点击放大 -->
		<el-dialog :visible.sync="enlarge_dialog" top="15px" :show-close="false" custom-class="custom_class">
			<div slot="title" class="dialog_title" style="justify-content: flex-end;">
				<img class="close_icon" src="../../static/close_icon.png" @click="enlarge_dialog = false">
			</div>
			<div class="flex">
				<GoodsItem :info="enlarge_item" @setStatus="setStatus" :is_enlarge="true"/>
				<div class="chart_box">
					<SalenumChart :style_id="enlarge_item.style_id" v-if="enlarge_dialog"/>
				</div>
			</div>
		</el-dialog>
		<!-- 生成截屏 -->
		<el-dialog :visible.sync="clipboard_dialog">
			<div slot="title" class="dialog_title">
				<div>生成图片</div>
				<div class="flex ac">
					<el-tooltip class="item" effect="dark" content="下载" placement="top-start">
						<img class="download_image pointer" @click="downLoadImage" src="../../static/download_image.png">
					</el-tooltip>
					<img class="close_icon" src="../../static/close_icon.png" @click="clipboard_dialog = false">
				</div>
				
			</div>
			<img style="width:100%" :src="clipboard_url">
		</el-dialog>
	</div>
</template>
<script>
	import resource from '../../api/resource.js'

	import SearchWidget from '../../components/search_widget.vue'
	import ScreeningWidget from '../../components/screening_widget.vue'
	import GoodsItem from '../../components/goods_item.vue'
	import PaginationWidget from '../../components/pagination_widget.vue'
	import EmptyPage from '../../components/empty_page.vue'
	import SalenumChart from '../GoodsDetail/components/salenum_chart'
	import FixedButtons from '../../components/fixed_buttons.vue'

	import html2canvas from 'html2canvas'
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
				clipboard_dialog:false,
				clipboard_url:""
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
			//一键截图
			toClipboard() {
				html2canvas(document.getElementById("goods_list"), {
					useCORS: true, 
					backgroundColor: '#ffffff', 
				}).then((canvas) => {
					this.clipboard_url = canvas.toDataURL("image/png");
					this.clipboard_dialog = true;
				});
			},
			//下载图片
			downLoadImage() {
				const link = document.createElement('a');
				link.style.display = 'none';
				link.href = this.clipboard_url;
				link.setAttribute('download', '商品列表');
  				// 把a标签插入页面中
				document.body.appendChild(link);
				link.click();
  				// 点击之后移除a标签
				document.body.removeChild(link);
  				// 释放掉blob对象
				window.URL.revokeObjectURL(this.clipboard_url);
				this.$message.success('截图已保存至本地')
			},
			//点击放大
			enlargeFn(arg){
				this.enlarge_item = arg.info;
				this.enlarge_dialog = true;
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
				//设置定位到列表顶部
				this.setListTop();
			},
			//翻页
			checkPage(val) {
				this.page = val;
				let obj = {...this.arg,...{page:this.page}};
				//获取列表
				this.getList(obj);
				//设置定位到列表顶部
				this.setListTop();
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
						this.goods_list.map(item => {
							item['showOffShelf'] = this.arg.show_offshelf;
						})
						this.total = data.total;
						this.loading = false;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//设置定位到列表顶部
			setListTop(){
				this.$nextTick(() => {
					this.$refs.paddingPageContent.scrollTop = document.getElementById('position_id').offsetTop;
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
			EmptyPage,
			SalenumChart,
			FixedButtons
		}
	}
</script>
<style type="text/css" lang="less">
	.custom_class{
		width: 960rem!important;
	}
	.tooltip_class{
		max-width: 660rem!important;
	}
</style>
<style lang="less" scoped>
	.primary_color{
		color:#F37605;
	}
	.download_image{
		margin-right: 20rem;
		width: 18rem;
		height: 18rem;
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
						width: 260rem;
						display: flex;
						align-items: center;
						font-size: 12rem;
						.info_lable{
							color: #999999;
						}
						.info_value{
							padding-right: 15rem;
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
	.clipboard_img{
		position: fixed;
		top: 42%;
		right: 16rem;
		width: 60rem;
		height: 60rem;
		z-index: 9;
		cursor:pointer;
		display:flex;
		flex-direction:column;
		align-items:center;
		justify-content: center;
		background: #FFFFFF;
		box-shadow: 0px 2px 11px 0px #FFEAD8;
		border-radius: 30rem;
		.clipboard_icon{
			margin-bottom: 2rem;
			width: 24rem;
			height: 22rem;
		}
		.icon_text{
			color: var(--color);
			font-size: 12rem;
		}
	}

	.chart_box{
		width: 500rem;
		.charts_div{
			width: 500rem;
			height: 380rem;
		}
	}
</style>










