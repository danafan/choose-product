<template>
	<div class="store_info_container">
		<img class="store_info_back" src="../../../static/delist_store_info_back.png" v-if="goods_info.check_status == 5">
		<img class="store_info_back" src="../../../static/store_info_back.png" v-else>
		<div class="store_info">
			<div class="store_info_row">
				<div class="store_info_lable">供应商</div>
				<div class="store_info_value">{{goods_info.supplier_name}}</div>
			</div>
			<div class="store_info_row">
				<div class="store_info_lable">对接人</div>
				<div class="store_info_value">{{goods_info.maintainer}}</div>
			</div>
			<div class="store_info_row">
				<div class="store_info_lable">主营</div>
				<div class="store_info_value">{{goods_info.main_business}}</div>
			</div>
			<div class="store_info_row">
				<div class="store_info_lable">结算方式</div>
				<div class="store_info_value" v-if="goods_info.supply_monthly_settlement == 0">现结</div>
				<div class="store_info_value" v-if="goods_info.supply_monthly_settlement == 1">月结</div>
				<div class="store_info_value" v-if="goods_info.supply_monthly_settlement == 2">半月结</div>
			</div>
			<div class="store_info_row">
				<div class="store_info_lable">供应商等级</div>
				<div class="store_info_pj">{{goods_info.grade_name}}</div>
			</div>
		</div>
		<div class="detail_box">
			<div class="get_detail" :class="{'delist_get_detail':goods_info.check_status == 5}" @click="supplierDetail">查看详情</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			goods_info:{
				type:Object,
			default:{}
			}
		},
		methods:{
			//点击跳转供应商详情
			supplierDetail(){
				if(this.goods_info.check_status == 5){
					this.$message.warning('该商品已下架!')
				}else{
					let active_path = `/supplier_detail?supplier_id=${this.goods_info.supplier_id}`;
					const routeData = this.$router.resolve(active_path);
					window.open(routeData.href);
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.store_info_container{
		position: relative;
		width: 298rem;
		height: 330rem;
		.store_info_back{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.store_info{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			padding: 40rem 30rem;
			z-index: 9;
			.store_info_row{
				margin-bottom: 20rem;
				display: flex;
				font-size:12rem;
				.store_info_lable{
					width: 80rem;
					color: #666666;
				}
				.store_info_pj{
					color: var(--color);
					font-size:12rem;
					font-weight: normal;
				}
				.store_info_value{
					flex:1;
					color: #333333;
				}
			}
		}
		.detail_box{
			position:absolute;
			bottom:20rem;
			left:50%;
			transform: translate(-50%);
			width:186rem;
			height:50rem;
			display:flex;
			align-items:center;
			justify-content:center;
			z-index: 9;
			.get_detail{
				border:1px solid var(--color);
				border-radius: 4rem;
				width: 120rem;
				text-align: center;
				height: 32rem;
				line-height: 32rem;
				font-size:12rem;
				background: #FEEDDD;
				color: var(--color);
				cursor:pointer;
			}
			.delist_get_detail{
				border:1px solid #494744;
				background: #EEEEEE;
				color: #494744;
				cursor:not-allowed;
			}
		}
	}
</style>