import http from "./request.js";
let path = {
  getCateList: "setting/cate_list",     //类目列表接口
  addCate:'setting/add_cate',			//创建类目
  editCate:'setting/edit_cate',			//编辑类目
  deleteCate:'setting/del_cate',		//删除类目
  getClassList:'setting/class_list',	//分类列表
  getClassInfo:'setting/class_info',	//分类详情
  addClass:'setting/add_class',			//创建分类
  editClass:'setting/edit_class',		//编辑分类
  deleteClass:'setting/del_class',		//删除分类
  getStyleList:'setting/shooting_style_list',		//风格列表
  addStyle:'setting/add_shooting_style',			//创建风格
  editStyle:'setting/edit_shooting_style',			//编辑风格
  deleteStyle:'setting/del_shooting_style',			//删除风格
  getSeasonList:'setting/season_list',				//季节列表
  addSeason:'setting/add_season',					//创建季节
  editSeason:'setting/edit_season',					//编辑季节
  deleteSeason:'setting/del_season',				//删除季节
  logList:'setting/log_list',             //修改记录列表
  getUserList:'user/list',							//（权限配置）用户列表
  addUser:'user/add',								//创建用户
  editUser:'user/edit',								//编辑用户
  menuroleList:'menurole/list',						//角色列表
  menuRoleAdd:'menurole/add',						//添加角色
  menuRoleEdit:'menurole/edit',						//编辑角色
  menuRoleInfo:'menurole/info',						//查看角色
  delMenuRole:'menurole/del',						//删除角色
  accessList:'access/accesslist',					//权限列表
  getMainMenus:'access/getmainmenus',				//所有菜单列表
  getControllers:'access/getcontrollers',			//所有控制器列表
  getMethods:'access/getmethods',					//控制器下所有方法列表
  ajaxAccess:'access/ajaxaccess',					//选择按钮的列表
  accessAdd:'access/add',							//添加权限
  accessEdit:'access/edit',							//编辑权限
  accessDel:'access/del',							//删除权限
  accessInfo:'access/getinfo',						//权限详情
  feedBackList:'feedback/list',						//反馈列表
  feedBackHandle:'feedback/handle',					//确认处理
  feedBackEditGoods:'feedback/edit_goods',			//编辑商品
  addAllProductStyle:'productstyle/addallproductstyle', //批量添加商品
  getGoodsList:'productstyle/getallproductstyle',	//获取商品列表
  addGoods:'productstyle/addproductstyle',			//添加商品
  editGoods:'productstyle/editproductstyle',		//编辑商品
  auditGoods:'productstyle/examine',				//审批商品
  delGoods:'productstyle/delproductstyle',			//删除商品
  styleImageList:'productstyle/styleimagelist',		//风格图列表
  addStyleImg:'productstyle/addstyleimg',			//添加风格图
  editStyleImg:'productstyle/editstyleimg',			//编辑风格图
  delStyleImg:'productstyle/delstyleimg',			//删除风格图
  upLoadImgList:'productstyle/uploadimglist',		//商品图列表
  addUploadImg:'productstyle/adduploadimg',			//添加商品图
  editUploadImg:'productstyle/edituploadimg',		//编辑商品图
  delUploadImg:'productstyle/deluploadimg',			//删除商品图
  changeMainImg:'productstyle/changemainimg',		//设为主图
  checkStatus:'productstyle/upanddown',				//商品上架或下架
  noticeList:'notice/list',							//公告列表
  addNotice:'notice/add',							//创建公告
  noticeInfo:'notice/info',							//公告详情
  editNotice:'notice/edit',							//编辑公告
  noticeDel:'notice/del',							//删除公告
  supplierManagerList:'supplier_manager/index',		//供应商列表
  addSupplierManager:'supplier_manager/add',		//创建供应商
  supplierManagerInfo:'supplier_manager/info',		//获取供应商详情
  supplierManagerEdit:'supplier_manager/edit',		//编辑供应商
  supplierManagerDel:'supplier_manager/del',		//删除供应商
  examineList:'productstyle/examinelist',       //商品审核列表
  examineSelectedInfo:'selected/examineselectedinfo', //商品审核详情
  affirmSelected:'selected/affirmselected',           //确认需求
  refuseSelected:'selected/refuseselected',           //拒绝需求
  addSelectRemark:'selected/addselectremark',         //添加备注
  deriveSelected:'selected/deriveselected',           //导出
  setAbutmentType:'productstyle/setabutmenttype',     //设置对接推单
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
  //供应商列表
  supplierManagerList(params) {
    return http.get(path.supplierManagerList, params);
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
  //导出
  deriveSelected(params) {
    return http.get(path.deriveSelected, params);
  },
  //设置对接推单
  setAbutmentType(params) {
    return http.post(path.setAbutmentType, params);
  },
};
