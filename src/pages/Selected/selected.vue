<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<SearchWidget page_path="index_history" @callback="searchFn" placeholder="已选搜索"/>
			<el-card class="card_box" id="card_box">
				<div class="tab_row" id="tab_row">
					<div class="tab_item" :class="{'active_item':active_index == index}" v-for="(item,index) in tab_list" @click="active_index = index">
						<div>{{item.name}}</div>
						<div class="active_line" v-if="active_index == index"></div>
					</div>
				</div>
				<el-table size="mini" :data="car_goods" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height">
					<el-table-column label="图片" width="120">
						<template slot-scope="scope">
							<el-image :z-index="2006" class="image" :src="scope.row.image[0]" fit="contain" :preview-src-list="scope.row.image"></el-image>
						</template>
					</el-table-column>
					<el-table-column label="款号" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="款式编码" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="成本价" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="售卖价" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="需求部门" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="需求店铺" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="需求日期" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="需求人" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="需求类型" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="当前状态" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="操作" width="120" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small">撤销</el-button>
							<el-button type="text" size="small" @click="detail_dialog = true">详情</el-button>
						</template>
					</el-table-column>
				</el-table>
				<PaginationWidget id="bottom_row" :total="62" :page="page" @checkPage="checkPage"/>
			</el-card>
			<CarWidget/>
		</div>
		<!-- 详情弹窗 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close :visible.sync="detail_dialog">
			<div slot="title" class="dialog_title">
				<div>商品详情</div>
				<img class="close_icon" src="../../static/close_icon.png" @click="detail_dialog = false">
			</div>
			<div class="dialog_content">
				<div class="detail_row">
					<div class="lable">标题</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">款号</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">款式编码</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">供应商</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">市场</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">提供拍照</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">提供退货</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">提供换货</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">提供代发</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">结算方式</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">类目</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">分类</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">拍摄份个股</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">合作模式</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">备注</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">面料</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">尺码</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">成本价</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">共享盘地址</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">百度网盘</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">店铺</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">需求类型</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">发货类型</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">需求日期</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">售卖价格</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">当前状态</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
				<div class="detail_row">
					<div class="lable">拒绝原因</div>
					<div class="value">男式防紫外线轻薄便携连帽防晒外套</div>
				</div>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button type="primary" size="small" @click="detail_dialog = false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import SearchWidget from '../../components/search_widget.vue'
	import PaginationWidget from '../../components/pagination_widget.vue'
	import CarWidget from '../../components/car_widget.vue'
	export default{
		data(){
			return{
				tab_list:[{
					name:'全部',
					id:'0'
				},{
					name:'待确认',
					id:'0'
				},{
					name:'已确认',
					id:'0'
				},{
					name:'已取消',
					id:'0'
				},{
					name:'已撤销',
					id:'0'
				}],							//tab列表
				active_index:0,				//当前选中的tab下标
				page:1,
				max_height:0,	
				detail_dialog:false,		//详情弹窗
			}
		},
		computed:{
			//购物车列表
			car_goods(){
				return this.$store.state.car_goods;
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
    				let all_title_height = document.getElementById("tab_row").offsetHeight;
    				let bottom_row_height = document.getElementById("bottom_row").offsetHeight;
    				this.max_height =
    				card_box_height -
    				all_title_height -
    				bottom_row_height -
    				60 +
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
				console.log(this.page)
			},
		},
		components:{
			SearchWidget,
			PaginationWidget,
			CarWidget
		}
	}
</script>
<style type="text/css">
	.el-dialog__body{
		padding: 0!important;
	}
</style>
<style lang="less" scoped>
.padding_page_content{
	width: 1440rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	.card_box{
		flex:1;
		.tab_row{
			border:1px solid var(--color);
			border-radius: 4rem;
			background: #FFFCFA;
			height: 64rem;
			display: flex;
			padding-left: 30rem;
			margin-bottom: 15rem;
			.tab_item{
				margin-right: 80rem;
				position: relative;
				height: 64rem;
				line-height: 64rem;
				color: #333333;
				font-size: 14rem;
				font-weight: bold;
				.active_line{
					background: var(--color);
					position: absolute;
					bottom: 2rem;
					width: 100%;
					height: 2rem;
				}
			}
			.active_item{
				color: var(--color);
			}
		}
		.image{
			width: 140rem;
			height: 140rem;
		}
	}
}
.dialog_content{
	max-height: 450px;
	overflow-y: scroll;
	.detail_row{
		border-bottom:1px solid #F0F0F0;
		display: flex;
		height: 48rem;
		font-size:14rem;
		color: #333333;
		.lable{
			border-right:1px solid #F0F0F0;
			padding-left: 20rem;
			width: 120rem;
			height: 48rem;
			line-height: 48rem;
		}
		.value{
			flex:1;
			padding-left: 20rem;
			height: 48rem;
			line-height: 48rem;
		}
	}
}
</style>










