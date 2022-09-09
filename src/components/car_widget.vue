<template>
	<div class="car_button">
		<div class="icon">
			<img class="add_car" src="../static/add_car.png">
			<div class="num">3</div>
		</div>
		<div class="car_text">待选</div>
	</div>
</template>
<script>
	
</script>
<style lang="less" scoped>
.car_button{
	position: absolute;
	top: 50%;
	right: -80rem;
	width: 60rem;
	height: 60rem;
	background: #FFFFFF;
	box-shadow: 0px 2px 11px 0px #FFEAD8;
	border-radius: 30rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 9;
	.icon{
		position: relative;
		width: 26rem;
		height: 26rem;
		.add_car{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}	
		.num{
			position: absolute;
			top: -3rem;
			right: -5rem;
			border-radius:50%;
			background: #F22E00;
			height: 14rem;
			line-height: 14rem;
			padding-left: 3rem;
			padding-right: 3rem;
			font-size: 12rem;
			color: #ffffff;
		}
	}
	.car_text{
		color: var(--color);
		font-size: 12rem;
	}
}
</style>