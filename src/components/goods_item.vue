<template>
	<div class="goods_item">
		<div class="image_box">
			<el-popover
			placement="right-start"
			width="450"
			trigger="hover">
			<img style="width: 100%" fit="contain" src="http://img.92nu.com/DataCenter_202208311330183144.jpg"/>
			<img class="goods_image" src="../static/user_img.png" slot="reference"/>
		</el-popover>
		<img class="goods_tag" src="../static/bao_icon.png">
	</div>
	<div class="goods_info">
		<div class="price_cate">
			<div class="price">
				<div class="p_icon">¥</div>
				<div class="p_value">{{info.price}}</div>
			</div>
			<div class="cate">日系、平铺</div>
		</div>
		<div class="desc">这是描述这是描述这是描述这是描述这是描述这是描述</div>
		<div class="code_time">
			<div class="code">asdhkjasdasdhkjasd</div>
			<div class="time">2022-09-09 19:09</div>
		</div>
		<div class="set_row">
			<div class="button_row">
				<div class="add" @click="addCar">
					<img class="add_car" src="../static/add_car.png">
					<div>待选</div>
				</div>
				<div class="xk">选款</div>
			</div>
			<div class="store_name">聚合服饰聚合服饰聚合服饰聚合服饰聚合服饰</div>
		</div>
		<div class="num_row">
			<div>浏览：3354</div>
			<div>选中：3354</div>
			<div>销量：3354</div>
		</div>
		<div class="img_back">
			<div class="img_list">
				<img class="info_icon" src="../static/pai_icon.png">
				<img class="info_icon" src="../static/pai_icon.png">
				<img class="info_icon" src="../static/pai_icon.png">
				<img class="info_icon" src="../static/pai_icon.png">
				<img class="info_icon" src="../static/pai_icon.png">
				<img class="info_icon" src="../static/pai_icon.png">
				<img class="info_icon" src="../static/pai_icon.png">
			</div>
			<div class="feek_back">反馈</div>
		</div>
	</div>
</div>
</template>
<style lang="less" scoped>
.goods_item{
	margin-bottom: 20rem;
	border:1px solid #EDEDED;
	width: 265rem;
	height: 436rem;
	.image_box{
		position: relative;
		width: 263rem;
		height: 263rem;
		.goods_image{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.goods_tag{
			position: absolute;
			top: 0;
			right: 0;
			width: 44rem;
			height: 44rem;
		}
	}
	.goods_info{
		padding: 8rem 10rem;
		.price_cate{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.price{
				display: flex;
				align-items: flex-end;
				color: var(--color);
				font-weight: bold;
				.p_icon{
					position: relative;
					top: -1px;
					font-size:14rem;
				}
				.p_value{
					margin-left: 1rem;
					font-size:18rem;
				}
			}
			.cate{
				font-size: 12rem;
				color: #333333;
			}
		}
		.desc{
			margin-top: 6rem;
			font-size:12rem;
			color: #333333;
			word-break: break-all;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
		.code_time{
			margin-top: 6rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size:12rem;
			color: #999999;
			.code{
				flex:1;
				word-break: break-all;
				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
			.time{
				white-space:normal;
			}
		}
		.set_row{
			margin-top: 10rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.button_row{
				display: flex;
				align-items: center;
				.add{
					border:1px solid var(--color);
					border-radius: 2rem;
					width: 52rem;
					height: 20rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 12rem;
					color: var(--color);
					.add_car{
						margin-right: 4rem;
						width: 12rem;
						height: 12rem;
					}
				}
				.xk{
					margin-left: 10rem;
					border-radius: 2rem;
					background: var(--color);
					width: 36rem;
					text-align: center;
					height: 20rem;
					line-height: 20rem;
					font-size: 12rem;
					color: #ffffff;
				}
			}
			.store_name{
				margin-left: 10rem;
				font-size: 12rem;
				color: var(--color);
				word-break: break-all;
				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}
		.num_row{
			margin-top: 10rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12rem;
			color: #999999;
		}
		.img_back{
			margin-top: 10rem;
			display: flex;
			align-items: center;
			.img_list{
				flex:1;
				display: flex;
				.info_icon{
					margin-right: 6rem;
					width: 20rem;
					height: 20rem;
				}
			}
			.feek_back{
				font-size: 12rem;
				color: #37A3FF;
			}
		}
	}
}
</style>
<script>
	export default{
		props:{
			//单个商品
			info:{
				type:Object,
				default:{}
			}
		},
		methods:{
			//点击加入购物车
			addCar(){
				this.$store.commit('setCarGoods',this.info);
				localStorage.setItem("car_goods",JSON.stringify(this.$store.state.car_goods));
			}
		}
	}
</script>







