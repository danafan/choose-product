<template>
	<div>
		<div class="total_num">共有{{total_num}}件相关商品</div>
		<div class="selected_box" @click.stop="checkFn">
			<div class="selected_left">
				<div>已选条件</div>
				<div class="tj_row" v-if="supplier_index == -1 && market_index == 0 && category_index == 0 && brand_index == 0 && class_index == 0 && style_index == 0 && rating_index == 0 && season_index == 0">
					<img class="right_arrow" src="../static/down_arrow.png">
					<div>全部</div>
				</div>
				<div class="tj_row" v-else>
					<img class="right_arrow" src="../static/down_arrow.png" v-if="page_type == 'index'">
					<div v-if="supplier_list.length > 0 && page_type == 'index'">供应商（{{supplier_index == -1?'全部':supplier_list[supplier_index].supplier_name}}）</div>
					<div v-if="a_item == '白坯二开' && page_type == 'index'">供应商（白坯二开）</div>
					<img class="right_arrow" src="../static/down_arrow.png" v-if="supplier_list.length > 0 && page_type == 'index'">
					<div v-if="market_list.length > 0 && page_type == 'index'">市场（{{market_list[market_index].market_name}}）</div>
					<img class="right_arrow" src="../static/down_arrow.png">
					<div v-if="category_list.length > 0">类目（{{category_list[category_index].category_name}}）</div>
					<img class="right_arrow" src="../static/down_arrow.png">
					<div v-if="brand_list.length > 0 && page_type == 'index'">品牌（{{brand_list[brand_index].brand_name}}）</div>
					<img class="right_arrow" src="../static/down_arrow.png" v-if="page_type == 'index'">
					<div v-if="class_list.length > 0">分类（{{class_list[class_index].classification_name}}）</div>
					<img class="right_arrow" src="../static/down_arrow.png">
					<div v-if="style_list.length > 0">拍摄风格（{{style_list[style_index].shooting_style_name}}）</div>
					<img class="right_arrow" src="../static/down_arrow.png" v-if="page_type == 'index' || page_type == 'supplier'">
					<div v-if="season_list.length > 0 && (page_type == 'index' || page_type == 'supplier')">季节（{{season_list[season_index].season_name}}）</div>

					<img class="right_arrow" src="../static/down_arrow.png">
					<div v-if="rating_list.length > 0 && page_type != 'gys_supplier' && page_type != 'supplier'">等级（{{rating_list[rating_index].grade_name}}）</div>
					<div class="reset_button" @click.stop="resetFn">重置选择</div>
				</div>
			</div>
			<div class="selected_right">
				<div>{{screen_open?'收起':'展开'}}</div>
				<img class="down_arrow" :class="{'rotate':screen_open == true}" src="../static/down_arrow.png">
			</div>
		</div>
		<el-card class="conditions_box" v-if="screen_open" @click.stop>
			<div class="conditions_row" v-if="page_type == 'index'" @click.stop>
				<div class="lable">供应商：</div>
				<div style="flex:1">
					<div class="list">
						<div v-for="item in FristPin" class="item" :class="{'active_item':item == a_item}" @click.stop="a_item = item">{{item}}</div>
					</div>
					<div class="flex as">
						<div class="list" :class="{'supplier_list':!open_more}">
							<div class="item" :class="{'active_item':supplier_index == index}" v-for="(item,index) in supplier_list" @click.stop="checkIndex('supplier',index)">{{item.supplier_name}}</div>
						</div>
						<div class="flex ac pointer" @click.stop="open_more = !open_more">
							<div class="more_text">{{open_more?'收起':'更多'}}</div>
							<img class="more_arrow" :class="{'up_rotate':open_more == true}" src="../static/down_arrow.png">
						</div>
					</div>
				</div>
			</div>
			<div class="conditions_row" v-if="page_type == 'index'" @click.stop>
				<div class="lable">市场：</div>
				<div class="list">
					<div class="item" :class="{'active_item':market_index == index}" v-for="(item,index) in market_list" @click.stop="checkIndex('market',index)">{{item.market_name}}</div>
				</div>
			</div>
			<div class="conditions_row" @click.stop>
				<div class="lable">类目：</div>
				<div class="list">
					<div class="item" :class="{'active_item':category_index == index}" v-for="(item,index) in category_list" @click.stop="checkIndex('category',index)">{{item.category_name}}</div>
				</div>
			</div>
			<div class="conditions_row" v-if="page_type == 'index'" @click.stop>
				<div class="lable">品牌：</div>
				<div class="list">
					<div class="item" :class="{'active_item':brand_index == index}" v-for="(item,index) in brand_list" @click.stop="checkIndex('brand',index)">{{item.brand_name}}</div>
				</div>
			</div>
			<div class="conditions_row" @click.stop>
				<div class="lable">分类：</div>
				<div class="list">
					<div class="item" :class="{'active_item':class_index == index}" v-for="(item,index) in class_list" @click.stop="checkIndex('class',index)">{{item.classification_name}}</div>
				</div>
			</div>
			<div class="conditions_row" @click.stop>
				<div class="lable">拍摄风格：</div>
				<div class="list">
					<div class="item" :class="{'active_item':style_index == index}" v-for="(item,index) in style_list" @click.stop="checkIndex('style',index)">{{item.shooting_style_name}}</div>
				</div>
			</div>
			<div class="conditions_row" v-if="page_type == 'index' || page_type == 'supplier'" @click.stop>
				<div class="lable">季节：</div>
				<div class="list">
					<div class="item" :class="{'active_item':season_index == index}" v-for="(item,index) in season_list" @click.stop="checkIndex('season',index)">{{item.season_name}}</div>
				</div>
			</div>
			<div class="conditions_row none_border" v-if="page_type != 'gys_supplier' && page_type != 'supplier'" @click.stop>
				<div class="lable">供应商评级：</div>
				<div class="list">
					<div class="item" :class="{'active_item':rating_index == index}" v-for="(item,index) in rating_list" @click.stop="checkIndex('rating',index)">{{item.grade_name}}</div>
				</div>
			</div>
		</el-card>
		<div class="cate_box" id="position_id">
			<div class="flex" @click.stop>
				<div class="sort_row">
					<div class="sort_item" :class="{'active_color':item.sort != 'default'}" v-for="(item,index) in sort_list" @click.stop="sortFn(index)">
						<div>{{item.name}}</div>
						<img class="sort_icon" src="../static/sort_asc.png" v-if="item.sort == 'asc'">
						<img class="sort_icon" src="../static/sort_default.png" v-if="item.sort == 'default'">
						<img class="sort_icon" src="../static/sort_desc.png" v-if="item.sort == 'desc'">
					</div>
				</div>
				<div class="price_row" v-if="page_type != 'gys_supplier'">
					<div>价格：</div>
					<el-input style="width: 50px;" size="mini" type="number" v-model="start_price"></el-input>&nbsp~&nbsp
					<el-input style="width: 50px;" size="mini" type="number" v-model="end_price"></el-input>
					&nbsp
					<el-button size="mini" type="primary" @click.stop="searchPrice">查询</el-button>
				</div>
			</div>
			<div class="date_row" @click.stop>
				<el-checkbox-group style="margin-right: 30px;" v-model="up_type" @change="upTypeChange">
					<el-checkbox class="custom_checkbox" :label="1">今日上新</el-checkbox>
					<el-checkbox class="custom_checkbox" :label="3">三日上新</el-checkbox>
					<el-checkbox class="custom_checkbox" :label="7">七日上新</el-checkbox>
				</el-checkbox-group>
				<div @click.once="changeInitCalendarPage">
					<el-date-picker style="width: 220px;" v-model="date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="上新时间" end-placeholder="上新时间" @change="changeDate">
					</el-date-picker>
				</div>
				
			</div>
		</div>
		<div class="cate_box_bottom" @click.stop>
			<el-checkbox-group v-model="cate_style_ids" @change="callbackFn" v-if="page_type == 'gys_supplier'">
				<el-checkbox class="custom_checkbox" v-for="item in gys_cate_style_list"
				:key="item.id"
				:label="item.id"
				:value="item.name">{{item.name}}</el-checkbox>
			</el-checkbox-group>
			<el-checkbox-group v-model="cate_style_ids" @change="callbackFn" v-else>
				<el-checkbox class="custom_checkbox" v-for="item in cate_style_list"
				:key="item.id"
				:label="item.id"
				:value="item.name">{{item.name}}</el-checkbox>
			</el-checkbox-group>
		</div>
	</div>
</template>
<script>
	import { getNowDate,getCurrentDate } from "../api/date.js";

	import commonResource from '../api/common_resource.js'

	import pinyin from '../../node_modules/js-pinyin/index.js'
	export default{
		data(){
			return{
				supplier_index:-1,		//选中的供应商下标
				supplier_list:[],		//供应商列表
				market_index:0,			//选中的市场下标
				market_list:[],			//市场列表
				category_index:0,		//选中的类目下标
				category_list:[],		//类目列表
				brand_index:0,			//选中的品牌下标
				brand_list:[],			//品牌列表
				class_index:0,			//选中的分类下标
				class_list:[],			//分类列表
				style_index:0,			//选中的拍摄风格下标
				style_list:[],			//拍摄风格列表
				rating_index:0,			//选中的供应商评级下标
				rating_list:[],			//供应商评级列表
				season_index:0,			//选中的季节下标
				season_list:[],			//季节列表
				sort_list:[{
					name:'30天销量',
					key:'sales',
					val:'sales_num_all',
					sort:'default'
				},{
					name:'选中量',
					key:'select',
					val:'select_num',
					sort:'default'
				},{
					name:'浏览量',
					key:'views',
					val:'views_num',
					sort:'default'
				},{
					name:'成本价',
					key:'cost_price',
					val:'cost_price',
					sort:'default'
				}],								//排序列表
				cate_style_list:[{
					name:'深度库存',
					id:1
				},{
					name:'视频款',
					id:2
				},{
					name:'爆款',
					id:3
				},{
					name:'主推款',
					id:4
				},{
					name:'独家款',
					id:5
				},{
					name:'自主款',
					id:6
				},{
					name:'合并同款',
					id:7
				},{
					name:'下架款',
					id:8
				},{
					name:'控价款',
					id:9
				}],								//普通款式类型列表
				gys_cate_style_list:[{
					name:'合并同款',
					id:7
				}],								//供应商款式类型列表
				cate_style_ids:[],				//选中的款式类型
				up_type:[],						//上新类型
				date:[],						//上新日期 
				start_price:"",
				end_price:"",
				FristPin: ["全部","白坯二开","A", "B", "C", "D", "E", "F", "G", "H", "I" ,"J", "K", "L", "M", "N", "O","P", "Q", "R", "S", "T", "U","V","W", "X", "Y", "Z","#"],
				a_item:"全部",
				cityjson: {},
				open_more:false,		//是否更多
			}
		},
		props:{
			//index:首页；supplier:供应商；gys_supplier:供应商来源
			page_type:{
				type:String,
			default:"index"
			},
			//商品总数量
			total_num:{
				type:Number,
			default:0
			}
		},
		created(){
			if(this.page_type == 'gys_supplier'){
				//获取筛选条件列表
				this.supplierScreenList();
			}else{
				let o = {
					name:'7天销量',
					key:'sales_seven',
					val:'sales_seven',
					sort:'default'
				}
				this.sort_list.unshift(o);
				//获取筛选条件列表
				this.getScreenList();
			}
		},
		computed: {
			screen_open() {
				return this.$store.state.screen_open;
			},
		},
		watch:{
			a_item:function(n,o){
				if(n != ''){
					this.supplier_list = this.cityjson[n];
					this.supplier_index = -1;
					if(n == '全部' || n == '白坯二开'){
						//获取当前条件并传递
						this.callbackFn();
					}
				}else{

				}
			}
		},
		methods:{
			//将日期筛选改为默认上月到当前月
			changeInitCalendarPage() {
				let nodeList = document.querySelectorAll("button.el-picker-panel__icon-btn.el-icon-arrow-left");
				nodeList[0].click()
				setTimeout(() => {
					nodeList[1].click()
				},10);
			},
			//切换上新类型
			upTypeChange(value){
				if(this.up_type.length > 1){
					this.up_type.splice(0,1)
				}
				if(this.up_type.length > 0){
					switch(this.up_type[0]){
					case 1:
						this.date = [getNowDate(),getNowDate()];
						//获取当前条件并传递
						this.callbackFn();
						break;
					case 3:
						this.date = [getCurrentDate(3),getNowDate()];
						//获取当前条件并传递
						this.callbackFn();
						break;
					case 7:
						this.date = [getCurrentDate(7),getNowDate()];
						//获取当前条件并传递
						this.callbackFn();
						break;
					default:
						return
					}
				}else{
					this.date = [];
					//获取当前条件并传递
					this.callbackFn();
				}
			},
			//获取筛选条件列表
			getScreenList(){
				commonResource.getScreenList().then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						let supplier_list = data.supplier;
						let pinyin = require('js-pinyin');
						pinyin.setOptions({checkPolyphone: false, charCase: 0});

						let cityArr = [];
						for (let i = 0; i < supplier_list.length; i++) {
            				//遍历数组,拿到城市名称
							let cityName = supplier_list[i].supplier_name;
            				//取全部城市的首字母
							let fristName = pinyin.getCamelChars(cityName).substring(0, 1).toUpperCase();  
            				//	这里截取首字母的第一位
            				//给原json添加首字母键值对
							if(fristName == '1'){
								supplier_list[i].first = 'Y';
							}else if(fristName == '2'){
								supplier_list[i].first = 'E';
							}else if(fristName == '3'){
								supplier_list[i].first = 'S';
							}else if(fristName == '4'){
								supplier_list[i].first = 'S';
							}else if(fristName == '5'){
								supplier_list[i].first = 'W';
							}else if(fristName == '6'){
								supplier_list[i].first = 'L';
							}else if(fristName == '7'){
								supplier_list[i].first = 'Q';
							}else if(fristName == '8'){
								supplier_list[i].first = 'B';
							}else if(fristName == '9'){
								supplier_list[i].first = 'J';
							}else if(fristName == '0'){
								supplier_list[i].first = 'L';
							}else{
								supplier_list[i].first = fristName;
							}

            				//放入新数组
							cityArr.push(supplier_list[i]);
						}
						let cityJson = {};
        				//根据首字母键值对给原数据按首字母分类
						for (let i = 0; i < this.FristPin.length; i++) { 
							if(i == 0){
								cityJson[this.FristPin[i]] = cityArr;
							}else if(i == this.FristPin.length - 1){
								let zm_arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I" ,"J", "K", "L", "M", "N", "O","P", "Q", "R", "S", "T", "U","V","W", "X", "Y", "Z"]
								cityJson[this.FristPin[i]] = cityArr.filter( (value) => {
									return zm_arr.indexOf(value.first) == -1;
								})
							} else{
								cityJson[this.FristPin[i]] = cityArr.filter( (value) => {
									return value.first === this.FristPin[i];
								})
							}

						}
						this.cityjson = cityJson;
						this.supplier_list = this.cityjson["全部"];

						//市场
						let market_list = data.market;
						market_list.unshift({
							market_name:'全部',
							market_id:''
						})
						this.market_list = market_list;

						// 类目
						let category_list = data.category;
						category_list.unshift({
							category_name:'全部',
							category_id:''
						})
						this.category_list = category_list;

						// 品牌
						let brand_list = data.brand;
						brand_list.unshift({
							brand_name:'全部',
							brand_id:''
						})
						this.brand_list = brand_list;

						//分类
						let class_list = data.classification;
						class_list.unshift({
							classification_name:'全部',
							classification_id:''
						})
						this.class_list = class_list;

						//拍摄风格
						let style_list = data.shooting_style;
						style_list.unshift({
							shooting_style_name:'全部',
							shooting_style_id:''
						})
						this.style_list = style_list;

						//供应商评级
						let rating_list = data.grade;
						rating_list.unshift({
							grade_name:'全部',
							grade_id:''
						})
						this.rating_list = rating_list;
						//季节
						let season_list = data.season;
						season_list.unshift({
							season_name:'全部',
							season_id:''
						})
						this.season_list = season_list;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//供应商筛选项列表
			supplierScreenList(){
				commonResource.supplierScreenList().then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						let market_list = data.market;
						market_list.unshift({
							market_name:'全部',
							market_id:''
						})
						this.market_list = market_list;
						let category_list = data.category;
						category_list.unshift({
							category_name:'全部',
							category_id:''
						})
						this.category_list = category_list;
						let class_list = data.classification;
						class_list.unshift({
							classification_name:'全部',
							classification_id:''
						})
						this.class_list = class_list;
						let style_list = data.shooting_style;
						style_list.unshift({
							shooting_style_name:'全部',
							shooting_style_id:''
						})
						this.style_list = style_list;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//重置
			resetFn(){
				this.supplier_index = -1;
				this.market_index = 0;
				this.category_index = 0;
				this.brand_index = 0;
				this.class_index = 0;
				this.style_index = 0;
				this.rating_index = 0;
				this.season_index = 0;
				//获取当前条件并传递
				this.callbackFn();
			},
			//点击展开或收起
			checkFn(){
				this.$store.commit("setScreen", !this.screen_open);
			},
			// 切换下拉框筛选条件
			checkIndex(type,index){
				switch(type){
				case 'supplier':
					this.a_item = "";
					this.supplier_index = index;
					break;
				case 'market':
					this.market_index = index;
					break;
				case 'category':
					this.category_index = index;
					break;
				case 'brand':
					this.brand_index = index;
					break;
				case 'class':
					this.class_index = index;
					break;
				case 'style':
					this.style_index = index;
					break;
				case 'season':
					this.season_index = index;
					break;
				case 'rating':
					this.rating_index = index;
					break;
				}
				//获取当前条件并传递
				this.callbackFn();
			},
			//点击切换排序条件
			sortFn(index){
				this.sort_list.map((item,i) => {
					if(index == i){
						if(index == this.sort_list.length - 1){
							switch(item.sort){
							case 'default':
								item.sort = 'desc';
								break;
							case 'desc':
								item.sort = 'asc';
								break;
							case 'asc':
								item.sort = 'default';
								break;
							}
						}else{
							switch(item.sort){
							case 'default':
								item.sort = 'desc';
								break;
							case 'desc':
								item.sort = 'default';
								break;
							}
						}
					}else{
						item.sort = 'default';
					}
				})
				//获取当前条件并传递
				this.callbackFn();
			},
			//切换上新时间筛选器
			changeDate(){
				this.up_type = [];
				//获取当前条件并传递
				this.callbackFn();
			},
			//点击查询价格区间
			searchPrice(){
				if(this.start_price != '' && !this.isPrice.test(parseFloat(this.start_price))){
					this.$message.warning('价格必须大于0且最多两位小数');
					return;
				}else if(this.end_price != '' && !this.isPrice.test(parseFloat(this.end_price))){
					this.$message.warning('价格必须大于0且最多两位小数');
					return;
				}else if(parseFloat(this.start_price) > parseFloat(this.end_price)){
					this.$message.warning('起始价格不能高于结束金额');
					return;
				}
				//获取当前条件并传递
				this.callbackFn();
			},
			//获取当前条件并传递
			callbackFn(){	
				var arg = {
					start_time:this.date && this.date.length > 0?this.date[0]:"",
					end_time:this.date && this.date.length > 0?this.date[1]:"",
					start_price:this.start_price?parseFloat(this.start_price):'',
					end_price:this.end_price?parseFloat(this.end_price):'',
					is_merge:this.cate_style_ids.indexOf(7) > -1?1:0
				}

				//处理排序
				let sort_arr = this.sort_list.filter(item => {
					return item.sort != 'default';
				})
				if(sort_arr.length > 0){
					arg[sort_arr[0].key] = sort_arr[0].val + '-' + sort_arr[0].sort;
				}

				//处理款式分类
				if(this.page_type != 'gys_supplier'){
					arg.depth_inventory = this.cate_style_ids.indexOf(1) > -1?1:0;
					arg.video_style = this.cate_style_ids.indexOf(2) > -1?1:0;
					arg.hot_style = this.cate_style_ids.indexOf(3) > -1?1:0;
					arg.data_style = this.cate_style_ids.indexOf(4) > -1?1:0;
					arg.sole_style = this.cate_style_ids.indexOf(5) > -1?1:0;
					arg.again_style = this.cate_style_ids.indexOf(6) > -1?1:0;
					arg.show_offshelf = this.cate_style_ids.indexOf(8) > -1?1:0;
					if(this.cate_style_ids.indexOf(9) > -1){
						arg.price_control = 1;
					}
				}

				//处理供应商
				if(this.page_type == 'index' && (this.a_item == '白坯二开' || this.supplier_index >= 0)){
					if(this.supplier_index >= 0){
						arg.supplier_id = this.supplier_list[this.supplier_index].supplier_id;
					}else{
						arg.supplier_id = this.a_item;
					}
				}
				//处理市场
				if(this.market_index > 0){
					arg.market_id = this.market_list[this.market_index].market_id;
				}
				//处理类目
				if(this.category_index > 0){
					arg.category_id = this.category_list[this.category_index].category_id;
				}
				//处理品牌
				if(this.brand_index > 0){
					arg.brand = this.brand_list[this.brand_index].brand_id;
				}
				//处理分类
				if(this.class_index > 0){
					arg.classification_id = this.class_list[this.class_index].classification_id;
				}
				//处理风格
				if(this.style_index > 0){
					arg.shooting_style_id = this.style_list[this.style_index].shooting_style_id;
				}
				//处理季节
				if((this.page_type == 'index' || this.page_type == 'supplier') && this.season_index > 0){
					arg.season_id = this.season_list[this.season_index].season_id;
				}
				//处理评级
				if(this.page_type != 'gys_supplier' && this.page_type != 'supplier' && this.rating_index > 0){
					arg.grade_id = this.rating_list[this.rating_index].grade_id;
				}
				this.$emit('callback',arg);
			}
		}
	}
</script>
<style type="text/css">
	.custom_checkbox .el-checkbox__label{
		font-size: 12rem!important;
		color: #666666!important;
	}
</style>
<style lang="less" scoped>
	.total_num{
		margin-bottom: 10rem;
		text-align: end;
		font-size: 12rem;
		color: #666666;
	}
	.f12{
		font-size: 12rem;
		color: #666666;
	}
	.selected_box{
		border: 1px solid #E8E8E8;
		padding-left: 26rem;
		padding-right: 26rem;
		background: #F5F5F5;
		height: 26rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #666666;
		font-size: 12rem;
		.selected_left{
			display: flex;
			align-items: center;
			.tj_row{
				display: flex;
				align-items: center;
				.reset_button{
					cursor: pointer;
					margin-left: 30rem;
					border-radius: 10rem;
					border: 1px solid #F37605;
					width: 74rem;
					text-align: center;
					height: 22rem;
					line-height: 21rem;
					color: #F37605;
					font-size: 14rem;
				}
			}
			.right_arrow{
				margin-left: 5rem;
				margin-right: 5rem;
				transform: rotate(-90deg);
				width: 7rem;
				height: 4rem;
			}
		}
		.selected_right{
			display: flex;
			align-items: center;
			cursor:pointer;

		}
	}
	.down_arrow{
		margin-left: 5rem;
		transform: rotate(-90deg);
		width: 7rem;
		height: 4rem;
	}
	.more_arrow{
		margin-left: 5rem;
		width: 7rem;
		height: 4rem;
	}
	.rotate{
		transform: rotate(0deg);
	}
	.up_rotate{
		transform: rotate(180deg);
	}
	.conditions_box{
		background: #ffffff;
		font-size: 12rem;
		.conditions_row{
			border-bottom: 1px dashed #DEDEDE;
			display: flex;
			.lable{
				white-space:normal;
				width: 110rem;
				color: #999999;
			}
			.szm_row{
				display: flex;
				align-items: center;
				.szm_item{
					margin-right: 20px;
					font-size: 12px;
					cursor: pointer;
				}
				.active_index{
					font-weight: bold;
					color: var(--color);
				}
			}

			.list{
				flex:1;
				display: flex;
				flex-wrap: wrap;
				.item{
					cursor:pointer;
					padding: 4px 12px;
					color: #333333;
				}
				.item:hover{
					color:var(--color);
				}
				.active_item{
					color: var(--color);
				}
			}
			.supplier_list{
				max-height: 50px;
				overflow: hidden;
			}
			.more_text{
				font-size: 12px;
				color: #666666;
			}
		}
		.none_border{
			border:none;
		}
	}
	.cate_box{
		margin-top: 8rem;
		border:1px solid #E8E8E8;
		background: #F5F5F5;
		width: 100%;
		padding-left: 26rem;
		padding-right: 26rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12rem;
		color: #666666;
		.sort_row{
			display: flex;
			align-items: center;
			.sort_item{
				border-left:1px solid #F5F5F5;
				border-right:1px solid #F5F5F5;
				height: 40rem;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 25rem;
				display: flex;
				align-items: center;
				padding-left: 3rem;
				padding-right: 3rem;
				cursor:pointer;
				.sort_icon{
					margin-left: 2rem;
					width: 9rem;
					height: 12rem;
				}
			}
			.sort_item:hover{
				border:1px solid #e8e8e8;
				background: #ffffff;
				color:var(--color);
			}
		}
		.style_row{
			display: flex;
			align-items: center;
			.style_item{
				border-left:1px solid #F5F5F5;
				border-right:1px solid #F5F5F5;
				height: 40rem;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 25rem;
				padding-left: 3rem;
				padding-right: 3rem;
				cursor:pointer;
			}
			.style_item:hover{
				border:1px solid #e8e8e8;
				background: #ffffff;
				color:var(--color);
			}
		}
		.price_row{
			display: flex;
			align-items: center;
		}
		.date_row{
			display: flex;
			align-items: center;
		}
		.active_color{
			border:1px solid #e8e8e8;
			background: #ffffff;
			color:var(--color);
		}
	}
	.cate_box_bottom{
		padding-left: 26rem;
		margin-bottom: 10rem;
		border-left:1px solid #E8E8E8;
		border-right:1px solid #E8E8E8;
		border-bottom:1px solid #E8E8E8;
		display: flex;
		align-items: center;
		height: 40rem;
	}
</style>