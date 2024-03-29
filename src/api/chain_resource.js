import http from "./request.js";
let path = {
  getCateList: "api/setting/cate_list",     //类目列表接口
  addCate:'api/setting/add_cate',			//创建类目
  editCate:'api/setting/edit_cate',			//编辑类目
  deleteCate:'api/setting/del_cate',		//删除类目
  getClassList:'api/setting/class_list',	//分类列表
  getClassInfo:'api/setting/class_info',	//分类详情
  addClass:'api/setting/add_class',			//创建分类
  editClass:'api/setting/edit_class',		//编辑分类
  deleteClass:'api/setting/del_class',		//删除分类
  getStyleList:'api/setting/shooting_style_list',		//风格列表
  addStyle:'api/setting/add_shooting_style',			//创建风格
  editStyle:'api/setting/edit_shooting_style',			//编辑风格
  deleteStyle:'api/setting/del_shooting_style',			//删除风格
  getSeasonList:'api/setting/season_list',				//季节列表
  addSeason:'api/setting/add_season',					//创建季节
  editSeason:'api/setting/edit_season',					//编辑季节
  deleteSeason:'api/setting/del_season',				//删除季节
  logList:'api/setting/log_list',             //修改记录列表
  getUserList:'api/user/list',							//（权限配置）用户列表
  addUser:'api/user/add',								//创建用户
  editUser:'api/user/edit',								//编辑用户
  menuroleList:'api/menurole/list',						//角色列表
  menuRoleAdd:'api/menurole/add',						//添加角色
  menuRoleEdit:'api/menurole/edit',						//编辑角色
  menuRoleInfo:'api/menurole/info',						//查看角色
  delMenuRole:'api/menurole/del',						//删除角色
  accessList:'api/access/accesslist',					//权限列表
  getMainMenus:'api/access/getmainmenus',				//所有菜单列表
  getControllers:'api/access/getcontrollers',			//所有控制器列表
  getMethods:'api/access/getmethods',					//控制器下所有方法列表
  ajaxAccess:'api/access/ajaxaccess',					//选择按钮的列表
  accessAdd:'api/access/add',							//添加权限
  accessEdit:'api/access/edit',							//编辑权限
  accessDel:'api/access/del',							//删除权限
  accessInfo:'api/access/getinfo',						//权限详情
  feedBackList:'api/feedback/list',						//反馈列表
  feedBackHandle:'api/feedback/handle',					//确认处理
  feedBackEditGoods:'api/feedback/edit_goods',			//编辑商品
  addAllProductStyle:'api/productstyle/addallproductstyle', //批量添加商品
  getGoodsList:'api/productstyle/getallproductstyle',	//获取商品列表
  exportProductStyle:'api/productstyle/derivegetallproductstyle', //款式资料导出
  getOnepro:'api/productstyle/getonepro',           //商品信息查看
  addGoods:'api/productstyle/addproductstyle',			//添加商品
  editGoods:'api/productstyle/editproductstyle',		//编辑商品
  returnEditGoods:'api/productstyle/returneditgoods', //重新提交
  examEditGoods:'api/productstyle/exameditgoods',   //审核前获取商品信息
  auditGoods:'api/productstyle/examine',				//审批商品
  delGoods:'api/productstyle/delproductstyle',			//删除商品
  styleImageList:'api/productstyle/styleimagelist',		//风格图列表
  addStyleImg:'api/productstyle/addstyleimg',			//添加风格图
  editStyleImg:'api/productstyle/editstyleimg',			//编辑风格图
  delStyleImg:'api/productstyle/delstyleimg',			//删除风格图
  upLoadImgList:'api/productstyle/uploadimglist',		//商品图列表
  addUploadImg:'api/productstyle/adduploadimg',			//添加商品图
  editUploadImg:'api/productstyle/edituploadimg',		//编辑商品图
  delUploadImg:'api/productstyle/deluploadimg',			//删除商品图
  changeMainImg:'api/productstyle/changemainimg',		//设为主图
  checkStatus:'api/productstyle/upanddown',				//商品上架或下架
  noticeList:'api/notice/list',							//公告列表
  addNotice:'api/notice/add',							//创建公告
  noticeInfo:'api/notice/info',							//公告详情
  editNotice:'api/notice/edit',							//编辑公告
  noticeDel:'api/notice/del',							//删除公告
  auditNotice:'api/notice/audit',       // 审核公告
  batchAdd:'api/supplier_manager/batch_add',
  supplierManagerList:'api/supplier_manager/index',		//供应商列表
  supplierExport:'api/supplier_manager/supplier_export',  //导出供应商
  addSupplierManager:'api/supplier_manager/add',		//创建供应商
  supplierManagerInfo:'api/supplier_manager/info',		//获取供应商详情
  supplierManagerEdit:'api/supplier_manager/edit',		//编辑供应商
  supplierManagerDel:'api/supplier_manager/del',		//删除供应商
  examineList:'api/productstyle/examinelist',       //商品审核列表
  examineSelectedInfo:'api/selected/examineselectedinfo', //商品审核详情
  affirmSelected:'api/selected/affirmselected',           //确认需求
  refuseSelected:'api/selected/refuseselected',           //拒绝需求
  addSelectRemark:'api/selected/addselectremark',         //添加备注
  setAbutmentType:'api/productstyle/setabutmenttype',     //设置对接推单
  accountList:'api/supplier_manager/account_list',        //供应商账号列表
  addAccount:'api/supplier_manager/add_account',          //创建账号
  editAccount:'api/supplier_manager/edit_account',        //编辑账号
  delAccount:'api/supplier_manager/del_account',          //删除账号
  settingRecord:'api/log/list',                           //操作日志
  changePrice:'api/productstyle/changeprice',             //调价审批
  styleImgChangeMain:'api/productstyle/styleimgchangemain',   //设为主图
  examineEditIid:'api/selected/examineeditiid',           //编辑款式编码
  editGoodsIid:'api/productstyle/editgoodsiid',           //批量编辑款式编码
  hotDataList:'api/productstyle/hotdatalist',             //爆款主推款审核列表
  hotDataInfo:'api/productstyle/showhotdatainfo',             //获取爆款详情/审核
  reserveIndex:'api/supplier_manager/reserve_index',            //预备库供应商列表
  reserveImport:'api/supplier_manager/reserve_import',        //预备库供应商导入
  reserveEdit:'api/supplier_manager/reserve_edit',        //编辑供应商(填报阶段)
  reserveAdd:'api/supplier_manager/reserve_add',          //创建预备库供应商
  checkInfo:'api/supplier_manager/check_info',            //填报阶段审核
  reserveInfo:'api/supplier_manager/reserve_info',        //获取供应商详情
  supplierAjaxUser:'api/supplier_manager/ajaxUser',       //获取用户列表
  selectionMap:'api/supplier_manager/selection_map',      //预备库获取下拉筛选条件
  reserveDel:'api/supplier_manager/reserve_del',          //删除预备库供应商
  qualified:'api/supplier_manager/qualified',             //申请转合格
  checkQualified:'api/supplier_manager/check_qualified',  //转合格审核
  reserveQualifiedEdit:'api/supplier_manager/reserve_qualified_edit', //编辑供应商（转合格阶段）
  visitList:'api/supplier_manager/visit_list',            //拜访记录列表
  ajaxReserveSupplier:'api/supplier_manager/ajax_reserve_supplier', //Ajax获取预备库供应商列表接口
  ajaxVisitUser:'api/supplier_manager/ajaxVisitUser',       //拜访员列表
  addVisit:'api/supplier_manager/add_visit',                //创建拜访记录
  editVisit:'api/supplier_manager/edit_visit',              //编辑拜访记录
  visitInfo:'api/supplier_manager/visit_info',              //拜访记录详情
  delVisit:'api/supplier_manager/del_visit',                //删除拜访记录
  evaluateList:'api/supplier_manager/evaluate_list',        //评价记录
  addEvaluate:'api/supplier_manager/add_evaluate',          //创建评价记录
  delEvaluate:'api/supplier_manager/del_evaluate',          //删除评价记录
  gysybkDetail:'api/supplier/reserve_info',                 //供应商预备库直接进入详情
  editLogList:'api/editlog/list',                            //款式资料修改记录表
  editlogAudit:'api/editlog/audit',                         //修改记录审核
  editLogRevoke:'api/editlog/revoke',                       //撤销修改
  studioList:'api/supplier_manager/studio_list',            //工作室列表
  editStudio:'api/supplier_manager/edit_studio',            //编辑工作室
  addStudio:'api/supplier_manager/add_studio',              //添加工作室
  delStudio:'api/supplier_manager/del_studio',              //删除工作室
  getStyleImgs:'api/productstyle/getstyleimgs',             //商品管理获取指定风格图片
  getRefreshInfo:'api/productstyle/getrefreshinfo',         //商品管理获取指定商品信息
  setSupplierOnOff:'api/supplier_manager/onoff',            //设置供应商启用禁用
  brandList:'api/setting/brand_list',                       //配置品牌列表接口
  delBrand:'api/setting/del_brand',                         //删除品牌
  addBrand:'api/setting/add_brand',                         //创建品牌
  editBrand:'api/setting/edit_brand',                       //编辑品牌
  ajaxSupplierDeveloper:'api/supplier_manager/ajax_supplier_developer', //供应商预备库开发员筛选项
  styleInfoExport:'api/productstyle/derivegetallproductstyle',  //款式资料导出
  allEditSeason:'api/productstyle/edit_season',                 //批量维护季节
  
};    
export default {
  //类目列表接口
  getCateList(params) {
    return http.get(path.getCateList, params);
  },
  //创建类目
  addCate(params) {
    return http.post(path.addCate, params);
  },
  //编辑类目
  editCate(params) {
    return http.post(path.editCate, params);
  },
  //删除类目
  deleteCate(params) {
    return http.post(path.deleteCate, params);
  },
  //分类列表
  getClassList(params) {
    return http.get(path.getClassList, params);
  },
  //分类详情
  getClassInfo(params) {
    return http.get(path.getClassInfo, params);
  },
  //创建分类
  addClass(params) {
    return http.post(path.addClass, params);
  },
  //编辑分类
  editClass(params) {
    return http.post(path.editClass, params);
  },
  //删除分类
  deleteClass(params) {
    return http.post(path.deleteClass, params);
  },
  //风格列表
  getStyleList(params) {
    return http.get(path.getStyleList, params);
  },
  //创建风格
  addStyle(params) {
    return http.post(path.addStyle, params);
  },
  //编辑风格
  editStyle(params) {
    return http.post(path.editStyle, params);
  },
  //删除风格
  deleteStyle(params) {
    return http.post(path.deleteStyle, params);
  },
  //季节列表
  getSeasonList(params) {
    return http.get(path.getSeasonList, params);
  },
  //创建季节
  addSeason(params) {
    return http.post(path.addSeason, params);
  },
  //编辑季节
  editSeason(params) {
    return http.post(path.editSeason, params);
  },
  //删除季节
  deleteSeason(params) {
    return http.post(path.deleteSeason, params);
  },
  //修改记录列表
  logList(params) {
    return http.get(path.logList, params);
  },
  //用户列表
  getUserList(params) {
    return http.get(path.getUserList, params);
  },
  //创建用户（get）
  addUserGet(params) {
    return http.get(path.addUser, params);
  },
  //创建用户（post）
  addUserPost(params) {
    return http.post(path.addUser, params);
  },
  //编辑用户（get）
  editUserGet(params) {
    return http.get(path.editUser, params);
  },
  //编辑用户（post）
  editUserPost(params) {
    return http.post(path.editUser, params);
  },
  //角色列表
  menuroleList(params) {
    return http.get(path.menuroleList, params);
  },
  //添加角色get
  menuRoleAddGet(params) {
    return http.get(path.menuRoleAdd, params);
  },
  //添加角色post
  menuRoleAddPost(params) {
    return http.post(path.menuRoleAdd, params);
  },
  //编辑角色get
  menuRoleEditGet(params) {
    return http.get(path.menuRoleEdit, params);
  },
  //编辑角色get
  menuRoleEditPost(params) {
    return http.post(path.menuRoleEdit, params);
  },
  //查看角色
  menuRoleInfo(params) {
    return http.get(path.menuRoleInfo, params);
  },
  //删除角色
  delMenuRole(params) {
    return http.post(path.delMenuRole, params);
  },
  //权限列表
  accessList(params) {
    return http.get(path.accessList, params);
  },
  //所有菜单列表
  getMainMenus(params) {
    return http.get(path.getMainMenus, params);
  },
  //所有控制器
  getControllers(params) {
    return http.get(path.getControllers, params);
  },
  //控制器下所有方法列表
  getMethods(params) {
    return http.get(path.getMethods, params);
  },
  //选择按钮的列表
  ajaxAccess(params) {
    return http.get(path.ajaxAccess, params);
  },
  //添加权限
  accessAdd(params) {
    return http.post(path.accessAdd, params);
  },
  //编辑权限
  accessEdit(params) {
    return http.post(path.accessEdit, params);
  },
  //删除权限
  accessDel(params) {
    return http.post(path.accessDel, params);
  },
  //权限详情
  accessInfo(params) {
    return http.get(path.accessInfo, params);
  },
  //反馈列表
  feedBackList(params) {
    return http.get(path.feedBackList, params);
  },
  //确认处理
  feedBackHandle(params) {
    return http.post(path.feedBackHandle, params);
  },
  //反馈-编辑商品(get)
  feedBackEditGoodsGet(params) {
    return http.get(path.feedBackEditGoods, params);
  },
  //反馈-编辑商品(post)
  feedBackEditGoodsPost(params) {
    return http.post(path.feedBackEditGoods, params);
  },
  //批量上传商品
  addAllProductStyle(params) {
    return http.post(path.addAllProductStyle, params);
  },
  //获取商品列表
  getGoodsList(params) {
    return http.get(path.getGoodsList, params);
  },
  //款式资料导出
  exportProductStyle(params) {
    return http.get(path.exportProductStyle, params);
  },
  //查看商品详情
  getOnepro(params) {
    return http.get(path.getOnepro, params);
  },
  //添加商品
  addGoods(params) {
    return http.post(path.addGoods, params);
  },
  //获取商品信息
  editGoodsGet(params) {
    return http.get(path.editGoods, params);
  },
  //编辑商品
  editGoodsPost(params) {
    return http.post(path.editGoods, params);
  },
  //重新提交(get)
  returnEditGoodsGet(params) {
    return http.get(path.returnEditGoods, params);
  },
  //重新提交(post)
  returnEditGoodsPost(params) {
    return http.post(path.returnEditGoods, params);
  },
  //审核前获取商品信息
  examEditGoods(params) {
    return http.get(path.examEditGoods, params);
  },
  //审批商品
  auditGoods(params) {
    return http.post(path.auditGoods, params);
  },
  //删除商品
  delGoods(params) {
    return http.get(path.delGoods, params);
  },
  //风格图列表
  styleImageList(params) {
    return http.get(path.styleImageList, params);
  },
  //上传风格图
  addStyleImg(params) {
    return http.post(path.addStyleImg, params);
  },
  //编辑风格图（get）
  editStyleImgGet(params) {
    return http.get(path.editStyleImg, params);
  },
  //编辑风格图（post）
  editStyleImgPost(params) {
    return http.post(path.editStyleImg, params);
  },
  //删除风格图
  delStyleImg(params) {
    return http.get(path.delStyleImg, params);
  },
  //商品图列表
  upLoadImgList(params) {
    return http.get(path.upLoadImgList, params);
  },
  //添加商品图
  addUploadImg(params) {
    return http.post(path.addUploadImg, params);
  },
  //编辑商品图(get)
  editUploadImgGet(params) {
    return http.get(path.editUploadImg, params);
  },
  //编辑商品图(post)
  editUploadImgPost(params) {
    return http.post(path.editUploadImg, params);
  },
  //删除商品图
  delUploadImg(params) {
    return http.get(path.delUploadImg, params);
  },
  //设为主图
  changeMainImg(params) {
    return http.post(path.changeMainImg, params);
  },
  //商品上架或下架
  checkStatus(params) {
    return http.post(path.checkStatus, params);
  },
  //公告列表
  noticeList(params) {
    return http.get(path.noticeList, params);
  },
  //创建公告
  addNotice(params) {
    return http.post(path.addNotice, params);
  },
  //公告详情
  noticeInfo(params) {
    return http.get(path.noticeInfo, params);
  },
  //编辑公告
  editNotice(params) {
    return http.post(path.editNotice, params);
  },
  //删除公告
  noticeDel(params) {
    return http.post(path.noticeDel, params);
  },
  //审核公告
  auditNotice(params) {
    return http.post(path.auditNotice, params);
  },
  //导入供应商
  batchAdd(params) {
    return http.post(path.batchAdd, params);
  },
  //供应商列表
  supplierManagerList(params) {
    return http.get(path.supplierManagerList, params);
  },
  //导出供应商
  supplierExport(params) {
    return http.post(path.supplierExport, params);
  },
  //创建供应商
  addSupplierManager(params) {
    return http.post(path.addSupplierManager, params);
  },
  //获取供应商详情
  supplierManagerInfo(params) {
    return http.get(path.supplierManagerInfo, params);
  },
  //编辑供应商
  supplierManagerEdit(params) {
    return http.post(path.supplierManagerEdit, params);
  },
  //删除供应商
  supplierManagerDel(params) {
    return http.post(path.supplierManagerDel, params);
  },
  //商品审核列表
  examineList(params) {
    return http.get(path.examineList, params);
  },
  //商品审核详情
  examineSelectedInfo(params) {
    return http.post(path.examineSelectedInfo, params);
  },
  //确认需求
  affirmSelected(params) {
    return http.post(path.affirmSelected, params);
  },
  //拒绝需求
  refuseSelected(params) {
    return http.post(path.refuseSelected, params);
  },
  //添加备注
  addSelectRemark(params) {
    return http.post(path.addSelectRemark, params);
  },
  //设置对接推单
  setAbutmentType(params) {
    return http.post(path.setAbutmentType, params);
  },
  //供应商账号列表
  accountList(params) {
    return http.get(path.accountList, params);
  },
  //创建账号
  addAccount(params) {
    return http.post(path.addAccount, params);
  },
  //编辑账号
  editAccount(params) {
    return http.post(path.editAccount, params);
  },
  //删除账号
  delAccount(params) {
    return http.post(path.delAccount, params);
  },
  //操作日志
  settingRecord(params) {
    return http.get(path.settingRecord, params);
  },
  //调价审批
  changePrice(params) {
    return http.post(path.changePrice, params);
  },
  //设为主图
  styleImgChangeMain(params) {
    return http.post(path.styleImgChangeMain, params);
  },
  //编辑款式编码
  examineEditIid(params) {
    return http.post(path.examineEditIid, params);
  },
  //批量编辑款式编码
  editGoodsIid(params) {
    return http.post(path.editGoodsIid, params);
  },
  //爆款主推款审核列表
  hotDataList(params) {
    return http.get(path.hotDataList, params);
  },
  //爆款主推款审核详情
  hotDataInfo(params) {
    return http.get(path.hotDataInfo, params);
  },
  //爆款主推款审核
  hotDataInfoPost(params) {
    return http.post(path.hotDataInfo, params);
  },
  //预备库供应商列表
  reserveIndex(params) {
    return http.get(path.reserveIndex, params);
  },
  //批量导入预备库供应商
  reserveImport(params) {
    return http.post(path.reserveImport, params);
  },
  //编辑供应商-GET（填报阶段）
  reserveEditGet(params) {
    return http.get(path.reserveEdit, params);
  },
  //编辑供应商-Post（填报阶段）
  reserveEditPost(params) {
    return http.post(path.reserveEdit, params);
  },
  //创建预备库供应商
  reserveAdd(params) {
    return http.post(path.reserveAdd, params);
  },
  //填报阶段审核
  checkInfo(params) {
    return http.post(path.checkInfo, params);
  },
  //供应商详情
  reserveInfo(params) {
    return http.get(path.reserveInfo, params);
  },
  //获取用户列表
  supplierAjaxUser(params) {
    return http.get(path.supplierAjaxUser, params);
  },
  //预备库下拉框筛选项
  selectionMap(params) {
    return http.get(path.selectionMap, params);
  },
  //删除预备库供应商
  reserveDel(params) {
    return http.post(path.reserveDel, params);
  },
  //申请转合格
  qualified(params) {
    return http.post(path.qualified, params);
  },
  //转合格审核
  checkQualified(params) {
    return http.post(path.checkQualified, params);
  },
  //编辑供应商-GET（转合格阶段）
  reserveQualifiedEditGet(params) {
    return http.get(path.reserveQualifiedEdit, params);
  },
  //编辑供应商-POST（转合格阶段）
  reserveQualifiedEditPost(params) {
    return http.post(path.reserveQualifiedEdit, params);
  },
  //拜访记录列表
  visitList(params) {
    return http.get(path.visitList, params);
  },
  //Ajax获取预备库供应商列表接口
  ajaxReserveSupplier(params) {
    return http.get(path.ajaxReserveSupplier, params);
  },
  //拜访员列表
  ajaxVisitUser(params) {
    return http.get(path.ajaxVisitUser, params);
  },
  //创建拜访记录
  addVisit(params) {
    return http.post(path.addVisit, params);
  },
  //编辑拜访记录接口（GET）
  editVisitGet(params) {
    return http.get(path.editVisit, params);
  },
  //编辑拜访记录接口（POST）
  editVisitPost(params) {
    return http.post(path.editVisit, params);
  },
  //拜访记录详情
  visitInfo(params) {
    return http.get(path.visitInfo, params);
  },
  //删除拜访记录
  delVisit(params) {
    return http.post(path.delVisit, params);
  },
  //评价记录
  evaluateList(params) {
    return http.get(path.evaluateList, params);
  },
  //创建评价记录
  addEvaluate(params) {
    return http.post(path.addEvaluate, params);
  },
  //删除评价记录
  delEvaluate(params) {
    return http.post(path.delEvaluate, params);
  },
  //供应商预备库直接进入详情
  gysybkDetail(params) {
    return http.get(path.gysybkDetail, params);
  },
  //款式资料修改记录表
  editLogList(params) {
    return http.get(path.editLogList, params);
  },
  //审核修改记录
  editlogAudit(params) {
    return http.post(path.editlogAudit, params);
  },
  //撤销修改
  editLogRevoke(params) {
    return http.post(path.editLogRevoke, params);
  },
  //工作室列表
  studioList(params) {
    return http.get(path.studioList, params);
  },
  //获取工作室详情
  editStudioGet(params) {
    return http.get(path.editStudio, params);
  },
  //编辑工作室
  editStudioPost(params) {
    return http.post(path.editStudio, params);
  },
  //添加工作室
  addStudio(params) {
    return http.post(path.addStudio, params);
  },
  //删除工作室
  delStudio(params) {
    return http.post(path.delStudio, params);
  },
  //商品管理获取指定风格图片
  getStyleImgs(params) {
    return http.get(path.getStyleImgs, params);
  },
  //商品管理获取指定商品信息
  getRefreshInfo(params) {
    return http.get(path.getRefreshInfo, params);
  },
  //设置供应商启用禁用
  setSupplierOnOff(params) {
    return http.post(path.setSupplierOnOff, params);
  },
  //配置品牌列表接口
  brandList(params) {
    return http.get(path.brandList, params);
  },
  //删除品牌
  delBrand(params) {
    return http.post(path.delBrand, params);
  },
  //创建品牌
  addBrand(params) {
    return http.post(path.addBrand, params);
  },
  //编辑品牌
  editBrand(params) {
    return http.post(path.editBrand, params);
  },
  //供应商预备库开发员筛选项
  ajaxSupplierDeveloper(params) {
    return http.get(path.ajaxSupplierDeveloper, params);
  },
  //款式资料导出
  styleInfoExport(params) {
    return http.exportRequest(path.styleInfoExport, params);
  },
  //批量维护季节
  allEditSeason(params) {
    return http.post(path.allEditSeason, params);
  },
  
};
