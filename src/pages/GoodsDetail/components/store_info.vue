<template>
	<div class="store_info_container">
		<img class="store_info_back" src="../../../static/store_info_back.png">
		<div class="store_info">
			<div class="store_info_row">
				<div class="store_info_lable">供应商</div>
				<div class="store_info_value">{{goods_info.supplier_name}}</div>
			</div>
			<div class="store_info_row">
				<div class="store_info_lable">主营</div>
				<div class="store_info_value">{{goods_info.main_business}}</div>
			</div>
			<div class="store_info_row">
				<div class="store_info_lable">结算方式</div>
				<div class="store_info_value">{{goods_info.supply_monthly_settlement}}</div>
			</div>
			<div class="store_info_row">
				<div class="store_info_lable">供应商等级</div>
				<div class="store_info_pj">{{goods_info.grade_name}}</div>
			</div>
			<div class="get_detail" @click="supplierDetail">查看详情</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			goods_info:{
				type:Object,
				default:{}
			}
		},
		methods:{
			//点击跳转供应商详情
			supplierDetail(){
				let active_path = `/supplier_detail?supplier_id=${this.goods_info.supplier_id}`;
				const routeData = this.$router.resolve(active_path);
				window.open(routeData.href);
			}
		}
	}
</script>
<style lang="less" scoped>
.store_info_container{
	position: relative;
	width: 198rem;
	height: 308rem;
	.store_info_back{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.store_info{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 40rem 30rem;
		z-index: 9;
		.store_info_row{
			margin-bottom: 20rem;
			display: flex;
			font-size:12rem;
			.store_info_lable{
				width: 80rem;
				color: #666666;
			}
			.store_info_pj{
				color: var(--color);
				font-size:12rem;
				font-weight: normal;
			}
			.store_info_value{
				color: #333333;
			}
		}
		.get_detail{
			margin: 0 auto;
			border:1px solid var(--color);
			border-radius: 4rem;
			width: 120rem;
			text-align: center;
			height: 32rem;
			line-height: 32rem;
			font-size:12rem;
			background: #FEEDDD;
			color: var(--color);
			cursor:pointer;
		}
	}
}
</style>