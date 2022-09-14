<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<PageTitle title="待选记录"/>
			<el-card class="card_box" id="card_box">
				<div class="all_title" id="all_title">待选（全部{{car_goods.length}}）</div>
				<el-table ref="multipleTable" size="mini" :data="car_goods" tooltip-effect="dark" style="width: 100%" @selection-change="changeSelected" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height">
					<el-table-column type="selection" width="55" fixed="left" :selectable="setStatus"></el-table-column>
					<el-table-column label="图片" width="120">
						<template slot-scope="scope">
							<el-image :z-index="2006" class="image" :src="scope.row.image[0]" fit="contain" :preview-src-list="scope.row.image"></el-image>
						</template>
					</el-table-column>
					<el-table-column label="标题" prop="price" width="160">
						<template slot-scope="scope">
							<div class="record_title">这是标题这是标题这是标题这是标题这是标题这是标题这是标题</div>
						</template>
					</el-table-column>
					<el-table-column label="供应商" prop="price" width="160" show-overflow-tooltip></el-table-column>
					<el-table-column label="上新时间" prop="price" width="150">
						<template slot-scope="scope">
							<div>2022-08-05 12:00</div>
						</template>
					</el-table-column>
					<el-table-column label="款号" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="款式编码" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="拍摄风格" prop="price" show-overflow-tooltip></el-table-column>
					<el-table-column label="价格" prop="price"></el-table-column>
					<el-table-column label="操作" width="80" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="deleteCar(scope.row)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="bottom_row" id="bottom_row">
					<el-button size='mini' type="text" :disabled="selected_list.length == 0" @click="allDelete">移除</el-button>
					<div class="all_selected">
						<div class="selcted_num">已选 {{selected_list.length}} 件</div>
						<el-button size='mini' type="primary" @click="selectFn">去选中</el-button>
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
							<div class="lable">店铺：</div>
							<div class="value">
								<el-select style="width: 220px" v-model="store_ids" size="mini" clearable placeholder="选择店铺">
									<el-option v-for="item in store_list" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="form_item">
							<div class="lable">需求日期：</div>
							<div class="value">
								<el-date-picker size="mini" v-model="date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
								</el-date-picker>
							</div>
						</div>
						<div class="form_item">
							<div class="lable">售卖价格：</div>
							<div class="value">
								<el-input style="width: 220px" size="mini" clearable v-model="price" placeholder="请输入售卖价格"></el-input>
							</div>
						</div>
					</div>
					<div class="form_content">
						<div class="form_item">
							<div class="lable">需求类型：</div>
							<div class="value">
								<el-radio-group size="mini" v-model="need_type_id">
									<el-radio :label="item.id" v-for="item in need_type">{{item.name}}</el-radio>
								</el-radio-group>
							</div>
						</div>
						<div class="form_item">
							<div class="lable">发货类型：</div>
							<div class="value">
								<el-select style="width: 220px" v-model="delivery_type_ids" size="mini" clearable placeholder="选择发货类型">
									<el-option v-for="item in delivery_type_list" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</div>
						</div>
					</div>
				</div>
				<QuillEditor @callback="getEditor"/>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button type="primary" size="small" @click="show_select = false">确认选择</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import PageTitle from '../../components/page_title.vue'
	import QuillEditor from '../../components/quill_editor.vue'
	export default{
		data(){
			return{
				selected_list: [],			//已选中的列表
				max_height:0,
				show_select:false,			//选款弹窗
				store_list:[{
					name:'店铺1',
					id:'1'
				},{
					name:'店铺2',
					id:'2'
				},{
					name:'店铺3',
					id:'3'
				}],						//店铺列表
				store_ids:[],			//选中的店铺
				need_type:[{
					name:'上架',
					id:'1'
				},{
					name:'调样',
					id:'2'
				},{
					name:'拍摄',
					id:'3'
				},{
					name:'其他',
					id:'4'
				}],						//需求类型列表
				need_type_id:"",		//选中的需求类型
				delivery_type_list:[{
					name:'发货类型1',
					id:'1'
				},{
					name:'发货类型2',
					id:'2'
				},{
					name:'发货类型3',
					id:'3'
				}],						//发货类型列表
				delivery_type_ids:[],	//选中的发货类型
				date:"",				//需求日期
				price:"",				//售卖价格
			}
		},
		computed:{
			//购物车列表
			car_goods(){
				return this.$store.state.car_goods;
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
    		//判断是否可以选中
    		setStatus(row){
    			if (row.price != 3) {  
    				return true;  
    			}
    		},
			//切换选中
			changeSelected(val) {
				this.selected_list = val;
			},
			//点击去选中
			selectFn(){
				if(this.selected_list.length == 0){
					this.$message.warning('你还没有选中记录哦~')
				}else{
					this.show_select = true;
				}
			},
			//点击批量删除
			allDelete(){
				let arg = {
					goods_items:this.selected_list,
					type:'del'
				}
				this.$store.commit('setCarGoods',arg);
				localStorage.setItem("car_goods",JSON.stringify(this.$store.state.car_goods));
			},
			//点击单个移除
			deleteCar(item){
				let arg = {
					goods_items:[],
					type:'del'
				}
				arg.goods_items.push(item)
				this.$store.commit('setCarGoods',arg);
				localStorage.setItem("car_goods",JSON.stringify(this.$store.state.car_goods));
			},
			//监听富文本内容变化
			getEditor(v){
				console.log(v)
			}
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
				}
			}
		}
	}
}
</style>