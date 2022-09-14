<template>
	<div class="chain_page_content">
		<el-card class="form_card">
			<el-form :inline="true" size="mini">
				<el-form-item class="form_item">
					<el-input clearable v-model="keyword" placeholder="请输入关键字"></el-input>
				</el-form-item>
				<el-form-item class="form_item">
					<el-button type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
				<el-button size="mini" type="primary" @click="addFn('1')">添加公告</el-button>
			</TableTitle>
			<el-table size="mini" :data="message_list" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height">
				<el-table-column label="公告标题" prop="title" show-overflow-tooltip></el-table-column>
				<el-table-column label="公告内容" prop="content" show-overflow-tooltip></el-table-column>
				<el-table-column label="发布日期" prop="time" show-overflow-tooltip></el-table-column>
				<el-table-column label="开始时间" prop="time" show-overflow-tooltip></el-table-column>
				<el-table-column label="结束时间" prop="time" show-overflow-tooltip></el-table-column>
				<el-table-column label="发布人" prop="time" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="140" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" disabled>已发布</el-button>
						<el-button type="text" size="small" @click="addFn('2')">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :total="62" :page="page" @checkPage="checkPage"/>
		</el-card>
		<!-- 添加或编辑 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close :visible.sync="show_dialog">
			<div slot="title" class="dialog_title">
				<div>{{dialog_title}}</div>
				<img class="close_icon" src="../../../static/close_icon.png" @click="show_dialog = false">
			</div>
			<div class="dialog_content">
				<el-form size="small" label-width="100px">
					<el-form-item label="公告标题：" required>
						<el-input style="width: 260px" clearable v-model="message_title" placeholder="请输入公告标题"></el-input>
					</el-form-item>
					<el-form-item label="公告内容：" required>
						<el-input style="width: 420px" type="textarea" :rows="5" clearable v-model="message_content" placeholder="请输入公告内容">
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-checkbox v-model="is_time">开始时间~结束时间</el-checkbox>
					</el-form-item>
					<el-form-item v-if="is_time">
						<el-date-picker v-model="date" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="small" @click="show_dialog = false">取消</el-button>
				<el-button type="primary" size="small" @click="show_dialog = false">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<style lang="less" scoped>
.chain_page_content{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 24rem;
	display: flex;
	flex-direction: column;
	.form_card{
		margin-bottom: 16rem;
		.form_item{
			margin-bottom:0 !important;
		}
	}
	.card_box{
		flex:1;
	}
}
.dialog_content{
	padding: 20rem;
}
</style>
<script>
	import TableTitle from '../components/table_title.vue'
	import PaginationWidget from '../../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				keyword:"",			//关键字
				max_height:0,	
				page:1,
				message_list:[{
					title:'公告标题',
					content:'公告内容公告内容公告内容公告内容公告内容',
					time:'2022-09-09 12:00'
				},{
					title:'公告标题',
					content:'公告内容公告内容公告内容公告内容公告内容',
					time:'2022-09-09 12:00'
				},{
					title:'公告标题',
					content:'公告内容公告内容公告内容公告内容公告内容',
					time:'2022-09-09 12:00'
				},{
					title:'公告标题',
					content:'公告内容公告内容公告内容公告内容公告内容',
					time:'2022-09-09 12:00'
				},{
					title:'公告标题',
					content:'公告内容公告内容公告内容公告内容公告内容',
					time:'2022-09-09 12:00'
				},{
					title:'公告标题',
					content:'公告内容公告内容公告内容公告内容公告内容',
					time:'2022-09-09 12:00'
				},{
					title:'公告标题',
					content:'公告内容公告内容公告内容公告内容公告内容',
					time:'2022-09-09 12:00'
				},{
					title:'公告标题',
					content:'公告内容公告内容公告内容公告内容公告内容',
					time:'2022-09-09 12:00'
				},{
					title:'公告标题',
					content:'公告内容公告内容公告内容公告内容公告内容',
					time:'2022-09-09 12:00'
				}],					//公告列表
				show_dialog:false,		//添加或编辑弹窗
				dialog_title:"",		//弹窗标题
				type:"",				//弹窗类型（1:添加；2:编辑）
				message_title:"",		//公告标题
				message_content:"",		//公告内容
				is_time:false,			//是否有开始和结束时间
				date:[],				//开始和结束时间
			}
		},
		destroyed() {
			window.removeEventListener("resize", () => {});
		},
		mounted() {
    		//获取表格最大高度
    		this.onResize();
    		window.addEventListener("resize", this.onResize());
    	},
    	methods: {
    		//监听屏幕大小变化
    		onResize() {
    			this.$nextTick(() => {
    				let card_box_height = document.getElementById("card_box").offsetHeight;
    				let table_title_height = document.getElementById("table_title").offsetHeight;
    				let bottom_row_height = document.getElementById("bottom_row").offsetHeight;
    				this.max_height =
    				card_box_height -
    				table_title_height -
    				bottom_row_height -
    				50 +
    				"px";
    			});
    		},
			//切换页码
			checkPage(v){
				console.log(v)
			},
			//点击添加或编辑
			addFn(type){
				this.type = type;
				this.dialog_title = type == '1'?'添加公告':'编辑公告';
				this.show_dialog = true;
			}
		},
		components:{
			TableTitle,
			PaginationWidget
		}
	}
</script>






