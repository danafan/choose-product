<template>
	<div>
		<div class="imgBox" v-if="!fileObj.fileName">
			<el-button icon="el-icon-plus" :loading="upload_loading">添加附件</el-button>
			<input type="file" ref="csvUpload" class="upload_file" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="uploadCsv">
		</div>
		<el-tag size="small" closable @close="delFile(fileObj.fileName)" v-else>{{fileObj.fileName}}</el-tag>
	</div>
</template>
<style lang="less" scoped>
	.imgBox{
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content:center;
		align-items:center;
		width: 97px;
		height: 28px;
		.upload_icon{
			width: 40px;
			height: 40px;
		}
		.upload_text{
			font-size: 12px;
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
	}
</style>
<script>
	import resource from '../api/common_resource.js'
	export default{
		data(){
			return{
				upload_loading:false,
				fileObj:{},
			}
		},
		props:{
			//已上传的附件文件json
			attachment:{
				type:Object,
			default:{}
			}
		},
		watch:{
			attachment:function(n,o){
				this.fileObj = n;
			}
		},
		methods:{
			//上传表格
			uploadCsv(){
				if (this.$refs.csvUpload.files.length > 0) {
					let files = this.$refs.csvUpload.files;
					this.upload_loading = true;
					resource.dingUpload({file:files[0]}).then(res => {
						if(res.data.code == 1){
							this.upload_loading = false;
							this.fileObj = res.data.data[0];
							//向父组件传递已选的图片列表
							this.$emit('callBackXlsx',this.fileObj);
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//删除文件
			delFile(url){
				let arg = {
					url: url,
				};
				resource.delFile(arg).then((res) => {
					if (res.data.code == 1) {
						this.fileObj = {};
						//向父组件传递已选的图片列表
						this.$emit('callBackXlsx',this.fileObj);
					} else {
						this.$message.warning(res.data.msg);
					}
				});
			}

		}


	}
</script>