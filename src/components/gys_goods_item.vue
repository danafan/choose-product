<template>
	<div class="goods_item">
		<div class="image_box" @click="getMoreImage" v-if="info.img != ''">
			<el-popover
			placement="right-start"
			trigger="hover"
			>
			<el-image class="popover_image" fit="scale-down" :src="domain + info.img"></el-image>
			<el-image class="goods_img" :src="domain + info.img" slot="reference" fit="scale-down"></el-image>
		</el-popover>
	</div>
	<img class="image_box" src="../static/load_failure.png" @click="getMoreImage" v-else>
	<div class="goods_info" @click="getDetail" @mousedown="mouseDownFn" @mouseup="mouseUpFn">
		<div class="desc">{{info.title}}</div>
		<div class="price_cate">
			<div class="time">{{info.new_time_name}}</div>
			<div class="cate">{{info.style_name}}</div>
		</div>
		<div class="num_row">
			<div>浏览：{{info.views_num}}</div>
			<div>选中：{{info.select_num}}</div>
			<div>30天销量：{{info.sales_num_all}}</div>
		</div>
		<div class="img_list">
			<img class="info_icon" src="../static/tui_icon.png" v-if="info.supply_return_goods == 1">
			<img class="info_icon" src="../static/ru_icon.png" v-if="info.supply_warehousing == 1">
			<img class="info_icon" src="../static/huan_icon.png" v-if="info.supply_exchange_goods == 1">
			<img class="info_icon" src="../static/pai_icon.png" v-if="info.supply_photograph == 1">
			<img class="info_icon" src="../static/dai_icon.png" v-if="info.supply_replace_send == 1">
			<img class="info_icon" src="../static/xian_icon.png" v-if="info.supply_monthly_settlement == 0">
			<img class="info_icon" src="../static/yue_icon.png" v-if="info.supply_monthly_settlement == 1">
		</div>
	</div>
	<!-- 更多图片 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :visible.sync="more_image_dialog">
		<div slot="title" class="dialog_title">
			<div>更多图片</div>
			<img class="close_icon" src="../static/close_icon.png" @click="more_image_dialog = false">
		</div>
		<div class="image_content">
			<div class="tab_row">
				<div class="tab_item" :class="{'active_tab_item':active_tab_index == index}" v-for="(item,index) in image_title_list" @click="active_tab_index = index">
					<div>{{item}}</div>
					<div class="active_line" v-if="active_tab_index == index"></div>
				</div>
			</div>
			<el-tabs size="small" v-if="active_tab_index == 0">
				<el-tab-pane :label="item.shooting_style_name" v-for="(item,index) in style_data" :key="index">
					<div class="source_url">共享盘地址：{{item.shared_disk_address}}</div>
					<div class="source_url">网盘地址：{{item.net_disk_address}}</div>
					<div class="more_image">
						<el-image :z-index="9009" class="more_image_item" :src="img_url" fit="scale-down" v-for="(img_url,i) in item.img_arr" :key="i" :preview-src-list="item.img_arr"></el-image>
					</div>
				</el-tab-pane>
			</el-tabs>
			<div v-else>
				<div class="more_image">
					<el-image :z-index="9009" class="more_image_item" :src="item" fit="scale-down" v-for="item in commodity_data" :preview-src-list="commodity_data"></el-image>
				</div>
			</div>
		</div>
		<div slot="footer" class="dialog_footer">
			<el-button type="primary" size="small" @click="more_image_dialog = false">关闭</el-button>
		</div>
	</el-dialog>
</div>
</template>
<style type="text/css">
.el-carousel__container{
	width: 240rem !important;
	height: 240rem !important; 
}
.popover_image{
	height: 400px!important;
	width: 400px!important;
}
</style>
<style lang="less" scoped>
.goods_item{
	margin-bottom: 20rem;
	border:1px solid #EDEDED;
	width: 265rem;
	cursor:pointer;
	.image_box{
		position: relative;
		width: 263rem;
		height: 263rem;
		display: flex;
		align-items: center;
		justify-content: center;
		.goods_img{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
	.goods_info{
		padding: 8rem 10rem;
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
		.price_cate{
			margin-top: 12rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12rem;
			.time{
				color: #999999;
			}
			.cate{
				color: #333333;
			}
		}
		.num_row{
			margin-top: 14rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12rem;
			color: #999999;
		}
		.img_list{
			margin-top: 12rem;
			flex:1;
			display: flex;
			.info_icon{
				margin-right: 6rem;
				width: 20rem;
				height: 20rem;
			}
		}
	}
}
.image_content{
	padding: 10rem 20rem;
	.tab_row{
		margin-bottom: 13rem;
		padding-left: 30rem;
		border-radius:2rem;
		border:1px solid #FFC998;
		background: #FFFCFA;
		width: 100%;
		height: 36rem;
		display: flex;
		.tab_item{
			margin-right: 68rem;
			position: relative;
			height: 36rem;
			display: flex;
			align-items: center;
			font-size:14rem;
			color:#333333;
			.active_line{
				background: #FFC998;
				position: absolute;
				left: 0;
				bottom:3rem;
				width: 100%;
				height: 1px;
			}
		}
		.active_tab_item{
			color: var(--color);
		}
	}
	.source_url{
		margin-bottom: 10rem;
		font-size:14rem;
		color: #333333;
		cursor: initial;
	}
	.more_image{
		display: flex;
		flex-wrap: wrap;
		.more_image_item{
			margin-right: 25rem;
			margin-bottom: 25rem;
			width: 220rem;
			height: 220rem;
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				more_image_dialog:false,		//更多图片
				image_title_list:['风格图','封面图'],	//更多图片类型
				active_tab_index:0,		//选中的下标
				style_data:[],			//风格图数据
				commodity_data:[],		//封面图数据
				firstTime: '', 			// mousedown的时间戳
				lastTime: '', 			// mouseup的时间戳
				isClick: false, 		// false--禁止点击，true--可点击
			}
		},
		props:{
			//单个商品
			info:{
				type:Object,
				default:{}
			}
		},
		watch:{
			active_tab_index:function(n,o){
				if(n == 0){
					//获取风格图
					this.getMoreImage();
				}else{
					//获取封面图
					this.moreImgCommodity();
				}
			}
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
		},
		methods:{
			mouseDownFn () {
				this.firstTime = new Date().getTime();
			},
			mouseUpFn () {
				this.lastTime = new Date().getTime();
				if((this.lastTime - this.firstTime) < 200){
					this.isClick = true
				} else {
					this.isClick = false
				}
			},
			//幻灯片自动切换事件
			changeImage(e){
				this.active_index = e;
			},
			//鼠标移入指示器切换当前显示图片
			checkIndex(index){
				this.$refs.cardShow.setActiveItem(index);
			},
			//获取风格图
			getMoreImage(){
				let arg = {
					style_id:this.info.style_id
				}
				resource.moreImgStyle(arg).then(res => {
					if(res.data.code == 1){
						let style_data = res.data.data;
						style_data.map(item => {
							let img_arr = [];
							item.img.map(iii => {
								img_arr.push(this.domain + iii);
							})
							item['img_arr'] = img_arr;
						})
						this.style_data = style_data;
						this.more_image_dialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})		
			},
			//获取封面图
			moreImgCommodity(){
				let arg = {
					style_id:this.info.style_id
				}
				resource.moreImgCommodity(arg).then(res => {
					if(res.data.code == 1){
						let commodity_data = res.data.data.img;
						let img_arr = [];
						commodity_data.map(item => {
							img_arr.push(this.domain + item);
						})
						this.commodity_data = img_arr;
						this.more_image_dialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
    		//点击跳转详情
    		getDetail(){
    			if(!this.isClick) return;
    			let active_path = `/goods_detail?style_id=${this.info.style_id}`;
    			localStorage.setItem("active_path",active_path);
    			this.$store.commit("setPath", active_path);
    			const routeData = this.$router.resolve(active_path);
    			window.open(routeData.href);
    		}
    	}
    }
</script>







