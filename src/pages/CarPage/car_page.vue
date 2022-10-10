<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<PageTitle title="待选记录"/>
			<el-card class="card_box" id="card_box">
				<div class="all_title" id="all_title">待选（全部{{car_goods.length}}）</div>
				<el-table ref="multipleTable" size="mini" :data="car_goods" tooltip-effect="dark" style="width: 100%" @selection-change="changeSelected" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
					<el-table-column type="selection" width="55" fixed="left" :selectable="setStatus"></el-table-column>
					<el-table-column label="图片" width="160">
						<template slot-scope="scope">
							<el-image :z-index="2008" class="image" :src="scope.row.images[0]" fit="scale-down" :preview-src-list="scope.row.images"></el-image>
						</template>
					</el-table-column>
					<el-table-column label="标题" prop="price" width="160">
						<template slot-scope="scope">
							<div class="record_title">{{scope.row.title}}</div>
						</template>
					</el-table-column>
					<el-table-column label="供应商" prop="supplier_name" width="160" show-overflow-tooltip></el-table-column>
					<el-table-column label="上新时间" prop="new_time_name" width="150">
					</el-table-column>
					<el-table-column label="款号" prop="style_name" show-overflow-tooltip></el-table-column>
					<el-table-column label="款式编码" prop="i_id" show-overflow-tooltip></el-table-column>
					<el-table-column label="拍摄风格" prop="shooting_style_name" show-overflow-tooltip></el-table-column>
					<el-table-column label="价格" prop="cost_price"></el-table-column>
					<el-table-column label="操作" width="80" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="deleteFn('1',scope.row.select_cart_id)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="bottom_row" id="bottom_row">
					<el-button size='mini' type="text" :disabled="selected_list.length == 0" @click="deleteFn('2')">移除</el-button>
					<div class="all_selected">
						<div class="selcted_num">已选 {{selected_list.length}} 件</div>
						<el-button size='mini' type="primary" :disabled="selected_list.length == 0" @click="selectFn">去选中</el-button>
					</div>
				</div>
			</el-card>
		</div>
		<!-- 选款弹窗 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close :visible.sync="show_select">
			<div slot="title" class="dialog_title">
				<div>选款</div>
				<img class="close_icon" src="../../static/close_icon.png" @click="show_select = false">
			</div>
			<div class="select_content">
				<div class="info_title">选款信息</div>
				<div class="form_box">
					<div class="form_content">
						<div class="form_item">
							<div class="lable"><span>*</span>店铺：</div>
							<div class="value">
								<el-select v-model="shop_code" size="mini" clearable placeholder="选择店铺">
									<el-option v-for="item in store_list" :key="item.shop_code" :label="item.shop_name" :value="item.shop_code">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="form_item">
							<div class="lable"><span>*</span>需求日期：</div>
							<div class="value">
								<el-date-picker size="mini" v-model="demand_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
								</el-date-picker>
							</div>
						</div>
						<div class="form_item">
							<div class="lable"><span>*</span>售卖价格：</div>
							<div class="value">
								<el-input size="mini" type="number" clearable v-model="selling_price" placeholder="请输入售卖价格"></el-input>
							</div>
						</div>
					</div>
					<div class="form_content">
						<div class="form_item">
							<div class="lable"><span>*</span>需求类型：</div>
							<div class="value">
								<el-checkbox-group size="mini" v-model="demand_type">
									<el-checkbox :label="item.name" v-for="item in need_type">{{item.name}}</el-checkbox>
								</el-checkbox-group>
							</div>
						</div>
						<div class="form_item">
							<div class="lable"><span>*</span>发货类型：</div>
							<div class="value">
								<el-select v-model="send_type" size="mini" clearable placeholder="选择发货类型">
									<el-option v-for="item in delivery_type_list" :key="item.name" :label="item.name" :value="item.name">
									</el-option>
								</el-select>
							</div>
						</div>
					</div>
				</div>
				<QuillEditor @callback="getEditor"/>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button type="primary" size="small" @click="confirmSelect">确认选择</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import commonResource from '../../api/common_resource.js'

	import PageTitle from '../../components/page_title.vue'
	import QuillEditor from '../../components/quill_editor.vue'
	export default{
		data(){
			return{
				loading:false,
				car_goods:[],				//购物车列表
				selected_list: [],			//已选中的列表
				max_height:0,
				show_select:false,			//选款弹窗
				store_list:[],			//店铺列表
				shop_code:"",			//选中的店铺
				need_type:[],			//需求类型列表
				demand_type:[],			//选中的需求类型
				delivery_type_list:[],	//发货类型列表
				send_type:"",			//选中的发货类型
				demand_date:"",			//需求日期
				selling_price:"",		//售卖价格
				remark:"",				//备注
				
			}
		},
		destroyed() {
			window.removeEventListener("resize", () => {});
		},
		created(){
			//获取购物车列表数量
			this.getCarList();
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
    				let all_title_height = document.getElementById("all_title").offsetHeight;
    				let bottom_row_height = document.getElementById("bottom_row").offsetHeight;
    				this.max_height =
    				card_box_height -
    				all_title_height -
    				bottom_row_height -
    				30 +
    				"px";
    			});
    		},
    		//获取购物车列表数量
    		getCarList(){
    			this.loading = true;
    			resource.getCarList().then(res => {
    				if(res.data.code == 1){
    					this.loading = false;
    					let car_goods = res.data.data.data;
    					car_goods.map(item => {
    						let arr = [];
    						arr.push(this.domain + item.img);
    						item.images = arr;
    					})
    					this.car_goods = car_goods;
    				}else{
    					this.$message,warning(res.data.msg);
    				}
    			})
    		},
    		//判断是否可以选中
    		setStatus(row){
    			if (row.status == 1) {  
    				return true;  
    			}
    		},
			//切换选中
			changeSelected(val) {
				this.selected_list = val;
			},
			//点击去选中
			selectFn(){
				//获取店铺列表
				this.ajaxViewShop();
				//获取所有需求/发货类型
				this.getAllDemandSendType();
				this.show_select = true;
			},
			//提交选款
			confirmSelect(){
				if(this.shop_code == ''){
					this.$message.warning('请选择店铺!');
				}else if(this.demand_type.length == 0){
					this.$message.warning('请选择需求类型!');
				}else if(this.send_type == ''){
					this.$message.warning('请选择发货类型!');
				}else if(this.demand_date == ''){
					this.$message.warning('请选择需求时间!');
				}else if(this.selling_price == ''){
					this.$message.warning('请输入售卖价格!');
				}else{
					//店铺名称
					let shop_arr = this.store_list.filter(item => {
						return item.shop_code == this.shop_code;
					})
					//商品ID
					let style_id_arr = [];
					let select_id_arr = [];
					this.selected_list.map(item => {
						style_id_arr.push(item.style_id);
						select_id_arr.push(item.select_cart_id);
					})
					let arg = {
						select_id:select_id_arr.join(','),
						style_id_arr:style_id_arr.join(','),
						shop_code:this.shop_code,
						shop_name:shop_arr[0].shop_name,
						demand_type:this.demand_type.join(','),
						demand_date:this.demand_date,
						send_type:this.send_type,
						selling_price:this.selling_price,
						remark:this.remark
					}
					resource.addSelected(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.show_select = false;
							//获取购物车列表数量
							this.getCarList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//获取店铺列表
			ajaxViewShop(){
				let arg = {
					type:1,
				}
				commonResource.ajaxViewShop(arg).then(res => {
					if(res.data.code == 1){
						this.store_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取所有需求/发货类型
			getAllDemandSendType(){
				commonResource.getAllDemandSendType().then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						//需求类型
						this.need_type = data.filter(item => {
							return item.type == 1;
						})
						//发货类型
						this.delivery_type_list = data.filter(item => {
							return item.type == 2;
						})
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//监听富文本编辑器内容变化
			getEditor(v){
				this.remark = v;
			},
			//点击删除
			deleteFn(type,style_id){
				this.$confirm('确认删除商品图?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//商品ID
					let style_id_arr = [];
					this.selected_list.map(item => {
						style_id_arr.push(item.select_cart_id);
					})
					let arg = {
						select_cart_id:type == '1'?style_id:style_id_arr.join(',')
					}
					resource.removeCarGoods(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.getCarList();
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
		},
		components:{
			PageTitle,
			QuillEditor
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
		.all_title{
			padding-bottom: 8rem;
			font-size: 14rem;
			color: #333333;
		}
		.image{
			width: 140rem;
			height: 140rem;
		}
		.record_title{
			font-size:12rem;
			color: var(--color);
		}
		.bottom_row{
			padding-top: 18rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.all_selected{
				display: flex;
				align-items: center;
				.selcted_num{
					margin-right: 12rem;
				}
			}
		}
	}
}
.select_content{
	padding: 18rem 20rem;
	.info_title{
		margin-bottom: 14rem;
		font-size:14rem;
		color: #333333;
	}
	.form_box{
		display: flex;
		justify-content: space-between;
		.form_content{
			.form_item{
				margin-bottom: 20rem;
				display: flex;
				align-items: center;
				.lable{
					width: 80rem;
					font-size:14rem;
					color: #333333;
					span{
						color: red;
					}
				}
			}
		}
	}
}
</style>