<template>
	<div class="screen_container">
		<div class="total_num">共有{{total_num}}件相关商品</div>
		<div class="selected_box" @click.stop="checkFn">
			<div class="selected_left">
				<div>已选条件</div>
				<div class="tj_row" v-if="supplier_index == 0 && market_index == 0 && category_index == 0 && class_index == 0 && style_index == 0 && rating_index == 0">
					<img class="right_arrow" src="../static/down_arrow.png">
					<div>全部</div>
				</div>
				<div class="tj_row" v-else>
					<img class="right_arrow" src="../static/down_arrow.png" v-if="page_type == 'index'">
					<div v-if="supplier_list.length > 0 && page_type == 'index'">{{supplier_list[supplier_index].supplier_name}}</div>
					<img class="right_arrow" src="../static/down_arrow.png">
					<div v-if="market_list.length > 0">{{market_list[market_index].market_name}}</div>
					<img class="right_arrow" src="../static/down_arrow.png">
					<div v-if="category_list.length > 0">{{category_list[category_index].category_name}}</div>
					<img class="right_arrow" src="../static/down_arrow.png">
					<div v-if="class_list.length > 0">{{class_list[class_index].classification_name}}</div>
					<img class="right_arrow" src="../static/down_arrow.png">
					<div v-if="style_list.length > 0">{{style_list[style_index].shooting_style_name}}</div>
					<img class="right_arrow" src="../static/down_arrow.png">
					<div v-if="rating_list.length > 0">{{rating_list[rating_index].grade_name}}</div>
				</div>
				
			</div>
			<div class="selected_right">
				<div>{{screen_open?'收起':'展开'}}</div>
				<img class="down_arrow" :class="{'rotate':screen_open == true}" src="../static/down_arrow.png">
			</div>
		</div>
		<el-card class="conditions_box" v-if="screen_open">
			<div class="conditions_row" v-if="page_type == 'index'">
				<div class="lable">供应商：</div>
				<div class="list">
					<div class="item" :class="{'active_item':supplier_index == index}" v-for="(item,index) in supplier_list" @click.stop="checkIndex('supplier',index)">{{item.supplier_name}}</div>
				</div>
			</div>
			<div class="conditions_row">
				<div class="lable">市场：</div>
				<div class="list">
					<div class="item" :class="{'active_item':market_index == index}" v-for="(item,index) in market_list" @click.stop="checkIndex('market',index)">{{item.market_name}}</div>
				</div>
			</div>
			<div class="conditions_row">
				<div class="lable">类目：</div>
				<div class="list">
					<div class="item" :class="{'active_item':category_index == index}" v-for="(item,index) in category_list" @click.stop="checkIndex('category',index)">{{item.category_name}}</div>
				</div>
			</div>
			<div class="conditions_row">
				<div class="lable">分类：</div>
				<div class="list">
					<div class="item" :class="{'active_item':class_index == index}" v-for="(item,index) in class_list" @click.stop="checkIndex('class',index)">{{item.classification_name}}</div>
				</div>
			</div>
			<div class="conditions_row">
				<div class="lable">拍摄风格：</div>
				<div class="list">
					<div class="item" :class="{'active_item':style_index == index}" v-for="(item,index) in style_list" @click.stop="checkIndex('style',index)">{{item.shooting_style_name}}</div>
				</div>
			</div>
			<div class="conditions_row none_border">
				<div class="lable">供应商评级：</div>
				<div class="list">
					<div class="item" :class="{'active_item':rating_index == index}" v-for="(item,index) in rating_list" @click.stop="checkIndex('rating',index)">{{item.grade_name}}</div>
				</div>
			</div>
		</el-card>
		<div class="cate_box">
			<div class="sort_row">
				<div class="sort_item" :class="{'active_color':item.sort != 'default'}" v-for="(item,index) in sort_list" @click="sortFn(index)">
					<div>{{item.name}}</div>
					<img class="sort_icon" src="../static/sort_asc.png" v-if="item.sort == 'asc'">
					<img class="sort_icon" src="../static/sort_default.png" v-if="item.sort == 'default'">
					<img class="sort_icon" src="../static/sort_desc.png" v-if="item.sort == 'desc'">
				</div>
			</div>
			<div class="style_row">
				<div class="style_item" :class="{'active_color':item.is_selected === 1}" v-for="(item,index) in cate_style_list" @click="checkStyle(index)">{{item.name}}</div>
			</div>
			<div class="date_row">
				<div class="date_lable">上新时间：</div>
				<el-date-picker v-model="date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="callbackFn">
				</el-date-picker>
			</div>
			
		</div>
	</div>
</template>
<script>
	import { getNowDate,getCurrentDate } from "../api/date.js";

	import commonResource from '../api/common_resource.js'
	export default{
		data(){
			return{
				supplier_index:0,		//选中的供应商下标
				supplier_list:[],		//供应商列表
				market_index:0,			//选中的市场下标
				market_list:[],			//市场列表
				category_index:0,		//选中的类目下标
				category_list:[],		//类目列表
				class_index:0,			//选中的分类下标
				class_list:[],			//分类列表
				style_index:0,			//选中的拍摄风格下标
				style_list:[],			//拍摄风格列表
				rating_index:0,			//选中的供应商评级下标
				rating_list:[],			//供应商评级列表
				sort_list:[{
					name:'销量',
					key:'sales',
					val:'sales_num_all',
					sort:'default'
				},{
					name:'选中量',
					key:'select',
					val:'select_num',
					sort:'default'
				},{
					name:'浏览量',
					key:'views',
					val:'views_num',
					sort:'default'
				}],								//排序列表
				cate_style_list:[{
					name:'爆款',
					is_selected:0
				},{
					name:'主推款',
					is_selected:0
				},{
					name:'独家款',
					is_selected:0
				},{
					name:'二开款',
					is_selected:0
				}],								//款式列表
				date:[],						//上新日期
				pickerOptions: {
					shortcuts: [
					{
						text: "今日上新",
						onClick(picker) {
							const start = getNowDate();
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "三日上新",
						onClick(picker) {
							const start = getCurrentDate(3);
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "七日上新",
						onClick(picker) {
							const start = getCurrentDate(7);
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					],
				}, 
			}
		},
		props:{
			//index:首页；supplier:供应商
			page_type:{
				type:String,
				default:"index"
			},
			//商品总数量
			total_num:{
				type:Number,
				default:0
			}
		},
		created(){
			//获取筛选条件列表
			this.getScreenList();
		},
		computed: {
			screen_open() {
				return this.$store.state.screen_open;
			},
		},
		methods:{
			//获取筛选条件列表
			getScreenList(){
				commonResource.getScreenList().then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						let supplier_list = data.supplier;
						supplier_list.unshift({
							supplier_name:'全部',
							supplier_id:''
						})
						this.supplier_list = supplier_list;
						let market_list = data.market;
						market_list.unshift({
							market_name:'全部',
							market_id:''
						})
						this.market_list = market_list;
						let category_list = data.category;
						category_list.unshift({
							category_name:'全部',
							category_id:''
						})
						this.category_list = category_list;
						let class_list = data.classification;
						class_list.unshift({
							classification_name:'全部',
							classification_id:''
						})
						this.class_list = class_list;
						let style_list = data.shooting_style;
						style_list.unshift({
							shooting_style_name:'全部',
							shooting_style_id:''
						})
						this.style_list = style_list;
						let rating_list = data.grade;
						rating_list.unshift({
							grade_name:'全部',
							grade_id:''
						})
						this.rating_list = rating_list;
						//获取当前条件并传递
						// this.callbackFn();
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击展开或收起
			checkFn(){
				this.$store.commit("setScreen", !this.screen_open);
			},
			// 切换下拉框筛选条件
			checkIndex(type,index){
				switch(type){
					case 'supplier':
					this.supplier_index = index;
					break;
					case 'market':
					this.market_index = index;
					break;
					case 'category':
					this.category_index = index;
					break;
					case 'class':
					this.class_index = index;
					break;
					case 'style':
					this.style_index = index;
					break;
					case 'rating':
					this.rating_index = index;
					break;
				}
				//获取当前条件并传递
				this.callbackFn();
			},
			//点击切换排序条件
			sortFn(index){
				this.sort_list.map((item,i) => {
					if(index == i){
						switch(item.sort){
							case 'default':
							item.sort = 'asc';
							break;
							case 'asc':
							item.sort = 'desc';
							break;
							case 'desc':
							item.sort = 'default';
							break;
						}
					}else{
						item.sort = 'default';
					}
				})
				//获取当前条件并传递
				this.callbackFn();
			},
			//点击切换款式
			checkStyle(index){
				this.cate_style_list.map((item,i) => {
					if(index == i){
						item.is_selected = item.is_selected == 1?0:1;
					}
				})
				//获取当前条件并传递
				this.callbackFn();
			},
			//获取当前条件并传递
			callbackFn(){	
				var arg = {
					start_time:this.date && this.date.length > 0?this.date[0]:"",
					end_time:this.date && this.date.length > 0?this.date[1]:"",
					hot_style:this.cate_style_list[0].is_selected,
					data_style:this.cate_style_list[1].is_selected,
					sole_style:this.cate_style_list[2].is_selected,
					again_style:this.cate_style_list[3].is_selected
				}
				//处理排序
				let sort_arr = this.sort_list.filter(item => {
					return item.sort != 'default';
				})
				if(sort_arr.length > 0){
					arg[sort_arr[0].key] = sort_arr[0].val + '-' + sort_arr[0].sort;
				}
				//处理供应商
				if(this.page_type == 'index' && this.supplier_index > 0){
					arg.supplier_id = this.supplier_list[this.supplier_index].supplier_id;
				}
				//处理市场
				if(this.page_type == 'index' && this.market_index > 0){
					arg.market_id = this.market_list[this.market_index].market_id;
				}
				//处理类目
				if(this.category_index > 0){
					arg.category_id = this.category_list[this.category_index].category_id;
				}
				//处理分类
				if(this.class_index > 0){
					arg.classification_id = this.class_list[this.class_index].classification_id;
				}
				//处理风格
				if(this.style_index > 0){
					arg.shooting_style_id = this.style_list[this.style_index].shooting_style_id;
				}
				//处理评级
				if(this.rating_index > 0){
					arg.grade_id = this.rating_list[this.rating_index].grade_id;
				}
				this.$emit('callback',arg);
			}
		}
	}
</script>
<style lang="less" scoped>
.screen_container{
	position: relative;
}
.total_num{
	margin-bottom: 10rem;
	text-align: end;
	font-size: 12rem;
	color: #666666;
}
.selected_box{
	border: 1px solid #E8E8E8;
	padding-left: 26rem;
	padding-right: 26rem;
	background: #F5F5F5;
	height: 26rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #666666;
	font-size: 12rem;
	.selected_left{
		display: flex;
		align-items: center;
		.tj_row{
			display: flex;
			align-items: center;
		}
		.right_arrow{
			margin-left: 5rem;
			margin-right: 5rem;
			transform: rotate(-90deg);
			width: 7rem;
			height: 4rem;
		}
	}
	.selected_right{
		display: flex;
		align-items: center;
		cursor:pointer;
		.down_arrow{
			margin-left: 5rem;
			transform: rotate(-90deg);
			width: 7rem;
			height: 4rem;
		}
		.rotate{
			transform: rotate(0deg);
		}
	}
}
.conditions_box{
	position: absolute;
	background: #ffffff;
	font-size: 12rem;
	z-index: 9;
	.conditions_row{
		border-bottom: 1px dashed #DEDEDE;
		display: flex;
		padding-top: 8rem;
		.lable{
			white-space:normal;
			width: 110rem;
			color: #999999;
		}
		.list{
			flex:1;
			display: flex;
			flex-wrap: wrap;
			.item{
				cursor:pointer;
				margin-bottom: 8rem;
				margin-right: 40rem;
				color: #333333;
			}
			.active_item{
				color: var(--color);
			}
		}
	}
	.none_border{
		border:none;
	}
}
.cate_box{
	margin-top: 8rem;
	margin-bottom: 10rem;
	border:1px solid #E8E8E8;
	background: #F5F5F5;
	width: 100%;
	height: 40rem;
	padding-left: 26rem;
	padding-right: 26rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 12rem;
	color: #666666;
	.sort_row{
		display: flex;
		align-items: center;
		.sort_item{
			margin-right: 45rem;
			display: flex;
			align-items: center;
			cursor:pointer;
			.sort_icon{
				margin-left: 2rem;
				width: 9rem;
				height: 12rem;
			}
		}
	}
	.style_row{
		display: flex;
		align-items: center;
		.style_item{
			margin-right: 58rem;
			cursor:pointer;
		}
	}
	.date_row{
		display: flex;
		align-items: center;
	}
	.active_color{
		color: var(--color);
	}
}
</style>