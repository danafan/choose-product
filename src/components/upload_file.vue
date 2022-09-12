<template>
	<div>
		<div class="upload_container">
			<img class="upload_icon" src="../static/upload_icon.png">
			<div class="upload_text">点击上传</div>
			<input type="file" ref="imgUpload" class="upload_file" accept="image/*" :multiple="is_multiple" @change="uploadFn">
		</div>
	</div>
</template>
<style lang="less" scoped>
.upload_container{
	border:1px solid #D9D9D9;
	width: 160rem;
	height: 160rem;
	border-radius: 2rem;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content:center;
	align-items:center;
	color: #666666;
}
.upload_icon{
	width: 40rem;
	height: 40rem;
}
.upload_text{
	margin-top: 16rem;
	font-size: 14rem;
}
.upload_file {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
</style>
<script>
	// import resource from '../api/'
	export default{
		props:{
			//是否多选
			is_multiple:{
				type:Boolean,
				default:false
			},
			//多选已上传的数量
			current_num:{
				type:Number,
				default:0
			},
			//多选最多上传的数量
			max_num:{
				type:Number,
				default:99
			}
		},
		methods:{
			// 上传图片
			uploadFn(){
				if (this.$refs.imgUpload.files.length > 0) {
					let files = this.$refs.imgUpload.files;
					//判断是否多选
					if(this.is_multiple == true){
						if(this.current_num + this.$refs.imgUpload.files.length > this.max_num){
							this.$refs.imgUpload.value = null;
							this.$message.warning(`图片最多不超过${this.max_num}张`);
							return;
						}
					}
					console.log(files)
					// for(var i = 0;i < files.length;i ++){
					// 	let arg = {
					// 		file:files[i]
					// 	}
					// 	resource.uploadFile(arg).then(res => {
					// 		this.$refs.imgUpload.value = null;
					// 		if(res.data.code == 1){
					// 			this.$emit('callbackFn',{
					// 				file:res.data.data,
					// 				img_type:this.img_type
					// 			});
					// 		}else{
					// 			this.$message.warning(res.data.msg);
					// 		}
					// 	})
					// }
				}
			}

		}
	}



</script>