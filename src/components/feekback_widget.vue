<template>
	<div>
		<div class="back_widget" :class="{'fixed_style':is_fixed == true}" @click="feekback_dialog = true">
			<img class="back_icon" src="../static/feekback_icon.png">
			<div class="back_text">反馈</div>
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
	export default{
		data(){
			return{
				feekback_dialog:false,	//反馈弹窗
				feedback_content:"",		//反馈文字
				feedback_img:[],		//上传的图片列表
			}
		},
		props:{
			style_id:{
				type:String,
				default:""
			},
			//是否相对整个页面定位
			is_fixed:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			//上传图片回调
			uploadFn(v) {
				this.feedback_img = v;
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
			}
		},
		components:{
			UploadFile
		}
	}
</script>
<style lang="less" scoped>
.back_widget{
	position: absolute;
	top: 60%;
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
	.back_icon{
		margin-bottom: 2rem;
		width: 25rem;
		height: 26rem;
	}
	.back_text{
		color: #333333;
		font-size: 12rem;
	}
}
.fixed_style{
	position: fixed;
	right: 20rem;
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