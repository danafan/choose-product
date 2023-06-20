<template>
	<div class="flex-1 flex fc height-100">
		<el-card class="form_card">
			<el-form :inline="true" size="mini">
				<el-form-item label="供应商名称：">
					<el-input clearable v-model="supplier_name" placeholder="名称/简称"></el-input>
				</el-form-item>
				<el-form-item label="开发员：">
					<el-select v-model="developer" clearable filterable placeholder="全部">
						<el-option v-for="item in user_list" :key="item.user_id" :label="item.real_name" :value="item.real_name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="开发日期：">
					<el-date-picker v-model="develop_date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="分类：">
					<el-select v-model="classification" clearable placeholder="全部">
						<el-option :label="item" :value="item" v-for="item in classification_list"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="区域：">
					<el-select v-model="area" clearable placeholder="全部">
						<el-option :label="item" :value="item" v-for="item in area_list"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="主营：">
					<el-input clearable v-model="main_business" placeholder="主营"></el-input>
				</el-form-item>
				<el-form-item label="擅长品类：">
					<el-input clearable v-model="scpl" placeholder="擅长品类"></el-input>
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
						<el-option :label="item" :value="item" v-for="item in settlement_method_list"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="产品价位段：">
					<el-input style="width: 50px;" size="mini" type="number" v-model="start_price"></el-input>&nbsp~&nbsp
					<el-input style="width: 50px;" size="mini" type="number" v-model="end_price"></el-input>
				</el-form-item>
				<el-form-item label="是否可退换货：">
					<el-select v-model="supply_return_exchange" clearable placeholder="全部">
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
				<el-form-item label="状态：">
					<el-select v-model="status" clearable placeholder="全部">
						<el-option label="报后待审核" :value="0"></el-option>
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
		</el-card>
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
				<el-button size="mini" type="primary" @click="import_dialog = true">导入</el-button>
				<el-button size="mini" type="primary" @click="addFn('1')" v-if="button_list.add == 1">添加</el-button>
			</TableTitle>
			<el-table size="mini" :data="data.data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
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
				<el-table-column label="是否可退换货" prop="supply_return_exchange"></el-table-column>
				<el-table-column label="是否可代发" prop="supply_replace_send"></el-table-column>
				<el-table-column label="性价比" prop="cost_performance"></el-table-column>
				<el-table-column label="合作程度" prop="cooperativeness"></el-table-column>
				<el-table-column label="备注" prop="description"></el-table-column>
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
							<el-button type="text" size="small" v-if="scope.row.status == 3 && button_list.qualified_check == 1" @click="hgAuditFn(scope.row.reserve_id)">合格待审核</el-button>
							<div v-if="scope.row.status > 3">{{scope.row.status | qualified_refund_status}}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="180" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="checkInfo('3',scope.row.reserve_id)" v-if="button_list.detail == 1">查看</el-button>
							<!-- 填报编辑 -->
							<el-button type="text" size="small" @click="addFn('2',scope.row.reserve_id)" v-if="scope.row.status == 2 && button_list.info_edit == 1">编辑</el-button>
							<!-- 转合格编辑 -->
							<el-button type="text" size="small" @click="zhuanFn('2',scope.row.reserve_id)" v-if="scope.row.status == 5 && button_list.qualified_edit == 1">编辑</el-button>
							<el-button type="text" size="small" v-if="scope.row.status != 0 && scope.row.status != 3" @click="deleteFn(scope.row.reserve_id)">删除</el-button>
							<el-button type="text" size="small" v-if="scope.row.status == 0 && button_list.info_check == 1" @click="checkInfo('4',scope.row.reserve_id)">填报审核</el-button>
						</template>
					</el-table-column>
				</el-table>
				<PaginationWidget id="bottom_row" :total="data.total" :page="page" :pagesize="20" @checkPage="checkPage"/>
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
							<el-form-item label="供应商简称：">
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
									<el-option :label="item" :value="item" v-for="item in classification_list"></el-option>
								</el-select>
								<div v-else>{{info_arg.classification}}</div>
							</el-form-item>
							<el-form-item label="区域：" required>
								<el-select v-model="info_arg.area" clearable placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option :label="item" :value="item" v-for="item in area_list"></el-option>
								</el-select>
								<div v-else>{{info_arg.area}}</div>
							</el-form-item>
							<el-form-item label="主营：" required>
								<el-input clearable v-model="info_arg.main_business" placeholder="主营" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.main_business}}</div>
							</el-form-item>
							<el-form-item label="擅长品类：">
								<el-input clearable v-model="info_arg.scpl" placeholder="擅长品类" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.scpl}}</div>
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
							<el-form-item label="是否可退换货：" required>
								<el-select v-model="info_arg.supply_return_exchange" style="width: 120px;" placeholder="全部" v-if="add_type == '1' || add_type == '2'">
									<el-option label="是" :value="1"></el-option>
									<el-option label="否" :value="0"></el-option>
								</el-select>
								<div v-else>{{info_arg.supply_return_exchange}}</div>
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
									<el-option :label="item" :value="item" v-for="item in settlement_method_list"></el-option>
								</el-select>
								<div v-else>{{info_arg.settlement_method}}</div>
							</el-form-item>
							<el-form-item label="联系人：">
								<el-input clearable v-model="info_arg.contactor" style="width: 120px;" placeholder="联系人" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.contactor}}</div>
							</el-form-item>
							<el-form-item label="联系电话：">
								<el-input clearable v-model="info_arg.contact_information" style="width: 120px;" placeholder="联系电话" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.contact_information}}</div>
							</el-form-item>
							<el-form-item label="联系人职位：">
								<el-input clearable v-model="info_arg.contactor_position" style="width: 120px;" placeholder="联系人职位" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.contactor_position}}</div>
							</el-form-item>
						</el-form>
						<el-form size="mini" style="width: 360px;">
							<el-form-item label="联系人微信：">
								<el-input clearable v-model="info_arg.weixin" style="width: 120px;" placeholder="联系人微信" v-if="add_type == '1' || add_type == '2'"></el-input>
								<div v-else>{{info_arg.weixin}}</div>
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
							<el-form-item label="供应商合作客户：" required>
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
				<el-dialog :visible.sync="zhuan_dialog" destroy-on-close @close="closeZhuan">
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
								<UploadFile :img_list="business_license_img" :is_multiple="true" :current_num="business_license_img.length" :max_num="3" @callbackFn="businessCallbackFn"/>
							</el-form-item>
							<el-form-item label="公司照片：" required>
								<UploadFile :img_list="company_img" :is_multiple="true" :current_num="company_img.length" :max_num="6" @callbackFn="companyCallbackFn"/>
							</el-form-item>
						</el-form>
					</div>
					<div slot="footer" class="dialog_footer">
						<el-button size="small" @click="zhuan_dialog = false">取消</el-button>
						<el-button type="primary" size="small" @click="commitZhuan">提交</el-button>
					</div>
				</el-dialog>
			</div>
		</template>
		<style lang="less" scoped>
			.form_card{
				margin-bottom: 16rem;
				.form_item{
					margin-bottom:0 !important;
				}
			}
			.card_box{
				flex:1;
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
		</style>
		<script>
			import { exportPost } from "../../../../api/export.js";

			import { MessageBox, Message } from "element-ui";
			import resource from '../../../../api/chain_resource.js'
			import commonResource from '../../../../api/common_resource.js'

			import TableTitle from '../../components/table_title.vue'
			import PaginationWidget from '../../../../components/pagination_widget.vue'
			import UploadFile from '../../../../components/upload_file.vue'
			export default{
				data(){
					return{
						loading:false,
				supplier_name:"",				//供应商名称
				user_list:[],					//所有用户列表
				developer:"",					//开发人员姓名
				develop_date:[],				//开发日期
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
				supply_free_factory:"",			//是否自有工厂
				supply_design:"",				//是否自有设计能力
				start_price:"",					//价格段开始
				end_price:"",					//价格段结束
				supply_return_exchange:"",		//是否可退换货
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
					area:"",
					main_business:"",
					scpl:"",
					supply_free_factory:1,
					supply_design:1,
					settlement_method:"",
					start_price:"",
					end_price:"",
					supply_replace_send:1,
					cost_performance:"",
					cooperativeness:"",
					supply_return_exchange:1,
					contactor:"",
					address:"",
					contact_information:"",
					contactor_position:"",
					weixin:"",
					description:"",
					supplier_cooperate_custom:"",
					introducer:"",
					supply_out_send:1,
					develop_date:"",
					status:"",
					info_refund_remark:""
				},				  //填报阶段的详情
				check_status:1,					//审核状态
				remark:"",						//拒绝原因
				zhuan_dialog:false,				//申请转合格
				zhuan_type:"",					//申请转合格弹窗(1:填写；2:编辑)
				company_name:"",				//公司名称
				business_license_img:[],		//工商营业执照
				company_img:[],					//公司照片
				audit_status:1,					//转合格审核（1:同意；2:拒绝）
				audit_remark:"",				//转合格审核拒绝原因
			}
		},
		// beforeRouteLeave(to,from,next){
		// 	if(to.path == '/chain_supplier_detail' || to.path == '/add_edit_supplier' || to.path == '/account_list'){	
		// 		from.meta.use_cache = true;
		// 	}else{
		// 		from.meta.use_cache = false;
		// 	}
		// 	next();
		// },
		// activated(){
		// 	if(!this.$route.meta.use_cache){
		// 		this.page = 1;
		// 	}
		// 	//获取供应商列表
		// 	this.supplierManagerList();
		// 	this.$route.meta.use_cache = false;
		// },
		// destroyed() {
		// 	window.removeEventListener("resize", () => {});
		// },
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
					supplier_name:this.supplier_name,				//供应商名称
					developer:this.developer,					//开发人员姓名
					start_time:this.develop_date && this.develop_date.length > 0?this.develop_date[0]:"",
					end_time:this.develop_date && this.develop_date.length > 0?this.develop_date[1]:"",
					classification:this.classification,				//分类
					area:this.area,						//区域
					main_business:this.main_business,				//主营
					scpl:this.scpl,						//擅长品类
					supply_free_factory:this.supply_free_factory,			//是否自有工厂
					supply_design:this.supply_design,				//是否自有设计能力
					settlement_method:this.settlement_method,			//结算方式
					supply_return_exchange:this.supply_return_exchange,		//是否可退换货
					supply_replace_send:this.supply_replace_send,			//是否可代发
					cost_performance:this.cost_performance,			//性价比
					cooperativeness:this.cooperativeness,				//合作程度
					status:this.status,			//合格状态
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
				}else if(type == '2'){
					this.add_title = '编辑';
					this.reserve_id = reserve_id;
					resource.reserveEditGet({reserve_id:this.reserve_id}).then(res => {
						if(res.data.code == 1){
							let data = res.data.data;
							for(let k in this.info_arg){
								this.info_arg[k] = data[k];
							}
						}else{
							this.$message.warning(res.data.msg);
						}
					})
					this.edit_dialog = true;
				}
			},
			//填报弹窗关闭
			closeEdit(){
				for(let k in this.info_arg){
					if(k == 'supply_free_factory' || k == 'supply_design' || k == 'supply_replace_send' || k == 'supply_return_exchange' || k == 'supply_out_send'){
						this.info_arg[k] = 1;
					}else{
						this.info_arg[k] = "";
					}
					
				}
				this.check_status = 1;					//填报审核状态
				this.remark = "";						//填报拒绝原因
				this.company_name = ""					//公司名称
				this.business_license_img = [];			//工商营业执照
				this.company_img = [];					//公司照片
				this.audit_status = 1;					//转合格审核状态
				this.audit_remark = '';					//转合格审核原因
			},
			//点击填报编辑或添加的提交
			submitAddEdit(){
				if(this.info_arg.supplier_name == ''){
					this.$message.warning('请输入供应商名称');
					return;
				}else if(this.info_arg.develop_date == ''){
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
				}else if(this.info_arg.main_business == ''){
					this.$message.warning('请填写主营');
					return;
				}else if(this.info_arg.settlement_method == ''){
					this.$message.warning('请选择结算方式');
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
				}else if(this.info_arg.supplier_cooperate_custom == ''){
					this.$message.warning('请填写供应商合作商户');
					return;
				}

				if(this.add_type == '1'){
					let arg = JSON.parse(JSON.stringify(this.info_arg));
					arg['price_range'] = `${arg.start_price}_${arg.end_price}`;
					delete arg.start_price;
					delete arg.end_price;
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
				}else if(this.add_type == '2'){
					let arg = JSON.parse(JSON.stringify(this.info_arg));
					arg['price_range'] = `${arg.start_price}_${arg.end_price}`;
					delete arg.start_price;
					delete arg.end_price;
					
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
						let data = res.data.data;
						for(let k in this.info_arg){
							this.info_arg[k] = data[k];
						}
						let price_range = data.price_range.split('~');
						this.info_arg.start_price = price_range[0];
						this.info_arg.end_price = price_range[1];

						this.company_name = data.company_name;				//公司名称

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
					this.zhuan_dialog = true;
				}else{							//编辑
					let arg = {
						reserve_id:this.reserve_id
					}
					resource.reserveQualifiedEditGet(arg).then(res => {
						if(res.data.code == 1){
							let data = res.data.data;
							this.company_name = data.company_name;				//公司名称
							//工商营业执照
							this.business_license_img = [];
							if(data.business_license){
								let business_license_img = data.business_license.split(',');
								business_license_img.map(item => {
									let business_img = {
										urls:item,
										show_icon:false
									}
									this.business_license_img.push(business_img);
								})
							}
							
							//公司照片
							this.company_img = [];
							if(data.company_img){
								let company_img = data.company_img.split(',');
								company_img.map(item => {
									let company_img = {
										urls:item,
										show_icon:false
									}
									this.company_img.push(company_img);
								})
							}
							
							this.zhuan_dialog = true;
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//监听工商营业执照图片列表回调
			businessCallbackFn(img_arr) {
				this.business_license_img = img_arr;
			},
			//监听公司图片列表回调
			companyCallbackFn(img_arr) {
				this.company_img = img_arr;
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
				let arg = {
					reserve_id:this.reserve_id,
					status:this.audit_status,
					remark:this.audit_remark
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
			UploadFile
		}
	}
</script>






