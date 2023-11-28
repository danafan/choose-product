<template>
	<div class="p20">
		<div class="f14 flex ac">
			<span class="mr34">供应商款号：{{styleName}}</span>
			<span>控价：{{priceControl}}</span>
		</div>
		<div class="flex jse time">数据统计时间：{{time}}</div>
		<el-table size="mini" :data="tableData" tooltip-effect="dark" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="450">
			<el-table-column label="店铺名" prop="dpmc" show-overflow-tooltip></el-table-column>
			<el-table-column label="店铺售价" prop="dpsj"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="text" @click="openStore(scope.row.url)">进入</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	export default{
		props:{
			//供应商款号
			styleName:{
				type:String,
			default:''
			},
			//控价
			priceControl:{
				type:String,
			default:''
			},
			//数据统计时间
			time:{
				type:String,
			default:''
			},
			//列表
			tableData:{
				type:Array,
			default:[]
			}
		},
		methods:{
			//点击进入店铺详情
			openStore(store_url){
				window.open(store_url)
			},
		}
	}
</script>
<style lang="less" scoped>
	.p20{
		padding: 20rem;
	}
	.f14{
		font-size: 14rem;
		color: #333333;
	}
	.mr34{
		margin-right: 34rem;
	}
	.time{
		margin-bottom: 5px;
		font-size: 14rem;
		color: red;
	}
</style>