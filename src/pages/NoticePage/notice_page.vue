<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<PageTitle title="公告"/>
			<el-card class="card_box">
				<div class="title">{{notice_info.notice_title}}</div>
				<div class="time">{{notice_info.add_time}}</div>
				<div class="content" v-html="notice_info.notice_content"></div>
			</el-card>
		</div>
	</div>
</template>
<script>
	import resource from '../../api/resource.js'

	import PageTitle from '../../components/page_title.vue'
	export default{
		data(){
			return{
				notice_info:{},			//公告详情
			}
		},
		created(){
			let notice_id = this.$route.query.notice_id;
			//获取公告详情
			this.noticeInfo(notice_id);
		},
    	methods: {
    		//获取公告详情
    		noticeInfo(notice_id){
    			let arg = {
    				notice_id:notice_id
    			}
    			resource.noticeInfo(arg).then(res => {
    				if(res.data.code == 1){
    					this.notice_info = res.data.data;
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		}
		},
		components:{
			PageTitle
		}
	}
</script>
<style lang="less" scoped>
.padding_page_content{
	width: 1440rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	.card_box{
		flex:1;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 470rem;
		.title{
			width: 100%;
			text-align: center;
			font-size: 14rem;
			color: #333333;
			font-weight: bold;
		}
		.time{
			margin-top: 20rem;
			margin-bottom: 20rem;
			width: 100%;
			text-align: center;
			font-size: 12rem;
			color: #333333;
		}
		.content{
			width: 100%;
			text-align: center;
			font-size: 14rem;
			color: #333333;
		}
	}
}
</style>