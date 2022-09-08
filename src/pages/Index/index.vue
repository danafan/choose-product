<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<SearchWidget @callback="searchFn" placeholder="首页搜索"/>
			<el-card class="card_box">
				<div class="total_num">共有24478278件相关商品</div>
				<div class="selected_box">
					<div class="selected_left">
						<div>已选条件</div>
						<img class="right_arrow" src="../../static/down_arrow.png">
						<div>{{supplier_list[supplier_index].name}}</div>
						<img class="right_arrow" src="../../static/down_arrow.png">
						<div>{{market_list[market_index].name}}</div>
						<img class="right_arrow" src="../../static/down_arrow.png">
						<div>{{category_list[category_index].name}}</div>
						<img class="right_arrow" src="../../static/down_arrow.png">
						<div>{{class_list[class_index].name}}</div>
						<img class="right_arrow" src="../../static/down_arrow.png">
						<div>{{style_list[style_index].name}}</div>
						<img class="right_arrow" src="../../static/down_arrow.png">
						<div>{{rating_list[rating_index].name}}</div>
					</div>
					<div class="selected_right" @click="checkFn">
						<div>{{title}}</div>
						<img class="down_arrow" :class="{'rotate':show_conditions_box == true}" src="../../static/down_arrow.png">
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
			</el-card>
		</div>
	</div>
</template>
<script>
	import SearchWidget from '../../components/search_widget.vue'
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
			}
		},
		methods:{
			//搜索
			searchFn(value){
				console.log(value);
			},
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
			}
		},
		components:{
			SearchWidget
		}
	}
</script>
<style lang="less" scoped>
.padding_page_content{
	width: 1440rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	.card_box{
		flex:1;
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
			animation-name: move;
			animation-duration: 3s;
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
		@keyframes move{
			0% {
				height: 0;
			}
			100% {
				height: 200rem;
			}
		}
	}
}
</style>