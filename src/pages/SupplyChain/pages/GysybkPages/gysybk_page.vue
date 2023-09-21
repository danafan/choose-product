<template>
	<div class="height-100">
		<el-card class="card_box height-100" id="card_box">
			<div class="scroll_box flex-1 flex-scroll-y" id="scroll_box">
				<el-form style="padding-top: 20px;" :inline="true" size="mini" id="form_height">
					<el-form-item label="供应商名称：">
						<el-input clearable v-model="supplier_name" placeholder="名称/简称"></el-input>
					</el-form-item>
					<el-form-item label="开发员：">
						<el-select v-model="developer" clearable filterable placeholder="全部">
							<el-option v-for="item in user_list" :key="item.user_id" :label="item.real_name" :value="item.real_name">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="分类：">
						<el-select v-model="classification" clearable placeholder="全部">
							<el-option :label="item.name" :value="item.id" v-for="item in classification_list"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="区域：">
						<el-select v-model="area" clearable placeholder="全部">
							<el-option :label="item" :value="item" v-for="item in area_list"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="主营：">
						<el-select v-model="main_business" filterable clearable placeholder="全部">
							<el-option :label="item.name" :value="item.id" v-for="item in main_business_list"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="擅长品类：">
						<el-select v-model="scpl" filterable clearable placeholder="全部">
							<el-option :label="item.name" :value="item.id" v-for="item in scpl_list"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否自有工厂：">
						<el-select v-model="supply_free_factory" clearable placeholder="全部">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否自有设计能力：">
						<el-select v-model="supply_design" clearable placeholder="全部">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="结算方式：">
						<el-select v-model="settlement_method" clearable placeholder="全部">
							<el-option :label="item.name" :value="item.id" v-for="item in settlement_method_list"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="产品价位段：">
						<el-input style="width: 50px;" size="mini" type="number" v-model="start_price"></el-input>&nbsp~&nbsp
						<el-input style="width: 50px;" size="mini" type="number" v-model="end_price"></el-input>
					</el-form-item>
					<el-form-item label="是否可退货：">
						<el-select v-model="supply_return_goods" clearable placeholder="全部">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否可换货：">
						<el-select v-model="supply_exchange_goods" clearable placeholder="全部">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否可代发：">
						<el-select v-model="supply_replace_send" clearable placeholder="全部">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="性价比：">
						<el-select v-model="cost_performance" clearable placeholder="全部">
							<el-option :label="item.name" :value="item.id" v-for="item in cost_performance_list"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="合作程度：">
						<el-select v-model="cooperativeness" clearable placeholder="全部">
							<el-option :label="item.name" :value="item.id" v-for="item in cooperativeness_list"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="品牌：">
						<el-select v-model="arg_brand_ids" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in brand_list" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态：">
						<el-select v-model="status" clearable placeholder="全部">
							<el-option label="填报后待审核" :value="0"></el-option>
							<el-option label="填报后审核通过" :value="1"></el-option>
							<el-option label="填报后审核拒绝" :value="2"></el-option>
							<el-option label="转合格待审核" :value="3"></el-option>
							<el-option label="转合格同意" :value="4"></el-option>
							<el-option label="转合格拒绝" :value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="form_item">
						<el-button type="primary" @click="searchData">查询</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<TableTitle title="数据列表" id="table_title">
					<el-button size="mini" type="primary" @click="addFn('1')" v-if="button_list.add == 1">添加</el-button>
				</TableTitle>
				<el-table class="gysybk_table" ref="table" size="mini" :data="data.data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
					<el-table-column label="供应商名称" prop="supplier_name"></el-table-column>
					<el-table-column label="供应商简称" prop="supplier_code"></el-table-column>
					<el-table-column label="开发员" prop="developer"></el-table-column>
					<el-table-column label="开发日期" prop="develop_date"></el-table-column>
					<el-table-column label="分类" prop="classification"></el-table-column>
					<el-table-column label="区域" prop="area"></el-table-column>
					<el-table-column label="主营" prop="main_business"></el-table-column>
					<el-table-column label="擅长品类" prop="scpl"></el-table-column>
					<el-table-column label="是否自有工厂" prop="supply_free_factory"></el-table-column>
					<el-table-column label="是否自有设计能力" prop="supply_design"></el-table-column>
					<el-table-column label="是否有外发能力" prop="supply_out_send"></el-table-column>
					<el-table-column label="结算方式">
						<template slot-scope="scope">
							{{scope.row.settlement_method}}
						</template>
					</el-table-column>
					<el-table-column label="联系人" width="120" prop="contactor"></el-table-column>
					<el-table-column label="联系电话" width="120" prop="contact_information"></el-table-column>
					<el-table-column label="联系人职位" width="120" prop="contactor_position"></el-table-column>
					<el-table-column label="联系人微信" width="120" prop="weixin"></el-table-column>
					<el-table-column label="地址" prop="address"></el-table-column>
					<el-table-column label="供应商合作客户" prop="supplier_cooperate_custom"></el-table-column>
					<el-table-column label="产品价段位" prop="price_range"></el-table-column>
					<el-table-column label="是否可退货" prop="supply_return_goods"></el-table-column>
					<el-table-column label="是否可换货" prop="supply_exchange_goods"></el-table-column>
					<el-table-column label="是否可代发" prop="supply_replace_send"></el-table-column>
					<el-table-column label="性价比" prop="cost_performance"></el-table-column>
					<el-table-column label="合作程度" prop="cooperativeness"></el-table-column>
					<el-table-column label="备注" prop="description" show-overflow-tooltip></el-table-column>
					<el-table-column label="介绍人" prop="introducer"></el-table-column>
					<el-table-column label="填报状态">
						<template slot-scope="scope">
							<div v-if="scope.row.status <= 2">{{scope.row.status | info_refund_status}}</div>
								<div v-else>填报后审核通过</div>
							</template>
						</el-table-column>
						<el-table-column label="合格状态" width="120">
							<template slot-scope="scope">
								<el-button type="text" size="small" v-if="scope.row.status == 1 && button_list.apply_qualified == 1" @click="zhuanFn('1',scope.row.reserve_id)">待转合格</el-button>
								<div v-if="scope.row.status == 1 && button_list.apply_qualified == 0">待转合格</div>
								<el-button type="text" size="small" v-if="scope.row.status == 3 && button_list.qualified_check == 1" @click="hgAuditFn(scope.row.reserve_id)">合格待审核</el-button>
								<div v-if="scope.row.status == 3 && button_list.qualified_check == 0">合格待审核</div>
								<!-- 转合格编辑 -->
								<el-button style="color:red" type="text" size="small" @click="zhuanFn('2',scope.row.reserve_id)" v-if="scope.row.status == 5 && button_list.qualified_edit == 1">转合格拒绝</el-button>
								<div v-if="scope.row.status == 5 && button_list.qualified_edit == 0">转合格拒绝</div>
								<div v-if="scope.row.status == 4">{{scope.row.status | qualified_refund_status}}</div>
							</template>
						</el-table-column>
						<el-table-column label="拜访次数">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="getVisit(scope.row.reserve_id)">{{scope.row.visit_num}}</el-button>
							</template>
						</el-table-column>
						<el-table-column label="评价记录">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="getEvaluate(scope.row.reserve_id,scope.row.supplier_name)">{{scope.row.evaluate_num}}</el-button>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="180" fixed="right">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="checkInfo('3',scope.row.reserve_id)" v-if="button_list.detail == 1">查看</el-button>
								<!-- 填报编辑 -->
								<el-button type="text" size="small" @click="addFn('2',scope.row.reserve_id)" v-if="scope.row.status != 0 && button_list.info_edit == 1">编辑</el-button>
								<el-button type="text" size="small" v-if="scope.row.status != 0 && scope.row.status != 3 && button_list.del == 1" @click="deleteFn(scope.row.reserve_id)">删除</el-button>
								<el-button type="text" size="small" v-if="scope.row.status == 0 && button_list.info_check == 1" @click="checkInfo('4',scope.row.reserve_id)">填报审核</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<PaginationWidget id="bottom_row" :total="data.total" :page="page" :pagesize="20" :show_multiple="false" @checkPage="checkPage"/>
			</el-card>
			<!-- 导入 -->
			<el-dialog :visible.sync="import_dialog" width="30%">
				<div slot="title" class="dialog_title">
					<div>导入</div>
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
			<!-- 添加/编辑/审核/详情 -->
			<el-dialog :visible.sync="edit_dialog" @close="closeEdit" width="80%">
				<div slot="title" class="dialog_title">
					<div>{{add_title}}</div>
					<img class="close_icon" src="../../../../static/close_icon.png" @click="edit_dialog = false">
				</div>
				<!-- 内容 -->
				<div class="pt-15">
					<!-- 内容信息 -->
					<div class="flex jsa">
						<el-form size="mini" style="width: 360px;" >
							<el-form-item label="供应商名称：" required>
								<el-input clearable v-model="info_arg.supplier_name" style="width: 120px;" placeholder="供应商名称" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.supplier_name}}</div>
							</el-form-item>
							<el-form-item label="供应商简称：" required>
								<el-input clearable v-model="info_arg.supplier_code" style="width: 120px;" placeholder="供应商简称" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.supplier_code}}</div>
							</el-form-item>
							<el-form-item label="开发员：" required>
								<el-select v-model="info_arg.developer" style="width: 120px;" clearable filterable placeholder="全部" @change="changeUser" v-if="add_type == '1' || add_type == '2'">
									<el-option v-for="item in user_list" :key="item.user_id" :label="item.real_name" :value="item.user_id">
									</el-option>
								</el-select>
								<div v-else>{{info_arg.developer}}</div>
							</el-form-item>
							<el-form-item label="开发日期：" required>
								<el-date-picker v-model="info_arg.develop_date" type="date" clearable value-format="yyyy-MM-dd" placeholder="选择日期" v-if="add_type == '1' || add_type == '2'">
								</el-date-picker>
								<div v-else>{{info_arg.develop_date}}</div>
							</el-form-item>
							<el-form-item label="介绍人：">
								<el-input clearable v-model="info_arg.introducer" style="width: 120px;" placeholder="介绍人" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.introducer}}</div>
							</el-form-item>
							<el-form-item label="分类：" required>
								<el-select v-model="info_arg.classification" clearable placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option :label="item.name" :value="item.id" v-for="item in classification_list"></el-option>
								</el-select>
								<div v-else>{{info_arg.classification}}</div>
							</el-form-item>
							<el-form-item label="是否石狮：" required>
								<el-select v-model="info_arg.is_ss" style="width: 120px;" placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option label="是" :value="1"></el-option>
									<el-option label="否" :value="0"></el-option>
								</el-select>
								<div v-else>{{info_arg.is_ss}}</div>
							</el-form-item>
							<el-form-item label="区域：" required>
								<el-select v-model="info_arg.area" clearable placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option :label="item" :value="item" v-for="item in area_list"></el-option>
								</el-select>
								<div v-else>{{info_arg.area}}</div>
							</el-form-item>
							<el-form-item label="主营：" required>
								<el-select v-model="info_arg_main_business" multiple filterable clearable placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option :label="item.name" :value="item.id" v-for="item in main_business_list"></el-option>
								</el-select>
								<div v-else>{{info_main_business_value}}</div>
							</el-form-item>
							<el-form-item label="擅长品类：" required>
								<el-select v-model="info_arg_scpl" multiple filterable clearable placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option :label="item.name" :value="item.id" v-for="item in scpl_list"></el-option>
								</el-select>
								<div v-else>{{info_scpl_value}}</div>
							</el-form-item>
							<el-form-item label="品牌：">
								<el-select v-model="brand_ids" clearable multiple filterable collapse-tags placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option :label="item.name" :value="item.id" v-for="item in brand_list"></el-option>
								</el-select>
								<div v-else>{{brand}}</div>
							</el-form-item>
						</el-form>
						<el-form size="mini" style="width: 360px;">
							<el-form-item label="是否自有工厂：" required>
								<el-select v-model="info_arg.supply_free_factory" style="width: 120px;" placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option label="是" :value="1"></el-option>
									<el-option label="否" :value="0"></el-option>
								</el-select>
								<div v-else>{{info_arg.supply_free_factory}}</div>
							</el-form-item>
							<el-form-item label="是否自有设计能力：" required>
								<el-select v-model="info_arg.supply_design" style="width: 120px;" placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option label="是" :value="1"></el-option>
									<el-option label="否" :value="0"></el-option>
								</el-select>
								<div v-else>{{info_arg.supply_design}}</div>
							</el-form-item>
							<el-form-item label="是否有外发能力：" required>
								<el-select v-model="info_arg.supply_out_send" style="width: 120px;" placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option label="是" :value="1"></el-option>
									<el-option label="否" :value="0"></el-option>
								</el-select>
								<div v-else>{{info_arg.supply_out_send}}</div>
							</el-form-item>
							<el-form-item label="是否可退货：" required>
								<el-select v-model="info_arg.supply_return_goods" style="width: 120px;" placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option label="是" :value="1"></el-option>
									<el-option label="否" :value="0"></el-option>
								</el-select>
								<div v-else>{{info_arg.supply_return_goods}}</div>
							</el-form-item>
							<el-form-item label="是否可换货：" required>
								<el-select v-model="info_arg.supply_exchange_goods" style="width: 120px;" placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option label="是" :value="1"></el-option>
									<el-option label="否" :value="0"></el-option>
								</el-select>
								<div v-else>{{info_arg.supply_exchange_goods}}</div>
							</el-form-item>
							<el-form-item label="是否可代发：" required>
								<el-select v-model="info_arg.supply_replace_send" style="width: 120px;" placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option label="是" :value="1"></el-option>
									<el-option label="否" :value="0"></el-option>
								</el-select>
								<div v-else>{{info_arg.supply_replace_send}}</div>
							</el-form-item>
							<el-form-item label="结算方式：" required>
								<el-select v-model="info_arg.settlement_method" clearable placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option :label="item.name" :value="item.id" v-for="item in settlement_method_list"></el-option>
								</el-select>
								<div v-else>{{info_arg.settlement_method}}</div>
							</el-form-item>
							<el-form-item label="联系人：" required>
								<el-input clearable v-model="info_arg.contactor" style="width: 120px;" placeholder="联系人" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.contactor}}</div>
							</el-form-item>
							<el-form-item label="联系电话：" required>
								<el-input clearable v-model="info_arg.contact_information" style="width: 120px;" placeholder="联系电话" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.contact_information}}</div>
							</el-form-item>
							<el-form-item label="联系人职位：">
								<el-input clearable v-model="info_arg.contactor_position" style="width: 120px;" placeholder="联系人职位" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.contactor_position}}</div>
							</el-form-item>
							<el-form-item label="联系人微信：">
								<el-input clearable v-model="info_arg.weixin" style="width: 120px;" placeholder="联系人微信" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.weixin}}</div>
							</el-form-item>
						</el-form>
						<el-form size="mini" style="width: 360px;">
							<el-form-item label="收款人姓名：" required>
								<el-input clearable v-model="info_arg.payee" style="width: 120px;" placeholder="收款人姓名" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.payee}}</div>
							</el-form-item>
							<el-form-item label="收款人账号：" required>
								<el-input clearable v-model="info_arg.payee_account" style="width: 120px;" placeholder="收款人账号" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.payee_account}}</div>
							</el-form-item>
							<el-form-item label="收款人开户行：" required>
								<el-input clearable v-model="info_arg.payee_bank_name" style="width: 120px;" placeholder="收款人开户行" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.payee_bank_name}}</div>
							</el-form-item>
							<el-form-item label="创建SCM系统：" required>
								<el-select v-model="info_arg.is_scm" clearable placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option :label="item.name" :value="item.id" v-for="item in scm_list"></el-option>
								</el-select>
								<div v-else>{{info_arg.is_scm}}</div>
							</el-form-item>
							<el-form-item label="产品价位段：" required>
								<div v-if="add_type == '1' || add_type == '2'">
									<el-input style="width: 80px;" size="mini" type="number" v-model="info_arg.start_price"></el-input>&nbsp~&nbsp
									<el-input style="width: 80px;" size="mini" type="number" v-model="info_arg.end_price"></el-input>
								</div>
								<div v-else>{{info_arg.start_price}}~{{info_arg.end_price}}</div>
							</el-form-item>
							<el-form-item label="性价比：" required>
								<el-select v-model="info_arg.cost_performance" clearable placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option :label="item.name" :value="item.id" v-for="item in cost_performance_list"></el-option>
								</el-select>
								<div v-else>{{info_arg.cost_performance}}</div>
							</el-form-item>
							<el-form-item label="合作程度：" required>
								<el-select v-model="info_arg.cooperativeness" clearable placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option :label="item.name" :value="item.id" v-for="item in cooperativeness_list"></el-option>
								</el-select>
								<div v-else>{{info_arg.cooperativeness}}</div>
							</el-form-item>
							<el-form-item label="地址：" required>
								<el-input clearable v-model="info_arg.address" style="width: 120px;" placeholder="地址" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.address}}</div>
							</el-form-item>
							<el-form-item label="供应商合作客户：">
								<el-input clearable v-model="info_arg.supplier_cooperate_custom" style="width: 120px;" placeholder="供应商合作客户" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.supplier_cooperate_custom}}</div>
							</el-form-item>
							<el-form-item label="备注：">
								<el-input clearable v-model="info_arg.description" style="width: 120px;" placeholder="备注" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.description}}</div>
							</el-form-item>
							<el-form-item label="填报状态：" v-if="add_type != '1' && add_type != '2'">
								<div v-if="info_arg.status <= 2">{{info_arg.status | info_refund_status}}</div>
									<div v-else>填报后审核通过</div>
								</el-form-item>
								<el-form-item label="拒绝原因：" v-if="info_arg.status == 2">
									<div>{{info_arg.info_refund_remark}}</div>
								</el-form-item>
							</el-form>
						</div>
						<el-form size="mini" style="padding-left: 30px;width: 720px;">
							<el-form-item label="供应商拜访记录图片：" required>
								<UploadFile v-if="show_visiting_file && (add_type == '1' || add_type == '2')" :img_list="visiting_imgs" :is_multiple="true" :current_num="visiting_imgs.length" :max_num="9" @callbackFn="visitingImgsbackFn"/>
								<div v-else>
									<el-image style="width: 80px;height: 80px;margin-right: 10px;" :z-index="99999" :src="item" :initial-index="index" :preview-src-list="visiting_imgs" v-for="(item,index) in visiting_imgs">
									</el-image>
								</div>
							</el-form-item>
						</el-form>
						<el-divider v-if="info_arg.status >= 3"></el-divider>
						<!-- 填报审核 -->
						<el-form size="mini" v-if="add_type == '4'">
							<el-form-item>
								<el-radio-group v-model="check_status">
									<el-radio :label="1">同意</el-radio>
									<el-radio :label="0">拒绝</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="拒绝原因：" v-if="check_status == 0" required>
								<el-input type="textarea" :rows="3" placeholder="拒绝原因" v-model="remark">
								</el-input>
							</el-form-item>
						</el-form>
						<!-- 转合格审核 -->
						<el-form size="mini" v-if="(add_type == '3' && info_arg.status >= 3) || add_type == '5'">
							<el-form-item label="合格状态：">
								<div>{{info_arg.status | qualified_refund_status}}</div>
							</el-form-item>
							<el-form-item label="拒绝原因：" v-if="info_arg.status == 5">
								<div>{{info_arg.qualified_refund_remark}}</div>
							</el-form-item>
							<el-form-item label="公司名称：">
								<div>{{company_name}}</div>
							</el-form-item>
							<el-form-item label="工商营业执照：">
								<el-image style="width: 80px;height: 80px;margin-right: 10px;" :z-index="99999" :src="item" :initial-index="index" :preview-src-list="business_license_img" v-for="(item,index) in business_license_img">
								</el-image>
							</el-form-item>
							<el-form-item label="公司照片：">
								<el-image style="width: 80px;height: 80px;margin-right: 10px;" :z-index="99999" :src="item" :initial-index="index" :preview-src-list="company_img" v-for="(item,index) in company_img">
								</el-image>
							</el-form-item>
							<el-form-item v-if="add_type == '5'">
								<el-radio-group v-model="audit_status">
									<el-radio :label="1">同意</el-radio>
									<el-radio :label="0">拒绝</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="拒绝原因：" v-if="audit_status == 0 && add_type == '5'" required>
								<el-input type="textarea" :rows="3" placeholder="拒绝原因" v-model="audit_remark">
								</el-input>
							</el-form-item>
							<el-form-item v-if="audit_status == 1 && add_type == '5'">
								<el-checkbox v-model="is_oa" :true-label="1" :false-label="0">是否提交钉钉审批</el-checkbox>
							</el-form-item>
							<el-form-item label="上传附件：" required v-if="audit_status == 1 && is_oa == 1 && add_type == '5'">
								<UploadXlsx :attachment="attachment" @callBackXlsx="callBackXlsx"/>
							</el-form-item>
						</el-form>
					</div>
					<div slot="footer" class="dialog_footer">
						<el-button size="small" @click="edit_dialog = false">取消</el-button>
						<!-- 添加/编辑 -->
						<el-button type="primary" size="small" @click="submitAddEdit" v-if="add_type == '1' || add_type == '2'">提交</el-button>
						<!-- 填报审核 -->
						<el-button type="primary" size="small" @click="submitCheck" v-if="add_type == '4'">保存</el-button>
						<!-- 转合格审核 -->
						<el-button type="primary" size="small" @click="zhgAudit" v-if="add_type == '5'">保存</el-button>
					</div>
				</el-dialog>
				<!-- 转合格 -->
				<el-dialog :visible.sync="zhuan_dialog" @close="closeZhuan">
					<div slot="title" class="dialog_title">
						<div>请{{zhuan_type == '1'?'填写':'编辑'}}转正资料</div>
						<img class="close_icon" src="../../../../static/close_icon.png" @click="zhuan_dialog = false">
					</div>
					<!-- 内容 -->
					<div class="pt-15">
						<el-form size="mini">
							<el-form-item label="公司名称：" required>
								<el-input clearable v-model="company_name" style="width: 120px;" placeholder="公司名称"></el-input>
							</el-form-item>
							<el-form-item label="工商营业执照：" required>
								<UploadFile v-if="show_upload_file" :img_list="business_license_img" :is_multiple="true" :current_num="business_license_img.length" :max_num="3" @callbackFn="businessCallbackFn"/>
							</el-form-item>
							<el-form-item label="公司照片：" required>
								<UploadFile v-if="show_upload_file" :img_list="company_img" :is_multiple="true" :current_num="company_img.length" :max_num="6" @callbackFn="companyCallbackFn"/>
							</el-form-item>
						</el-form>
					</div>
					<div slot="footer" class="dialog_footer">
						<el-button size="small" @click="zhuan_dialog = false">取消</el-button>
						<el-button type="primary" size="small" @click="commitZhuan">提交</el-button>
					</div>
				</el-dialog>
				<!-- 拜访记录详情 -->
				<el-dialog :visible.sync="visit_dialog" @close="visit_page = 1" width="65%">
					<div slot="title" class="dialog_title">
						<div>拜访记录</div>
						<img class="close_icon" src="../../../../static/close_icon.png" @click="visit_dialog = false">
					</div>
					<!-- 内容 -->
					<div class="pt-15">
						<el-table size="mini" :data="visit_data.data" tooltip-effect="dark" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" v-loading="visit_loading">
							<el-table-column label="供应商名称" prop="supplier_name"></el-table-column>
							<el-table-column label="区域" prop="area"></el-table-column>
							<el-table-column label="供应商地址" prop="address"></el-table-column>
							<el-table-column label="拜访员" prop="visit_user_name"></el-table-column>
							<el-table-column label="拜访时间" prop="visit_time"></el-table-column>
							<el-table-column label="拜访目的" prop="visit_purpose"></el-table-column>
							<el-table-column label="拜访过程描述" prop="description"></el-table-column>
							<el-table-column label="备注" prop="remark"></el-table-column>
							<el-table-column label="图片" width="150" >
								<template slot-scope="scope">
									<div v-if="scope.row.images.length == 0">暂无</div>
									<el-carousel trigger="hover" indicator-position="none" :autoplay="false" height="100px" v-if="scope.row.images.length > 0 && loading == false">
										<el-carousel-item v-for="item in scope.row.images" :key="item">
											<el-image :z-index="9999" class="image" :src="item" fit="scale-down" :preview-src-list="scope.row.images"></el-image>
										</el-carousel-item>
									</el-carousel>
								</template>
							</el-table-column>
						</el-table>
						<PaginationWidget :total="visit_data.total" :page="visit_page" :pagesize="10" :show_multiple="false" @checkPage="checkVisitPage"/>
					</div>
					<div slot="footer" class="dialog_footer">
						<el-button size="small" @click="visit_dialog = false">关闭</el-button>
					</div>
				</el-dialog>
				<!-- 评价记录 -->
				<el-dialog :visible.sync="evaluate_dialog" @close="evaluate_page = 1">
					<div slot="title" class="dialog_title">
						<div>【{{supplier_name_title}}】评价记录</div>
						<img class="close_icon" src="../../../../static/close_icon.png" @click="evaluate_dialog = false">
					</div>
					<!-- 内容 -->
					<div class="pt-15">
						<TableTitle title="数据列表" id="table_title">
							<el-button size="mini" type="primary" @click="addEvakuateFn('添加评价','')">添加</el-button>
						</TableTitle>
						<el-table ref="table" size="mini" :data="evaluate_data.data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" v-loading="evaluate_loading">
							<el-table-column label="评价内容" prop="evaluate_content">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="addEvakuateFn('评价内容',scope.row.evaluate_content)"><p style="text-decoration:underline">{{scope.row.evaluate_content}}</p></el-button>
								</template>
							</el-table-column>
							<el-table-column label="评价时间" prop="add_time"></el-table-column>
							<el-table-column label="操作" width="180" fixed="right">
								<template slot-scope="scope">
									<el-button size="mini" type="text" @click="delEvaluate(scope.row.evaluate_log_id)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<PaginationWidget :total="evaluate_data.total" :page="evaluate_page" :show_multiple="false" :pagesize="10" @checkPage="checkEvaluatePage"/>
					</div>
					<!-- 添加或查看评价内容 -->
					<el-dialog width="30%" :visible.sync="evaluate_info_dialog" append-to-body>
						<div slot="title" class="dialog_title">
							<div>{{evaluate_info_title}}</div>
							<img class="close_icon" src="../../../../static/close_icon.png" @click="evaluate_info_dialog = false">
						</div>
						<div class="pt-15 pb-15">
							<el-input type="textarea" :rows="4" :disabled="evaluate_info_title == '评价内容'" placeholder="请输入评价内容" v-model="evaluate_content" maxlength="300"
							show-word-limit v-if="evaluate_info_title == '添加评价'">
						</el-input>
						<div v-else>{{evaluate_content}}</div>
					</div>
					<div slot="footer" class="dialog_footer">
						<el-button size="small" @click="evaluate_info_dialog = false">取消</el-button>
						<el-button size="mini" type="primary" @click="evaluateSaveInfo" v-if="evaluate_info_title == '添加评价'">保存</el-button>
					</div>
				</el-dialog>
				<div slot="footer" class="dialog_footer">
					<el-button size="small" @click="evaluate_dialog = false">关闭</el-button>
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
		.pt-15{
			padding-top:15rem;
		}
		.pb-15{
			padding-bottom:15rem;
		}
	</style>
	<script>
		import { exportPost } from "../../../../api/export.js";

		import { MessageBox, Message } from "element-ui";
		import resource from '../../../../api/chain_resource.js'
		import commonResource from '../../../../api/common_resource.js'

		import TableTitle from '../../components/table_title.vue'
		import PaginationWidget from '../../../../components/pagination_widget.vue'
		import UploadFile from '../../../../components/upload_file.vue'
		import UploadXlsx from '../../../../components/upload_xlsx.vue'
		export default{
			data(){
				return{
					loading:false,
				supplier_name:"",				//供应商名称
				user_list:[],					//所有用户列表
				developer:"",					//开发人员姓名
				classification_list:[],				//分类
				classification:"",					//选中的分类
				area_list:[],						//区域
				area:"",							//选中的区域
				main_business:"",					//选中的主营
				scpl:"",							//选中的擅长品类
				settlement_method_list:[],			//结算方式
				settlement_method:"",				//选中的结算方式
				cost_performance_list:[],			//性价比
				cost_performance:"",				//选中的性价比
				cooperativeness_list:[],			//合作程度
				cooperativeness:"",					//选中的合作程度
				brand_list:[],						//品牌列表
				arg_brand_ids:[],						//选中的品牌
				main_business_list:[],				//主营列表
				scpl_list:[],						//擅长品类
				scm_list:[],						//scm列表
				supply_free_factory:"",			//是否自有工厂
				supply_design:"",				//是否自有设计能力
				start_price:"",					//价格段开始
				end_price:"",					//价格段结束
				supply_return_goods:"",			//是否可退货
				supply_exchange_goods:"",		//是否可换货
				supply_replace_send:"",			//是否可代发
				status:"",						//状态
				max_height:0,	
				page:1,
				data:{},						//获取的数据
				button_list:{},
				import_dialog:false,			//导入弹窗
				edit_dialog:false,				//填报添加/编辑/审核/详情弹窗
				reserve_id:"",					//点击的供应商ID
				add_type:'1',	//填报弹窗类型（1:添加；2:编辑；3:查看；4:填报审核；5:合格审核）
				add_title:'',					//填报弹窗标题
				info_arg:{
					supplier_name:"",
					supplier_code:"",
					developer:"",
					developer_id:"",
					classification:"",
					is_ss:1,
					area:"",
					supply_free_factory:1,
					supply_design:1,
					settlement_method:"",
					start_price:"",
					end_price:"",
					supply_replace_send:1,
					cost_performance:"",
					cooperativeness:"",
					contactor:"",
					address:"",
					contact_information:"",
					contactor_position:"",
					weixin:"",
					payee:"",
					payee_account:"",
					payee_bank_name:"",
					is_scm:"",
					description:"",
					supplier_cooperate_custom:"",
					introducer:"",
					supply_out_send:1,
					supply_return_goods:1,
					supply_exchange_goods:1,
					develop_date:"",
					status:"",
					info_refund_remark:"",
					qualified_refund_remark:""
				},				  //填报阶段的详情
				show_visiting_file:true,
				info_arg_main_business:[],		//主营
				info_main_business_value:"",
				info_arg_scpl:[],				//擅长品类
				brand_ids:[],					//选中的品牌ID列表
				brand:"",						//品牌
				info_scpl_value:"",
				attachment:{},					//附件文件
				visiting_imgs:[],				//拜访图片
				check_status:1,					//审核状态
				remark:"",						//拒绝原因
				zhuan_dialog:false,				//申请转合格
				zhuan_type:"",					//申请转合格弹窗(1:填写；2:编辑)
				company_name:"",				//公司名称
				business_license_img:[],		//工商营业执照
				company_img:[],					//公司照片
				is_oa:1,						//是否提交钉钉审批
				audit_status:1,					//转合格审核（1:同意；2:拒绝）
				audit_remark:"",				//转合格审核拒绝原因
				show_upload_file:true,
				visit_dialog:false,				//供应商拜访记录弹窗
				visit_data:{},					//拜访记录数据
				visit_page:1,					
				visit_loading:false,
				evaluate_dialog:false,		//评价列表弹窗
				supplier_name_title:"",			//供应商名称
				evaluate_data:{},			//评价列表数据
				evaluate_page:1,
				evaluate_loading:false,		
				evaluate_info_dialog:false,	//添加或查看评价弹窗
				evaluate_info_title:"",		//添加或查看评价弹窗标题
				evaluate_content:"",		//评价内容
			}
		},
		created(){
			//获取用户列表
			this.getUserList();
			//预备库下拉框筛选项
			this.selectionMap();
			//获取供应商列表
			this.supplierManagerList();
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
					this.max_height = card_box_height - form_height + 110 + "px";
				});
			},
			//获取用户列表
			getUserList(){
				resource.supplierAjaxUser().then(res => {
					if(res.data.code == 1){
						this.user_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//预备库下拉框筛选项
			selectionMap(){
				resource.selectionMap().then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.classification_list = data.classification;	//分类
						this.area_list = data.area;						//区域
						this.settlement_method_list = data.settlement_method;//结算方式
						this.cost_performance_list = data.cost_performance;//性价比
						this.cooperativeness_list = data.cooperativeness;//合作程度
						this.main_business_list = data.main_business;//主营
						this.scpl_list = data.scpl;//擅长品类
						this.scm_list = data.scm;//scm列表
						this.brand_list = data.brand;//品牌列表
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击查询
			searchData(){
				if(this.start_price != '' && !this.isPrice.test(parseFloat(this.start_price))){
					this.$message.warning('价格必须大于0且最多两位小数');
				}else if(this.end_price != '' && !this.isPrice.test(parseFloat(this.end_price))){
					this.$message.warning('价格必须大于0且最多两位小数');
				}else if(parseFloat(this.start_price) > parseFloat(this.end_price)){
					this.$message.warning('起始价格不能高于结束金额');
				}else{
					this.checkPage(1);
				}
			},
    		//获取供应商列表
			supplierManagerList(){
				let arg = {
					supplier_name:this.supplier_name,					//供应商名称
					developer:this.developer,							//开发人员姓名
					classification:this.classification,					//分类
					area:this.area,										//区域
					main_business:this.main_business,					//主营
					scpl:this.scpl,										//擅长品类
					supply_free_factory:this.supply_free_factory,		//是否自有工厂
					supply_design:this.supply_design,					//是否自有设计能力
					settlement_method:this.settlement_method,			//结算方式
					supply_return_goods:this.supply_return_goods,		//是否可退货
					supply_exchange_goods:this.supply_exchange_goods,	//是否可换货
					supply_replace_send:this.supply_replace_send,		//是否可代发
					cost_performance:this.cost_performance,				//性价比
					cooperativeness:this.cooperativeness,				//合作程度
					brand:this.arg_brand_ids.join(','),						//品牌列表
					status:this.status,									//合格状态
					pagesize:20,
					page:this.page
				}
				if(this.start_price != '' || this.end_price != ''){
					arg['price_range'] = `${this.start_price}_${this.end_price}`
				}
				this.loading = true;
				resource.reserveIndex(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.data = res.data.data;
						this.button_list =  res.data.data.button_list;
						this.$refs.table.bodyWrapper.scrollTop = 0;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换开发人员
			changeUser(e){
				let maintainer_arr = this.user_list.filter(item => {
					return item.user_id == e
				})
				this.info_arg.developer = maintainer_arr.length > 0?maintainer_arr[0].real_name:"";
			},
    		//下载模版
			downTemplate(){
				window.open(`${this.downLoadUrl}/template/预备库供应商导入模板.xlsx`);
			},
    		//导入
			uploadCsv(){
				if (this.$refs.csvUpload.files.length > 0) {
					let files = this.$refs.csvUpload.files;
					resource.reserveImport({file:files[0]}).then(res => {
						this.$refs.csvUpload.value = null;
						this.import_dialog = false;
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.page = 1;
							//获取列表
							this.supplierManagerList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//切换页码
			checkPage(v){
				this.page = v;
				//获取供应商列表
				this.supplierManagerList();
			},
			//填报点击添加或编辑
			addFn(type,reserve_id){
				this.add_type = type;
				if(type == '1'){
					this.add_title = '添加';
					this.edit_dialog = true;
					this.show_visiting_file = true;
				}else if(type == '2'){
					this.add_title = '编辑';
					this.reserve_id = reserve_id;
					resource.reserveEditGet({reserve_id:this.reserve_id}).then(res => {
						if(res.data.code == 1){
							let data = res.data.data;
							for(let k in this.info_arg){
								if(k == 'classification'){
									let arr = this.classification_list.filter(item => {
										return item.id == data[k]
									})
									if(arr.length > 0){
										this.info_arg[k] = data[k];
									}else{
										data[k] = '';
									}
								}else if(k == 'is_scm'){
									let arr = this.scm_list.filter(item => {
										return item.id == data[k]
									})
									if(arr.length > 0){
										this.info_arg[k] = data[k];
									}else{
										data[k] = '';
									}
								}else if(k == 'cost_performance'){
									let arr = this.cost_performance_list.filter(item => {
										return item.id == data[k]
									})
									if(arr.length > 0){
										this.info_arg[k] = data[k];
									}else{
										data[k] = '';
									}
								}else if(k == 'cooperativeness'){
									let arr = this.cooperativeness_list.filter(item => {
										return item.id == data[k]
									})
									if(arr.length > 0){
										this.info_arg[k] = data[k];
									}else{
										data[k] = '';
									}
								}else{
									this.info_arg[k] = data[k];
								}
							}

							//主营
							this.info_arg_main_business = [];
							if(data.main_business != '0'){
								data.main_business.split(',').map(item => {
									this.info_arg_main_business.push(parseInt(item));
								})
							}
							//擅长品类
							this.info_arg_scpl = [];
							if(data.scpl){
								data.scpl.split(',').map(item => {
									this.info_arg_scpl.push(parseInt(item));
								})
							}
							//品牌
							this.brand_ids = [];
							if(data.brand){
								data.brand.toString().split(',').map(item => {
									this.brand_ids.push(parseInt(item));
								})
							}
							//拜访图片
							if(data.visiting_imgs){
								this.visiting_imgs = data.visiting_imgs.split(',');
							}
							this.show_visiting_file = true;
						}else{
							this.$message.warning(res.data.msg);
						}
					})
					this.edit_dialog = true;
				}
			},
			//拜访图片回调
			visitingImgsbackFn(v) {
				this.visiting_imgs = v.image_arr;
			},
			//上传附件回调
			callBackXlsx(file){
				this.attachment = file;
			},
			//填报弹窗关闭
			closeEdit(){
				for(let k in this.info_arg){
					if(k == 'supply_free_factory' || k == 'supply_design' || k == 'supply_replace_send' || k == 'supply_return_goods' || k == 'supply_exchange_goods' || k == 'supply_out_send'){
						this.info_arg[k] = 1;
					}else{
						this.info_arg[k] = "";
					}
				}
				this.check_status = 1;					//填报审核状态
				this.brand_ids = [];					//选中的品牌
				this.remark = "";						//填报拒绝原因
				this.company_name = ""					//公司名称
				this.business_license_img = [];			//工商营业执照
				this.company_img = [];					//公司照片
				this.is_oa = 1;
				this.audit_status = 1;					//转合格审核状态
				this.audit_remark = '';					//转合格审核原因
				this.attachment = {};
				this.visiting_imgs = [];
				this.info_arg_main_business = [];		//主营
				this.info_arg_scpl = [];				//擅长品类
				this.show_visiting_file = false;
			},
			//点击填报编辑或添加的提交
			submitAddEdit(){
				if(this.info_arg.supplier_name == ''){
					this.$message.warning('请输入供应商名称');
					return;
				}else if(!this.info_arg.supplier_code){
					this.$message.warning('请输入供应商简称');
					return;
				}else if(!this.info_arg.develop_date){
					this.$message.warning('请选择开发日期');
					return;
				}else if(this.info_arg.developer == ''){
					this.$message.warning('请选择开发员');
					return;
				}else if(this.info_arg.classification == ''){
					this.$message.warning('请选择分类');
					return;
				}else if(this.info_arg.area == ''){
					this.$message.warning('请选择区域');
					return;
				}else if(this.info_arg_main_business.length == 0){
					this.$message.warning('请选择主营');
					return;
				}else if(this.info_arg_scpl.length == 0){
					this.$message.warning('请选择擅长品类');
					return;
				}else if(this.info_arg.settlement_method == ''){
					this.$message.warning('请选择结算方式');
					return;
				}else if(this.info_arg.contactor == ''){
					this.$message.warning('请填写联系人');
					return;
				}else if(this.info_arg.contact_information == ''){
					this.$message.warning('请填写联系电话');
					return;
				}else if(this.info_arg.payee == ''){
					this.$message.warning('请填写收款人姓名');
					return;
				}else if(this.info_arg.payee_account == ''){
					this.$message.warning('请填写收款人账号');
					return;
				}else if(this.info_arg.payee_bank_name == ''){
					this.$message.warning('请填写收款人开户行');
					return;
				}else if(this.info_arg.is_scm == ''){
					this.$message.warning('请选择SCM系统');
					return;
				}else if(this.info_arg.start_price == '' && this.info_arg.end_price == ''){
					this.$message.warning('请输入产品价位段');
					return;
				}else if(this.info_arg.start_price != '' && !this.isPrice.test(parseFloat(this.info_arg.start_price))){
					this.$message.warning('价格必须大于0且最多两位小数');
					return;
				}else if(this.info_arg.end_price != '' && !this.isPrice.test(parseFloat(this.info_arg.end_price))){
					this.$message.warning('价格必须大于0且最多两位小数');
					return;
				}else if(parseFloat(this.info_arg.start_price) > parseFloat(this.info_arg.end_price)){
					this.$message.warning('起始价格不能高于结束金额');
					return;
				}else if(this.info_arg.cost_performance == ''){
					this.$message.warning('请选择性价比');
					return;
				}else if(this.info_arg.cooperativeness == ''){
					this.$message.warning('请选择合作程度');
					return;
				}else if(this.info_arg.address == ''){
					this.$message.warning('请选择填写地址');
					return;
				}else if(this.visiting_imgs.length == 0){
					this.$message.warning('请上传拜访图片');
					return;
				}

				//产品价位段
				let arg = JSON.parse(JSON.stringify(this.info_arg));
				arg['price_range'] = `${arg.start_price}_${arg.end_price}`;
				delete arg.start_price;
				delete arg.end_price;
				//处理拜访图片
				arg['visiting_imgs'] = this.visiting_imgs.join(',');
				//主营
				arg['main_business'] = this.info_arg_main_business.join(',');
				//擅长品类
				arg['scpl'] = this.info_arg_scpl.join(',');
				//品牌
				arg['brand'] = this.brand_ids.join(',');

				if(this.add_type == '1'){		//创建
					resource.reserveAdd(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.edit_dialog = false;
							//获取供应商列表
							this.supplierManagerList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else if(this.add_type == '2'){		//编辑
					arg['reserve_id'] = this.reserve_id;
					resource.reserveEditPost(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.edit_dialog = false;
							//获取供应商列表
							this.supplierManagerList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//点击填报阶段审核/查看
			checkInfo(type,reserve_id){
				this.add_type = type;
				this.add_title = this.add_type == '3'?'详情':'审核';
				this.reserve_id = reserve_id;
				resource.reserveInfo({reserve_id:this.reserve_id}).then(res => {
					if(res.data.code == 1){
						this.show_visiting_file = true;
						let data = res.data.data;
						for(let k in this.info_arg){
							this.info_arg[k] = data[k];
						}
						let price_range = data.price_range.split('~');
						this.info_arg.start_price = price_range[0];
						this.info_arg.end_price = price_range[1];

						//主营
						this.info_main_business_value = data.main_business;
						//擅长品类
						this.info_scpl_value = data.scpl;
						//品牌
						this.brand = data.brand;

						this.company_name = data.company_name;				//公司名称

						//工商营业执照
						this.business_license_img = [];
						if(data.business_license){
							let business_license_img = data.business_license.split(',');
							business_license_img.map(item => {
								this.business_license_img.push(this.domain + item);
							})
						}
						
						//公司照片
						this.company_img = [];
						if(data.company_img){
							let company_img = data.company_img.split(',');
							company_img.map(item => {
								this.company_img.push(this.domain + item);
							})
						}

						//拜访图片
						this.visiting_imgs = [];
						if(data.visiting_imgs){
							let visiting_imgs = data.visiting_imgs.split(',');
							visiting_imgs.map(item => {
								this.visiting_imgs.push(this.domain + item);
							})
						}
					}else{
						this.$message.warning(res.data.msg);
					}
				})
				this.edit_dialog = true;
			},
			//提交填报审核
			submitCheck(){
				if(this.check_status == 0 && this.remark == ''){
					this.$message.warning('请输入拒绝原因');
					return;
				}
				let arg = {
					reserve_id:this.reserve_id,
					status:this.check_status,
					remark:this.remark
				}
				resource.checkInfo(arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
						this.edit_dialog = false;
						//获取供应商列表
						this.supplierManagerList();
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击转合格编辑或添加
			zhuanFn(type,reserve_id){
				this.reserve_id = reserve_id;
				this.zhuan_type = type;
				if(type == '1'){				//填写
					this.show_upload_file = true;
					this.zhuan_dialog = true;
				}else{							//编辑
					let arg = {
						reserve_id:this.reserve_id
					}
					resource.reserveQualifiedEditGet(arg).then(res => {
						if(res.data.code == 1){
							let data = res.data.data;
							this.show_upload_file = true;
							this.company_name = data.company_name;				//公司名称
							//主营
							this.info_main_business_value = data.main_business;
							//擅长品类
							this.info_scpl_value = data.scpl;
							//工商营业执照
							if(data.business_license){
								this.business_license_img = data.business_license.split(',');
							}
							
							//公司照片
							if(data.company_img){
								this.company_img = data.company_img.split(',');
							}
							this.zhuan_dialog = true;
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//监听工商营业执照图片列表回调
			businessCallbackFn(v) {
				this.business_license_img = v.image_arr;
			},
			//监听公司图片列表回调
			companyCallbackFn(v) {
				this.company_img = v.image_arr;
			},
			//提交/编辑转合格
			commitZhuan(){
				if(this.company_name == ''){
					this.$message.warning('请输入公司名称');
					return;
				}else if(this.business_license_img.length == 0){
					this.$message.warning('请上传营业执照');
					return;
				}else if(this.company_img.length == 0){
					this.$message.warning('请上传公司图片');
					return;
				}
				
				if(this.zhuan_type == '1'){			//添加
					let arg = {
						reserve_id:this.reserve_id,
						company_name:this.company_name,
						company_img:this.company_img.join(','),
						business_license:this.business_license_img.join(',')
					}
					resource.qualified(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.zhuan_dialog = false;
							//获取供应商列表
							this.supplierManagerList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else{						//编辑
					let arg = {
						reserve_id:this.reserve_id,
						company_name:this.company_name
					}
					let company_img = [];
					this.company_img.map(item => {
						company_img.push(item.urls?item.urls:item);
					})
					arg['company_img'] = company_img.join(',');

					let business_license = [];
					this.business_license_img.map(item => {
						business_license.push(item.urls?item.urls:item);
					})
					arg['business_license'] = business_license.join(',');
					resource.reserveQualifiedEditPost(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.zhuan_dialog = false;
							//获取供应商列表
							this.supplierManagerList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//关闭转合格弹窗
			closeZhuan(){
				this.company_name = "";
				this.company_img = [];
				this.business_license_img = [];
				this.show_upload_file = false;
			},
			//点击删除
			deleteFn(reserve_id){
				this.$confirm('确认删除该供应商?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						reserve_id:reserve_id
					}
					resource.reserveDel(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取供应商列表
							this.supplierManagerList();
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
			//点击合格待审核
			hgAuditFn(reserve_id){
				this.add_type = '5';
				this.add_title = '转合格审核';
				this.reserve_id = reserve_id;
				resource.reserveInfo({reserve_id:this.reserve_id}).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						for(let k in this.info_arg){
							this.info_arg[k] = data[k];
						}
						let price_range = data.price_range.split('~');
						this.info_arg.start_price = price_range[0];
						this.info_arg.end_price = price_range[1];
						this.company_name = data.company_name;				//公司名称

						//主营
						this.info_main_business_value = data.main_business;
						//擅长品类
						this.info_scpl_value = data.scpl;

						//工商营业执照
						this.business_license_img = [];
						let business_license_img = data.business_license.split(',');
						business_license_img.map(item => {
							this.business_license_img.push(this.domain + item);
						})
						//公司照片
						this.company_img = [];
						let company_img = data.company_img.split(',');
						company_img.map(item => {
							this.company_img.push(this.domain + item);
						})

						//拜访图片
						this.visiting_imgs = [];
						if(data.visiting_imgs){
							let visiting_imgs = data.visiting_imgs.split(',');
							visiting_imgs.map(item => {
								this.visiting_imgs.push(this.domain + item);
							})
						}
					}else{
						this.$message.warning(res.data.msg);
					}
				})
				this.edit_dialog = true;
			},
			//转合格审核提交
			zhgAudit(){
				if(this.audit_status == 0 && this.audit_remark == ''){
					this.$message.warning('请输入拒绝原因');
					return;
				}
				if(this.audit_status == 1 && this.is_oa == 1 && !this.attachment.fileId){
					this.$message.warning('请上传附件');
					return;
				}
				
				let arg = {
					reserve_id:this.reserve_id,
					status:this.audit_status,
					remark:this.audit_remark
				}
				
				if(this.audit_status == 1){
					arg['is_oa'] = this.is_oa;
				}

				if(this.audit_status == 1 && this.is_oa == 1){
					//处理附件
					let arr = [];
					arr.push(this.attachment)
					arg['attachment'] = JSON.stringify(arr);
				}
				

				resource.checkQualified(arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
						this.edit_dialog = false;
						//获取供应商列表
						this.supplierManagerList();
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击查看拜访记录
			getVisit(reserve_id){
				this.reserve_id = reserve_id;
				this.visit_dialog = true;
				this.visit_loading = true;
				//拜访记录列表
				this.getBfjl();
			},
			//拜访记录分页
			checkVisitPage(v){
				this.visit_page = v;
				//拜访记录列表
				this.getBfjl();
			},
			//获取拜访记录列表
			getBfjl(){
				let arg = {
					reserve_id:this.reserve_id,
					page:this.visit_page,
					pagesize:10
				}
				resource.visitList(arg).then(res => {
					if(res.data.code == 1){
						this.visit_loading = false;
						this.visit_data = res.data.data;
						this.visit_data.data.map(item => {
							item['images'] = [];
							let images = item.attachment == ''?[]:item.attachment.split(',');
							images.map(i => {
								item.images.push(this.domain + i)
							})
						})
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击查看评价记录
			getEvaluate(reserve_id,supplier_name){
				this.reserve_id = reserve_id;
				this.supplier_name_title = supplier_name;
				this.evaluate_dialog = true;
				//获取评级记录
				this.evaluateList();
			},
			//获取评级记录
			evaluateList(){
				let arg = {
					reserve_id:this.reserve_id,
					page:this.evaluate_page,
					pagesize:10
				}
				this.evaluate_loading = true;
				resource.evaluateList(arg).then(res => {
					if(res.data.code == 1){
						this.evaluate_loading = false;
						this.evaluate_data = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//评价记录切换页码
			checkEvaluatePage(v){
				this.evaluate_page = v;
				//查看评价记录
				this.evaluateList();
			},
			//点击添加或查看评价详情
			addEvakuateFn(evaluate_info_title,evaluate_content){
				this.evaluate_info_dialog = true;
				this.evaluate_info_title = evaluate_info_title;
				this.evaluate_content = evaluate_content;
			},
			//点击评价详情保存
			evaluateSaveInfo(){
				if(this.evaluate_content == ''){
					this.$message.warning('请输入评价内容');
				}else{
					let arg = {
						reserve_id:this.reserve_id,
						evaluate_content:this.evaluate_content
					}
					resource.addEvaluate(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.evaluate_info_dialog = false;
							//查看评价记录
							this.evaluateList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//点击删除评价记录
			delEvaluate(evaluate_log_id){
				this.$confirm('确认删除该评价记录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						evaluate_log_id:evaluate_log_id
					}
					resource.delEvaluate(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.evaluateList();
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
		filters:{
			//填报状态
			info_refund_status:function(v){
				switch(v){
				case 0:
					return '填报后待审核';
				case 1:
					return '填报审核通过'
				case 2:
					return '填报审核拒绝'
				}
			},
			//合格状态
			qualified_refund_status:function(v){
				switch(v){
				case 3:
					return '转合格待审核'
				case 4:
					return '转合格同意'
				case 5:
					return '转合格拒绝'
				}
			}
		},
		components:{
			TableTitle,
			PaginationWidget,
			UploadFile,
			UploadXlsx
		}
	}
</script>






