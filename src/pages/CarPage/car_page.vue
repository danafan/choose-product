<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<PageTitle title="待选记录"/>
			<el-card class="card_box" id="card_box">
				<div class="all_title" id="all_title">待选（全部{{car_goods.length}}）</div>
				<el-table ref="multipleTable" size="mini" :data="car_goods" tooltip-effect="dark" style="width: 100%" @selection-change="changeSelected" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
					<el-table-column type="selection" width="85" fixed="left" :selectable="setStatus">
					</el-table-column>
					<el-table-column label="图片" width="150">
						<template slot-scope="scope">
							<div class="sx" v-if="scope.row.status == 1">失效</div>
							<div v-else-if="scope.row.images.length == 0">暂无</div>
							<el-carousel trigger="hover" indicator-position="none" :autoplay="false" height="100px" v-else>
								<el-carousel-item v-for="item in scope.row.images" :key="item">
									<el-image :z-index="2006" class="image" :src="item" fit="scale-down" :preview-src-list="scope.row.images"></el-image>
								</el-carousel-item>
							</el-carousel>
						</template>
					</el-table-column>

					<el-table-column label="标题" prop="price" width="160">
						<template slot-scope="scope">
							<div class="record_title">{{scope.row.title}}</div>
						</template>
					</el-table-column>
					<el-table-column label="供应商" prop="supplier_name" width="160"></el-table-column>
					<el-table-column label="上新时间" prop="new_time_name" width="150">
					</el-table-column>
					<el-table-column label="款号" prop="style_name"></el-table-column>
					<el-table-column label="款式编码" width="140">
						<template slot-scope="scope">
							<div class="item_row" v-if="scope.row.new_supplier_ksbm">
								<div class="item_label">供应商：</div>
								<div class="flex-1">
									<div v-for="item in scope.row.new_supplier_ksbm">{{item}}</div>
								</div>
							</div>
							<div class="item_row" v-if="scope.row.new_i_id">
								<div class="item_label">普通：</div>
								<div class="flex-1">
									<div v-for="item in scope.row.new_i_id">{{item}}</div>
								</div>
							</div>
							<div class="item_row" v-if="scope.row.new_bd_i_id">
								<div class="item_label">BD：</div>
								<div class="flex-1">
									<div v-for="item in scope.row.new_bd_i_id">{{item}}</div>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="拍摄风格" prop="shooting_style_name"></el-table-column>
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
						<el-button size='mini' type="primary" :disabled="disabled" @click="selectFn">去选中</el-button>
					</div>
				</div>
			</el-card>
		</div>
		<!-- 选款弹窗 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closeSelectDialog" destroy-on-close :visible.sync="show_select">
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
								<el-select v-model="shop_code" size="mini" multiple collapse-tags filterable clearable placeholder="选择店铺">
									<el-option v-for="item in store_list" :key="item.shop_code" :label="item.shop_name" :value="item.shop_code">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="form_item">
							<div class="lable">需求日期：</div>
							<div class="value">
								<el-date-picker size="mini" v-model="demand_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
								</el-date-picker>
							</div>
						</div>
						<div class="form_item">
							<div class="lable">售卖价格：</div>
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
								<el-select v-model="send_type" size="mini"  multiple collapse-tags filterable clearable placeholder="选择发货类型">
									<el-option v-for="item in delivery_type_list" :key="item.name" :label="item.name" :value="item.name">
									</el-option>
								</el-select>
							</div>
						</div>
					</div>
				</div>
				<QuillEditor @callback="getEditor"/>
			</div>
			<!-- 提示弹窗 -->
			<el-dialog :close-on-click-modal="false" width="35%" :close-on-press-escape="false" :show-close="false" :visible.sync="toast_dialog" append-to-body>
				<div slot="title" class="dialog_title">
					<div>温馨提示</div>
					<img class="close_icon" src="../../static/close_icon.png" @click="toast_dialog = false">
				</div>
				<div class="toast_content">
					<div class="toast_text">{{toast_content}}</div>
					<el-checkbox :true-label="1" :false-label="0" v-model="type">24小时内不再提示</el-checkbox>
				</div>
				<div slot="footer" class="dialog_footer">
					<el-button size="small" @click="toast_dialog = false">取消</el-button>
					<el-button type="primary" size="small" @click="confirmSelect(1)">继续选择</el-button>
				</div>
			</el-dialog>
			<div slot="footer" class="dialog_footer">
				<el-button type="primary" :disabled="confirmDisabled" size="small" @click="confirmSelect(0)">确认选择</el-button>
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
				button_list:{},
				selected_list: [],			//已选中的列表
				max_height:0,
				show_select:false,			//选款弹窗
				store_list:[],			//店铺列表
				shop_code:[],			//选中的店铺
				need_type:[],			//需求类型列表
				demand_type:[],			//选中的需求类型
				delivery_type_list:[],	//发货类型列表
				send_type:[],			//选中的发货类型
				demand_date:"",			//需求日期
				selling_price:"",		//售卖价格
				remark:"",				//备注
				is_loading:false,
				toast_dialog:false,		//有提交过的提示
				toast_content:"",		//提示内容
				type:0,					//0:提示；1:不提示
				
			}
		},
		destroyed() {
			window.removeEventListener("resize", () => {});
		},
		created(){
			//获取购物车列表数量
			this.getCarList();
		},
		watch:{
			//切换24小时内不提示
			type:function(n,o){
				this.checkToast(n);
			},
		},
		updated(){
			this.addTableIndex();
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			},
			//去选中按钮是否可以点击
			disabled(){
				let disabled = false;
				let arr = this.selected_list.filter(item => {
					return item.cost_price == '';
				})
				disabled = arr.length > 0 || this.selected_list.length == 0;
				return disabled;
			},
			//确认选择按钮是否可点击
			confirmDisabled(){
				return this.shop_code.length == 0 || this.demand_type.length == 0 || this.send_type.length == 0 || this.is_loading;
			}
		},
		mounted() {
    		//获取表格最大高度
			this.onResize();
			window.addEventListener("resize", this.onResize());
		},
		methods: {
			addTableIndex() {
				let table = document.querySelector(".el-table__body-wrapper");
				let tableSelect = table.getElementsByClassName(
					"el-table-column--selection"
					);

				var arr = Array.from(tableSelect);
				arr.forEach((item, index) => {
					if (item.childNodes.length == 2) {
						item.removeChild(item.lastChild);
					}
					let span = document.createElement("span");
					span.innerText = index + 1;
					item.appendChild(span);
				});
			},
    		//切换24小时内不提示
			checkToast(type){
				resource.twoFourTitle({type:type}).then(res => {
					if(res.data.code != 1){
						this.$message.warning(res.data.msg);
					}
				})
			},
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
						console.log(car_goods)
						car_goods.map(item => {
							let images = [];
							if(item.img){
								item.img.map(i => {
									images.push(this.domain + i);
								})
							}
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
						this.car_goods = car_goods;
					}else{
						this.$message,warning(res.data.msg);
					}
				})
			},
    		//判断是否可以选中
			setStatus(row){
				if (row.status == '0') { 
					return true;  
				}else{
					return false;
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
			//关闭选款弹窗
			closeSelectDialog(){
				this.shop_code = [];			//选中的店铺
				this.demand_type = [];			//选中的需求类型
				this.send_type = [];			//选中的发货类型
				this.demand_date = "";			//需求日期
				this.selling_price = "";		//售卖价格
				this.remark = "";				//备注
			},
			//提交选款
			confirmSelect(go_on){
				if(this.shop_code.length == 0){
					this.$message.warning('请选择店铺!');
				}else if(this.demand_type.length == 0){
					this.$message.warning('请选择需求类型!');
				}else if(this.send_type.length == 0){
					this.$message.warning('请选择发货类型!');
				}else if(this.selling_price < 0){
					this.$message.warning('售卖价格应大于0!');
				}else{
					var shop_code_arr = [];
					var shop_name_arr = [];
					this.shop_code.map(item => {
						this.store_list.map(i => {
							if(item == i.shop_code){
								shop_code_arr.push(i.shop_code);
								shop_name_arr.push(i.shop_name);
							}
						})
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
						shop_code:shop_code_arr.join(','),
						shop_name:shop_name_arr.join(','),
						demand_type:this.demand_type.join(','),
						demand_date:this.demand_date?this.demand_date:"",
						send_type:this.send_type.join(','),
						selling_price:this.selling_price,
						remark:this.remark,
						go_on:go_on
					}
					this.is_loading = true;
					resource.addSelected(arg).then(res => {
						this.is_loading = false;
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.show_select = false;
							this.toast_dialog = false;
							//缓存选款的店铺、需求类型、发货类型参数
							this.changeSelectForm();
							//获取购物车列表数量
							this.getCarList();
						}else if(res.data.code == 5){
							this.toast_content = res.data.msg;
							this.toast_dialog = true;
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//缓存选款的店铺、需求类型、发货类型参数
			changeSelectForm(){	
				let form = {
					shop_code:this.shop_code,
					demand_type:this.demand_type,
					send_type:this.send_type
				}
				sessionStorage.setItem("selectedForm",JSON.stringify(form))
			},
			//获取店铺列表
			ajaxViewShop(){
				let arg = {
					type:3,
				}
				commonResource.ajaxViewShop(arg).then(res => {
					if(res.data.code == 1){
						this.store_list = res.data.data;
						let selectedForm = sessionStorage.getItem("selectedForm");
						if(selectedForm){
							let new_selected_form = JSON.parse(sessionStorage.getItem("selectedForm"));
							this.shop_code = [];
							new_selected_form.shop_code.map(item => {
								let arr = this.store_list.filter(i => {
									return i.shop_code == item;
								})
								if(arr.length > 0){
									this.shop_code.push(arr[0].shop_code)
								}
							})
						}
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

						this.demand_type = [];
						this.send_type = [];

						let selectedForm = sessionStorage.getItem("selectedForm");
						if(selectedForm){
							let new_selected_form = JSON.parse(sessionStorage.getItem("selectedForm"));

							new_selected_form.demand_type.map(item => {
								let arr = this.need_type.filter(i => {
									return i.name == item;
								})
								if(arr.length > 0){
									this.demand_type.push(arr[0].name)
								}
							})

							if(this.delivery_type_list.length == 1){
								this.send_type.push(this.delivery_type_list[0].name);
							} else {
								new_selected_form.send_type.map(item => {
									let arr = this.delivery_type_list.filter(i => {
										return i.name == item;
									})
									if(arr.length > 0){
										this.send_type.push(arr[0].name)
									}
								})
							}
							
						}else{
							if(this.delivery_type_list.length == 1){
								this.send_type.push(this.delivery_type_list[0].name);
							} 
						}
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
			.sx{
				background: #D8D8D8;
				border:1px solid #979797;
				width: 40px;
				text-align: center;
				height: 16px;
				line-height: 16px;
				border-radius: 8px;
				position: absolute;
				left: -12px;
				top: 45%;
				transform: translate(-50%,0);
				z-index: 999;
				font-size: 12px;
				color: #333333;
			}
			.image{
				width: 100px;
				height: 100px;
			}
			.item_row{
				display: flex;
				.item_label{
					width: 48px;
					text-align:end;
				}
			}
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
	.toast_content{
		padding: 10rem 20rem;
		.toast_text{
			margin-bottom: 15rem;
		}
	}
</style>