<template>
	<div class="chain_page">
		<div class="left_menu">
			<div class="menu_item" :class="{'menu_item_active':active_index == index}" v-for="(item,index) in menu_list" @click="active_index = index">
				<img class="chain_icon" :src="item.icon_active" v-if="active_index == index">
				<img class="chain_icon" :src="item.icon" v-else>
				<div class="chain_text">{{item.name}}</div>
				<div class="active_line" v-if="active_index == index"></div>
			</div>
		</div>
		<div class="right_content">
			<div class="right_content_title">{{title}}</div>
			<div class="right_content_box">
				<keep-alive>
					<router-view v-if="$route.meta.keepAlive">
					</router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.keepAlive"></router-view>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				menu_list:[{
					icon:require('../../static/chain_message.png'),
					icon_active:require('../../static/chain_message_active.png'),
					path:'/chain_message_page',
					name:'公告'
				},{
					icon:require('../../static/chain_goods.png'),
					icon_active:require('../../static/chain_goods_active.png'),
					path:'/chain_goods_page',
					name:'商品'
				},{
					icon:require('../../static/chain_supplier.png'),
					icon_active:require('../../static/chain_supplier_active.png'),
					path:'/chain_supplier_page',
					name:'供应商'
				},{
					icon:require('../../static/chain_setting.png'),
					icon_active:require('../../static/chain_setting_active.png'),
					path:'/chain_setting_page',
					name:'配置'
				},{
					icon:require('../../static/chain_permissions.png'),
					icon_active:require('../../static/chain_permissions_active.png'),
					path:'/chain_permissions_page',
					name:'权限'
				},{
					icon:require('../../static/chain_feekback.png'),
					icon_active:require('../../static/chain_feekback_active.png'),
					path:'/chain_feekback_page',
					name:'反馈'
				}],					//导航列表
				active_index:0,		//当前选中的导航下标
				title:"",			//标题
			}
		},
		watch:{
			//切换导航
			active_index:function(n,o){
				let path = this.menu_list[n].path;
				this.$router.push(path);
			},
			$route:function(to,from){
				if(to.query.supplier_type){	//供应链中心（供应商）
					this.title = to.query.supplier_type == '1'?"添加供应商":"编辑供应商";
				}else{
					this.title = to.name;
				}
			}
		},
		created(){
			this.title = this.menu_list[this.active_index].name;
			let path = this.menu_list[this.active_index].path;
			this.$router.push(path);
		}
	}
</script>
<style lang="less" scoped>
.chain_page{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	.left_menu{
		box-shadow: 2px 0px 4px 0px rgba(232,232,232,0.5);
		border: 1px solid #F1F1F1;
		background: #ffffff;
		width: 208rem;
		height: 100%;
		padding-left: 16rem;
		.menu_item{
			margin-bottom: 8rem;
			height: 40rem;
			display: flex;
			align-items: center;
			font-size: 14rem;
			color: #333333;
			position: relative;
			.chain_icon{
				margin-right: 5rem;
				width: 14rem;
				height: 14rem;
			}
			.active_line{
				position: absolute;
				top: 0;
				right: 0;
				background: var(--color);
				width: 2rem;
				height: 40rem;
			}
		}
		.menu_item_active{
			background: #FFFAF5;
			color: var(--color);
		}
	}
	.right_content{
		flex:1;
		height: 100%;
		display: flex;
		flex-direction: column;
		.right_content_title{
			background: #ffffff;
			height: 64rem;
			line-height: 64rem;
			padding-left: 24rem;
			font-size:18rem;
			color: #333333;
			font-weight: 500;
		}
		.right_content_box{
			position: relative;
			flex:1;
		}
		
	}
}
</style>