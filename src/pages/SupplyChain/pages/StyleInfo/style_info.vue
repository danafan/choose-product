<template>
	<div class="height-100">
		<el-card class="card_box height-100" id="card_box">
			<div class="scroll_box flex-1 flex-scroll-y" id="scroll_box">
				<el-form style="padding-top: 20px;" :inline="true" size="mini" id="form_height">
					<el-form-item label="供应商：">
						<el-select v-model="supplier_ids" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in supplier_list" :key="item.supplier_id" :label="item.supplier_name" :value="item.supplier_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="类目：">
						<el-select v-model="category_ids" style="width: 160px;" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in cate_list" :key="item.category_id" :label="item.category_name" :value="item.category_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="拍摄风格：">
						<el-select v-model="shooting_style_ids" style="width: 160px;" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in style_list" :key="item.shooting_style_id" :label="item.shooting_style_name" :value="item.shooting_style_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="市场：">
						<el-select v-model="market_ids" style="width: 160px;" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in market_list" :key="item.market_id" :label="item.market_name" :value="item.market_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="分类：">
						<el-select v-model="classification_ids" style="width: 160px;" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in class_list" :key="item.classification_id" :label="item.classification_name" :value="item.classification_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="审核状态：">
						<el-select v-model="check_status_id" style="width: 160px;" clearable placeholder="全部">
							<el-option v-for="item in check_status_list" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上新日期：">
						<div @click.once="changeInitCalendarPage">
							<el-date-picker v-model="date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
							</el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="对接人：">
						<el-select v-model="maintainer_ids" style="width: 160px;" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in maintainer_list" :key="item.maintainer_id" :label="item.maintainer" :value="item.maintainer_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="白坯二开类型：">
						<el-select v-model="supplier_type" style="width: 160px;" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option label="内部" :value="1"></el-option>
							<el-option label="外部" :value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="季节：">
						<el-select v-model="season_ids" style="width: 160px;" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in season_list" :key="item.season_id" :label="item.season_name" :value="item.season_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="款号/款式编码：">
						<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="输入款号/款式编码搜索" v-model="search">
						</el-input>
					</el-form-item>
					<el-form-item class="form_item">
						<el-button type="primary" @click="checkPage(1)">查询</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<TableTitle title="数据列表" id="table_title">
					<el-button size="mini" type="primary" v-if="button_list.edit_i_id == 1" @click="importFn('1')">修改款式编码</el-button>
					<el-button size="mini" type="primary" v-if="is_check == 1 && button_list.agree_refuse == 1" @click="allSetting('audit_1')">批量同意</el-button>
					<el-button size="mini" type="primary" v-if="is_check == 1 && button_list.agree_refuse == 1" @click="allSetting('audit_2')">批量拒绝</el-button>
					<el-button size="mini" type="primary" @click="editFn('','添加商品','1')" v-if="button_list.add == 1">添加</el-button>
					<el-button size="mini" type="primary" @click="importFn('2')" v-if="button_list.add == 1">导入</el-button>
					<el-button size="mini" type="primary" @click="export_dialog = true">导出</el-button>
					<el-dropdown style="margin-left: 10px;" size="small" @command="allSetting">
						<el-button  type="primary" size="mini">
							批量操作<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="4" v-if="button_list.del == 1">批量维护季节</el-dropdown-item>
							<el-dropdown-item command="1" v-if="button_list.in_out == 1">批量上架</el-dropdown-item>
							<el-dropdown-item command="0" v-if="button_list.in_out == 1">批量下架</el-dropdown-item>
							<el-dropdown-item command="3" v-if="button_list.del == 1">批量删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</TableTitle>
				<el-table ref="table" size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" @selection-change="handleSelectionChange" v-loading="loading">
					<el-table-column type="selection" width="55" fixed>
					</el-table-column>
					<el-table-column label="标题" prop="title"></el-table-column>
					<el-table-column label="供应商款号" prop="style_name"></el-table-column>
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
					<el-table-column label="拍摄风格" width="180" >
						<template slot-scope="scope">
							<div v-if="!loading">
								<el-tabs size="mini" v-model="scope.row.active_index" @tab-click="handleClick($event,scope.$index)">
									<el-tab-pane :label="item.shooting_style_name" :name="index.toString()" v-for="(item,index) in scope.row.shooting_style_list"></el-tab-pane>
								</el-tabs>
								<div :style="{'width':'100%','height':scope.row.style_loading?'100px':'0px'}" v-loading="scope.row.style_loading"></div>
								<div v-if="scope.row.shooting_style_list[parseInt(scope.row.active_index)].img.length == 0 && !scope.row.style_loading">暂无</div>
								<el-carousel trigger="hover" indicator-position="none" :autoplay="false" height="100px" v-if="scope.row.shooting_style_list[parseInt(scope.row.active_index)].img.length > 0 && !scope.row.style_loading">
									<el-carousel-item v-for="(item,index) in scope.row.shooting_style_list[parseInt(scope.row.active_index)].img" :key="item">
										<el-image :z-index="2006" class="image" :src="domain + item" fit="scale-down" @click="viewImage(scope.row.shooting_style_list,scope.row.active_index,index)"></el-image>
									</el-carousel-item>
								</el-carousel>
							</div>
							
						</template>
					</el-table-column>
					<el-table-column label="网盘地址">
						<template slot-scope="scope">
							<el-button class="pre_wrap" size="small" type="text" @click="windowOpen(scope.row.net_disk_address,scope.row.or_net_disk_address)" v-if="scope.row.or_net_disk_address !== ''">访问链接</el-button>
							<div v-else></div>
						</template>
					</el-table-column>
					<el-table-column label="成本价" prop="cost_price" width="150">
						<template slot-scope="scope">
							<div>{{scope.row.price_status == '1'?'原成本价：':''}}{{scope.row.cost_price}}</div>
							<div v-if="scope.row.price_status == '1'">调后成本价：{{scope.row.edit_price}}</div>
						</template>
					</el-table-column>
					<el-table-column label="控价" prop="price_control"></el-table-column>
					<el-table-column label="颜色" prop="color"></el-table-column>
					<el-table-column label="尺码" prop="size"></el-table-column>
					<el-table-column label="面料" width="120" show-overflow-tooltip prop="fabric"></el-table-column>
					<el-table-column label="市场" prop="market"></el-table-column>
					<el-table-column label="供应商" prop="supplier"></el-table-column>
					<el-table-column label="提供拍照" prop="common_text">
						<template slot-scope="scope">
							<div>{{scope.row.photograph == 1?'是':'否'}}</div>
						</template>
					</el-table-column>
					<el-table-column label="类目" prop="category"></el-table-column>
					<el-table-column label="分类" prop="classification"></el-table-column>
					<el-table-column label="合作模式" prop="mode"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="上新时间" width="160" prop="style_new_time"></el-table-column>
					<el-table-column label="审核状态" prop="common_text">
						<template slot-scope="scope">
							<div v-if="scope.row.check_status == 1">上架待审核</div>
							<div v-if="scope.row.check_status == 2">已上架</div>
							<div v-if="scope.row.check_status == 3">拒绝上架</div>
							<div v-if="scope.row.check_status == 4">下架待审核</div>
							<div v-if="scope.row.check_status == 5">已下架</div>
							<div v-if="scope.row.check_status == 6">拒绝下架</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="180" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small" v-if="(scope.row.check_status == 1 || scope.row.check_status == 4) && button_list.agree_refuse == 1 && scope.row.is_enable == 1" @click="editFn(scope.row.goods_id,'审核商品','4')">审核</el-button>
							<el-button type="text" size="small" v-if="(scope.row.check_status == 2 || scope.row.check_status == 6) && button_list.in_out == 1" @click="checkStatus(scope.row.goods_id,scope.row.check_status)">下架</el-button>
							<el-button type="text" size="small" v-if="scope.row.check_status == 5 && button_list.in_out == 1 && scope.row.is_enable == 1" @click="checkStatus(scope.row.goods_id,scope.row.check_status)">上架</el-button>
							<el-button size="small" type="text" @click="adjustAudit(scope.row.style_id,scope.row.cost_price,scope.row.edit_price)" v-if="scope.row.price_status == '1' && button_list.price_btn == 1">调价审批</el-button>
							<el-button style="margin-right: 10px" type="text" size="small" v-if="((scope.row.check_status != 3 && scope.row.check_status != 5) || ((scope.row.check_status == 3 || scope.row.check_status == 5) && scope.row.is_enable == 0)) && button_list.edit == 1" @click="editFn(scope.row.goods_id,'编辑商品','2')">编辑</el-button>
							<el-button type="text" size="small" v-if="(scope.row.check_status == 3 || scope.row.check_status == 5) && button_list.reset == 1 && scope.row.is_enable == 1"  @click="editFn(scope.row.goods_id,'重新提交','5')">重新提交</el-button>
							<el-dropdown style="margin-left: 10px;" size="small" @command="handleCommand($event,scope.row.goods_id,scope.row.style_name)" v-if="scope.row.check_status != 1 && scope.row.check_status != 4 && (button_list.info == 1 || button_list.del == 1)">
								<el-button type="text" size="small">
									更多<i class="el-icon-arrow-down el-icon--right"></i>
								</el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="1" v-if="button_list.info == 1">查看</el-dropdown-item>
									<el-dropdown-item command="3" v-if="(scope.row.check_status == 3 || scope.row.check_status == 5) && button_list.del == 1">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<PaginationWidget :total="total" :page="page" :multiple_selection_num="multiple_selection.length" :pagesize="100" @checkPage="checkPage"/>
		</el-card>
		<!-- 导入 -->
		<el-dialog :visible.sync="import_dialog" width="30%">
			<div slot="title" class="dialog_title">
				<div class="flex ac">
					<div>导入</div>
					<div style="font-size: 12px;color: #F37605;">（文件大小不超过400M）</div>
				</div>
				<img class="close_icon" src="../../../../static/close_icon.png" @click="import_dialog = false">
			</div>
			<div class="down_box">
				<el-button type="primary" plain size="small" @click="downTemplate">下载模版<i class="el-icon-download el-icon--right"></i></el-button>
				<div class="upload_box">
					<el-button type="primary" size="small">
						导入
						<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<input type="file" ref="csvUpload" class="upload_file" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="uploadCsv">
				</div>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="small" @click="import_dialog = false">取消</el-button>
			</div>
		</el-dialog>
		<!-- 下架弹窗 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close @close="off_reason = ''" :visible.sync="delist_dialog" width="30%">
			<div slot="title" class="dialog_title">
				<div>{{off_title}}</div>
				<img class="close_icon" src="../../../../static/close_icon.png" @click="delist_dialog = false">
			</div>
			<div class="remark_content">
				<el-input
				type="textarea"
				autosize
				placeholder="请输入下架原因（必填）"
				v-model="off_reason">
			</el-input>
		</div>
		<div slot="footer" class="dialog_footer">
			<el-button size="mini" @click="delist_dialog = false">取消</el-button>
			<el-button size="mini" type="primary" @click="clickDelist">确认</el-button>
		</div>
	</el-dialog>
	<!-- 图片放大 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close :visible.sync="view_dialog">
		<div class="remark_content">
			<div class="flex jsb">
				<el-tabs size="mini" v-model="view_active_index" @tab-click="handleViewClick">
					<el-tab-pane :label="item.shooting_style_name" :name="index.toString()" v-for="(item,index) in view_shooting_style_list"></el-tab-pane>
				</el-tabs>
				<img class="close_icon view_close_icon" src="../../../../static/close_icon.png" @click="view_dialog = false">
			</div>
			<div class="primary_color mb15" v-if="view_shooting_style_list.length > 0">上新时间：{{view_shooting_style_list[parseInt(view_active_index)].style_new_time}}</div>
			<el-carousel style="width: 100%;height: 310px;" trigger="hover" indicator-position="none" :autoplay="false" :initial-index="default_img_index" v-if="view_shooting_style_list.length > 0">
				<el-carousel-item v-for="item in view_shooting_style_list[parseInt(view_active_index)].view_img" :key="item">
					<el-image :z-index="2999" class="view_image" :src="item" fit="scale-down" :preview-src-list="view_shooting_style_list[parseInt(view_active_index)].view_img"></el-image>
				</el-carousel-item>
			</el-carousel>
			<div v-else>暂无</div>
		</div>
		<div slot="footer" class="dialog_footer">
			<el-button size="mini" type="primary" @click="view_dialog = false">关闭</el-button>
		</div>
	</el-dialog>
	<!-- 编辑/重新提交弹窗 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="65%" top="15px" :visible.sync="edit_dialog">
		<div slot="title" class="dialog_title">
			<div>{{edit_dialog_title}}</div>
			<img class="close_icon" src="../../../../static/close_icon.png" @click="edit_dialog = false">
		</div>
		<div class="remark_content">
			<el-form size="small" label-width="165px" v-if="goods_type == '1'">
				<el-form-item label="获取52电商资料：">
					<el-button type="text" @click="getInfoDialog = true">点击获取</el-button>
				</el-form-item>
			</el-form>
			<EditGoods ref="editGoods" v-if="edit_dialog" :edit_goods_id="goods_id" :goods_type="goods_type" @callBack="editCallBack" @setInfo="setInfo"/>
		</div>
		<el-dialog width="30%" :visible.sync="getInfoDialog" append-to-body>
			<div slot="title" class="dialog_title">
				<div>获取资料</div>
				<img class="close_icon" src="../../../../static/close_icon.png" @click="getInfoDialog = false">
			</div>
			<div class="remark_content">
				<el-form size="small" label-width="80px">
					<el-form-item label="链接：" required>
						<el-input placeholder="请输入链接" v-model="url">
						</el-input>
					</el-form-item>
					<el-form-item label="风格：" required>
						<el-select v-model="selected_style" filterable placeholder="请选择">
							<el-option
							v-for="item in style_table_data"
							:key="item.shooting_style_id"
							:label="item.shooting_style_name"
							:value="item.shooting_style_id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</div>
		<div slot="footer" class="dialog_footer">
			<el-button size="small" @click="getInfoDialog = false">取消</el-button>
			<el-button size="small" type="primary" :loading="get_info_loading" @click="getHtmlGoods">确定</el-button>
		</div>
	</el-dialog>
	<div slot="footer" class="dialog_footer" v-if="goods_type == '3'">
		<el-button size="small" @click="edit_dialog = false">关闭</el-button>
	</div>
</el-dialog>
<!-- 导出 -->
<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close @close="export_type = 1" :visible.sync="export_dialog" width="30%">
	<div slot="title" class="dialog_title">
		<div>导出</div>
		<img class="close_icon" src="../../../../static/close_icon.png" @click="export_dialog = false">
	</div>
	<div class="remark_content">
		<el-radio-group size="small" v-model="export_type">
			<el-radio :label="1">款式资料</el-radio>
			<el-radio :label="2">风格资料</el-radio>
		</el-radio-group>
	</div>
	<div slot="footer" class="dialog_footer">
		<el-button size="mini" @click="export_dialog = false">取消</el-button>
		<el-button size="mini" type="primary" @click="exportFn">确认</el-button>
	</div>
</el-dialog>
<!-- 维护季节 -->
<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close @close="season_id = ''" :visible.sync="season_dialog" width="30%">
	<div slot="title" class="dialog_title">
		<div>批量维护季节</div>
		<img class="close_icon" src="../../../../static/close_icon.png" @click="season_dialog = false">
	</div>
	<div class="remark_content">
		<el-form size="small" label-width="80px">
			<el-form-item label="提示：">
				<div>确认批量维护{{multiple_selection.length}}个款式季节吗？</div>
			</el-form-item>
			<el-form-item label="修改为：" required>
				<el-select v-model="season_id" clearable filterable placeholder="请选择">
					<el-option v-for="item in season_list" :key="item.season_id" :label="item.season_name" :value="item.season_id">
					</el-option>
				</el-select>
			</el-form-item>
	</el-form>
</div>
<div slot="footer" class="dialog_footer">
	<el-button size="mini" @click="season_dialog = false">取消</el-button>
	<el-button size="mini" type="primary" @click="editSeason">确认</el-button>
</div>
</el-dialog>
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
	.import_loading{
		z-index: 9999!important;
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
	.view_close_icon{
		position: absolute;
		right: 18px;
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
	.remark_content{
		padding:20rem;
	}
	.view_image{
		width: 100%;
		height: 320px;
	}
	.mb15{
		margin-bottom: 15rem;
	}
</style>
<script>
	import commonResource from '../../../../api/common_resource.js'
	import resource from '../../../../api/chain_resource.js'
	import { getNowDate,getCurrentDate } from "../../../../api/date.js";

	import { exportPost } from "../../../../api/export.js";

	import { MessageBox, Message } from "element-ui";

	import TableTitle from '../../components/table_title.vue'
	import PaginationWidget from '../../../../components/pagination_widget.vue'
	import EditGoods from '../GoodsPages/edit_goods.vue'
	export default{
		data(){
			return{
				is_up:false,
				loading:false,
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
				check_status_list:[
				{
					name:'上架待审核',
					id:1
				},{
					name:'审核通过(已上架)',
					id:2
				},{
					name:'上架审核拒绝',
					id:3
				},{
					name:'下架待审核',
					id:4
				},{
					name:'下架审核通过(已下架)',
					id:5
				},{
					name:'下架审核拒绝',
					id:6
				}],	//审核状态列表
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
				maintainer_list:[],
				maintainer_ids:[],			//对接人
				supplier_type:[],			//白坯二开类型
				season_list:[],				//季节列表
				season_ids:[],				//选中的季节
				max_height:0,	
				page:1,
				data:[],				//获取的数据
				total:0,
				button_list:{},
				import_dialog:false,	//导入或批量修改弹窗
				import_type:"1",		//导入弹窗类型
				multiple_selection:[],
				is_check:0,				//1:展示批量审核；0：不展示
				style_id:"",				//点击的款式ID
				goods_id:"",
				cost_price:"",
				edit_price:"",
				adjust_dialog:false,		//调价审批
				adjust_type:1,				//调价审批选中的状态
				refuse_reason:"",			//拒绝原因
				delist_dialog:false,		//下架弹窗
				off_reason:"",				//下架原因
				view_dialog:false,			//放大图片弹窗
				view_active_index:'0',		//图片放大顶部标签的选中下标
				default_img_index:0,		//图片放大默认图片下标
				view_shooting_style_list:[],//放大图片列表
				edit_dialog:false,			//编辑/重新提交弹窗
				edit_dialog_title:"",		//编辑/重新提交标题
				goods_type:'',				//类型
				off_title:'确认下架？',		//下架弹窗标题
				export_dialog:false,		//导出弹窗
				export_type:1,				//导出类型（1:款式资料；2:风格资料）
				getInfoDialog:false,		//获取风格弹窗
				html_data:null,				//获取的数据
				url:"",						//输入的链接
				show_style:false,			//选择风格下拉框
				style_table_data:[],		//可选的列表
				selected_style:"",			//已选中的风格ID
				get_info_loading:false,		//获取数据按钮加载状态
				season_dialog:false,		//批量维护季节
				season_id:"",				//选中的季节
			}
		},
		created(){
			//获取用户列表
			this.ajaxSupplierMaintainer();
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
			//获取季节列表
			this.ajaxSeasonList();
			//获取列表
			this.getGoodsList();
		},
		props:{
			//修改记录审核后更新的goods_id
			goods_ids:{
				type:String,
			default:''
			},
		},
		mounted() {
    		//获取表格最大高度
			this.onResize();
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
		},
		watch:{
			search:function(){
				//获取表格最大高度
				this.onResize();
			},
			is_up:function(n,o){
    			//获取表格最大高度
				this.onResize();
			},
			//修改记录审核后更新的goods_id
			goods_ids:function(n,o){
				this.getRefreshInfo(n);
			},
		},
		methods: {
			//将日期筛选改为默认上月到当前月
			changeInitCalendarPage() {
				let nodeList = document.querySelectorAll("button.el-picker-panel__icon-btn.el-icon-arrow-left");
				nodeList[0].click()
				setTimeout(() => {
					nodeList[1].click()
				},10);
			},
    		//监听屏幕大小变化
			onResize() {
				this.$nextTick(() => {
					let card_box_height = document.getElementById("scroll_box").offsetHeight;
					let form_height = document.getElementById("form_height").offsetHeight;
					this.max_height = card_box_height - form_height + 70 + "px";
				});
			},
			//供应商维护人
			ajaxSupplierMaintainer(){
				commonResource.ajaxSupplierMaintainer().then(res => {
					if(res.data.code == 1){
						this.maintainer_list = res.data.data;
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
						this.style_table_data = res.data.data;
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
			//获取季节列表
			ajaxSeasonList(){
				commonResource.ajaxSeasonList().then(res => {
					if(res.data.code == 1){
						this.season_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击批量编辑或导入
			importFn(type){
				this.import_type = type;
				this.import_dialog = true;
				
			},
			//下载模版
			downTemplate(){
				if(this.import_type == '1'){
					window.open(`${this.downLoadUrl}/file/批量更新款式编码模板.xlsx`);
				}else{
					window.open(`${this.downLoadUrl}/file/商品批量导入模板.xlsx`);
				}
			},
			//导入
			uploadCsv(){
				if (this.$refs.csvUpload.files.length > 0) {
					let files = this.$refs.csvUpload.files;
					const loading = this.$loading({
						lock: true,
						text: '正在导入，请稍候...',
						spinner: 'el-icon-loading',
						customClass:'import_loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					if(this.import_type == '1'){	//批量修改
						resource.editGoodsIid({file:files[0]}).then(res => {
							this.$refs.csvUpload.value = null;
							this.import_dialog = false;
							loading.close();
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.page = 1;
								//获取列表
								this.getGoodsList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}else{	//导入
						resource.addAllProductStyle({file:files[0]}).then(res => {
							this.$refs.csvUpload.value = null;
							this.import_dialog = false;
							loading.close();
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.page = 1;
								//获取列表
								this.getGoodsList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
					
				}
			},
			//导出
			exportFn() {
				let arg = {
					supplier_id:this.supplier_ids.join(','),
					category_id:this.category_ids.join(','),
					market_id:this.market_ids.join(','),
					classification_id:this.classification_ids.join(','),
					shooting_id:this.shooting_style_ids.join(','),
					start_time:this.date && this.date.length > 0?this.date[0]:"",
					end_time:this.date && this.date.length > 0?this.date[1]:"",
					check_status:this.check_status_id,
					maintainer:this.maintainer_ids.join(','),
					supplier_type:this.supplier_type.join(','),
					season_id:this.season_ids.join(','),
					export_type:this.export_type
				}
				if(this.multiple_selection.length > 0){
					let goods_ids = this.multiple_selection.map(item => {
						return item.goods_id
					})
					arg['goods_ids'] = goods_ids.join(',');
				}
				let search = JSON.parse(JSON.stringify(this.search));
				if(search.indexOf("\n") > -1 || search.indexOf(" ") > -1 || search.indexOf("+") > -1){
					if (search.indexOf("\n") > -1) {
						search = search.replaceAll("\n", ",");
					}
					if (search.indexOf(" ") > -1) {
						search = search.replaceAll(" ", ",");
					}
					if (search.indexOf("+") > -1) {
						search = search.replaceAll("+", "%2B");
					}
				}
				
				arg.search = search;

				resource.styleInfoExport(arg).then((res) => {
					if (res) {
						exportPost(res.data, `${this.export_type == 1?'款式资料数据':'风格资料数据'}`,true);
					}
				});
			},
			//获取列表
			getGoodsList(){
				let arg = {
					supplier_id:this.supplier_ids.join(','),
					category_id:this.category_ids.join(','),
					market_id:this.market_ids.join(','),
					classification_id:this.classification_ids.join(','),
					shooting_id:this.shooting_style_ids.join(','),
					start_time:this.date && this.date.length > 0?this.date[0]:"",
					end_time:this.date && this.date.length > 0?this.date[1]:"",
					check_status:this.check_status_id,
					maintainer:this.maintainer_ids.join(','),
					supplier_type:this.supplier_type.join(','),
					season_id:this.season_ids.join(','),
					page:this.page,
					pagesize:100
				}
				let search = JSON.parse(JSON.stringify(this.search));
				if(search.indexOf("\n") > -1 || search.indexOf(" ") > -1 || search.indexOf("+") > -1){
					if (search.indexOf("\n") > -1) {
						search = search.replaceAll("\n", ",");
					}
					if (search.indexOf(" ") > -1) {
						search = search.replaceAll(" ", ",");
					}
					if (search.indexOf("+") > -1) {
						search = search.replaceAll("+", "%2B");
					}
				}
				arg.search = search;

				this.loading = true;
				resource.getGoodsList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.button_list = res.data.data.button_list;
						this.total = res.data.data.total;
						let data = res.data.data.data;
						this.is_check = res.data.data.check;
						data.map(item => {
							item['active_index'] = '0';
							item['style_loading'] = false;
							
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
						this.$nextTick(() => {
							this.$refs.table.bodyWrapper.scrollTop = 0;
						});
						
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
			//切换多选
			handleSelectionChange(val) {
				this.multiple_selection = val;
			},
			//批量操作
			allSetting(type){
				let title = "";			//提示标题
				let total_num = this.multiple_selection.length;	//选中的总数
				let unset_num = 0;	//不能操作的数量
				let style_id = [];
				if(total_num == 0){
					this.$message.warning('至少选择一条！');
					return;
				}

				if(type == '0'){	//下架
					title = '确认下架？'
					let unset_list = this.multiple_selection.filter(item => {
						return item.check_status == 2 || item.check_status == 6;
					})
					unset_list.map(item => {
						style_id.push(item.goods_id)
					})
					unset_num = total_num - unset_list.length;
				}else if(type == '1'){	//上架
					title = '确认上架？'
					let unset_list = this.multiple_selection.filter(item => {
						return item.check_status == 5;
					})
					unset_list.map(item => {
						style_id.push(item.goods_id)
					})
					unset_num = total_num - unset_list.length;
				}
				// else if(type == '2'){	//对接推单
				// 	title = '确认对接推单？'
				// 	this.multiple_selection.map(item => {
				// 		style_id.push(item.goods_id)
				// 	})
				// 	unset_num = 0;
				// }
				else if(type == '3'){	//删除
					title = '确认批量删除？'
					let unset_list = this.multiple_selection.filter(item => {
						return item.check_status == 3 || item.check_status == 5;
					})
					unset_list.map(item => {
						style_id.push(item.goods_id)
					})
					unset_num = total_num - unset_list.length;
				}else if(type == '4'){	//维护季节
					this.multiple_selection.map(item => {
						style_id.push(item.goods_id)
					})
					unset_num = 0;
				}else if(type.indexOf('audit') > -1){	//批量审批
					title = `确认批量${type.split('_')[1] == 1?'同意':'拒绝'}？`;
					let unset_list = this.multiple_selection.filter(item => {
						return item.is_enable == 1;
					})
					unset_list.map(item => {
						style_id.push(item.goods_id)
					})
					unset_num = total_num - unset_list.length;
				}
				
				if(total_num == unset_num){
					this.$message.warning('没有符合操作条件的记录！');
					return;
				}
				if(type == '0'){	//下架
					this.off_title = `您选择了${total_num}项，其中不可操作${unset_num}项，${title}`;
					this.goods_id = style_id.join(',');
					this.delist_dialog = true;
					return;
				}
				if(type == '4'){	//维护季节
					this.goods_id = style_id.join(',');
					this.season_dialog = true;
					return;
				}

				this.$confirm(`您选择了${total_num}项，其中不可操作${unset_num}项，${title}`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(type == '1'){	//上架
						let arg = {
							goods_id:style_id.join(','),
							type:type
						}
						resource.checkStatus(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								//获取列表
								this.getGoodsList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
					// else if(type == '2'){	//对接推单
					// 	let arg = {
					// 		goods_id:style_id.join(','),
					// 		type:1
					// 	}
					// 	resource.setAbutmentType(arg).then(res => {
					// 		if(res.data.code == 1){
					// 			this.$message.success(res.data.msg);
					// 			//获取列表
					// 			this.getGoodsList();
					// 		}else{
					// 			this.$message.warning(res.data.msg);
					// 		}
					// 	})
					// }
					else if(type == '3'){	//删除
						let arg = {
							goods_id:style_id.join(',')
						}
						resource.delGoods(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								//获取列表
								this.getGoodsList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}else if(type.indexOf('audit') > -1){	//批量审核
						let arg = {
							goods_id:style_id.join(','),
							type:type.split('_')[1]
						}
						resource.auditGoods(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								//获取列表
								this.getGoodsList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});          
				});
			},
			//切换风格图展示
			handleClick(event,index){
				let current_row = JSON.parse(JSON.stringify(this.data[index]));
				let style_id = current_row.shooting_style_list[event.index].style_id;
				current_row.style_loading = true;
				this.$set(this.data,index,current_row);
				resource.getStyleImgs({style_id:style_id}).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						current_row.shooting_style_list[event.index].img = res.data.data;
						current_row.active_index = event.index.toString();
						current_row.style_loading = false;
						this.$set(this.data,index,current_row);
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//放大弹窗切换图片
			handleViewClick(e){
				let style_id = this.view_shooting_style_list[e.index].style_id;
				resource.getStyleImgs({style_id:style_id}).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						let current_info = JSON.parse(JSON.stringify(this.view_shooting_style_list[e.index]));
						let view_img = [];
						data.map(item => {
							view_img.push(this.domain + item)
						})
						current_info.view_img = view_img;
						this.view_active_index = e.index.toString();
						this.$set(this.view_shooting_style_list,e.index,current_info);
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击放大查看图片
			viewImage(shooting_style_list,active_index,default_img_index){
				this.view_active_index = active_index.toString();
				this.default_img_index = default_img_index;
				shooting_style_list.map(item => {
					item['view_img'] = [];
					item.img.map(img_item => {
						item.view_img.push(this.domain + img_item);
					})
				})
				this.view_shooting_style_list = shooting_style_list;
				this.view_dialog = true;
			},
			//监听更多操作按钮
			handleCommand(e,id,name){
				if(e == '1'){	//查看
					this.editFn(id,'商品详情','3')
				}else if(e == '3'){	//删除
					this.$confirm(`确认删除?`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let arg = {
							goods_id:id
						}
						resource.delGoods(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								//获取列表
								this.getGoodsList();
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
				}
			},
			//切换上架或下架
			checkStatus(goods_id,type){
				this.goods_id = goods_id;
				if(type == 5){		//上架
					this.$confirm(`确认上架`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let arg = {
							goods_id:this.goods_id,
							type:1
						}
						//提交上下架
						this.confirmDelist(arg);
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});          
					});
				}else{				//下架
					this.off_title = '确认下架？';
					this.delist_dialog = true;
				}	
			},
			//批量维护季节
			editSeason(){
				if(this.season_id == ''){
					this.$message.warning('请选择需要维护的季节!');
					return;
				}
				let arg = {
					goods_ids:this.goods_id,
					season_id:this.season_id
				}
				resource.allEditSeason(arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
								//获取列表
						this.getGoodsList();
						this.season_dialog = false;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击下架
			clickDelist(){
				if(this.off_reason == ''){
					this.$message.warning('请输入下架原因!');
					return;
				}
				let arg = {
					goods_id:this.goods_id,
					type:0,
					off_reason:this.off_reason
				}
				//提交上下架
				this.confirmDelist(arg);
			},
			//提交上下架
			confirmDelist(arg){
				resource.checkStatus(arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
								//获取列表
						this.getGoodsList();
						this.delist_dialog = false;
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
			},
			//点击添加、编辑、重新提交、审核、查看
			editFn(goods_id,edit_dialog_title,goods_type){
				this.edit_dialog_title = edit_dialog_title;
				this.goods_id = goods_id.toString();
				this.goods_type = goods_type;
				if(this.goods_type == '1'){
					this.style_table_data = this.style_list;
				}
				this.edit_dialog = true;
			},
			//编辑和重新提交之后的回调
			editCallBack(){
				this.edit_dialog = false;
				//获取更新后的商品信息
				this.getRefreshInfo(this.goods_id);
			},
			//获取更新后的商品信息
			getRefreshInfo(goods_ids){
				if(goods_ids == ''){	//添加，刷新列表
					//获取列表
					this.getGoodsList();
					return;
				}
				//编辑、重新提交、审核、查看
				resource.getRefreshInfo({goods_ids:goods_ids}).then(res => {
					if(res.data.code == 1){
						let update_data = res.data.data;
						update_data.map(item => {
							let ele_index = this.data.findIndex(i => {
								return item.goods_id == i.goods_id;
							})
							item['active_index'] = '0';
							item['style_loading'] = false;
							
							if(item.i_id){
								item.new_i_id = item.i_id.split(',')
							}
							if(item.bd_i_id){
								item.new_bd_i_id = item.bd_i_id.split(',')
							}
							if(item.supplier_ksbm){
								item.new_supplier_ksbm = item.supplier_ksbm.split(',')
							}
							if(ele_index >= 0){
								this.$set(this.data,ele_index,item)
							}
						})
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取信息
			getHtmlGoods(){
				if(this.url == ''){
					this.$message.warning('请输入链接');
					return;
				}
				if(this.selected_style == ""){
					this.$message.warning('请选择风格');
					return;
				}
				this.get_info_loading = true;
				commonResource.getHtmlGoods({url:this.url}).then(res => {
					this.get_info_loading = false;
					if(res.data.code == 1){
						this.html_data = res.data.data;
						
						let arg = this.$refs.editGoods.arg;
						for(let a_k in arg){
							for(let k in this.html_data){
								if(a_k == k){
									arg[a_k] = this.html_data[k]
								}
							}
						}
						this.$refs.editGoods.selected_style.push(this.selected_style);

						//拍摄风格
						let shooting_style_name = "";
						this.style_list.map(item => {
							if(this.selected_style == item.shooting_style_id){
								shooting_style_name = item.shooting_style_name
							}
						})
						let style_card_item = {
							shooting_style_id:this.selected_style,
							shooting_style_name:shooting_style_name,
							image_arr:this.html_data.images
						}
						this.$refs.editGoods.setStyleFn(style_card_item);
						//清除数据
						this.clearForm();
						this.getInfoDialog = false;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//同步可选的风格列表
			setInfo(style_table_data){
				this.style_table_data = style_table_data;
			},
			//清除数据
			clearForm(){
				this.show_style = false;
				this.html_data = null;
				this.url = "";					//输入的链接
				this.selected_style = "";			//已选中的风格ID
			}
		},
		components:{
			TableTitle,
			PaginationWidget,
			EditGoods
		}
	}
</script>






