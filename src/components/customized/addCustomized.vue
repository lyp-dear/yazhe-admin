<template>
	<div class="box">
		<div class="container">
			<el-radio-group v-model="labelPosition" size="small">
				<el-radio-button label="left">左对齐</el-radio-button>
				<el-radio-button label="right">右对齐</el-radio-button>
				<el-radio-button label="top">顶部对齐</el-radio-button>
			</el-radio-group>
			<el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
				<el-form-item label="名称" prop="name">
					<el-input v-model="data.name" placeholder="请填写定制类型的名称"></el-input>
				</el-form-item>
				<el-form-item label="商品分类" prop="category_id">
					<el-select v-model="data.cagegory_id" clearable placeholder="请选择">
						<el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否全定制">
					<el-switch style="display: block" v-model="data.type" active-color="#13ce66" inactive-color="#ff4949" active-text="全定制" inactive-text="半定制">
					</el-switch>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('data')">提交</el-button>
				</el-form-item>
			</el-form>
		</div>

	</div>
</template>

<script>
	import { CommodityList } from 'api/commodity'
	import { AddCustomized } from 'api/customized'
	

	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification } from 'common/js/common'

	export default {
		data() {
			return {

				list: [],
				postData: {},
				labelPosition: 'top',

				data: {
					name: '',
					type: '',
					cagegory_id: '',

				},
				rules: {
					name: [{
						required: true,
						message: '请填写定制类型的名称',
						trigger: 'blur,input,change'
					}],
					cagegory_id: [{
						required: true,
						message: '请选择商品类型',
						trigger: 'blur,change'
					}],
				}
			};
		},
		methods: {
			getCommodityList() {
				const loading = showLoading();
				CommodityList(100, 0).then((res) => {
					console.log(res)
					loading.close();
					if(res.data.code === ERR_CODE) {
						let data = res.data.data;
						for(let i = 0; i < res.data.data.length; i++) {
							let obj = {
								value: data[i].cagegory_id,
								label: data[i].title
							}
							this.list.push(obj);
						}
					} else {
						showNotification('warning', res.data.msg)
					}
				})

			},
			submitForm(formName) {
				console.log(this.data.type);
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const loading = showLoading();
						let options = {
							name: this.data.name,
							cagegory_id: this.data.cagegory_id,
							type: this.data.type
						}
						if(this.data.type) {
							options.type = 1;
						} else {
							options.type = 0;
						}
						options = JSON.stringify(options);
						AddCustomized(options).then((res) => {
							loading.close();
							if(res.data.code == ERR_CODE) {
								showNotification('success', '添加成功');
								this.$router.push({
									path: '/customizedList'
								});
							} else {
								showNotification('warning', res.data.msg);
							}
						}).catch((res) => {
							loading.close();
							showNotification('error', '网络错误,请稍后!')
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		created() {
			this.getCommodityList();
		}
	}
</script>
<style scoped>
	.container {
		width: 800px;
		margin: 0 auto;
	}
	
	.el-radio-group {
		margin-bottom: 20px;
	}
	
	.el-form--label-top .el-form-item {
		text-align: left;
	}
	
	.el-select {
		width: 100%;
	}
	
	.submit-btn button {
		width: 400px;
	}
</style>