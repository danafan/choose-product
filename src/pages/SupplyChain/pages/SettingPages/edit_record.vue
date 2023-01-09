<template>
	<div class="setting_content">
		<el-card class="form_card">
			<el-form :inline="true" size="mini">
				<el-form-item label="类型：">
					<el-select v-model="type" clearable placeholder="全部">
						<el-option v-for="item in type_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form_item">
					<el-button type="primary" @click="checkPage(1)">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
			</TableTitle>
			<el-table size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
				<el-table-column label="类型" width="120" align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.type == 1">类目</div>
						<div v-if="scope.row.type == 2">分类</div>
						<div v-if="scope.row.type == 3">拍摄风格</div>
						<div v-if="scope.row.type == 4">季节</div>
					</template>
				</el-table-column>
				<el-table-column label="修改内容" prop="content"></el-table-column>
				<el-table-column label="修改人" prop="add_user_name" width="120" align="center"></el-table-column>
				<el-table-column label="修改时间" prop="add_time" width="160" align="center"></el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :total="total" :page="page" @checkPage="checkPage"/>
		</el-card>
	</div>
</template>
<script>
	import TableTitle from '../../components/table_title.vue'
	import PaginationWidget from '../../../../components/pagination_widget.vue'

	import resource from '../../../../api/chain_resource.js'
	export default{
		data(){
			return{
				type_list:[{
					name:'类目',
					id:1
				},{
					name:'分类',
					id:2
				},{
					name:'拍摄风格',
					id:3
				},{
					name:'季节',
					id:4
				}],
				type:"",
				loading:false,
				data:[],					//返回数据
				total:0,
				page:1,						//当前页码
				max_height:0,				//表格最大高度
			}
		},
		created(){
			//获取列表
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
    				55 +
    				"px";
    			});
    		},
			//获取列表
			getData(){
				let arg = {
					type:this.type,
					pagesize:10,
					page:this.page
				}
				this.loading = true;
				resource.logList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.data = res.data.data.data;
						console.log(this.data)
						this.total = res.data.data.total;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//分页
			checkPage(v){
				this.page = v;
				//获取类目列表
				this.getData();
			}
		},
		components:{
			TableTitle,
			PaginationWidget
		}
	}
</script>
<style lang="less" scoped>
.setting_content{
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
</style>