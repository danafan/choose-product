<template>
	<div class="chart_box flex fc ac jsa" v-loading="chart_loading">
		<div class="sale_num_title">在售店铺数（含有销量）：{{shop_data.length}}个</div>
		<el-table style="margin-bottom: 30px;" size="mini" :data="shop_data" tooltip-effect="dark" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="580" v-loading="chart_loading">
			<el-table-column label="店铺">
				<template slot-scope="scope">
					<div class="underline pointer" :class="{'primary_color':shop_name == scope.row.shop_name}" @click="checkStore(shop_name == scope.row.shop_name?'':scope.row.shop_name)">{{scope.row.shop_name}}</div>
				</template>
			</el-table-column>
			<el-table-column :label="`30天销量（${total_xssl_30})`" prop="xssl_30"></el-table-column>
			<el-table-column :label="`7天销量（${total_xssl_7})`" prop="xssl_7"></el-table-column>
			<el-table-column label="店铺链接">
				<template slot-scope="scope">
					<el-button type="text" @click="openStore(scope.row.url)">进入</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-radio-group size="small" @input="checkStore(shop_name)" v-model="chart_value">
			<el-radio-button label="30">30天销量趋势图</el-radio-button>
			<el-radio-button label="7">7天销量趋势图</el-radio-button>
		</el-radio-group>
		<div class="charts_div" id="chart" v-if="!chart_loading"></div>
	</div>
</template>
<script type="text/javascript">
	import resource from '../../../api/resource.js'
	export default{
		data(){
			return{
				chart_loading:false,
				shop_data:[],
				shop_name:"",						//点击的店铺名称
				chart_value:'30',					//趋势图表切换
				seven_days:[],
				seven_sale_nums:[],
				thirty_days:[],
				thirty_sale_nums:[],
				total_xssl_30:0,
				total_xssl_7:0,
			}
		},
		props:{
			style_id:{
				type:Number,
			default:''
			}
		},
		created(){
			//获取顶部在售店铺列表
			this.getSaleNum();
		},
		methods:{
			//获取顶部在售店铺列表
			getSaleNum(){
				this.chart_loading = true;
				resource.styleSaleNum({style_id:this.style_id}).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.shop_data = data.shop;	
						this.shop_data.map(item => {
							this.total_xssl_30 += parseInt(item.xssl_30);
							this.total_xssl_7 += parseInt(item.xssl_7);
						})
						//切换图表
						this.checkChart('',this.style_id);
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击店铺联动图表
			checkStore(shop_name){
				this.shop_name = shop_name;
				//切换图表
				this.checkChart(shop_name,this.style_id)
			},
			//切换图表
			checkChart(shop_name,style_id){
				resource.styleDayChart({style_id:style_id,shop_name:shop_name}).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.chart_loading = false;
						this.$nextTick(() => {
							this.seven_days = data.seven_days;				//7天日期数组
							this.seven_sale_nums = data.seven_sale_nums;	//7天销量数组
							this.thirty_days = data.thirty_days;			//30天日期数组
							this.thirty_sale_nums = data.thirty_sale_nums;	//30天销量数组
							var echarts = require("echarts");
							var chart = document.getElementById('chart');
							this.zstChart = echarts.getInstanceByDom(chart)
							if (this.zstChart == null) { 
								this.zstChart = echarts.init(chart);
							}
							this.zstChart.setOption(this.lineSetOptions(`${this.chart_value}天销量走势图`,this.chart_value == 30?this.thirty_days:this.seven_days,this.chart_value == 30?this.thirty_sale_nums:this.seven_sale_nums));
						})
					}else{
						this.$message.warning(res.data.msg);
					}
				})
				
			},
			//折线图配置
			lineSetOptions(title,x_axis,series_data){
				return {
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
					grid: {
						top: '30',
						bottom:'30'
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
		}
	}
</script>
<style lang="less" scoped>
	.primary_color{
		color:#F37605;
	}
	.sale_num_title{
		font-size: 20rem;
		line-height: 50rem;
		color: #333333;
	}
	.chart_box{
		width: 100%;
		// width: 500rem;
		.charts_div{
			// width: 500rem;
			width: 100%;
			height: 350rem;
		}
	}
</style>