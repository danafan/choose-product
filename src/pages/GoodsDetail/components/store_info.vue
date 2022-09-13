<template>
	<div class="store_info">
		<div class="store_name">鸿涛利彬鸿涛利彬鸿涛利彬鸿涛利彬鸿涛利彬</div>
		<div class="store_info">
			<div class="store_info_row">
				<div class="store_info_lable">评级</div>
				<div class="store_info_pj">AAA</div>
			</div>
			<div class="store_info_row">
				<div class="store_info_lable">市场</div>
				<div class="store_info_value">杭州</div>
			</div>
			<div class="store_info_row">
				<div class="store_info_lable">供应商</div>
				<div class="store_info_value">九阿哥</div>
			</div>
			<div class="store_info_row">
				<div class="store_info_lable">主营</div>
				<div class="store_info_value">男装</div>
			</div>
			<div class="store_info_row">
				<div class="store_info_lable">结算方式</div>
				<div class="store_info_value">月结</div>
			</div>
			<div class="get_detail">查看详情</div>
		</div>
	</div>
</template>
<script>
	export default{

	}
</script>
<style lang="less" scoped>
.store_info{
	width: 198rem;
	height: 546rem;
	display: flex;
	flex-direction: column;
	.store_name{
		border:1px solid #FFDABB;
		background: #FFFCFA;
		padding:20rem;
		font-size: 14rem;
		color: #333333;
		font-weight: 500;
	}
	.store_info{
		position: relative;
		border-left: 1px solid #E8E8E8;
		border-right: 1px solid #E8E8E8;
		border-bottom: 1px solid #E8E8E8;
		flex:1;
		padding: 25rem 20rem;
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
			position: absolute;
			bottom: 126rem;
			left: 50%;
			transform: translate(-50%);
			border:1px solid var(--color);
			border-radius: 4rem;
			width: 120rem;
			text-align: center;
			height: 32rem;
			line-height: 32rem;
			font-size:12rem;
			background: #FEEDDD;
			color: var(--color);
		}
	}
}
</style>