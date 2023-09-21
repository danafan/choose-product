<template>
	<div class="fixed_button">
		<div class="fixed_item flex fc ac jc">
			<img class="web_icon" src="../static/web_icon.png">
			<div class="icon_text">网页打开</div>
		</div>
	</div>
</template>
<script>
	export default{

	}
</script>
<style lang="less" scoped>
	.fixed_button{
		position: fixed;
		top: 50%;
		right: 0;
		transform: translate(0,-50%);
		width: 54rem;
		height: 200rem;
		background: #FFFFFF;
		box-shadow: 0px 0px 6px 0px rgba(194,194,194,0.5);
		border-radius: 8rem 0px 0px 8rem;
		.fixed_item{
			width: 100%;
			height: 58rem;
			.web_icon{
				width: 24rem;
				height: 24rem;
			}
		}
	}
</style>