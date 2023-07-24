<template>
	<el-form size="mini" style="width: 360px;padding-left: 30px;" >
		<el-form-item label="供应商名称：">
			<div>{{info_arg.supplier_name}}</div>
		</el-form-item>
		<el-form-item label="供应商简称：">
			<div>{{info_arg.supplier_code}}</div>
		</el-form-item>
		<el-form-item label="开发员：">
			<div>{{info_arg.developer}}</div>
		</el-form-item>
		<el-form-item label="开发日期：">
			<div>{{info_arg.develop_date}}</div>
		</el-form-item>
		<el-form-item label="介绍人：">
			<div>{{info_arg.introducer}}</div>
		</el-form-item>
		<el-form-item label="分类：">
			<div>{{info_arg.classification}}</div>
		</el-form-item>
		<el-form-item label="是否石狮：">
			<div>{{info_arg.is_ss}}</div>
		</el-form-item>
		<el-form-item label="区域：">
			<div>{{info_arg.area}}</div>
		</el-form-item>
		<el-form-item label="主营：">
			<div>{{info_main_business_value}}</div>
		</el-form-item>
		<el-form-item label="擅长品类：">
			<div>{{info_scpl_value}}</div>
		</el-form-item>
		<el-form-item label="是否自有工厂：">
			<div>{{info_arg.supply_free_factory}}</div>
		</el-form-item>
		<el-form-item label="是否自有设计能力：">
			<div>{{info_arg.supply_design}}</div>
		</el-form-item>
		<el-form-item label="是否有外发能力：">
			<div>{{info_arg.supply_out_send}}</div>
		</el-form-item>
		<el-form-item label="是否可退货：">
			<div>{{info_arg.supply_return_goods}}</div>
		</el-form-item>
		<el-form-item label="是否可换货：">
			<div>{{info_arg.supply_exchange_goods}}</div>
		</el-form-item>
		<el-form-item label="是否可代发：">
			<div>{{info_arg.supply_replace_send}}</div>
		</el-form-item>
		<el-form-item label="结算方式：">
			<div>{{info_arg.settlement_method}}</div>
		</el-form-item>
		<el-form-item label="联系人：">
			<div>{{info_arg.contactor}}</div>
		</el-form-item>
		<el-form-item label="联系电话：">
			<div>{{info_arg.contact_information}}</div>
		</el-form-item>
		<el-form-item label="联系人职位：">
			<div>{{info_arg.contactor_position}}</div>
		</el-form-item>
		<el-form-item label="联系人微信：">
			<div>{{info_arg.weixin}}</div>
		</el-form-item>
		<el-form-item label="收款人姓名：">
			<div>{{info_arg.payee}}</div>
		</el-form-item>
		<el-form-item label="收款人账号：">
			<div>{{info_arg.payee_account}}</div>
		</el-form-item>
		<el-form-item label="收款人开户行：">
			<div>{{info_arg.payee_bank_name}}</div>
		</el-form-item>
		<el-form-item label="创建SCM系统：">
			<div>{{info_arg.is_scm}}</div>
		</el-form-item>
		<el-form-item label="产品价位段：">
			<div>{{info_arg.start_price}}~{{info_arg.end_price}}</div>
		</el-form-item>
		<el-form-item label="性价比：">
			<div>{{info_arg.cost_performance}}</div>
		</el-form-item>
		<el-form-item label="合作程度：">
			<div>{{info_arg.cooperativeness}}</div>
		</el-form-item>
		<el-form-item label="地址：">
			<div>{{info_arg.address}}</div>
		</el-form-item>
		<el-form-item label="供应商合作客户：">
			<div>{{info_arg.supplier_cooperate_custom}}</div>
		</el-form-item>
		<el-form-item label="备注：">
			<div>{{info_arg.description}}</div>
		</el-form-item>
		<el-form-item label="填报状态：">
			<div v-if="info_arg.status <= 2">{{info_arg.status | info_refund_status}}</div>
				<div v-else>填报后审核通过</div>
			</el-form-item>
			<el-form-item label="拒绝原因：" v-if="info_arg.status == 2">
				<div>{{info_arg.info_refund_remark}}</div>
			</el-form-item>
			<el-form-item label="供应商拜访记录图片：">
				<div>
					<el-image style="width: 80px;height: 80px;margin-right: 10px;" :z-index="99999" :src="item" :initial-index="index" :preview-src-list="visiting_imgs" v-for="(item,index) in visiting_imgs">
					</el-image>
				</div>
			</el-form-item>
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
		</el-form>
	</template>
	<script>
		import resource from '../../api/chain_resource.js'
		export default{
			data(){
				return{
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
				visiting_imgs:[],				//拜访图片
				business_license_img:[],		//工商营业执照
				company_img:[],					//公司照片
				info_main_business_value:"",	//主营
				info_scpl_value:"",				//擅长品类
				company_name:"",				//公司名称
			}
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
		},
		created(){
			let reserve_id = this.$route.query.reserve_id;
			//点击填报阶段审核/查看
			this.checkInfo(reserve_id);
			// this.checkInfo(178);
		},
		methods:{
			//点击填报阶段审核/查看
			checkInfo(reserve_id){
				resource.gysybkDetail({reserve_id:reserve_id}).then(res => {
					if(res.data.code == 1){
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
			},
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
	}
</script>
<style lang="less" scoped>
	
</style>