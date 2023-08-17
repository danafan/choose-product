<template>
	<div class="padding_page scroll-y" ref="paddingPageContent">
		<div class="index_container">
			<div class="padding_page_content">
				<div class="flex ac">
					<SearchWidget page_path="index_history" @callback="searchFn" placeholder="搜索款式编码、标题、款号、供应商"/>
					<div class="carousel_box" v-if="new_notice_list.length > 0">
						<img class="top_line" src="../../static/notice_top_line.png">
						<el-carousel class="custom_carousel" direction="vertical" indicator-position="none" :initial-index="initialIndex">
							<el-carousel-item v-for="(item,i) in new_notice_list" :key="i">
								<div class="custom_item">
									<div class="notice_item flex ac pointer" :class="{'border_bottom':index <= 1}" v-for="(i,index) in item" @click="noticeDetail(i.notice_id)">{{i.notice_title}}</div>
									</div>
								</el-carousel-item>
							</el-carousel>
						</div>
					</div>
					<VogueWidget/>
					<el-card class="card_box" id="card_box">
						<ScreeningWidget id="screen_widget" v-if="show_screen" :total_num="total" @callback="screenFn"/>
						<div class="scroll_view" v-if="goods_list.length > 0">
							<div class="goods_list">
								<GoodsItem :info="item" @setStatus="setStatus" v-for="item in goods_list" @callback="getList" @enlargeFn="enlargeFn"/>
								<div class="padding_item" v-for="i in 6-(goods_list.length%6) == 6?0:6-(goods_list.length%6)"></div>
							</div>
							<PaginationWidget :total="total" :page="page" :pagesize="pagesize" :show_multiple="false" @checkPage="checkPage"/>
						</div>
						<EmptyPage :is_loading="loading" v-else/>
					</el-card>
				</div>
				<img class="scroll_top_icon" src="../../static/scroll_top_icon.png" @click="setScrollTop">
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
						<div class="charts_div" id="zst" v-if="!chart_loading"></div>
						<div class="charts_div" id="qst" v-if="!chart_loading"></div>
					</div>
				</div>
			</el-dialog>
		</div>
	</template>
	<script>
		import SearchWidget from '../../components/search_widget.vue'
		import ScreeningWidget from '../../components/screening_widget.vue'
		import GoodsItem from '../../components/goods_item.vue'
		import PaginationWidget from '../../components/pagination_widget.vue'
		import CarWidget from '../../components/car_widget.vue'
		import EmptyPage from '../../components/empty_page.vue'
		import VogueWidget from '../../components/vogue_widget.vue'

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
				arg:{},
				enlarge_dialog:false,
				enlarge_item:{},
				initialIndex:0,
				new_notice_list:[],
				zstChart:null,
				qstChart:null,
				chart_loading:false
			}
		},
		created(){
			let arg = {
				page:this.page,
				pagesize:this.pagesize
			} 
			//获取列表
			this.getList(arg);
			if(this.notice_list.length > 0){
				this.new_notice_list = this.group_notice_list(this.notice_list);
			}
		},
		watch:{
			notice_list:function(n,o){
				if(n.length > 0){
					this.new_notice_list = this.group_notice_list(n);
				}
			}
		},
		computed: {
      		//公告列表
			notice_list() {
				return this.$store.state.notice_list;
			},
		},
		methods:{
			setScrollTop(){
				this.$refs.paddingPageContent.scrollTop = 0;
			},
			group_notice_list(array) {
				let index = 0;
				let newArray = [];
				while(index < array.length) {
					newArray.push(array.slice(index, index += 3));
				}
				if(newArray.length == 2){
					newArray.unshift(newArray[1]);
					newArray.push(newArray[1]);
					this.initialIndex = 1;
				}
				return newArray;
			},
			//获取公告列表
			getNotice(){
				this.$store.dispatch('getNotice')
			},
			//查看公告
			noticeDetail(notice_id){
        		//获取公告详情
				let arg = {
					notice_id:notice_id
				}
				resource.noticeInfo(arg).then(res => {
					if(res.data.code == 1){
            			//获取公告列表
						this.getNotice();
						let active_path = `/notice_page?notice_id=${notice_id}`;
						const routeData = this.$router.resolve(active_path);
						window.open(routeData.href);
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
			},
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
							let seven_days = data.seven_days;				//7天日期数组
							let seven_sale_nums = data.seven_sale_nums;		//7天销量数组
							var zst_chart = document.getElementById('zst');
							this.zstChart = echarts.getInstanceByDom(zst_chart)
							if (this.zstChart == null) { 
								this.zstChart = echarts.init(zst_chart);
							}
							this.zstChart.setOption(this.lineSetOptions('7天销量走势图',seven_days,seven_sale_nums,'bar'));

							let thirty_days = data.thirty_days;				//30天日期数组
							let thirty_sale_nums = data.thirty_sale_nums;	//30天销量数组
							var qst_chart = document.getElementById('qst');
							this.qstChart = echarts.getInstanceByDom(qst_chart)
							if (this.qstChart == null) { 
								this.qstChart = echarts.init(qst_chart);
							}
							this.qstChart.setOption(this.lineSetOptions('30天销量趋势图',thirty_days,thirty_sale_nums,'line'));
						})
					}else{
						this.$message.warning(res.data.msg);
					}
				})

				
			},
			//折线图配置
			lineSetOptions(title,x_axis,series_data,type){
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
						type: type
					}
					
				}
			}
		},
		components:{
			SearchWidget,
			ScreeningWidget,
			GoodsItem,
			PaginationWidget,
			CarWidget,
			EmptyPage,
			VogueWidget
		}
	}
</script>
<style type="text/css" lang="less">
	.custom_class{
		width: 960rem!important;
	}
</style>
<style lang="less" scoped>
	.carousel_box{
		margin-right: 30rem;
		width: 320rem;
		height: 100rem;
		background: #FFFFFF;
		box-shadow: 0px 0px 6px 0px #FFF3E8;
		border-radius: 8px;
		.top_line{
			width: 320rem;
			height: 5rem;
			display: block;
		}
		.custom_carousel{
			width: 320rem;
			height: 100rem;
			.custom_item{
				height: 100rem;
				padding-left:10rem;
				padding-right:10rem;
				.notice_item{
					height: 32rem;
					line-height: 32rem;
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					font-size: 12px;
					color: #6C6C6C;
				}
				.border_bottom{
					border-bottom: 1px solid #E6E6E6;
				}
			}
		}
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
			padding-top:10px;
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
	.scroll_top_icon{
		position: fixed;
		top: 56%;
		right: 8rem;
		width: 82rem;
		height: 82rem;
		z-index: 9;
		cursor:pointer;
	}
	.chart_box{
		width: 500rem;
		.charts_div{
			width: 500rem;
			height: 300rem;
		}
	}
</style>










