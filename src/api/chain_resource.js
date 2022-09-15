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
  getUserList:'user/list',							//（权限配置）用户列表
  addUser:'user/add',								//创建用户
  editUser:'user/edit',								//编辑用户
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
  //用户列表
  getUserList(params) {
    return http.get(path.getUserList, params);
  },
  //创建用户（get）
  addUserGet(params) {
    return http.get(path.addUser, params);
  },
  //编辑用户（get）
  editUserGet(params) {
    return http.get(path.editUser, params);
  },
};
