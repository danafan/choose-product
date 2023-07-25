<template>
	<div class="height-100">
		<el-card class="card_box height-100" id="card_box">
			<div class="scroll_box flex-1 flex-scroll-y" id="scroll_box">
				<el-form style="padding-top: 20px;" :inline="true" size="mini" id="form_height">
					<el-form-item label="提交时间：">
						<el-date-picker v-model="date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="审核状态：">
						<el-select v-model="status" clearable placeholder="全部">
							<el-option v-for="item in status_list" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="款号">
						<el-input placeholder="款号" v-model="style_name"></el-input>
					</el-form-item>
					<el-form-item label="提交人">
						<el-input placeholder="提交人" v-model="username"></el-input>
					</el-form-item>
					<el-form-item class="form_item">
						<el-button type="primary" @click="checkPage(1)">查询</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<TableTitle title="数据列表" id="table_title">
					<el-button size="mini" type="primary" v-if="button_list.audit == 1">批量审核</el-button>
				</TableTitle>
				<el-table ref="table" size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" @selection-change="handleSelectionChange" v-loading="loading">
					<el-table-column type="selection" width="55" fixed>
					</el-table-column>
					<el-table-column label="款号" prop="style_name"></el-table-column>
					<el-table-column label="供应商" prop="supplier_name"></el-table-column>
					<el-table-column label="图片">
						<template slot-scope="scope">
							<el-image :z-index="2006" class="image" :src="domain + scope.row.img" fit="scale-down"></el-image>
						</template>
					</el-table-column>
					<el-table-column label="原商品信息">
						<template slot-scope="scope">
							<div v-for="item in scope.row.info_arr">{{item}}</div>
						</template>
					</el-table-column>
					<el-table-column label="修改后商品信息">
						<template slot-scope="scope">
							<div v-for="item in scope.row.edit_info_arr">{{item}}</div>
						</template>
					</el-table-column>
					<el-table-column label="修改提交时间" prop="add_time"></el-table-column>
					<el-table-column label="修改提交人" prop="add_admin_name"></el-table-column>
					<el-table-column label="修改状态" prop="common_text">
						<template slot-scope="scope">
							<div>{{scope.row.check_status | check_status_filter}}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="180" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small" v-if="button_list.audit == 1">审核</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<PaginationWidget :total="total" :page="page" :multiple_selection_num="multiple_selection.length" :pagesize="100" @checkPage="checkPage"/>
		</el-card>
	</div>
</template>
<style type="text/css">
	.card_box .el-card__body{
		height: 100%!important;
		display: flex!important;
		flex-direction: column!important;
		padding-top: 0!important;
		padding-bottom: 0!important;
	}
	.el-tooltip__popper {
		max-width: 800px;
	}

</style>
<style lang="less" scoped>
	.card_box{
		.scroll_box{
			.image{
				width: 100px;
				height: 100px;
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
	.down_box{
		display:flex;
		padding:30rem;
		.upload_box{
			margin-left: 10px;
			position: relative;
			.upload_file{
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
	import commonResource from '../../../../api/common_resource.js'
	import resource from '../../../../api/chain_resource.js'
	import { getNowDate,getCurrentDate } from "../../../../api/date.js";

	import { MessageBox, Message } from "element-ui";

	import TableTitle from '../../components/table_title.vue'
	import PaginationWidget from '../../../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				loading:false,
				style_name:"",			//款式编码
				username:"",			//提交人
				status_list:[{
					name:'待审核',
					id:1
				},{
					name:'审核通过',
					id:2
				},{
					name:'上架审核拒绝',
					id:3
				},{
					name:'已撤销',
					id:4
				}],						//审核状态列表
				status:"",				//选中的审核状态
				date:[],				//日期
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
				max_height:0,	
				page:1,
				data:[],				//获取的数据
				total:0,
				button_list:{},
				multiple_selection:[]
			}
		},
		created(){
			//获取列表
			this.editLogList();
		},
		mounted() {
    		//获取表格最大高度
			this.onResize();
			window.addEventListener("resize", this.onResize());
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
		},
		methods: {
    		//监听屏幕大小变化
			onResize() {
				this.$nextTick(() => {
					let card_box_height = document.getElementById("scroll_box").offsetHeight;
					let form_height = document.getElementById("form_height").offsetHeight;
					this.max_height = card_box_height - form_height + 70 + "px";
				});
			},
			//获取列表
			editLogList(){
				let arg = {
					status:this.status,
					style_name:this.style_name,
					start_date:this.date && this.date.length > 0?this.date[0]:"",
					end_date:this.date && this.date.length > 0?this.date[1]:"",
					username:this.username,
					page:this.page,
					pagesize:100
				}
				this.loading = true;
				resource.editLogList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						let data = res.data.data;
						this.data = data.data;
						this.data.map(item => {
							let info_arr = [];
							for(let k in item.info){
								info_arr.push(`${this.label_filter(k)}：${item.info[k]}`)
							}
							item['info_arr'] = info_arr;

							let edit_info_arr = [];
							for(let k in item.edit_info){
								edit_info_arr.push(`${this.label_filter(k)}：${item.edit_info[k]}`)
							}
							item['edit_info_arr'] = edit_info_arr;
						})
						this.button_list = data.button_list;
						this.total = data.total;
						this.$refs.table.bodyWrapper.scrollTop = 0;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			label_filter(v){
				switch(v){
				case 'title':
					return '标题';
				case 'style_name':
					return '供应商款号'
				case 'supplier_ksbm':
					return '供应商款式编码'
				case 'i_id':
					return '内部款式编码'
				case 'bd_i_id':
					return 'BD款式编码'
				case 'supplier_name':
					return '供应商'
				case 'market_name':
					return '市场'
				case 'category_name':
					return '类目'
				case 'classification_name':
					return '分类'
				case 'shooting_style_name':
					return '拍摄风格'
				case 'fabric':
					return '面料'
				case 'size':
					return '尺码'
				case 'cost_price':
					return '成本价'
				case 'net_disk_address':
					return '网盘地址'
				case 'remark':
					return '备注'
				case 'wholesale_price':
					return '档口批价'
				case 'hot_style':
					return '爆款'
				case 'sole_style':
					return '独家款'
				case 'data_style':
					return '主推款'
				case 'again_style':
					return '自主款'
				case 'color':
					return '颜色'
				case 'hot_url':
					return '爆款链接'
				case 'hot_img':
					return '爆款图片'
				case 'data_num':
					return '主推款库存'
				case 'data_price':
					return '主推款调价'
				case 'data_remark':
					return '主推款备注'
				case 'depth_inventory':
					return '深度库存'
				case 'video_style':
					return '视频款'
				case 'price_control':
					return '控价'
				case 'all_imgs':
					return '图片'
				}
			},
			//切换页码
			checkPage(v){
				this.page = v;
				//获取列表
				this.editLogList();
			},
			//切换多选
			handleSelectionChange(val) {
				this.multiple_selection = val;
			},
			//批量操作
			allSetting(type){
				
			}

		},
		filters:{
			//审核状态
			check_status_filter:function(v){
				switch(v){
				case 1:
					return '待审核';
				case 2:
					return '审核通过'
				case 3:
					return '上架审核拒绝'
				case 4:
					return '已撤销'
				}
			},
			
		},
		components:{
			TableTitle,
			PaginationWidget
		}
	}
</script>






