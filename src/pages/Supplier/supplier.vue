<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<SearchWidget @callback="searchFn" placeholder="供应商搜索"/>
			<el-card class="card_box"></el-card>
		</div>
	</div>
</template>
<script>
	import SearchWidget from '../../components/search_widget.vue'
	export default{
		data(){
			return{

			}
		},
		methods:{
			//搜索
			searchFn(value){
				console.log(value);
			}
		},
		components:{
			SearchWidget
		}
	}
</script>
<style lang="less" scoped>
.padding_page_content{
	width: 1440rem;
	height: 100%;display: flex;
	flex-direction: column;
	.card_box{
		flex:1;
	}
}
</style>