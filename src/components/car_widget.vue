<template>
	<div class="car_button" :class="{'fixed_style':is_fixed == true}" @click="goCarPage">
		<div class="icon">
			<img class="add_car" src="../static/add_car.png">
			<div class="num">{{car_goods_num}}</div>
		</div>
		<div class="car_text">待选</div>
	</div>
</template>
<script>
	import resource from '../api/resource.js'
	export default{
		props:{
			//是否相对整个页面定位
			is_fixed:{
				type:Boolean,
				default:false
			}
		},
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
			goCarPage(){
				let active_path = `/car_page`;
				const routeData = this.$router.resolve(active_path);
				window.open(routeData.href);
			}
		}
	}
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
	cursor:pointer;
	.icon{
		margin-bottom: 2rem;
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
.fixed_style{
	position: fixed;
	right: 20rem;
}
</style>