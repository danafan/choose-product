<template>
	<div>
		<div class="fixed_button">
			<div class="fixed_item pointer flex fc ac jc border_bottom" @click="openWindow" v-if="permission.indexOf(1) > -1 && notInDingTalk">
				<img class="web_icon" src="../static/web_icon.png">
				<div class="icon_text">网页打开</div>
			</div>
			<div class="fixed_item pointer flex fc ac jc border_bottom" @click="$emit('clipboardCallback')" v-if="permission.indexOf(2) > -1">
				<img class="clipboard_icon" src="../static/clipboard_icon.png">
				<div class="icon_text">截图</div>
			</div>
			<div class="fixed_item pointer flex fc ac jc" :class="{'border_bottom':permission.length > 2}" @click="goCarPage" v-if="permission.indexOf(3) > -1">
				<img class="add_car" src="../static/add_car.png">
				<div class="icon_text">待选</div>
				<div class="num">{{car_goods_num}}</div>
			</div>
			<div class="fixed_item pointer flex fc ac jc border_bottom" @click="feekback_dialog = true" v-if="permission.indexOf(4) > -1">
				<img class="feekback_icon" src="../static/feekback_icon.png">
				<div class="icon_text">反馈</div>
			</div>
			<div class="fixed_item pointer flex fc ac jc" @click="$emit('scrollTopCallback')" v-if="permission.indexOf(5) > -1">
				<img class="scroll_top_icon" src="../static/scroll_top_icon.png">
				<div class="icon_text">置顶</div>
			</div>
		</div>
		<!-- 反馈弹窗 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closeDialog" destroy-on-close :visible.sync="feekback_dialog">
			<div slot="title" class="dialog_title">
				<div>意见反馈</div>
				<img class="close_icon" src="../static/close_icon.png" @click="feekback_dialog = false">
			</div>
			<div class="feekback_content">
				<el-input type="textarea" :rows="5" placeholder="请描述哪条描述数据不对，或者缺失，我们尽快调整" v-model="feedback_content">
				</el-input>
				<div class="upload_title">上传截图</div>
				<UploadFile :img_list="feedback_img" :is_multiple="true" :current_num="feedback_img.length" :max_num="5" @callbackFn="uploadFn"/>
				<div class="upload_toast">上传“有效截图”，可以让问题优先被发现哦！最多可以上传5张截图</div>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="small" @click="feekback_dialog = false">取消</el-button>
				<el-button type="primary" size="small" @click="confirmFeekBack">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import resource from '../api/resource.js'

	import UploadFile from '../components/upload_file.vue'
	import * as dd from 'dingtalk-jsapi';
	export default{
		data(){
			return{
				notInDingTalk:false,
				feekback_dialog:false,	//反馈弹窗
				feedback_content:"",		//反馈文字
				feedback_img:[],		//上传的图片列表
			}
		},
		props:{
			//展示按钮代号列表
			permission:{
				type:Array,
			default:[]
			},
			//反馈专用
			style_id:{
				type:String,
			default:""
			},
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
			this.notInDingTalk = dd.env.platform != 'notInDingTalk';
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
			},
			//上传图片回调
			uploadFn(v) {
				this.feedback_img = v.image_arr;
			},
			//提交反馈
			confirmFeekBack(){
				if(this.feedback_content == ''){
					this.$message.warning('请输入反馈内容!');
				}else{
					let arg = {
						style_id:this.style_id,
						feedback_content:this.feedback_content,
						feedback_img:this.feedback_img.join(',')
					}
					resource.confirmFeekBack(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.feekback_dialog = false;
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//关闭反馈弹窗
			closeDialog(){
				this.feedback_content = "";		//反馈文字
				this.feedback_img = [];	//上传的图片列表
			},
			//打开新窗口
			openWindow(){
				window.open(`${location.origin}/#/index`);
			}
		},
		components:{
			UploadFile
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
		z-index: 9;
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
				color: #ffffff;
			}
		}
		.border_bottom{
			border-bottom: 1px solid #F1F1F1;
		}
	}
	.feekback_content{
		padding: 10rem 20rem;
		.upload_title{
			margin-top: 20rem;
			margin-bottom:10rem;
			font-size:14rem;
			color: #333333;
		}
		.upload_toast{
			margin-top: 10rem;
			font-size:14rem;
			color: #666666;
		}
	}
</style>