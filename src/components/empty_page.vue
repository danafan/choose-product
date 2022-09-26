<template>
	<div class="empty_container" v-loading="is_loading">
		<img class="empty_icon" src="../static/empty_icon.png">
		<div class="toast">{{toast}}</div>
	</div>
</template>
<script>
	export default{
		props:{
			//是否加载状态
			is_loading:{
				type:Boolean,
				default:true
			},
			//提示
			toast:{
				type:String,
				default:'暂无商品哦～'
			}
		}
	}
</script>
<style lang="less" scoped>
.empty_container{
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.empty_icon{
		margin-bottom: 30rem;
		width: 252rem;
		height: 224rem;
	}
	.toast{
		font-size: 14rem;
		color: #333333;
	}
}
</style>