<template>
	<div>
		<div class="total_num">共有{{total_num}}件相关商品</div>
		<div class="selected_box">
			<div class="selected_left">
				<div>已选条件</div>
				<img class="right_arrow" src="../static/down_arrow.png">
				<div>{{supplier_list[supplier_index].name}}</div>
				<img class="right_arrow" src="../static/down_arrow.png">
				<div>{{market_list[market_index].name}}</div>
				<img class="right_arrow" src="../static/down_arrow.png">
				<div>{{category_list[category_index].name}}</div>
				<img class="right_arrow" src="../static/down_arrow.png">
				<div>{{class_list[class_index].name}}</div>
				<img class="right_arrow" src="../static/down_arrow.png">
				<div>{{style_list[style_index].name}}</div>
				<img class="right_arrow" src="../static/down_arrow.png">
				<div>{{rating_list[rating_index].name}}</div>
			</div>
			<div class="selected_right" @click="checkFn">
				<div>{{title}}</div>
				<img class="down_arrow" :class="{'rotate':show_conditions_box == true}" src="../static/down_arrow.png">
			</div>
		</div>
		<div class="conditions_box" v-if="show_conditions_box">
			<div class="conditions_row">
				<div class="lable">供应商：</div>
				<div class="list">
					<div class="item" :class="{'active_item':supplier_index == index}" v-for="(item,index) in supplier_list" @click="checkIndex('supplier',index)">{{item.name}}</div>
				</div>
			</div>
			<div class="conditions_row">
				<div class="lable">市场：</div>
				<div class="list">
					<div class="item" :class="{'active_item':market_index == index}" v-for="(item,index) in market_list" @click="checkIndex('market',index)">{{item.name}}</div>
				</div>
			</div>
			<div class="conditions_row">
				<div class="lable">类目：</div>
				<div class="list">
					<div class="item" :class="{'active_item':category_index == index}" v-for="(item,index) in category_list" @click="checkIndex('category',index)">{{item.name}}</div>
				</div>
			</div>
			<div class="conditions_row">
				<div class="lable">分类：</div>
				<div class="list">
					<div class="item" :class="{'active_item':class_index == index}" v-for="(item,index) in class_list" @click="checkIndex('class',index)">{{item.name}}</div>
				</div>
			</div>
			<div class="conditions_row">
				<div class="lable">拍摄风格：</div>
				<div class="list">
					<div class="item" :class="{'active_item':style_index == index}" v-for="(item,index) in style_list" @click="checkIndex('style',index)">{{item.name}}</div>
				</div>
			</div>
			<div class="conditions_row none_border">
				<div class="lable">供应商评级：</div>
				<div class="list">
					<div class="item" :class="{'active_item':rating_index == index}" v-for="(item,index) in rating_list" @click="checkIndex('rating',index)">{{item.name}}</div>
				</div>
			</div>
		</div>
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
				<div class="style_item" :class="{'active_color':item.is_selected == true}" v-for="(item,index) in cate_style_list" @click="checkStyle(index)">{{item.name}}</div>
			</div>
			<el-date-picker v-model="date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="checkDate">
			</el-date-picker>
		</div>
	</div>
</template>
<script>
	import { getNowDate,getCurrentDate } from "../api/date.js";
	export default{
		data(){
			return{
				supplier_index:0,		//选中的供应商下标
				supplier_list:[{
					name:'全部',
					id:'0'
				},{
					name:'供应商1',
					id:'1'
				},{
					name:'供应商2',
					id:'2'
				},{
					name:'供应商3',
					id:'3'
				}],						//供应商列表
				market_index:0,			//选中的市场下标
				market_list:[{
					name:'全部',
					id:'0'
				},{
					name:'市场1',
					id:'1'
				},{
					name:'市场2',
					id:'2'
				},{
					name:'市场3',
					id:'3'
				}],						//市场列表
				category_index:0,		//选中的类目下标
				category_list:[{
					name:'全部',
					id:'0'
				},{
					name:'类目1',
					id:'1'
				},{
					name:'类目2',
					id:'2'
				},{
					name:'类目3',
					id:'3'
				}],						//类目列表
				class_index:0,	//选中的分类下标
				class_list:[{
					name:'全部',
					id:'0'
				},{
					name:'分类1',
					id:'1'
				},{
					name:'分类2',
					id:'2'
				},{
					name:'分类3',
					id:'3'
				}],						//分类列表
				style_index:0,			//选中的拍摄风格下标
				style_list:[{
					name:'全部',
					id:'0'
				},{
					name:'风格1',
					id:'1'
				},{
					name:'风格2',
					id:'2'
				},{
					name:'风格3',
					id:'3'
				}],						//拍摄风格列表
				rating_index:0,			//选中的供应商评级下标
				rating_list:[{
					name:'全部',
					id:'0'
				},{
					name:'评级1',
					id:'1'
				},{
					name:'评级2',
					id:'2'
				},{
					name:'评级3',
					id:'3'
				}],						//供应商评级列表
				show_conditions_box:false,		//默认下拉条件不显示
				title:"展开",					//下拉条件按钮名称
				sort_list:[{
					name:'销量',
					sort:'default'
				},{
					name:'选中量',
					sort:'default'
				},{
					name:'浏览量',
					sort:'default'
				}],								//排序列表
				cate_style_list:[{
					name:'爆款',
					id:'1',
					is_selected:false
				},{
					name:'数据款',
					id:'2',
					is_selected:false
				},{
					name:'独家款',
					id:'3',
					is_selected:false
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
			//商品总数量
			total_num:{
				type:Number,
				default:0
			}
		},
		methods:{
			//点击展开或收起
			checkFn(){
				this.show_conditions_box = !this.show_conditions_box;
				this.title = this.show_conditions_box?'收起':'展开';
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
			},
			//点击切换款式
			checkStyle(index){
				this.cate_style_list.map((item,i) => {
					if(index == i){
						item.is_selected = !item.is_selected
					}else{
						item.is_selected = false;
					}
				})
			},
			//切换日期
			checkDate(v){
				console.log(v)
			},
		}
	}
</script>
<style lang="less" scoped>
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
	border: 1px solid #DEDEDE;
	background: #ffffff;
	width: 100%;
	padding-left:10rem;
	padding-right:10rem;
	font-size: 12rem;
	.conditions_row{
		border-bottom: 1px dashed #DEDEDE;
		display: flex;
		padding-left: 16rem;
		padding-top: 8rem;
		.lable{
			white-space:normal;
			width: 100rem;
			color: #999999;
		}
		.list{
			flex:1;
			display: flex;
			flex-wrap: wrap;
			.item{
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
		}
	}
	.active_color{
		color: var(--color);
	}
}
</style>