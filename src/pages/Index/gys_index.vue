<template>
	<div class="gys_index">
		<el-card class="card_box">
			<div class="card_title">销量前五十</div>
			<div class="goods_list" v-if="goods_list.length > 0">
				<div class="goods_item" v-for="item in goods_list">
					<el-image class="goods_img" fit="scale-down" :src="domain + item.img"></el-image>
					<div class="goods_info">
						<div class="goods_name">{{item.title}}</div>
						<div class="sales">销量 {{item.sales_num_all}}</div>
					</div>
				</div>
				<div class="padding_item" v-for="i in 6-(goods_list.length%6) == 6?0:6-(goods_list.length%6)"></div>
			</div>
			<EmptyPage :is_loading="loading" v-else/>
		</el-card>
	</div>
</template>
<script>
	import EmptyPage from '../../components/empty_page.vue'

	import resource from '../../api/supplier_resource.js'
	export default{
		data(){
			return{
				loading:true,
				goods_list:[],	//商品列表
			}
		},
		created(){
			//获取列表
			this.getList();
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
		},
		methods:{
			//获取列表
			getList(){
				resource.getSupplierIndex().then(res => {
					if(res.data.code == 1){
						this.goods_list = res.data.data;
						this.loading = false;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
		},
		components:{
			EmptyPage
		}
	}
</script>
<style lang="less" scoped>
.gys_index{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 20rem 98rem;
	overflow-y: scroll;
	.card_box{
		width: 1725rem;
		.card_title{
			margin-bottom: 20px;
			font-size: 18px;
			font-weight: 600;
			color: #F37605;
		}
		.goods_list{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.goods_item{
				margin-bottom: 20px;
				width: 264rem;
				background: #FFF3E5;
				box-shadow: 0px 0px 10px 0px #FFEAD2;
				border-radius: 12rem;
				border: 1px solid #FFD2AA;
				.goods_img{
					border-radius:12rem 12rem 0 0;
					width: 262rem;
					height: 262rem;
				}
				.goods_info{
					padding: 10rem;
					.goods_name{
						margin-bottom: 10rem;
						font-size: 12px;
						color: #333333;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.sales{
						display: inline;
						padding-left: 5rem;
						padding-right: 5rem;
						height: 20rem;
						line-height: 20rem;
						background: #F37605;
						border-radius: 4rem;
						font-size: 12px;
						color: #ffffff;
					}
				}
			}
			.padding_item{
				width: 265rem;
				height: 329rem;
			}
		}
	}
	
}
.gys_index::-webkit-scrollbar{display:none}
</style>










