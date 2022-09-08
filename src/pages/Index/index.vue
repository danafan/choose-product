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
				<div class="cate_box">
					<div class="sort_row">
						<div class="sort_item" :class="{'active_color':item.sort != 'default'}" v-for="(item,index) in sort_list" @click="sortFn(index)">
							<div>{{item.name}}</div>
							<img class="sort_icon" src="../../static/sort_asc.png" v-if="item.sort == 'asc'">
							<img class="sort_icon" src="../../static/sort_default.png" v-if="item.sort == 'default'">
							<img class="sort_icon" src="../../static/sort_desc.png" v-if="item.sort == 'desc'">
						</div>
					</div>
					<div class="style_row">
						<div class="style_item" :class="{'active_color':item.is_selected == true}" v-for="(item,index) in cate_style_list" @click="checkStyle(index)">{{item.name}}</div>
					</div>
					<el-date-picker v-model="date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="checkDate">
					</el-date-picker>
				</div>
				<div class="goods_list">
					<div class="goods_item" v-for="item in goods_list">
						<div class="image_box">
							<img class="goods_image" src="../../static/user_img.png">
						</div>
						<div class="goods_info">
							<div class="price_cate">
								<div class="price">
									<div class="p_icon">¥</div>
									<div class="p_value">199</div>
								</div>
								<div class="cate">日系、平铺</div>
							</div>
							<div class="desc">这是描述这是描述这是描述这是描述这是描述这是描述</div>
							<div class="code_time">
								<div class="code">asdhkjasdasdhkjasd</div>
								<div class="time">2022-09-09 19:09</div>
							</div>
							<div class="set_row">
								<div class="button_row">
									<div class="add">
										<img class="add_car" src="../../static/add_car.png">
										<div>待选</div>
									</div>
									<div class="xk">选款</div>
								</div>
								<div class="store_name">聚合服饰聚合服饰聚合服饰聚合服饰聚合服饰</div>
							</div>
							<div class="num_row">
								<div>浏览：3354</div>
								<div>选中：3354</div>
								<div>销量：3354</div>
							</div>
							<div class="img_back">
								<div class="img_list">
									<img class="info_icon" src="../../static/pai_icon.png">
									<img class="info_icon" src="../../static/pai_icon.png">
									<img class="info_icon" src="../../static/pai_icon.png">
									<img class="info_icon" src="../../static/pai_icon.png">
									<img class="info_icon" src="../../static/pai_icon.png">
									<img class="info_icon" src="../../static/pai_icon.png">
									<img class="info_icon" src="../../static/pai_icon.png">
								</div>
								<div class="feek_back">反馈</div>
							</div>
						</div>
					</div>
					<div class="padding_item" v-for="i in 5-(goods_list.length%5) == 5?0:5-(goods_list.length%5)"></div>
				</div>
				<div class="page">
					<el-pagination small background @current-change="handleCurrentChange" :current-page="page" :page-size="10" layout="slot, prev, pager, next,jumper" :total="11">
						<div class="index_button">首页</div>
					</el-pagination>
				</div>
			</el-card>
		</div>
	</div>
</template>
<script>
	import SearchWidget from '../../components/search_widget.vue'
	import { getNowDate,getCurrentDate } from "../../api/date.js";
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
				goods_list:['','','','','','',''],	//商品列表
				page:1
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
			//翻页
			handleCurrentChange(val) {
				this.page = val;
      			//获取列表
      			this.getData();
      		},
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
  		overflow-y: scroll;
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
  		.goods_list{
  			display: flex;
  			flex-wrap: wrap;
  			justify-content: space-between;
  			.goods_item{
  				margin-bottom: 20rem;
  				border:1px solid #EDEDED;
  				width: 265rem;
  				height: 436rem;
  				.image_box{
  					position: relative;
  					width: 263rem;
  					height: 263rem;
  					.goods_image{
  						position: absolute;
  						top: 0;
  						left: 0;
  						width: 100%;
  						height: 100%;
  					}
  				}
  				.goods_info{
  					padding: 8rem 10rem;
  					.price_cate{
  						display: flex;
  						align-items: center;
  						justify-content: space-between;
  						.price{
  							display: flex;
  							align-items: flex-end;
  							color: var(--color);
  							font-weight: bold;
  							.p_icon{
  								position: relative;
  								top: -1px;
  								font-size:14rem;
  							}
  							.p_value{
  								margin-left: 1rem;
  								font-size:18rem;
  							}
  						}
  						.cate{
  							font-size: 12rem;
  							color: #333333;
  						}
  					}
  					.desc{
  						margin-top: 6rem;
  						font-size:12rem;
  						color: #333333;
  						word-break: break-all;
  						text-overflow: ellipsis;
  						overflow: hidden;
  						display: -webkit-box;
  						-webkit-line-clamp: 1;
  						-webkit-box-orient: vertical;
  					}
  					.code_time{
  						margin-top: 6rem;
  						display: flex;
  						align-items: center;
  						justify-content: space-between;
  						font-size:12rem;
  						color: #999999;
  						.code{
  							flex:1;
  							word-break: break-all;
  							text-overflow: ellipsis;
  							overflow: hidden;
  							display: -webkit-box;
  							-webkit-line-clamp: 1;
  							-webkit-box-orient: vertical;
  						}
  						.time{
  							white-space:normal;
  						}
  					}
  					.set_row{
  						margin-top: 10rem;
  						display: flex;
  						align-items: center;
  						justify-content: space-between;
  						.button_row{
  							display: flex;
  							align-items: center;
  							.add{
  								border:1px solid var(--color);
  								border-radius: 2rem;
  								width: 52rem;
  								height: 20rem;
  								display: flex;
  								align-items: center;
  								justify-content: center;
  								font-size: 12rem;
  								color: var(--color);
  								.add_car{
  									margin-right: 4rem;
  									width: 12rem;
  									height: 12rem;
  								}
  							}
  							.xk{
  								margin-left: 10rem;
  								border-radius: 2rem;
  								background: var(--color);
  								width: 36rem;
  								text-align: center;
  								height: 20rem;
  								line-height: 20rem;
  								font-size: 12rem;
  								color: #ffffff;
  							}
  						}
  						.store_name{
  							margin-left: 10rem;
  							font-size: 12rem;
  							color: var(--color);
  							word-break: break-all;
  							text-overflow: ellipsis;
  							overflow: hidden;
  							display: -webkit-box;
  							-webkit-line-clamp: 1;
  							-webkit-box-orient: vertical;
  						}
  					}
  					.num_row{
  						margin-top: 10rem;
  						display: flex;
  						align-items: center;
  						justify-content: space-between;
  						font-size: 12rem;
  						color: #999999;
  					}
  					.img_back{
  						margin-top: 10rem;
  						display: flex;
  						align-items: center;
  						.img_list{
  							flex:1;
  							display: flex;
  							.info_icon{
  								margin-right: 6rem;
  								width: 20rem;
  								height: 20rem;
  							}
  						}
  						.feek_back{
  							font-size: 12rem;
  							color: #37A3FF;
  						}
  					}
  				}
  			}
  			.padding_item{
  				width: 265rem;
  			}
  		}
  	}
  }
</style>










