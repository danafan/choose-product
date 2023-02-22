<template>
	<div class="goods_item">
		<div class="image_box" v-if="info.img != ''">
			<el-image class="goods_img" fit="scale-down" :src="domain + info.img"></el-image>
		</div>
		<img class="image_box" src="../static/load_failure.png" v-else>
		<div class="goods_info">
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
			<div class="num_row">
				<div class="kh">款号：{{info.p_style_name}}</div>
				<div class="buts">
					<div class="but" :class="{'drak_back':info.hot_style == 1}" @click="sendFn(1,info.hot_style)">推爆款</div>
					<div class="but" :class="{'drak_back':info.data_style == 1}" @click="sendFn(2,info.data_style)">推主推</div>
				</div>
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
		<!-- 推爆款/主推 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closeSendDialog" destroy-on-close :visible.sync="send_dialog">
			<div slot="title" class="dialog_title">
				<div>{{type == 1?'爆款：':'主推款：'}}{{info.p_style_name}}</div>
				<img class="close_icon" src="../static/close_icon.png" @click="send_dialog = false">
			</div>
			<el-form style="margin-top: 15px;" size="small" label-width="100px">
				<el-form-item label="爆款链接：" v-if="type == 1" required>
					<div style="display: flex;flex-wrap: wrap">
						<div :key="url" v-for="url in link_urls">
							<el-tooltip class="item" effect="dark" :content="url" placement="top-start">
								<el-tag size="small" closable :disable-transitions="false" @close="handleClose(url)">
									{{url}}
								</el-tag>
							</el-tooltip>
						</div>
					</div>
					
					<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
					</el-input>
					<el-button size="mini" v-if="!inputVisible" type="primary" icon="el-icon-plus" @click="showInput">新增</el-button>
				</el-form-item>
				<el-form-item label="爆款图片：" v-if="type == 1" required>
					<UploadFile :img_list="bk_img_list" :is_multiple="true" :current_num="bk_img.length" :size="80" :max_num="9" @callbackFn="bkCallbackFn"/>
				</el-form-item>

				<el-form-item label="库存数：" v-if="type == 2" required>
					<el-input type="number" v-model="kcs">
					</el-input>
				</el-form-item>
				<el-form-item label="调价：" v-if="type == 2">
					<el-input type="number" v-model="tj">
					</el-input>
				</el-form-item>
				<el-form-item label="备注：" v-if="type == 2">
					<el-input type="textarea" :rows="3" placeholder="请输入备注" v-model="bz">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog_footer">
				<el-button size="small" @click="send_dialog = false">取消</el-button>
				<el-button type="primary" size="small" @click="confirmSend">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<style>
.el-tag {
	position: relative;
	max-width: 300px;
	margin-right: 10px;
	margin-bottom: 0!important;
	overflow: hidden!important;
	text-overflow: ellipsis!important;
	white-space: nowrap!important;
	padding-right: 18px;
}
.el-tag__close{
	position: absolute!important;
	right: 1px!important;
	top: 3px!important;
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
		.kh{
			word-break: break-all;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
		.buts{
			display: flex;
			.but{
				margin-left: 10rem;
				border-radius: 2rem;
				background: var(--color);
				padding: 0 3rem;
				height: 20rem;
				line-height: 20rem;
				font-size: 12rem;
				color: #ffffff;
			}
			.drak_back{
				background-color: #999999;
			}
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
</style>
<script>
	import resource from '../api/resource.js'

	import UploadFile from '../components/upload_file.vue'
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
				send_dialog:false,
				type:null,
				link_urls: [],				//已填写的爆款链接列表
				inputVisible: false,		//是否显示新建链接的输入框
				inputValue: '',				//新建链接的输入框内容
				bk_img_list:[],				//选中的爆款图片列表(可查看)
				bk_img:[],					//选中的爆款图片列表（可传递）
				kcs:"",						//库存数
				tj:"",						//调价
				bz:"",						//备注
			}
		},
		props:{
			//单个商品
			info:{
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
		methods:{
			//点击推爆款或主推款
			sendFn(type,style){
				if(style == 0){
					this.type = type;
					this.send_dialog = true;
				}else{
					if(type == 1){
						this.$message.warning('爆款已推！');
					}else{
						this.$message.warning('主推款已推！');
					}
				}
			},
			//关闭推款弹窗
			closeSendDialog(){
				this.link_urls = [];				//已填写的爆款链接列表
				this.inputVisible = false;			//是否显示新建链接的输入框
				this.inputValue = '';				//新建链接的输入框内容
				this.bk_img_list = [];				//选中的爆款图片列表(可查看)
				this.bk_img = [];					//选中的爆款图片列表（可传递）
				this.kcs = "";						//库存数
				this.tj = "";						//调价
				this.bz = "";						//备注
			},
			//删除当前选中的爆款链接
			handleClose(url) {
				this.link_urls.splice(this.link_urls.indexOf(url), 1);
			},
			//监听爆款图片列表回调
			bkCallbackFn(img_arr){
				this.bk_img = img_arr;
			},
			//点击新增爆款链接
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.link_urls.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';
			},
			confirmSend(){
				let arg = {
					type:this.type,
					style_id:this.info.style_id
				}
				if(this.type == 1){		//推爆款
					if(this.link_urls.length == 0){
						this.$message.warning('请输入爆款链接');
						return
					}
					if(this.bk_img.length == 0){
						this.$message.warning('请至少上传一张图片');
						return
					}
					arg['hot_url'] = this.link_urls.join(',');
					arg['hot_img'] = this.bk_img.join(',');
				}else{	//主推款
					if(!this.isZzs.test(this.kcs)){
						this.$message.warning('库存数不能为空且是正整数');
						return
					}
					if(this.tj && !this.isPrice.test(this.tj)){
						this.$message.warning('调价需大于0且最多两位小数');
						return
					}
					arg['data_num'] = this.kcs;
					arg['data_price'] = this.tj;
					arg['remark'] = this.bz;
				}
				resource.pushHostData(arg).then(res => {
					if(res.data.code == 1){
						this.send_dialog = false;
						this.$emit('reload');
						this.$message.success(res.data.msg);
					}else if(res.data.code == 9){
						this.send_dialog = false;
						this.$emit('reload');
						this.$message.warning(res.data.msg);
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			}
		},
		components:{
			UploadFile
		}
	}
</script>







