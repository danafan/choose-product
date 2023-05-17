<template>
	<div class="search_widget" @click.stop>
		<img class="logo_icon" src="../static/logo_icon.png">
		<div class="search_box">
			<img class="search_icon" src="../static/search_icon.png">
			<input class="search_input" ref="input" @focus="show_history = true" @blur="closeFn" v-model="search_value" :placeholder="placeholder" @keyup.enter="searchFn">
			<div class="search_button" @click="searchFn">搜 索</div>
			<div class="history_list" v-if="show_history">
				<div class="history_item history_title">
					<div class="title">最近搜索</div>
					<div class="delete pointer" @mousedown="$refs.input.focus()" @mouseup="deleteHistory(-1)">全部删除</div>
				</div>
				<div class="history_item pointer" :class="{'border_none':index == history_list.length - 1}" v-for="(item,index) in history_list">
					<div class="title" @mouseup="checkValue(item)">{{item}}</div>
					<div class="delete" @mouseup="deleteHistory(index)">删除</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.search_widget{
	height: 120rem;
	width: 100%;
	display: flex;
	align-items: center;
	padding-left: 250rem;
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
		position: relative;
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
			cursor:pointer;
		}
		.history_list{
			padding: 6rem 12rem 0 18rem;
			border:1px solid #DFDFDF;
			position: absolute;
			top: 48rem;
			left: 50%;
			width: 680rem;
			max-height: 350rem;
			transform: translate(-50%);
			background: #ffffff;
			overflow-y: scroll;
			z-index: 9;
			.history_item{
				border-bottom: 1px dashed #DEDEDE;
				height: 30rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 12rem;
				color: #666666;
				.title{
					flex:1;
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				.delete{
					white-space: normal;
				}
			}
			.history_title{
				color: #333333;
			}
			.border_none{
				border:none;
			}
			.pointer{
				cursor: pointer;
			}
		}
	}
}
</style>
<script>
	export default{
		data(){
			return{
				search_value:"",		//搜索框内容
				show_history:false,		//搜索历史列表弹窗是否显示
				history_list:[],		//搜索历史列表
			}
		},
		props:{
			// 输入框默认提示
			placeholder:{
				type:String,
				default:""
			},
			//页面来源
			page_path:{
				type:String,
				default:''
			}
		},
		watch:{
			//每次打开历史列表都重新获取最新
			show_history:function(n,o){
				if(n){
					let storage_data = sessionStorage.getItem(this.page_path);
					let history_list = storage_data?JSON.parse(storage_data):[];
					this.history_list = history_list.slice(0,10);
				}
			}
		},
		methods:{
			//鼠标移开延迟
			closeFn(){
				setTimeout(()=>{
					this.show_history = false;
				},100);
			},
			//选中某一个历史记录
			checkValue(search_value){
				this.search_value = search_value;
				this.show_history = false;
				//点击搜索或回车
				this.searchFn();
			},
			//点击删除
			deleteHistory(index){
				if(index == -1){	//全部删除
					sessionStorage.removeItem(this.page_path);
					this.history_list = [];
				}else{	// 单条删除
					let storage_data = sessionStorage.getItem(this.page_path);
					let history_list = JSON.parse(storage_data);
					history_list.splice(index,1);
					this.history_list = history_list;
					sessionStorage.setItem(this.page_path,JSON.stringify(history_list));
				}
			},
			//点击搜索或回车
			searchFn(){
				let storage_data = sessionStorage.getItem(this.page_path);
				let history_list = storage_data?JSON.parse(storage_data):[];
				let current_index = null;
				history_list.map((item,index) => {
					if(this.search_value == item){
						current_index = index;
					}
				})
				if(current_index !== null){
					history_list.splice(current_index,1);
					history_list.unshift(this.search_value);
					sessionStorage.setItem(this.page_path,JSON.stringify(history_list));
				}else{
					if(this.search_value != ''){
						history_list.unshift(this.search_value);
						sessionStorage.setItem(this.page_path,JSON.stringify(history_list));
					}
				}
				this.show_history = false;
				this.$refs.input.blur();
				this.$emit('callback',this.search_value)
			}
		}
	}
</script>