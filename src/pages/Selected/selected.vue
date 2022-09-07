<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<PageTitle title="已选"/>
			<el-card class="card_box"></el-card>
		</div>
	</div>
</template>
<script>
	import PageTitle from '../../components/page_title.vue'
	export default{
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
	}
}
</style>