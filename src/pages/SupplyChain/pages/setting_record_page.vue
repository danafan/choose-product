<template>
	<div class="chain_page_content">
		<el-card class="card_box height-100 flex fc">
			<div class="scroll_box flex-1 scroll-y" id="scroll_box">
				<el-form style="padding-top: 20px;" :inline="true" size="mini" id="form_height">
					<el-form-item class="form_item" label="操作日期：">
						<div @click.once="changeInitCalendarPage">
							<el-date-picker v-model="date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
							</el-date-picker>
						</div>
					</el-form-item>
					<el-form-item class="form_item" label="操作人：">
						<el-input clearable v-model="username" placeholder="输入操作人搜索"></el-input>
					</el-form-item>
					<el-form-item label="操作分类：">
						<el-select v-model="type" clearable placeholder="全部">
							<el-option label="内部操作" value="1"></el-option>
							<el-option label="外部操作" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="form_item">
						<el-button type="primary" @click="checkPage(1)">查询</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<TableTitle title="数据列表" id="table_title"></TableTitle>
				<el-table ref="table" size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
					<el-table-column label="序号" width="55">
						<template slot-scope="scope">
							<div>{{(page - 1) * 30 + scope.$index + 1}}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作人" width="150" prop="add_user_name"></el-table-column>
					<el-table-column label="操作分类" width="150" prop="notice_content">
						<template slot-scope="scope">
							<div v-if="scope.row.user_type == '1'">内部操作</div>
							<div v-if="scope.row.user_type == '2'">外部操作</div>
						</template>
					</el-table-column>
					<el-table-column label="操作时间" width="160" prop="add_time"></el-table-column>
					<el-table-column label="IP地址" width="150" prop="ip"></el-table-column>
					<el-table-column label="操作记录" prop="content"></el-table-column>
				</el-table>
			</div>
			<PaginationWidget id="bottom_row" :total="total" :page="page" :pagesize="30" :show_multiple="false" @checkPage="checkPage"/>
		</el-card>
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
		.card_box{
			.scroll_box{
				.image{
					width: 165rem;
					height: 68rem;
				}
				
			}
			.item_row{
				display: flex;
				.item_label{
					width: 96px;
					text-align:end;
				}
			}
		}
	}
</style>
<script>
	import resource from '../../../api/chain_resource.js'

	import { getNowDate,getCurrentDate } from "../../../api/date.js";

	import TableTitle from '../components/table_title.vue'
	import PaginationWidget from '../../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				loading:false,
				username:"",			//操作人
				pickerOptions: {
					shortcuts: [
					{
						text: "今日",
						onClick(picker) {
							const start = getNowDate();
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "近三日",
						onClick(picker) {
							const start = getCurrentDate(3);
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "近七日",
						onClick(picker) {
							const start = getCurrentDate(7);
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					],
				}, 
				date:[],				//选款日期
				type:"",				//操作类型
				max_height:0,	
				page:1,
				data:[],				//获取的数据
				total:0
			}
		},
		created(){
			//公告列表
			this.getData();
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
			//将日期筛选改为默认上月到当前月
			changeInitCalendarPage() {
				let nodeList = document.querySelectorAll("button.el-picker-panel__icon-btn.el-icon-arrow-left");
				nodeList[0].click()
				setTimeout(() => {
					nodeList[1].click()
				},10);
			},
    		//监听屏幕大小变化
			onResize() {
				this.$nextTick(() => {
					let card_box_height = document.getElementById("scroll_box").offsetHeight;
					let form_height = document.getElementById("form_height").offsetHeight;
					this.max_height = card_box_height - form_height + 20 + "px";
				});
			},
    		//公告列表
			getData(){
				let arg = {
					username:this.username,
					type:this.type,
					start_date:this.date && this.date.length > 0?this.date[0]:"",
					end_date:this.date && this.date.length > 0?this.date[1]:"",
					page:this.page,
					pagesize:30
				}
				this.loading = true;
				resource.settingRecord(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						let data = res.data.data;
						this.total = data.total;
						this.data = data.data;
						this.$refs.table.bodyWrapper.scrollTop = 0;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换页码
			checkPage(v){
				this.page = v;
				this.getData();
			},
		},
		components:{
			TableTitle,
			PaginationWidget
		}
	}
</script>






