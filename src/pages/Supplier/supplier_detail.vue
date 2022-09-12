<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<SearchWidget page_path="supplier_detai" @callback="searchFn" placeholder="供应商详情搜索"/>
			<el-card class="card_box">
				<div class="top_content">
					<div class="info_row">
						<div class="info_item">
							<div class="info_lable">供应商：</div>
							<div class="info_value">汇德隆</div>
						</div>
						<div class="info_item">
							<div class="info_lable">市场：</div>
							<div class="info_value">杭州</div>
						</div>
						<div class="info_item">
							<div class="info_lable">主营：</div>
							<div class="info_value">男装</div>
						</div>
						<div class="info_item">
							<div class="info_lable">结算方式：</div>
							<div class="info_value">月结</div>
						</div>
						<div class="info_item">
							<div class="info_lable">评级：</div>
							<div class="info_value">AAA</div>
						</div>
					</div>
					<div class="info_line"></div>
					<div class="info_row">
						<div class="info_item">
							<div class="info_lable">代发：</div>
							<div class="info_value">否</div>
						</div>
						<div class="info_item">
							<div class="info_lable">入仓：</div>
							<div class="info_value">是</div>
						</div>
						<div class="info_item">
							<div class="info_lable">退货：</div>
							<div class="info_value">是</div>
						</div>
						<div class="info_item">
							<div class="info_lable">拍照：</div>
							<div class="info_value">是</div>
						</div>
					</div>
				</div>
				<ScreeningWidget :total_num="goods_list.length"/>
				<div class="goods_list">
					<GoodsItem :info="item" v-for="item in goods_list"/>
					<div class="padding_item" v-for="i in 5-(goods_list.length%5) == 5?0:5-(goods_list.length%5)"></div>
				</div>
				<PaginationWidget :total="62" :page="page" @checkPage="checkPage"/>
			</el-card>
			<CarWidget/>
		</div>
	</div>
</template>
<script>
	import SearchWidget from '../../components/search_widget.vue'
	import ScreeningWidget from '../../components/screening_widget.vue'
	import GoodsItem from '../../components/goods_item.vue'
	import PaginationWidget from '../../components/pagination_widget.vue'
	import CarWidget from '../../components/car_widget.vue'
	export default{
		data(){
			return{
				goods_list:[{
					price:1
				},{
					price:2
				},{
					price:3
				},{
					price:4
				},{
					price:5
				},{
					price:6
				},{
					price:7
				},{
					price:8
				},{
					price:9
				},{
					price:10
				},{
					price:11
				},{
					price:12
				}],	//商品列表
				page:1
			}
		},
		methods:{
			//搜索
			searchFn(value){
				console.log(value);
			},
			//翻页
			checkPage(val) {
				this.page = val;
				console.log(this.page)
			},
		},
		components:{
			SearchWidget,
			ScreeningWidget,
			GoodsItem,
			PaginationWidget,
			CarWidget
		}
	}
</script>
<style lang="less" scoped>
.padding_page_content{
	width: 1440rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	.card_box{
		flex:1;
		overflow-y: scroll;
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
</style>










