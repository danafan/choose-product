<template>
	<div>
		<!-- 只读 -->
		<div class="image_list" v-if="only_view">
			<el-image :z-index="999999" :style="{width:`${size}px`,height:`${size}px`,marginRight:`${size/5}px`,marginBottom:`${size/5}px`}" :src="item" v-for="item in view_images" :preview-src-list="view_images" fit="scale-down"></el-image>
		</div>
		<!-- 上传 -->
		<div class="image_list" v-else>
			<draggable
			style="display: flex;flex-wrap:wrap;"
			:group="{name:'view_card_img'}"
			v-model="preview_images"
			:move="moveDraggable"
			@end="emitFn"
			>
			<div class="view_card_img" :style="{width:`${size}px`,height:`${size}px`,marginRight:`${size/5}px`,marginBottom:`${size/5}px`}" @mouseenter="item.show_icon = true" @mouseleave="item.show_icon = false" v-for="(item,index) in preview_images" :key="index">
				<div class="is_main" v-if="index == 0 && is_main">主图</div>
				<el-image class="card_img" :src="domain + item.urls" fit="scale-down"></el-image>
				<div class="delete_img" v-if="item.show_icon == true">
					<img :style="{width:`${size/5}px`,height:`${size/5}px`,cursor: 'pointer'
				}" src="../static/delete_icon.png" @click="deleteFile(item.urls,index)">
				<div class="set_main" @click="toFirst(index)" v-if="index != 0 && is_main">设为主图</div>
			</div>
		</div>
	</draggable>
	<div class="upload_container" :style="{width:`${size}px`,height:`${size}px`}" v-if="preview_images.length < max_num">
		<img :style="{width:`${size/4}px`,height:`${size/4}px`}" src="../static/upload_icon.png">
		<div class="upload_text">点击上传</div>
		<input type="file" ref="imgUpload" class="upload_file" accept="image/*" :multiple="is_multiple" @change="uploadFn">
	</div>
</div>
</div>
</template>
<style lang="less" scoped>
	.image_list {
		flex:1;
		display: flex;
		flex-wrap: wrap;
		.view_card_img {
			border-radius: 2rem;
			position: relative;
			.is_main{
				background:#F37605;
				position: absolute;
				top: 0;
				left: 0;
				width: 36px;
				text-align: center;
				height: 20px;
				line-height: 20px;
				font-size: 12px;
				color:#ffffff;
				z-index: 9;
			}
			.card_img,
			.delete_img {
				border-radius: 2rem;
				position: absolute;
				width: 100%;
				height: 100%;
			}
			.delete_img {
				background: rgba(0, 0, 0, 0.4);
				display: flex;
				align-items: center;
				justify-content: center;
				.set_main{
					cursor: pointer;
					position: absolute;
					top: 0px;
					right: 5px;
					font-size: 12px;
					font-weight: bold;
					color:#ffffff;
				}
			}
		}
		.upload_container{
			border:1px solid #D9D9D9;
			border-radius: 2rem;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content:center;
			align-items:center;
			color: #666666;
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
	}
</style>
<script>
	import draggable from "vuedraggable";

	import resource from '../api/common_resource.js'
	export default{
		data(){
			return{
				preview_images:[],		//当前的图片列表
				view_images:[],			//预览图片列表
			}
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
		},
		props:{
			//下标
			index:{
				type:Number,
			default:0
			},
			img_list:{
				type:Array,
			default:[]
			},
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
			default:1
			},
			//尺寸
			size:{
				type:Number,
			default:120
			},
			//是否可以设置主图
			is_main:{
				type:Boolean,
			default:false
			},
			//是否调用删除接口
			request_del:{
				type:Boolean,
			default:true
			},
			//是否只读
			only_view:{
				type:Boolean,
			default:false
			}
		},
		watch:{
			img_list:function(n,o){
				this.preview_images = [];
				this.view_images = [];
				n.map(item => {
					let img_obj = {
						urls:item,
						show_icon:false
					}
					this.preview_images.push(img_obj)
					this.view_images.push(this.domain + item)
				})
			}
		},
		created(){
			this.preview_images = [];
			this.view_images = [];
			this.img_list.map(item => {
				let img_obj = {
					urls:item,
					show_icon:false
				}
				this.preview_images.push(img_obj)
				this.view_images.push(this.domain + item)
			})
		},
		methods:{
			//置顶
			toFirst(index){
				this.preview_images.unshift(this.preview_images.splice(index, 1)[0]);
				//向父组件传递已选的图片列表
				this.emitFn();
				this.preview_images[0]['show_icon'] = false;
			},
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
					for(var i = 0;i < files.length;i ++){
						let arg = {
							file:files[i]
						}
						resource.uploadFile(arg).then(res => {
							this.$refs.imgUpload.value = null;
							if(res.data.code == 1){
								let file = res.data.data;
								file.show_icon = false;
								this.preview_images.push(file);
								//向父组件传递已选的图片列表
								this.emitFn();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
				}
			},
    		//删除文件
			deleteFile(url, index) {
				if(this.request_del){
					let arg = {
					url: url,
				};
				resource.delFile(arg).then((res) => {
					if (res.data.code == 1) {
						this.preview_images.splice(index, 1);
    					//向父组件传递已选的图片列表
						this.emitFn();
					} else {
						this.$message.warning(res.data.msg);
					}
				});
				}else{
					this.preview_images.splice(index, 1);
    					//向父组件传递已选的图片列表
						this.emitFn();
				}
				
			},
			//设置禁止移动
			moveDraggable(e){
				if(e.to.__vue__._uid != e.from.__vue__._uid && e.relatedContext.list.length >= 9){
					return false;
				}
			},
    		//向父组件传递已选的图片列表
			emitFn(e){
				let image_arr = [];
				this.preview_images.map(item => {
					image_arr.push(item.urls);
				})

				var new_image_arr = [];
				if(e){
					e.to.__vue__.value.map(item => {
						new_image_arr.push(item.urls);
					})
				}
				

				let arg = {
					newIndex:e?e.to.__vue__.$parent.index:-1,
					new_image_arr:new_image_arr,
					image_arr:image_arr
				}
				this.$emit('callbackFn',arg);
			}
		},
		components:{
			draggable
		}
	}
</script>