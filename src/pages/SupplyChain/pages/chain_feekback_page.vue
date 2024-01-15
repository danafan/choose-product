<template>
	<div class="chain_page_content">
		<el-card class="card_box height-100 flex fc">
			<div class="scroll_box flex-1 scroll-y" id="scroll_box">
				<el-form style="padding-top: 20px;" :inline="true" size="mini" id="form_height">
					<el-form-item label="处理状态：">
						<el-select v-model="status" clearable placeholder="全部">
							<el-option label="待处理" value="1"></el-option>
							<el-option label="确认处理" value="2"></el-option>
							<el-option label="拒绝处理" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="form_item">
						<el-button type="primary" @click="checkPage(1)">查询</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<TableTitle title="数据列表" id="table_title"></TableTitle>
				<el-table ref="table" size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
					<el-table-column prop="style_name" label="款号" align="center"></el-table-column>
					<el-table-column label="款式编码" width="240">
						<template slot-scope="scope">
							<div class="item_row">
								<div class="item_label">供应商款式编码：</div>
								<div class="flex-1 flex fc as">
									<div v-for="item in scope.row.new_supplier_ksbm">{{item}}</div>
								</div>
							</div>
							<div class="item_row">
								<div class="item_label">内部款式编码：</div>
								<div class="flex-1 flex fc as">
									<div v-for="item in scope.row.new_i_id">{{item}}</div>
								</div>
							</div>
							<div class="item_row">
								<div class="item_label">BD款式编码：</div>
								<div class="flex-1 flex fc as">
									<div v-for="item in scope.row.new_bd_i_id">{{item}}</div>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="feedback_content" label="反馈内容" align="center"></el-table-column>
					<el-table-column label="反馈截图" width="200">
						<template slot-scope="scope">
							<el-image :z-index="2006" class="image" :src="`${scope.row.images[0]}?imageMogr2/thumbnail/200x200`" fit="scale-down" :preview-src-list="scope.row.images" v-if="scope.row.images.length > 0"></el-image>
							<div class="ddd" v-else>暂无图片</div>
						</template>
					</el-table-column>
					<el-table-column prop="feedback_real_name" width="160" label="反馈人" align="center"></el-table-column>
					<el-table-column prop="feedback_time" width="160" label="反馈时间" align="center"></el-table-column>
					<el-table-column prop="feedback_time" width="160" label="处理状态" align="center">
						<template slot-scope="scope">
							<div v-if="scope.row.feedback_status == 0">拒绝处理</div>
							<div v-if="scope.row.feedback_status == 1">待处理</div>
							<div v-if="scope.row.feedback_status == 2">确认处理</div>
						</template>
					</el-table-column>
					<el-table-column prop="handler_remark" width="160" label="备注" align="center"></el-table-column>
					<el-table-column label="操作" align="center" width="160" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small" v-if="scope.row.feedback_status == '1' && button_list.confirm == 1" @click="clickFn(scope.row.feedback_id,scope.row.style_name)">处理</el-button>
							<el-button type="text" size="small" disabled v-if="scope.row.feedback_status == '2'">已处理</el-button>
							<el-button type="text" size="small" @click="editGoods(scope.row.goods_id)" v-if="button_list.edit == 1">编辑商品</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<PaginationWidget id="bottom_row" :total="total" :page="page" :show_multiple="false" @checkPage="checkPage"/>
		</el-card>
		<!-- 处理弹窗 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close @close="handleClose" :visible.sync="handle_dialog" width="25%">
			<div slot="title" class="dialog_title">
				<div>款号：{{style_name}}</div>
				<img class="close_icon" src="../../../static/close_icon.png" @click="handle_dialog = false">
			</div>
			<div>
				<el-form style="padding-top: 20px;" :inline="true" size="mini">
					<el-form-item>
						<el-radio-group v-model="type">
							<el-radio :label="1">确认处理</el-radio>
							<el-radio :label="2">拒绝处理</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-input type="textarea" :rows="3" placeholder="请输入备注" v-model="remark">
						</el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="mini" @click="handle_dialog = false">关闭</el-button>
				<el-button size="mini" type="primary" @click="confirmFn">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import TableTitle from '../components/table_title.vue'
	import PaginationWidget from '../../../components/pagination_widget.vue'

	import resource from '../../../api/chain_resource.js'
	export default{
		data(){
			return{
				loading:false,
				button_list:{},
				data:[],				//返回数据
				total:0,
				max_height:0,			//表格最大高度
				status:"",				//处理状态
				page:1,					//当前页码
				handle_dialog:false,	//处理弹窗
				feedback_id:"",			//点击的id
				style_name:"",			//款号
				type:1,					//处理类型（1:同意；2:拒绝）
				remark:"",				//处理备注
			}
		},
		created(){
			//获取列表
			this.getData();
		},
		destroyed() {
			window.removeEventListener("resize", () => {});
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
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
					let card_box_height = document.getElementById("scroll_box").offsetHeight;
					let form_height = document.getElementById("form_height").offsetHeight;
					this.max_height = card_box_height - form_height + 20 + "px";
				});
			},
			//获取列表
			getData(){
				let arg = {
					status:this.status,
					pagesize:10,
					page:this.page
				}
				this.loading = true;
				resource.feedBackList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						let data = res.data.data.data;
						data.map(item => {
							let images = [];
							item.feedback_img.map(i => {
								images.push(this.domain + i);
							})
							item.images = images;
							if(item.i_id){
								item.new_i_id = item.i_id.split(',')
							}
							if(item.bd_i_id){
								item.new_bd_i_id = item.bd_i_id.split(',')
							}
							if(item.supplier_ksbm){
								item.new_supplier_ksbm = item.supplier_ksbm.split(',')
							}
						})
						this.data = data;
						this.total = res.data.data.total;
						this.button_list = res.data.data.button_list;
						this.$refs.table.bodyWrapper.scrollTop = 0;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//关闭处理弹窗
			handleClose(){
				this.type = 1;
				this.remark = "";
			},
			//确认处理
			clickFn(feedback_id,style_name){
				this.style_name = style_name;
				this.feedback_id = feedback_id;
				this.handle_dialog = true;
			},
			//确认处理
			confirmFn(){
				let arg = {
					feedback_id:this.feedback_id,
					type:this.type,
					remark:this.remark
				}
				resource.feedBackHandle(arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
							//获取列表
						this.getData();
						this.handle_dialog = false;
						this.$store.dispatch('ajaxNum')
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击编辑商品
			editGoods(goods_id){
				this.$router.push(`/edit_goods?page_type=feedback&goods_type=2&goods_id=${goods_id}`);
			},
			//分页
			checkPage(v){
				this.page = v;
				//获取列表
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
	.chain_page_content{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 24rem;
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
	}
</style>