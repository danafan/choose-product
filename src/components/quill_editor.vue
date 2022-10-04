<template>
	<div>
		<quill-editor v-model="editor_val" :options="editorOption" ref="quill_editor">
		</quill-editor>
		<input type="file" ref="imgUpload" class="upload_files" @change="uploadFn">
	</div>
</template>
<style type="text/css">
.ql-container {
    height: 260px;
}

</style>
<style lang="less" scoped>
.upload_files {
	display: none;
}
</style>
<script>
// 工具栏配置
const toolbarOptions = [
['bold', 'italic', 'underline', 'strike'],        
['blockquote', 'code-block'],
[{'header': 1}, {'header': 2}],               
[{'list': 'ordered'}, {'list': 'bullet'}],
[{'script': 'sub'}, {'script': 'super'}],      
[{'indent': '-1'}, {'indent': '+1'}],         
[{'direction': 'rtl'}],                        
[{'size': ['small', false, 'large', 'huge']}],  
[{'header': [1, 2, 3, 4, 5, 6, false]}],
[{'color': []}, {'background': []}],          
[{'font': []}],
[{'align': []}],
['link', 'image'],
['clean']                                         
]
export default{
	data(){
		return {
			editorOption: {
				placeholder: "请输入店家要求",
				modules: {
					toolbar: {
                    	container: toolbarOptions,  // 工具栏
                    	handlers: {
                    		'image': function (value) {
                    			if (value) {
                                	// 调用iview图片上传
                                	document.querySelector('.upload_files').click()
                                } else {
                                	this.quill.format('image', false);
                                }
                            }
                        }
                    }
                }
            },
            editor_val:"",			//富文本编辑器内容
        }
    },
    watch:{
    	editor_val:function(n,o){
    		this.$emit('callback',n);
    	}
    },
    methods:{
		// 富文本上传图片
		uploadFn(){
			if (this.$refs.imgUpload.files.length > 0) {
				var files = this.$refs.imgUpload.files;
				console.log(files)
				// let obj = files[0];
				// resource.uploadFile({image:obj,type:1}).then(res => {
				// 	if(res.data.code == "1"){
				// 		// 获取富文本组件实例
				// 		var quill = this.$refs.quill_editor.quill;
    //         			// 获取光标所在位置
    //         			let length = quill.getSelection().index;
    //         			// 插入图片，res为服务器返回的图片链接地址
    //         			let url = res.data.data.domain + res.data.data.urls[0];
    //         			quill.insertEmbed(length, 'image', url);
    //         			// 调整光标到最后
    //         			quill.setSelection(length + 1);
    //         		}else{
    //         			this.$message.error(res.data.msg);
    //         		};
    //         	});
}
}
}
}
</script>