<template>
	<div class="chain_page_content">
		<el-card class="form_card">
			<el-form :inline="true" size="mini">
				<el-form-item label="处理状态：">
					<el-select v-model="status" clearable placeholder="全部">
						<el-option label="待处理" value="1"></el-option>
						<el-option label="已处理" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form_item">
					<el-button type="primary" @click="checkPage(1)">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title"></TableTitle>
			<el-table size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
				<el-table-column prop="style_name" label="款号" align="center"></el-table-column>
				<el-table-column label="款式编码" width="140">
					<template slot-scope="scope">
						<div class="item_row">
							<div class="item_label">普通：</div>
							<div>
								<div v-for="item in scope.row.new_i_id">{{item}}</div>
							</div>
						</div>
						<div class="item_row">
							<div class="item_label">BD：</div>
							<div>
								<div v-for="item in scope.row.new_bd_i_id">{{item}}</div>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="feedback_content" label="反馈内容" align="center"></el-table-column>
				<el-table-column label="反馈截图" width="200">
					<template slot-scope="scope">
						<el-image :z-index="2006" class="image" :src="scope.row.images[0]" fit="scale-down" :preview-src-list="scope.row.images" v-if="scope.row.images.length > 0"></el-image>
						<div class="ddd" v-else>暂无图片</div>
					</template>
				</el-table-column>
				<el-table-column prop="feedback_real_name" width="160" label="反馈人" align="center"></el-table-column>
				<el-table-column prop="feedback_time" width="160" label="反馈时间" align="center"></el-table-column>
				<el-table-column prop="feedback_time" width="160" label="处理状态" align="center">
					<template slot-scope="scope">
						<div>{{scope.row.feedback_status == 1?'待处理':'已处理'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="160" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" v-if="scope.row.feedback_status == '1' && button_list.confirm == 1" @click="confirmFn(scope.row.feedback_id)">确认处理</el-button>
						<el-button type="text" size="small" disabled v-if="scope.row.feedback_status == '2'">已处理</el-button>
						<el-button type="text" size="small" @click="editGoods(scope.row.style_id)" v-if="button_list.edit == 1">编辑商品</el-button>
					</template>
				</el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :total="total" :page="page" @checkPage="checkPage"/>
		</el-card>
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
						})
						this.data = data;
						this.total = res.data.data.total;
						this.button_list = res.data.data.button_list;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//确认处理
			confirmFn(feedback_id){
				this.$confirm('确认处理?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						feedback_id:feedback_id
					}
					resource.feedBackHandle(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.getData();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});          
				});
			},
			//点击编辑商品
			editGoods(style_id){
				this.$router.push(`/edit_goods?page_type=feedback&goods_type=2&style_id=${style_id}`);
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
	display: flex;
	flex-direction: column;
	.card_box{
		flex:1;
		.image{
			width: 165rem;
			height: 68rem;
		}
		.item_row{
			display: flex;
			.item_label{
				width: 36px;
				text-align:end;
			}
		}
	}
}
</style>