<template>
	<div class="search_widget">
		<img class="logo_icon" src="../static/logo_icon.png">
		<div class="search_box">
			<img class="search_icon" src="../static/search_icon.png">
			<input class="search_input" v-model="search_value" :placeholder="placeholder" @keyup.enter="searchFn">
			<div class="search_button" @click="searchFn">搜 索</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.search_widget{
		height: 120rem;
		width: 100%;
		display: flex;
		align-items: center;
		padding-left: 110rem;
		.logo_icon{
			margin-right: 110rem;
			width: 148rem;
			height: 58rem;
		}
		.search_box{
			background: #ffffff;
			border:2px solid var(--color);
			border-radius: 25rem;
			width: 720rem;
			height: 50rem;
			padding-left: 22rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.search_icon{
				margin-right: 22rem;
				width: 23rem;
				height: 23rem;
			}
			.search_input{
				flex: 1;
				border: none;
				outline: none;
				font-size: 14rem;
				color: #333333;
			}
			.search_button{
				margin-left: 22rem;
				border-radius: 25rem;
				background: var(--color);
				width: 120rem;
				text-align: center;
				height: 50rem;
				line-height: 50rem;
				font-size: 18rem;
				font-weight: bold;
				color: #ffffff;
			}
		}
	}
</style>
<script>
	export default{
		data(){
			return{
				search_value:"",		//搜索框内容
			}
		},
		props:{
			placeholder:{
				type:String,
				default:""
			}
		},
		methods:{
			searchFn(){
				this.$emit('callback',this.search_value)
			}
		}
	}
</script>