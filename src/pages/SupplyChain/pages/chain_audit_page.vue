<template>
	<div class="chain_page_content">
		<el-card class="form_card">
			<div class="up_down_row" :class="{'between':!is_up}">
				<div class="search_title" v-if="!is_up">查询条件</div>
				<div class="selected_right" @click="is_up = !is_up">
					<div>{{is_up?'收起':'展开'}}</div>
					<img class="down_arrow" :class="{'rotate':is_up == true}" src="../../../static/down_arrow.png">
				</div>
			</div>
			<el-form style="margin-top: 10px;" :inline="true" size="mini" v-show="is_up">
				<el-form-item label="需求类型：">
					<el-select v-model="demand_type" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in demand_list" :key="item.name" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="需求状态：">
					<el-select v-model="status_id" clearable placeholder="全部">
						<el-option v-for="item in status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="发货类型：">
					<el-select v-model="send_type" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in send_type_list" :key="item.name" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="需求部门：">
					<el-select v-model="select_main_dept_id" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in dept_list" :key="item.main_dept_id" :label="item.main_dept_name" :value="item.main_dept_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="需求人：">
					<el-select v-model="select_userid" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in user_list" :key="item.ding_user_id" :label="item.ding_user_name" :value="item.ding_user_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类：">
					<el-select v-model="classification_ids" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in class_list" :key="item.classification_id" :label="item.classification_name" :value="item.classification_id">
						</el-option>
					</el-select>
				</el-form-item>
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
				<el-form-item label="需求店铺：">
					<el-select style="width: 330px" v-model="shop_code" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in store_list" :key="item.shop_code" :label="item.shop_name" :value="item.shop_code">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="款式编码：">
					<el-input placeholder="款式编码" clearable v-model="i_id">
					</el-input>
				</el-form-item>
				<el-form-item label="选款日期：">
					<el-date-picker v-model="date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="up_type = null">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-radio-group v-model="up_type">
						<el-radio :label="1">今日上新</el-radio>
						<el-radio :label="3">三日上新</el-radio>
						<el-radio :label="7">七日上新</el-radio>
					</el-radio-group>
				</el-radio-group>
			</el-form-item>
			<el-form-item class="form_item">
				<el-button type="primary" @click="checkPage(1)">查询</el-button>
			</el-form-item>
		</el-form>
	</el-card>
	<el-card class="card_box" id="card_box">
		<TableTitle title="数据列表" id="table_title">
			<el-button size="mini" type="primary" v-if="button_list.aff == 1" @click="allCommitFn">批量审核</el-button>
			<el-button size="mini" type="primary" v-if="button_list.der == 1" @click="exportFn">导出</el-button>
		</TableTitle>
		<el-table size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" @selection-change="handleSelectionChange" v-loading="loading">
			<el-table-column type="selection" width="55" fixed :selectable="checkboxInit">
			</el-table-column>
			<el-table-column label="款号" prop="style_name"></el-table-column>
			<el-table-column label="款式编码" width="140">
				<template slot-scope="scope">
					<div class="item_row" v-if="scope.row.new_supplier_ksbm">
						<div class="item_label">供应商：</div>
						<div class="item_value">
							<div v-for="item in scope.row.new_supplier_ksbm">{{item}}</div>
						</div>
					</div>
					<div class="item_row" v-if="scope.row.new_i_id">
						<div class="item_label">普通：</div>
						<div class="item_value">
							<div v-for="item in scope.row.new_i_id">{{item}}</div>
						</div>
					</div>
					<div class="item_row" v-if="scope.row.new_bd_i_id">
						<div class="item_label">BD：</div>
						<div class="item_value">
							<div v-for="item in scope.row.new_bd_i_id">{{item}}</div>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="对接推单" prop="common_text">
				<template slot-scope="scope">
					<div v-if="scope.row.abutment_type == 0">否</div>
					<div v-if="scope.row.abutment_type == 1">是</div>
				</template>
			</el-table-column>
			<el-table-column label="图片" width="150">
				<template slot-scope="scope">
					<div v-if="scope.row.images.length == 0">暂无</div>
					<el-carousel trigger="hover" indicator-position="none" :autoplay="false" height="100px" v-else>
						<el-carousel-item v-for="(item,index) in scope.row.images" :key="index">
							<el-image :z-index="2006" class="image" :src="item" fit="scale-down" :preview-src-list="scope.row.images"></el-image>
						</el-carousel-item>
					</el-carousel>
				</template>
			</el-table-column>
			<el-table-column label="网盘地址">
				<template slot-scope="scope">
					<el-button class="pre_wrap" size="small" type="text" @click="windowOpen(scope.row.net_disk_address,scope.row.or_net_disk_address)" v-if="scope.row.or_net_disk_address !== ''">访问链接</el-button>
					<div v-else></div>
				</template>
			</el-table-column>
			<el-table-column label="成本价" prop="cost_price"></el-table-column>
			<el-table-column label="售卖价" prop="selling_price"></el-table-column>
			<el-table-column label="需求人" prop="ding_user_name"></el-table-column>
			<el-table-column label="需求店铺" prop="shop_name"></el-table-column>
			<el-table-column label="需求部门" prop="select_main_dept_name"></el-table-column>
			<el-table-column label="需求日期" prop="demand_date"></el-table-column>
			<el-table-column label="需求类型" prop="demand_type"></el-table-column>
			<el-table-column label="发货类型" prop="send_type"></el-table-column>
			<el-table-column label="提交时间" prop="select_time"></el-table-column>
			<el-table-column label="供应商" prop="supplier_name"></el-table-column>
			<el-table-column label="需求状态" prop="common_text">
				<template slot-scope="scope">
					<div v-if="scope.row.audit_status == 0">已撤销</div>
					<div v-if="scope.row.audit_status == 1">待审核</div>
					<div v-if="scope.row.audit_status == 2">已确认</div>
					<div v-if="scope.row.audit_status == 4">已拒绝</div>
				</template>
			</el-table-column>
			<el-table-column label="审核备注" prop="select_remark"></el-table-column>
			<el-table-column label="操作" width="160" fixed="right">
				<template slot-scope="scope">
					<el-button type="text" size="small" v-if="button_list.info == 1" @click="selectedInfo(scope.row.select_id)">查看</el-button>
					<el-button type="text" size="small" v-if="button_list.edit_i_id == 1" @click="editInfo(scope.row.select_id,scope.row.i_id,scope.row.bd_i_id,scope.row.supplier_ksbm)">编辑</el-button>
					<el-button type="text" size="small" v-if="scope.row.audit_status == 1 && button_list.aff == 1" @click="auditFn('1',scope.row.select_id)">确认需求</el-button>
					<el-button type="text" size="small" v-if="(scope.row.audit_status == 1 || scope.row.audit_status == 2) && button_list.ref == 1" @click="auditFn('2',scope.row.select_id)">拒绝需求</el-button>
					<el-button type="text" size="small" v-if="button_list.addre == 1" @click="addRemark(scope.row.select_id,scope.row.select_remark)">备注</el-button>
				</template>
			</el-table-column>
		</el-table>
		<PaginationWidget id="bottom_row" :total="total" :page="page" :pagesize="100" @checkPage="checkPage"/>
	</el-card>
	<!-- 详情弹窗 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close :visible.sync="detail_dialog">
		<div slot="title" class="dialog_title">
			<div>商品详情</div>
			<img class="close_icon" src="../../../static/close_icon.png" @click="detail_dialog = false">
		</div>
		<div class="dialog_content">
			<div class="detail_row">
				<div class="lable">标题</div>
				<div class="value">{{goods_info.title}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">款号</div>
				<div class="value">{{goods_info.style_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">款式编码</div>
				<div class="value">
					<div>普通：{{goods_info.i_id}}</div>
					<div>BD：{{goods_info.bd_i_id}}</div>
				</div>
			</div>
			<div class="detail_row">
				<div class="lable">供应商</div>
				<div class="value">{{goods_info.supplier_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">市场</div>
				<div class="value">{{goods_info.market_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">提供拍照</div>
				<div class="value">{{goods_info.supply_photograph == 1?'是':'否'}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">提供退货</div>
				<div class="value">{{goods_info.supply_return_goods == 1?'是':'否'}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">提供换货</div>
				<div class="value">{{goods_info.supply_exchange_goods == 1?'是':'否'}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">提供代发</div>
				<div class="value">{{goods_info.supply_replace_send == 1?'是':'否'}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">结算方式</div>
				<div class="value">{{goods_info.supply_monthly_settlement == 1?'月结':'现结'}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">类目</div>
				<div class="value">{{goods_info.category_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">分类</div>
				<div class="value">{{goods_info.classification_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">拍摄风格</div>
				<div class="value">{{goods_info.shooting_style_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">合作模式</div>
				<div class="value">{{goods_info.mode}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">商品说明</div>
				<div class="value">{{goods_info.remark}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">面料</div>
				<div class="value">{{goods_info.fabric}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">尺码</div>
				<div class="value">{{goods_info.size}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">成本价</div>
				<div class="value">{{goods_info.cost_price}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">百度网盘</div>
				<div class="value">{{goods_info.net_disk_address}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">店铺</div>
				<div class="value">{{goods_info.shop_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">需求类型</div>
				<div class="value">{{goods_info.demand_type}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">发货类型</div>
				<div class="value">{{goods_info.send_type}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">需求日期</div>
				<div class="value">{{goods_info.demand_date}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">售卖价格</div>
				<div class="value">{{goods_info.selling_price}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">选款要求</div>
				<div class="value" v-html="goods_info.demand_remark"></div>
			</div>
			<div class="detail_row" v-if="goods_info.audit_status == 2">
				<div class="lable">确认备注</div>
				<div class="value">{{goods_info.aff_reason}}</div>
			</div>
			<div class="detail_row" v-if="goods_info.audit_status == 4">
				<div class="lable">拒绝原因</div>
				<div class="value">{{goods_info.refund_reason}}</div>
			</div>
		</div>
		<div slot="footer" class="dialog_footer">
			<el-button type="primary" size="small" @click="detail_dialog = false">关闭</el-button>
		</div>
	</el-dialog>
	<!-- 备注弹窗 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close @close="remark = ''" :visible.sync="remark_dialog" width="30%">
		<div slot="title" class="dialog_title">
			<div>备注</div>
			<img class="close_icon" src="../../../static/close_icon.png" @click="remark_dialog = false">
		</div>
		<div class="remark_content">
			<el-input type="textarea" :rows="3" placeholder="请输入备注" v-model="remark">
			</el-input>
		</div>
		<div slot="footer" class="dialog_footer">
			<el-button size="mini" @click="remark_dialog = false">关闭</el-button>
			<el-button size="mini" type="primary" @click="confirmRemark">提交</el-button>
		</div>
	</el-dialog>
	<!-- 单个审批弹窗 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close @close="allClose" :visible.sync="refused_dialog" width="30%">
		<div slot="title" class="dialog_title">
			<div>确认{{`${audit_type == '1'?'同意':'拒绝'}`}}？</div>
			<img class="close_icon" src="../../../static/close_icon.png" @click="refused_dialog = false">
		</div>
		<div class="remark_content">
			<div style="color: red;margin-bottom: 5px">（*必填）</div>
			<el-input type="textarea" :rows="3" placeholder="请输入同意备注" v-model="msg" v-if="audit_type == '1'">
			</el-input>
			<el-input type="textarea" :rows="3" placeholder="请输入拒绝原因" v-model="err_msg" v-if="audit_type == '2'">
			</el-input>
		</div>
		<div slot="footer" class="dialog_footer">
			<el-button size="mini" @click="refused_dialog = false">关闭</el-button>
			<el-button size="mini" type="primary" @click="confirmRefused">提交</el-button>
		</div>
	</el-dialog>
	<!-- 批量审批 -->
	<el-dialog :visible.sync="allAuditDialog" @close="allClose" width="30%">
		<div slot="title" class="dialog_title">
			<div>批量审批</div>
			<img class="close_icon" src="../../../static/close_icon.png" @click="allAuditDialog = false">
		</div>
		<div class="down_box">
			<el-form :inline="true" size="mini">
				<el-form-item label="类型：">
					<el-radio-group v-model="audit_type">
						<el-radio :label="1">同意</el-radio>
						<el-radio :label="2">拒绝</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="同意备注：" required v-if="audit_type == 1">
					<el-input type="textarea" :rows="3" placeholder="请输入同意备注"
					v-model="msg">
				</el-input>
			</el-form-item>
			<el-form-item label="拒绝原因：" required v-if="audit_type == 2">
				<el-input type="textarea" :rows="3" placeholder="请输入拒绝原因"
				v-model="refuse_remark">
			</el-input>
		</el-form-item>
	</el-form>
</div>
<div slot="footer" class="dialog_footer">
	<el-button size="mini" @click="allAuditDialog = false">取消</el-button>
	<el-button size="mini" type="primary" @click="commitAllAudit">确认</el-button>
</div>
</el-dialog>
<!-- 编辑 -->
<el-dialog :visible.sync="edit_dialog" @close="closeEdit" width="30%">
	<div slot="title" class="dialog_title">
		<div>编辑款式编码</div>
		<img class="close_icon" src="../../../static/close_icon.png" @click="edit_dialog = false">
	</div>
	<div class="down_box">
		<el-form :inline="true" size="mini">
			<el-form-item label="供应商款式编码：">
				<el-input type="textarea" autosize placeholder="多个请用分号间隔" v-model="edit_arg.supplier_ksbm">
				</el-input>
			</el-form-item>
			<el-form-item label="款式编码：">
				<el-input type="textarea" autosize placeholder="多个请用分号间隔" v-model="edit_arg.i_id">
				</el-input>
			</el-form-item>
			<el-form-item label="BD款式编码：">
				<el-input type="textarea" autosize placeholder="多个请用分号间隔" v-model="edit_arg.bd_i_id">
				</el-input>
			</el-form-item>
		</el-form>
	</div>
	<div slot="footer" class="dialog_footer">
		<el-button size="mini" @click="edit_dialog = false">取消</el-button>
		<el-button size="mini" type="primary" @click="commitEdit">确认</el-button>
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
		.up_down_row{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.search_title{
				font-size: 14px;
				font-weight: bold;
			}
			.selected_right{
				display: flex;
				align-items: center;
				cursor: pointer;
				.down_arrow{
					margin-left: 5rem;
					transform: rotate(-90deg);
					width: 14rem;
					height: 8rem;
				}
				.rotate{
					transform: rotate(0deg);
				}
			}
			
		}
		.between{
			justify-content:space-between;
		}
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
				width: 56px;
				text-align:end;
			}
			.item_value{
				flex:1;
			}
		}
	}
	.down_box{
		display:flex;
		padding:30rem 0;
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
	.dialog_content{
		max-height: 450px;
		overflow-y: scroll;
		.detail_row{
			border-bottom:1px solid #F0F0F0;
			display: flex;
			font-size:14rem;
			color: #333333;
			.lable{
				border-right:1px solid #F0F0F0;
				width: 120rem;
				padding:12rem 20rem;
				display: flex;
				align-items: center;
			}
			.value{
				flex:1;
				padding: 12rem 20rem;
			}
		}
	}
	.remark_content{
		padding:20rem;
	}
}
</style>
<script>
	import commonResource from '../../../api/common_resource.js'
	import resource from '../../../api/chain_resource.js'
	import { getNowDate,getCurrentDate } from "../../../api/date.js";
	import { exportPost } from "../../../api/export.js";

	import { MessageBox, Message } from "element-ui";
	import TableTitle from '../components/table_title.vue'
	import PaginationWidget from '../../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				is_up:false,
				loading:false,
				demand_list:[],			//需求类型
				demand_type:[],			//选中的需求类型
				status_list:[{
					name:'已撤销',
					id:0
				},{
					name:'待审核',
					id:1
				},{
					name:'已确认',
					id:2
				},{
					name:'已拒绝',
					id:4
				}],						//需求状态
				status_id:"",			//选中的需求状态
				dept_list:[],			//所有部门列表
				select_main_dept_id:[], //所有部门列表
				user_list:[],			//所有用户列表
				select_userid:[],		//选中的用户列表
				store_list:[],			//店铺列表
				shop_code:[],			//选中的店铺
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
				send_type_list:[],		//发货类型列表
				send_type:[],			//选中的发货类型
				i_id:"",				//款式编码
				up_type:null,					//上新类型
				date:[],				//选款日期
				max_height:0,	
				page:1,
				data:[],				//获取的数据
				total:0,
				button_list:{},
				detail_dialog:false,	//详情弹窗
				goods_info:{},			//详情
				remark_dialog:false,
				select_id:"",			//当前点击的记录ID
				remark:"",				//备注内容
				refused_dialog:false,	//拒绝弹窗
				err_msg:"",				//拒绝备注
				multiple_selection:[],
				allAuditDialog:false,
				audit_type:1,			//批量审批的类型（1:同意；2:拒绝）
				msg:"",					//同意备注
				refuse_remark:"",		//批量拒绝原因
				edit_dialog:false,		//编辑款式编码弹窗
				edit_arg:{
					select_id:"",
					supplier_ksbm:"",
					i_id:"",
					bd_i_id:""
				},						//编辑信息
			}
		},
		created(){
			//获取需求类型和发货类型列表
			this.getAllDemandSendType();
			//获取部门列表
			this.getDeptList();
			//获取用户列表
			this.getUserList();
			//获取所有店铺列表
			this.ajaxViewShop();
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
    		//获取列表
    		this.getGoodsList();
    	},
    	watch:{
    		is_up:function(n,o){
    			//获取表格最大高度
    			this.onResize();
    		},
    		//上新类型
    		up_type:function(n,o){
    			switch(n){
    				case 1:
    				this.date = [getNowDate(),getNowDate()];
    				break;
    				case 3:
    				this.date = [getCurrentDate(3),getNowDate()];
    				break;
    				case 7:
    				this.date = [getCurrentDate(7),getNowDate()];
    				break;
    				default:
    				return
    			}
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
    		//获取需求类型列表
    		getAllDemandSendType(){
    			commonResource.getAllDemandSendType().then(res => {
    				if(res.data.code == 1){
    					let data = res.data.data;
    					this.demand_list = data.filter(item => {
    						return item.type == 1;
    					})
    					this.send_type_list = data.filter(item => {
    						return item.type == 2
    					});
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		},
    		//获取部门列表
    		getDeptList(){
    			commonResource.getDeptList().then(res => {
    				if(res.data.code == 1){
    					this.dept_list = res.data.data;
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		},
    		//获取用户列表
    		getUserList(){
    			commonResource.getUserList().then(res => {
    				if(res.data.code == 1){
    					this.user_list = res.data.data;
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		},
    		//获取所有店铺列表
    		ajaxViewShop(){
    			commonResource.ajaxViewShop().then(res => {
    				if(res.data.code == 1){
    					this.store_list = res.data.data;
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
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
			//切换多选
			handleSelectionChange(val) {
				this.multiple_selection = val;
			},
			//设置不可勾选
			checkboxInit(row) {
				if(row.audit_status != 1) { 
					return 0 
				} else { 
					return 1
				}
			},
		    //批量审批
		    allCommitFn(){
		    	if(this.multiple_selection.length == 0){
		    		this.$message.warning('至少选择一条!');
		    		return;
		    	}
		    	this.allAuditDialog = true;
		    },
		    //关闭批量审批
		    allClose(){
		    	this.audit_type = 1;
		    	this.refuse_remark = "";
		    	this.msg = "";
		    	this.err_msg = "";
		    },
		    //提价批量审批
		    commitAllAudit(){
		    	let ids = [];
		    	this.multiple_selection.map(item => {
		    		ids.push(item.select_id);
		    	})
		    	if(this.audit_type == 1){	//同意
		    		if(this.msg == ''){
		    			this.$message.warning('请输入同意备注!');
		    			return;
		    		}
		    		let arg = {
		    			select_id:ids.join(','),
		    			msg:this.msg
		    		}
					//同意
					this.agreeAudit(arg)
				}else{	//拒绝
					if(this.refuse_remark == ''){
						this.$message.warning('请输入拒绝原因!');
						return;
					}
					let arg = {
						select_id:ids.join(','),
						err_msg:this.refuse_remark
					}
					//拒绝
					this.refuseAudit(arg)
				}
			},
			//获取列表
			getGoodsList(){
				let arg = {
					demand_type:this.demand_type.join(','),
					status:this.status_id,
					select_userid:this.select_userid.join(','),
					select_main_dept_id:this.select_main_dept_id.join(','),
					shop_code:this.shop_code.join(','),
					supplier_id:this.supplier_ids.join(','),
					category_id:this.category_ids.join(','),
					market_id:this.market_ids.join(','),
					classification_id:this.classification_ids.join(','),
					shooting_style_id:this.shooting_style_ids.join(','),
					send_type:this.send_type.join(','),
					start_time:this.date && this.date.length > 0?this.date[0]:"",
					end_time:this.date && this.date.length > 0?this.date[1]:"",
					i_id:this.i_id,
					page:this.page,
					pagesize:100
				}
				this.loading = true;
				resource.examineList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.button_list = res.data.data.button_list;
						this.total = res.data.data.total;
						let data = res.data.data.data;
						data.map(item => {
							let images = [];
							item.img.map(i => {
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
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换页码
			checkPage(v){
				this.page = v;
				//获取列表
				this.getGoodsList();
			},
			//获取详情
			selectedInfo(select_id){
				let arg = {
					select_id:select_id,
					select_type:0
				}
				resource.examineSelectedInfo(arg).then(res => {
					if(res.data.code == 1){
						this.goods_info = res.data.data;
						this.detail_dialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//审批
			auditFn(type,id){
				this.audit_type = type;
				this.select_id = id;
				this.refused_dialog = true;
			},
			//同意
			agreeAudit(arg){
				resource.affirmSelected(arg).then(res => {
					if(res.data.code == 1){
						this.refused_dialog = false;
						this.allAuditDialog = false;
						this.$message.success(res.data.msg);
						//获取列表
						this.getGoodsList();
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//拒绝
			refuseAudit(arg){
				resource.refuseSelected(arg).then(res => {
					if(res.data.code == 1){
						this.refused_dialog = false;
						this.allAuditDialog = false;
						this.$message.success(res.data.msg);
						//获取列表
						this.getGoodsList();
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击添加备注
			addRemark(select_id,remark){
				this.select_id = select_id;
				this.remark = remark?remark:'';
				this.remark_dialog = true;
			},
			//提交备注
			confirmRemark(){
				let arg = {
					select_id:this.select_id,
					remark:this.remark
				}
				resource.addSelectRemark(arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
						this.remark_dialog = false;
							//获取列表
							this.getGoodsList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
			},
			//导出
			exportFn() {
				MessageBox.confirm("确认导出?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
				.then(() => {
					let arg = {
						demand_type:this.demand_type.join(','),
						status:this.status_id,
						select_userid:this.select_userid.join(','),
						select_main_dept_id:this.select_main_dept_id.join(','),
						shop_code:this.shop_code.join(','),
						supplier_id:this.supplier_ids.join(','),
						category_id:this.category_ids.join(','),
						market_id:this.market_ids.join(','),
						classification_id:this.classification_ids.join(','),
						shooting_id:this.shooting_style_ids.join(','),
						send_type:this.send_type.join(','),
						start_time:this.date && this.date.length > 0?this.date[0]:"",
						end_time:this.date && this.date.length > 0?this.date[1]:"",
						i_id:this.i_id,
					};
					resource.deriveSelected(arg).then((res) => {
						if (res) {
							exportPost("\ufeff" + res.data, "已选商品");
						}
					});
				})
				.catch(() => {
					Message({
						type: "info",
						message: "取消导出",
					});
				});
			},
			//提交拒绝
			confirmRefused(){
				if(this.audit_type == '1'){		//同意
					if(this.msg == ''){
						this.$message.warning('请输入同意备注');
					}else{
						let arg = {
							select_id:this.select_id,
							msg:this.msg
						}
						//同意
						this.agreeAudit(arg)
					}
				}else{
					if(this.err_msg == ''){
						this.$message.warning('请输入拒绝原因');
					}else{
						let arg = {
							select_id:this.select_id,
							err_msg:this.err_msg
						}
						//拒绝
						this.refuseAudit(arg)
					}
				}
			},
			//点击编辑
			editInfo(select_id,i_id,bd_i_id,supplier_ksbm){
				this.edit_arg.select_id = select_id;
				this.edit_arg.i_id = i_id?i_id.replaceAll(",", ";"):"";
				this.edit_arg.bd_i_id = bd_i_id?bd_i_id.replaceAll(",", ";"):'';
				this.edit_arg.supplier_ksbm = supplier_ksbm?supplier_ksbm.replaceAll(",", ";"):'';
				this.edit_dialog = true;
			},
			//关闭编辑
			closeEdit(){
				this.edit_arg = {
					select_id:"",
					supplier_ksbm:"",
					i_id:"",
					bd_i_id:""
				}
			},
			//提交编辑
			commitEdit(){
				if (this.edit_arg.supplier_ksbm.indexOf(";") > -1) {
					this.edit_arg.supplier_ksbm = this.edit_arg.supplier_ksbm.replaceAll(";", ",");
				}
				if (this.edit_arg.i_id.indexOf(";") > -1) {
					this.edit_arg.i_id = this.edit_arg.i_id.replaceAll(";", ",");
				}
				if (this.edit_arg.bd_i_id.indexOf(";") > -1) {
					this.edit_arg.bd_i_id = this.edit_arg.bd_i_id.replaceAll(";", ",");
				}
				resource.examineEditIid(this.edit_arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
						this.edit_dialog = false;
						//获取列表
						this.getGoodsList();
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			windowOpen(url,old_url){
				if(!old_url || old_url.indexOf('https://pan.baidu.com') == -1){
					this.$message.warning('该地址不是网盘地址格式!')
				}else{
					window.open(url)
				}
			}
		},
		components:{
			TableTitle,
			PaginationWidget
		}
	}
</script>






