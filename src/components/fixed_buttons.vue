<template>
	<div class="fixed_button">
		<div class="fixed_item flex fc ac jc border_bottom">
			<img class="web_icon" src="../static/web_icon.png">
			<div class="icon_text">网页打开</div>
		</div>
		<div class="fixed_item flex fc ac jc border_bottom">
			<img class="clipboard_icon" src="../static/clipboard_icon.png">
			<div class="icon_text">截图</div>
		</div>
		<div class="fixed_item flex fc ac jc border_bottom" @click="goCarPage">
			<img class="add_car" src="../static/add_car.png">
			<div class="icon_text">待选</div>
			<div class="num">{{car_goods_num}}</div>
		</div>
		<div class="fixed_item flex fc ac jc border_bottom">
			<img class="feekback_icon" src="../static/feekback_icon.png">
			<div class="icon_text">反馈</div>
		</div>
		<div class="fixed_item flex fc ac jc">
			<img class="scroll_top_icon" src="../static/scroll_top_icon.png">
			<div class="icon_text">置顶</div>
		</div>
	</div>
</template>
<script>
	import resource from '../api/resource.js'
	export default{
		computed:{
			//购物车商品数量
			car_goods_num(){
				return this.$store.state.car_goods_num;
			}
		},
		created(){
			//获取购物车列表数量
			this.getCarList();
		},
		methods:{
			//获取购物车列表数量
			getCarList(){
				resource.getCarList().then(res => {
					if(res.data.code == 1){
						let arg = {
							type:'set',
							num:res.data.data.data.length
						}
						this.$store.commit('setCarGoods',arg);
					}else{
						this.$message,warning(res.data.msg);
					}
				})
			},
			//跳转到待选
			goCarPage(){
				let active_path = `/car_page`;
				const routeData = this.$router.resolve(active_path);
				window.open(routeData.href);
			}
		}
	}
</script>
<style lang="less" scoped>
	.fixed_button{
		position: fixed;
		top: 50%;
		right: 0;
		transform: translate(0,-50%);
		width: 54rem;
		background: #FFFFFF;
		box-shadow: 0px 0px 6px 0px rgba(194,194,194,0.5);
		border-radius: 8rem 0px 0px 8rem;
		padding-top:10rem;
		padding-bottom:10rem;
		.fixed_item{
			position: relative;
			width: 100%;
			height: 58rem;
			.web_icon{
				width: 24rem;
				height: 24rem;
			}
			.clipboard_icon{
				width: 22rem;
				height: 20rem;
			}
			.add_car{
				width: 22rem;
				height: 22rem;
			}
			.feekback_icon{
				width: 25rem;
				height: 26rem;
			}
			.scroll_top_icon{
				width: 19rem;
				height: 12rem;
			}
			.icon_text{
				margin-top: 4rem;
				color: #F37605;
				font-size: 23rem;
				zoom: 50%;
			}
			.num{
				position: absolute;
				top: -2rem;
				right: 1rem;
				border-radius:50%;
				background: #F22E00;
				height: 28rem;
				line-height: 28rem;
				padding-left: 8rem;
				padding-right: 8rem;
				font-size: 22rem;
				transform: scale(.5);
				// text-zoom: 50%;
				color: #ffffff;
			}
		}
		.border_bottom{
			border-bottom: 1px solid #F1F1F1;
		}
	}
</style>