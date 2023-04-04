<template>
	<div class="chain_page_content">
		<el-card class="form_card">
			<el-form :inline="true" size="mini">
				<el-form-item label="审核状态：">
					<el-select v-model="status" clearable placeholder="全部">
						<el-option :label="item.name" :value="item.id" v-for="item in status_list"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类型：">
					<el-select v-model="type" clearable placeholder="全部">
						<el-option label="爆款" :value="1"></el-option>
						<el-option label="主推款" :value="2"></el-option>
						<el-option label="深度库存" :value="3"></el-option>
						<el-option label="视频款" :value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-input clearable v-model="search" placeholder="款号/款式编码"></el-input>
				</el-form-item>
				<el-form-item class="form_item">
					<el-button type="primary" @click="checkPage(1)">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
			</TableTitle>
			<el-table size="mini" :data="table_data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
				<el-table-column label="款号" prop="style_name"></el-table-column>
				<el-table-column label="款式编码" prop="i_id" width="140">
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
				<el-table-column label="图片" width="150">
					<template slot-scope="scope">
						<div v-if="scope.row.images.length == 0"></div>
						<el-carousel trigger="hover" indicator-position="none" :autoplay="false" height="100px" v-else>
							<el-carousel-item v-for="item in scope.row.images" :key="item">
								<el-image :z-index="2006" class="image" :src="item" fit="scale-down" :preview-src-list="scope.row.images"></el-image>
							</el-carousel-item>
						</el-carousel>
					</template>
				</el-table-column>
				<el-table-column label="成本价" prop="cost_price"></el-table-column>
				<el-table-column label="款式" prop="style_name">
					<template slot-scope="scope">
						<div>{{scope.row.type | filterType}}</div>
					</template>
				</el-table-column>
				<el-table-column label="供应商" show-overflow-tooltip prop="supplier_name"></el-table-column>
				<el-table-column label="爆款图片" width="150">
					<template slot-scope="scope">
						<div v-if="scope.row.hot_images.length == 0"></div>
						<el-carousel trigger="hover" indicator-position="none" :autoplay="false" height="100px" v-else>
							<el-carousel-item v-for="item in scope.row.hot_images" :key="item">
								<el-image :z-index="2006" class="image" :src="item" fit="scale-down" :preview-src-list="scope.row.hot_images"></el-image>
							</el-carousel-item>
						</el-carousel>
					</template>
				</el-table-column>
				<el-table-column label="链接" prop="hot_url">
					<template slot-scope="scope">
						<el-button type="text" size="small" v-for="item in scope.row.new_hot_url" @click="openWindow(item.url)">{{item.name}}</el-button>
					</template>
				</el-table-column>
				<el-table-column label="库存" prop="data_num"></el-table-column>
				<el-table-column label="调价" prop="data_price"></el-table-column>
				<el-table-column label="主推款备注" prop="remark"></el-table-column>
				<el-table-column label="当前状态" prop="status">
					<template slot-scope="scope">
						{{scope.row.status | status(status_list)}}
					</template>
				</el-table-column>
				<el-table-column label="审核备注" prop="status_remark"></el-table-column>
				<el-table-column label="操作" width="80" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="auditFn(scope.row.id)" v-if="scope.row.status == 0 && button_list.is_ex == 1">审核</el-button>
					</template>
				</el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :total="total" :page="page" :pagesize="20" @checkPage="checkPage"/>
		</el-card>
		<!-- 审核详情 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close @close="closeDialog" :visible.sync="audit_dialog" width="45%">
			<div slot="title" class="dialog_title">
				<div>审核详情</div>
				<img class="close_icon" src="../../../static/close_icon.png" @click="audit_dialog = false">
			</div>
			<div style="padding:20px">
				<el-form size="mini">
					<el-form-item label="款式：">
						{{info_data.type | filterType}}
					</el-form-item>
					<el-form-item label="图片：" v-if="info_data.type == 1">
						<el-image class="card_img" :z-index="2006" v-for="item in info_data.preview_image" :src="item" fit="scale-down" :preview-src-list="info_data.preview_image"></el-image>
					</el-form-item>
					<el-form-item label="链接：" v-if="info_data.type == 1">
						<el-button type="text" size="small" v-for="item in info_data.new_hot_url" @click="openWindow(item.url)">{{item.name}}</el-button>
					</el-form-item>
					<el-form-item label="库存：" v-if="info_data.type == 2">
						{{info_data.data_num}}
					</el-form-item>
					<el-form-item label="调价：" v-if="info_data.type == 2">
						{{info_data.data_price}}
					</el-form-item>
					<el-form-item label="备注：" v-if="info_data.type == 2">
						{{info_data.remark}}
					</el-form-item>
					<el-form-item>
						<el-radio-group v-model="audit_status">
							<el-radio :label="1">同意</el-radio>
							<el-radio :label="2">拒绝</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-input type="textarea" :rows="3" placeholder="请输入备注" v-model="remark">
						</el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="mini" @click="audit_dialog = false">取消</el-button>
				<el-button size="mini" type="primary" @click="confirmAudit">提交</el-button>
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
		.image{
			width: 100px;
			height: 100px;
		}
		.item_row{
			display: flex;
			.item_label{
				width: 36px;
				text-align:end;
			}
		}
	}
	.card_img{
		width: 120rem;
		height: 120rem;
	}
}
</style>
<script>
	import resource from '../../../api/chain_resource.js'

	import TableTitle from '../components/table_title.vue'
	import PaginationWidget from '../../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				loading:false,
				status_list:[{
					id:0,
					name:'待审核'
				},{
					id:1,
					name:'审核通过'
				},{
					id:2,
					name:'审核拒绝'
				}],
				status:"",					//审核状态
				type:"",					//类型
				search:"",					//搜索内容
				max_height:0,	
				page:1,
				button_list:{},				//权限按钮
				table_data:[],				//数据列表
				total:0,
				audit_dialog:false,			//审核弹窗
				info_data:{},				//审核详情
				audit_status:1,				//审核状态
				remark:"",					//审核备注
			}
		},
		created(){
			//获取列表
			this.hotDataList();
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
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
    				60 +
    				"px";
    			});
    		},
    		//获取列表
    		hotDataList(){
    			let arg = {
    				status:this.status,
    				type:this.type,
    				search:this.search,
    				pagesize:20,
    				page:this.page
    			}
    			this.loading = true;
    			resource.hotDataList(arg).then(res => {
    				if(res.data.code == 1){
    					this.loading = false;
    					let data = res.data.data;
    					let table_data = data.data;
    					table_data.map(item => {
    						let images = [];
    						item.img.map(i => {
    							images.push(this.domain + i);
    						})
    						item.images = images;

    						let hot_images = [];
    						item.hot_img.map(i => {
    							hot_images.push(this.domain + i);
    						})
    						item.hot_images = hot_images;

    						let new_hot_url = [];
    						item.hot_url.map((i,index) => {
    							let new_obj = {
    								name:`链接${index + 1}`,
    								url:i
    							}
    							new_hot_url.push(new_obj);
    						})
    						item.new_hot_url = new_hot_url;

    						if(item.i_id){
								item.new_i_id = item.i_id.split(',')
							}
							if(item.bd_i_id){
								item.new_bd_i_id = item.bd_i_id.split(',')
							}

    					})
    					this.table_data = table_data;
    					this.total =  res.data.data.total;
    					this.button_list =  res.data.data.button_list;
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		},
			//切换页码
			checkPage(v){
				this.page = v;
				//获取列表
				this.hotDataList();
			},
			//点击链接
			openWindow(url){
				if(url.indexOf('http://') == -1 && url.indexOf('https://') == -1 ){
					this.$alert(`【${url}】不是正确的链接格式!`, '提示', {
						confirmButtonText: '我知道了',
						callback: action => {
						}
					});
				}else{
					window.open(url)
				}
			},
			//点击审核
			auditFn(id){
				resource.hotDataInfo({id:id}).then(res => {
					if(res.data.code == 1){
						this.info_data = res.data.data;
						let preview_image = [];
						this.info_data.hot_img.map(item => {
							preview_image.push(this.domain + item)
						})
						this.info_data['preview_image'] = preview_image;

						let new_hot_url = [];
						this.info_data.hot_url.map((i,index) => {
							let new_obj = {
								name:`链接${index + 1}`,
								url:i
							}
							new_hot_url.push(new_obj);
						})
						this.info_data.new_hot_url = new_hot_url;

						this.audit_dialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//关闭审核
			closeDialog(){
				this.audit_status = 1;
				this.remark = "";
			},
			//提价审核
			confirmAudit(){
				let arg = {
					id:this.info_data.id,
					status:this.audit_status,
					remark:this.remark
				}
				resource.hotDataInfoPost(arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
						//获取列表
						this.hotDataList();
						this.audit_dialog = false;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			}
		},
		filters:{
			status(v,status_list){
				let arr = status_list.filter(item => {
					return item.id == v;
				})
				return arr.length > 0?arr[0].name:"-";
			},
			filterType(v){
				switch(v){
					case 1:
						return '爆款';
					case 2:
						return '主推款';
					case 3:
						return '深度库存';
					case 4:
						return '视频款';
					default:
					return;
				}
			}
		},
		components:{
			TableTitle,
			PaginationWidget
		}
	}
</script>






