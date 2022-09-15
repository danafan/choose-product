<template>
	<div class="chain_page_content">
		<el-card class="form_card">
			<el-form :inline="true" size="mini">
				<el-form-item class="form_item">
					<el-input clearable v-model="keyword" placeholder="供应商名称/旺旺号"></el-input>
				</el-form-item>
				<el-form-item class="form_item">
					<el-select v-model="business_ids" clearable placeholder="主营业务">
						<el-option v-for="item in business_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form_item">
					<el-button type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
				<el-button size="mini" type="primary" @click="addFn('1')">添加</el-button>
			</TableTitle>
			<el-table size="mini" :data="supplier_data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height">
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
			</el-table>
			<PaginationWidget id="bottom_row" :total="62" :page="page" @checkPage="checkPage"/>
		</el-card>
		<!-- 评级弹窗 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close :visible.sync="level_dialog">
			<div slot="title" class="dialog_title">
				<div>请为供应商进行评级</div>
				<img class="close_icon" src="../../../static/close_icon.png" @click="level_dialog = false">
			</div>
			<div class="dialog_content">
				<el-form size="small" label-width="100px">
					<el-form-item label="供应商名称：">
						常务副校长
					</el-form-item>
					<el-form-item label="主营：">
						各方面
					</el-form-item>
					<el-form-item label="评级：">
						<el-select v-model="level_ids" clearable placeholder="请选择评级">
							<el-option v-for="item in level_list" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="small" @click="level_dialog = false">取消</el-button>
				<el-button type="primary" size="small" @click="level_dialog = false">提交</el-button>
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
				keyword:"",			//供应商名称/旺旺号
				business_list:[{
					name:'男装',
					id:'1'
				},{
					name:'女装',
					id:'2'
				}],					//主营业务列表
				business_ids:[],	//选中的主营业务
				max_height:0,	
				page:1,
				supplier_data:[{
					name:'供应商名称',
					common_text:'公用内容'
				},{
					name:'供应商名称',
					common_text:'公用内容'
				},{
					name:'供应商名称',
					common_text:'公用内容'
				},{
					name:'供应商名称',
					common_text:'公用内容'
				},{
					name:'供应商名称',
					common_text:'公用内容'
				}],						//表格数据
				level_dialog:false,		//评级弹窗
				level_list:['SSS','AAA','BBB','CCC'],	//级别列表
				level_ids:[],			//选中的级别
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
			//点击查看
			getDetail(){
				this.$router.push('/chain_supplier_detail')
			},
			//点击添加或编辑
			addFn(type,id){
				if(type == '1'){
					this.$router.push('/add_edit_supplier?supplier_type=1')
				}else{
					this.$router.push(`/add_edit_supplier?supplier_type=2&id=${id}`);
				}
			}
		},
		components:{
			TableTitle,
			PaginationWidget
		}
	}
</script>






