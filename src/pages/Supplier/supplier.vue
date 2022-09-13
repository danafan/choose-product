<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<SearchWidget @callback="searchFn" placeholder="供应商搜索"/>
			<el-card class="card_box" id="card_box">
				<div class="tab_row" id="tab_row">
					<div class="tab_item" :class="{'active_tab_item':active_index == index}" v-for="(item,index) in address_list" @click="active_index = index">
						<div>{{item.name}}</div>
						<div class="active_line" v-if="active_index == index"></div>
					</div>
				</div>
				<div class="list_content" :style="{height: scroll_height}">
					<div class="supplier_item" v-for="i in 9">
						<div class="text_info">
							<div class="info_item">市场：杭州</div>
							<div class="info_item">供应商：九阿哥</div>
							<div class="info_item">主营：男装</div>
							<div class="info_item">结算方式：月结</div>
							<div class="info_item">评级：<span>AAA</span></div>
						</div>
						<div class="image_list">
							<el-image :z-index="2006" class="image_item" :src="item" fit="contain" v-for="item in banner_list" :preview-src-list="banner_list"></el-image>
						</div>
						<div class="detail_box">
							<div class="detail_button" @click="supplierDetail">查看更多</div>
						</div>
					</div>
				</div>
				<PaginationWidget id="pagination" :total="62" :page="page" @checkPage="checkPage"/>
			</el-card>
		</div>
	</div>
</template>
<script>
	import SearchWidget from '../../components/search_widget.vue'
	import PaginationWidget from '../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				address_list:[{
					name:"全部",
					id:""
				},{
					name:"武汉",
					id:"1"
				},{
					name:"广州",
					id:"2"
				},{
					name:"沧州",
					id:"3"
				},{
					name:"厂家",
					id:"4"
				}],						//地址列表
				active_index:0,			//选中的地址
				banner_list:[
				'http://img.92nu.com/DataCenter_202209081659447849.jpg',
				'http://img.92nu.com/DataCenter_202209080938036416.jpg',
				'http://img.92nu.com/DataCenter_202209080937367725.jpg',
				'http://img.92nu.com/DataCenter_202209080938036416.jpg',
				'http://img.92nu.com/DataCenter_202209081659447849.jpg',
				],
				page:1,
				scroll_height:0
			}
		},
		destroyed() {
			window.removeEventListener("resize", () => {});
		},
		mounted() {
    		//获取表格最大高度
    		this.onResize();
    		window.addEventListener("resize", this.onResize());
    	},
    	methods: {
    		//监听屏幕大小变化
    		onResize() {
    			this.$nextTick(() => {
    				let card_box_height = document.getElementById("card_box").offsetHeight;
    				let tab_row_height = document.getElementById("tab_row").offsetHeight;
    				let pagination_height = document.getElementById("pagination").offsetHeight;
    				this.scroll_height =
    				card_box_height -
    				tab_row_height -
    				pagination_height -
    				55 +
    				"px";
    			});
    		},
			//搜索
			searchFn(value){
				console.log(value);
			},
			//翻页
			checkPage(val) {
				this.page = val;
			},
			//点击跳转供应商详情
			supplierDetail(){
				const routeData = this.$router.resolve(`/supplier_detail`);
				window.open(routeData.href);
			}
		},
		components:{
			SearchWidget,
			PaginationWidget
		}
	}
</script>
<style lang="less" scoped>
.padding_page_content{
	width: 1440rem;
	height: 100%;display: flex;
	flex-direction: column;
	.card_box{
		flex:1;
		display: flex;
		flex-direction: column;
		.tab_row{
			margin-bottom: 15rem;
			padding-left: 30rem;
			border-radius:4rem;
			border:1px solid var(--color);
			background: #FFFCFA;
			width: 100%;
			height: 64rem;
			display: flex;
			.tab_item{
				margin-right: 94rem;
				position: relative;
				height: 64rem;
				display: flex;
				align-items: center;
				font-size:14rem;
				color:#333333;
				font-weight: bold;
				.active_line{
					background: var(--color);
					position: absolute;
					left: 0;
					bottom:3rem;
					width: 100%;
					height: 2px;
				}
			}
			.active_tab_item{
				color: var(--color);
			}
		}
		.list_content{
			height: 200px;
			overflow-y: scroll;
			.supplier_item{
				margin-bottom: 18rem;
				border: 1px solid #F0F0F0;
				width: 100%;
				height: 220rem;
				display: flex;
				padding: 10rem 0;
				.text_info{
					width: 200rem;
					padding-left: 30rem;
					padding-right: 30rem;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-around;
					.info_item{
						font-size:12rem;
						color: #333333;
						span{
							color: var(--color);
							font-weight: bold;
						}
					}
				}
				.image_list{
					flex:1;
					display: flex;
					.image_item{
						margin-right: 20rem;
						width: 202rem;
						height: 202rem;
					}
				}
				.detail_box{
					width: 108rem;
					display: flex;
					align-items: center;
					justify-content: center;
					.detail_button{
						border:1px solid var(--color);
						border-radius:4rem;
						background: #FEEDDD;
						width: 64rem;
						text-align: center;
						height: 32rem;
						line-height: 32rem;
						font-size:12rem;
						color: var(--color);
					}
				}
			}
		}
	}
}
</style>