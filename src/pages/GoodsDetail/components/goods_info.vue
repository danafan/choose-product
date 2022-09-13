<template>
	<div class="goods_info">
		<div class="goods_name">男式防紫外线轻薄便携连帽防晒外套男式防紫外线轻薄便携连帽防晒外套男式防紫外线轻薄便携连帽防晒外套</div>
		<div class="info_content">
			<div class="content_row">
				<div class="row_lable">成本价</div>
				<div class="row_price">¥56.88</div>
			</div>
			<div class="content_row">
				<div class="row_lable">款式编码</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
			<div class="content_row">
				<div class="row_lable">款号</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
			<div class="content_row">
				<div class="row_lable">类目</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
			<div class="content_row">
				<div class="row_lable">分类</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
			<div class="content_row">
				<div class="row_lable">颜色</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
			<div class="content_row">
				<div class="row_lable">尺码</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
			<div class="content_row">
				<div class="row_lable">面料</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
		</div>
		<div class="button_row">
			<div class="button_item add">
				<img class="add_car" src="../../../static/add_car.png">
				<div>加入选中</div>
			</div>
			<div class="button_item select">
				<div>立即选款</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{

	}
</script>
<style lang="less" scoped>
.goods_info{
	width: 512rem;
	height: 546rem;
	display: flex;
	flex-direction: column;
	.goods_name{
		padding-top: 20rem;
		padding-bottom: 20rem;
		font-size: 16rem;
		color: #333333;
		font-weight: 500;
	}
	.info_content{
		flex:1;
		padding: 10rem 20rem;
		background: #FFF8F2;
		.content_row{
			margin-bottom: 16rem;
			display: flex;
			align-items: center;
			.row_lable{
				width: 100rem;
				font-size:12rem;
				color: #666666;
			}
			.row_price{
				color: var(--color);
				font-size:24rem;
				font-weight: 500;
			}
			.row_value{
				flex:1;
				font-size:12rem;
				color: #333333;
			}
		}
	}
	.button_row{
		height: 88rem;
		display: flex;
		align-items: center;
		.button_item{
			border:1px solid var(--color);
			border-radius: 4rem;
			width: 184rem;
			height: 42rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size:12rem;
			.add_car{
				margin-right: 8rem;
				width: 14rem;
				height: 14rem;
			}
		}
		.add{
			margin-right: 22rem;
			background: #FEEDDD;
			color: var(--color);
		}
		.select{
			background: var(--color);
			color: #ffffff;
		}
	}
}
</style>