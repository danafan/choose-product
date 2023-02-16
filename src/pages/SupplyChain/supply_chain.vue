<template>
	<div class="chain_page">
		<el-menu class="el-menu-vertical-demo" :collapse="is_collapse">
			<div class="collapse_row">
				<i class="el-icon-s-unfold fold_icon" v-if="is_collapse" @click="is_collapse = !is_collapse"></i>
				<i class="el-icon-s-fold fold_icon" v-else @click="is_collapse = !is_collapse"></i>
			</div>
			<el-menu-item :index="(index + 1).toString()" v-for="(item,index) in menu_list" @click="checkMenu(index)">
				<div class="menu_item" :class="[{'menu_item_active':active_index == index},{'collapse_menu_item':is_collapse}]">
					<div v-if="is_collapse">
						<el-tooltip class="item" effect="dark" :content="item.name" placement="right">
							<img class="collapse_chain_icon" :src="item.icon_active" v-if="active_index == index">
							<img class="collapse_chain_icon" :src="item.icon" v-else>
						</el-tooltip>
					</div>
					<div v-else>
						<img class="chain_icon" :src="item.icon_active" v-if="active_index == index">
						<img class="chain_icon" :src="item.icon" v-else>
					</div>

					<div class="chain_text" v-if="!is_collapse">{{item.name}}</div>
					<div class="active_line" v-if="active_index == index && !is_collapse"></div>
				</div>
			</el-menu-item>
		</el-menu>
		<div class="right_content">
			<div class="right_content_title">
				<div class="page_title">{{title}}</div>
				<GoBack v-if="is_back"/>
				<div class="edit_record" v-if="show_record" @click="$router.push('/edit_record')">修改记录</div>
			</div>
			<div class="right_content_box">
				<keep-alive>
					<router-view v-if="$route.meta.keep_alive">
					</router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.keep_alive"></router-view>
			</div>
		</div>
	</div>
</template>
<script>
	import GoBack from '../../components/go_back.vue'
	export default{
		data(){
			return{
				is_collapse:true,	//左侧导航是否收起
				menu_list:[],
				active_index:0,		//当前选中的导航下标
				title:"",			//标题
				is_back:false,
				is_record:false,
				show_record:false,
			}
		},
		watch:{
			$route:function(to,from){
				//设置返回按钮
				this.is_back = to.meta.is_back;
				if(to.query.supplier_type){	//供应链中心（供应商）
					this.title = to.query.supplier_type == '1'?"添加供应商":"编辑供应商";
				}else if(to.query.goods_type){	//供应链中心（商品）
					switch(to.query.goods_type){
						case '1':
						this.title = "添加商品";
						break;
						case '2':
						this.title = "编辑商品";
						break;
						case '3':
						this.title = "商品详情";
						break;
						default: 
						return;
					}
				}else if(to.path == '/chain_setting_page'){	//判断是否显示修改记录
					this.show_record = this.is_record?true:false;
					this.title = to.name;
				}else{
					this.title = to.name;
					this.show_record = false;
				}
			}
		},
		computed: {
			menu_arr() {
				return this.$store.state.menu_list;
			},
		},
		created(){
			var chain_setting_arr = [];

			let new_menu_list = [];
			let arr = this.menu_arr.filter(item => {
				return item.web_url == 'supply_chain';
			});
			arr[0].list.map(item => {
				let icon_path = item.web_url.split('_page')[0];
				let o = {
					icon:require(`../../static/${icon_path}.png`),
					icon_active:require(`../../static/${icon_path}_active.png`),
					list:item.list,
					path:`/${item.web_url}`,
					name:item.menu_name
				}
				new_menu_list.push(o);
				// 判断是否显示修改记录
				if(item.web_url == 'chain_setting_page'){
					chain_setting_arr = item.list;
				}
			})
			this.menu_list = new_menu_list;


			// let cc = {
			// 	icon:require(`../../static/chain_audit.png`),
			// 	icon_active:require(`../../static/chain_audit_active.png`),
			// 	list:[],
			// 	path:`/b_z_promotion_page`,
			// 	name:"爆/主推款审"
			// }
			// this.menu_list.push(cc);
			this.title = this.menu_list[this.active_index].name;
			let path = this.menu_list[this.active_index].path;
			this.$router.push(path);


			//处理修改记录按钮是否显示
			let ff = chain_setting_arr.filter(item => {
				return item.web_url == 'edit_record';
			})
			this.is_record = ff.length > 0;
		},
		methods:{
			checkMenu(index){
				this.active_index = index;
				let path = this.menu_list[index].path;
				this.$router.push(path);
			},
		},
		components:{
			GoBack
		}
	}
</script>
<style type="text/css">
.el-menu-item{
	padding: 0!important;
}
</style>
<style lang="less" scoped>
.chain_page{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	.collapse_row{
		height: 30px;
		padding-right: 5px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.fold_icon{
			font-size:20px;
			cursor: pointer;
		}
	}
	.menu_item{
		width: 208rem;
		height: 56px;
		display: flex;
		align-items: center;
		font-size: 16rem;
		color: #333333;
		position: relative;
		cursor:pointer;
		padding-left: 16rem;
		.chain_icon{
			margin-right: 8rem;
			width: 16rem;
			height: 16rem;
		}
		.active_line{
			position: absolute;
			top: 0;
			right: 0;
			background: var(--color);
			width: 2rem;
			height: 56px;
		}
	}
	.chain_text{
		position: relative;
		top: 2rem;
	}
	.collapse_menu_item{
		width: 64px;
		height: 56px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 0;
		.collapse_chain_icon{
			width: 24px;
			height: 24px;
		}
	}
	.menu_item_active{
		background: #FFFAF5;
		color: var(--color);
	}
	.right_content{
		flex:1;
		height: 100%;
		display: flex;
		flex-direction: column;
		.right_content_title{
			background: #ffffff;
			height: 64rem;
			padding-left: 24rem;
			padding-right: 60rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.page_title{
				font-size:18rem;
				color: #333333;
				font-weight: 500;
			}
			.edit_record{
				font-size:14rem;
				color: var(--color);
				cursor:pointer;
			}
		}
		.right_content_box{
			position: relative;
			flex:1;
		}
		
	}
}
</style>