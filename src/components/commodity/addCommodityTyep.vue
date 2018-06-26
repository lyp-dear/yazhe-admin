<template>
	<div>
		<el-radio-group v-model="labelPosition" size="small">
			<el-radio-button label="left">左对齐</el-radio-button>
			<el-radio-button label="right">右对齐</el-radio-button>
			<el-radio-button label="top">顶部对齐</el-radio-button>
		</el-radio-group>
		<el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
			<el-form-item label="商品分类名称" prop="name">
				<el-input v-model="data.name"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<el-radio-group v-model.number="data.gender">
					<el-radio :label="1">男</el-radio>
					<el-radio :label="2">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('data')">提交</el-button>
				<el-button @click="resetForm('data')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>
<script>
	import { AddCommodityType } from 'api/commodity'
	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification } from 'common/js/common'

	export default {
		data() {
			return {
				labelPosition: 'top',

				data: {
					name: '',
					gender: '',

				},
				rules: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur,change'
					}],
					gender: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const loading = showLoading();
						let options = {
							title: this.data.name,
							parent: this.data.gender
						}
						options = JSON.stringify(options);
						AddCommodityType(options).then((res) => {
							loading.close();
							if(res.data.code == ERR_CODE) {
								showNotification('success', '提交成功');
								this.$router.push({
									path: '/commodityList'
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
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>
<style scoped>
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