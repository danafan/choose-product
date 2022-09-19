<template>
	<div class="chain_page_content">
		<el-card class="form_card">
			<el-form :inline="true" size="mini">
				<el-form-item label="供应商：">
					<el-select v-model="supplier_ids" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in supplier_list" :key="item.supplier_id" :label="item.supplier_name" :value="item.supplier_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类目：">
					<el-select v-model="category_ids" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in cate_list" :key="item.category_id" :label="item.category_name" :value="item.category_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="拍摄风格：">
					<el-select v-model="shooting_style_ids" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in style_list" :key="item.shooting_style_id" :label="item.shooting_style_name" :value="item.shooting_style_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="市场：">
					<el-select v-model="market_ids" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in market_list" :key="item.market_id" :label="item.market_name" :value="item.market_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类：">
					<el-select v-model="classification_ids" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in class_list" :key="item.classification_id" :label="item.classification_name" :value="item.classification_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上架状态：">
					<el-select v-model="status_id" clearable placeholder="全部">
						<el-option v-for="item in status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核状态：">
					<el-select v-model="check_status_id" clearable placeholder="全部">
						<el-option v-for="item in check_status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上新日期：">
					<el-date-picker v-model="date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="款式编码：">
					<el-input placeholder="款式编码" v-model="search">
					</el-input>
				</el-form-item>
				<el-form-item class="form_item">
					<el-button type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
				<!-- <el-button size="mini" type="primary" @click="addFn('1')">添加</el-button> -->
			</TableTitle>
			<!-- <el-table size="mini" :data="supplier_data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height">
				<el-table-column label="供应商名称" prop="name" show-overflow-tooltip></el-table-column>
				<el-table-column label="供应商地址" prop="common_text" show-overflow-tooltip></el-table-column>
				<el-table-column label="供应商联系方式" width="120" prop="common_text" show-overflow-tooltip></el-table-column>
				<el-table-column label="主营" prop="common_text" show-overflow-tooltip></el-table-column>
				<el-table-column label="微信" prop="common_text" show-overflow-tooltip></el-table-column>
				<el-table-column label="拍照" prop="common_text" show-overflow-tooltip></el-table-column>
				<el-table-column label="退货" prop="common_text" show-overflow-tooltip></el-table-column>
				<el-table-column label="代发" prop="common_text" show-overflow-tooltip></el-table-column>
				<el-table-column label="入仓" prop="common_text" show-overflow-tooltip></el-table-column>
				<el-table-column label="结算" prop="common_text" show-overflow-tooltip></el-table-column>
				<el-table-column label="评级" prop="common_text" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="getDetail">查看</el-button>
						<el-button type="text" size="small" @click="addFn('2',scope.row.name)">编辑</el-button>
						<el-button type="text" size="small">删除</el-button>
						<el-button type="text" size="small" @click="level_dialog = true">评级</el-button>
					</template>
				</el-table-column>
			</el-table> -->
			<PaginationWidget id="bottom_row" :total="62" :page="page" @checkPage="checkPage"/>
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
<script>
	import commonResource from '../../../api/common_resource.js'
	import { getNowDate,getCurrentDate } from "../../../api/date.js";

	import TableTitle from '../components/table_title.vue'
	import PaginationWidget from '../../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				supplier_list:[],		//供应商列表
				supplier_ids:[],		//选中的供应商
				cate_list:[],			//类目列表
				category_ids:[],		//选中的类目
				market_list:[],			//市场列表
				market_ids:[],			//选中的市场
				style_list:[],			//拍摄风格列表
				shooting_style_ids:[],	//选中的拍摄风格
				class_list:[],			//分类列表
				classification_ids:[],	//选中的分类
				status_list:[{
					name:'已上架',
					id:1
				},{
					name:'已下架',
					id:0
				}],						//上架状态列表
				status_id:"",			//选中的上架状态
				check_status_list:[{
					name:'待审核',
					id:1
				},{
					name:'审核通过',
					id:2
				},{
					name:'审核拒绝',
					id:3
				}],						//审核状态列表
				check_status_id:"",		//选中的审核状态
				date:[],				//上新日期
				pickerOptions: {
					shortcuts: [
					{
						text: "今日上新",
						onClick(picker) {
							const start = getNowDate();
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "三日上新",
						onClick(picker) {
							const start = getCurrentDate(3);
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "七日上新",
						onClick(picker) {
							const start = getCurrentDate(7);
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					],
				}, 
				search:"",				//款式编码
				max_height:0,	
				page:1,
			}
		},
		created(){
			//获取供应商列表
			this.ajaxSupplierList();
    		//获取类目列表
    		this.ajaxCateList();
    		//市场列表
    		this.ajaxMarketList();
    		//拍摄风格列表
    		this.ajaxStyleList();
    		//分类列表
    		this.ajaxClassList();
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
    		//获取供应商列表
    		ajaxSupplierList(){
    			commonResource.ajaxSupplierList().then(res => {
    				if(res.data.code == 1){
    					this.supplier_list = res.data.data;
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		},
			//获取类目列表
			ajaxCateList(){
				commonResource.ajaxCateList().then(res => {
					if(res.data.code == 1){
						this.cate_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//市场列表
			ajaxMarketList(){
				commonResource.ajaxMarketList().then(res => {
					if(res.data.code == 1){
						this.market_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//拍摄风格列表
			ajaxStyleList(){
				commonResource.ajaxStyleList().then(res => {
					if(res.data.code == 1){
						this.style_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//分类列表
			ajaxClassList(){
				commonResource.ajaxClassList().then(res => {
					if(res.data.code == 1){
						this.class_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换页码
			checkPage(v){
				console.log(v)
			},
		},
		components:{
			TableTitle,
			PaginationWidget
		}
	}
</script>






