<template>
	<div>
		<div class="detail_info">
			<div class="info_box">
				<div>浏览量：{{goods_info.views_num}}次</div>
				<div>30天销量：{{goods_info.sales_num_all}}件</div>
			</div>
			<div class="info_box">
				<div>选中量：{{goods_info.select_num}}</div>
				<div>市场：{{goods_info.market_name}}</div>
			</div>
			<div class="info_box">
				<div>提供拍照：{{goods_info.supply_photograph}}</div>
				<div>&nbsp</div>
			</div>
		</div>
		<div class="style_row">
			<div class="style_item">拍摄风格：{{shooting_style_name}}</div>
		</div>
		<div class="image_box" :style="{height:max_height}">
			<el-image :z-index="2006" class="style_image" :src="item" fit="scale-down" :preview-src-list="style_image_list" v-for="item in style_image_list"></el-image>
			<div class="style_image" v-if="style_image_list.length%2 > 0"></div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				max_height:0,
				active_style_index:0,			//当前选中的风格下标
				shooting_style_name:"",
				style_image_list:[],			//图片列表
			}
		},
		props:{
			// 商品详情
			goods_info:{
				type:Object,
				default:{}
			}
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
		},
		created(){
			//设置默认元素
			this.setInfoFn();
		},
		mounted() {
    		//获取表格最大高度
    		this.onResize();
    		window.addEventListener("resize", this.onResize());
    	},
    	watch:{
			//切换风格
			active_style_index:function(n,o){
				//设置默认元素
				this.setInfoFn(n);
			}
		},
		methods:{
			//监听屏幕大小变化
			onResize() {
				this.$nextTick(() => {
					let white_back_height = document.documentElement.clientHeight;
					this.max_height =
					white_back_height - 150 + "px";
				});
			},
			//设置默认元素
			setInfoFn(){
				let style_img = this.goods_info.style_img;

				this.shooting_style_name = style_img.shooting_style_name;
				let images = [];
				if( this.goods_info.style_img.length == 0){
					return;
				}
				style_img.img.map((item,index) => {
					images.push(this.domain + item);
				})
				this.style_image_list = images;
			},
			//跳转
			windowOpen(link){
				window.open(link);
			}
		}
	}
</script>
<style lang="less" scoped>
.detail_info{
	padding-left: 12rem;
	display: flex;
	.info_box{
		width: 210rem;
		height: 85rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		font-size: 12rem;
		color: #333333;
	}
}
.style_row{
	border-top: 1px solid #E5E5E5;
	border-bottom: 1px solid #E5E5E5;
	background: #F6F6F6;
	height: 32rem;
	display: flex;
	font-size:12rem;
	color: #333333;
	.style_item{
		border-left: 1px solid #E5E5E5;
		border-right: 1px solid #E5E5E5;
		padding-left: 24rem;
		padding-right: 24rem;
		height: 32rem;
		line-height: 32rem;
		cursor:pointer;
	}
	.active_style_item{
		border:1px solid var(--color);
		background: #ffffff;
		color: var(--color);
	}
}
.source_box{
	border-bottom: 1px solid #E5E5E5;
	display: flex;
	align-items: center;
	padding:12rem;
	font-size: 12rem;
	color: #333333;
	.source_item{
		margin-right: 66rem;
		display: flex;
		.link{
			cursor: pointer;
			font-weight: bold;
			color: var(--color);
		}
	}
}
.image_box{
	overflow-y: scroll;
	padding-top: 30rem;
	padding-bottom: 30rem;
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	justify-content: space-evenly;
	.style_image{
		margin-bottom: 25rem;
		width: 520rem;
	}
}
</style>











