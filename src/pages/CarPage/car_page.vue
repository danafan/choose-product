<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<PageTitle title="待选记录"/>
			<el-card class="card_box">
				<div class="all_title">待选（全部28）</div>
				<el-table ref="multipleTable" size="mini" :data="car_goods" tooltip-effect="dark" style="width: 100%" @selection-change="changeSelected" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" max-height="500px">
					<el-table-column type="selection" width="55" fixed="left"></el-table-column>
					<el-table-column label="图片" width="120">
						<template slot-scope="scope">
							<el-image :z-index="2006" class="image" :src="scope.row.image[0]" fit="contain" :preview-src-list="scope.row.image"></el-image>
						</template>
					</el-table-column>
					<el-table-column label="标题" prop="price" width="160">
						<template slot-scope="scope">
							<div class="record_title">这是标题这是标题这是标题这是标题这是标题这是标题这是标题</div>
						</template>
					</el-table-column>
					<el-table-column label="供应商" prop="price" width="160" show-overflow-tooltip></el-table-column>
					<el-table-column label="上新时间" prop="price" width="150">
						<template slot-scope="scope">
							<div>2022-08-05 12:00</div>
						</template>
					</el-table-column>
					<el-table-column label="款号" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="款式编码" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="拍摄风格" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="价格" prop="price"></el-table-column>
					<el-table-column label="操作" width="80" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="bottom_row">
					<el-button type="text">移除</el-button>
					<div class="all_selected">
						<div class="selcted_num">已选 3 件</div>
						<el-button size='mini' type="primary">去选中</el-button>
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>
<script>
	import PageTitle from '../../components/page_title.vue'
	export default{
		data(){
			return{
				selected_list: [],			//已选中的列表
			}
		},
		computed:{
			//购物车列表
			car_goods(){
				return this.$store.state.car_goods;
			}
		},
		methods:{
			//切换选中
			changeSelected(val) {
				this.selected_list = val;
			}
		},
		components:{
			PageTitle
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
		.all_title{
			margin-bottom: 8rem;
			font-size: 14rem;
			color: #333333;
		}
		.image{
			width: 140rem;
			height: 140rem;
		}
		.record_title{
			font-size:12rem;
			color: var(--color);
		}
	}
}
</style>