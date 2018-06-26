<template>
	<div>
		<el-radio-group v-model="labelPosition" size="small">
			<el-radio-button label="left">左对齐</el-radio-button>
			<el-radio-button label="right">右对齐</el-radio-button>
			<el-radio-button label="top">顶部对齐</el-radio-button>
		</el-radio-group>
		<el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
			<el-form-item label="商品种类名称" prop="name">
				<el-input v-model="data.name"></el-input>
			</el-form-item>
			<el-form-item label="商品类型" prop="category_id">
				<el-select v-model="data.category_id" clearable placeholder="请选择">
					<el-option v-for="item in infoArray" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('data')">提交</el-button>
				<el-button @click="resetForm('data')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>
<script>
	import { AllCagecory, AddAttribute } from 'api/attribute'
	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification } from 'common/js/common'

	export default {
		data() {
			return {
				labelPosition: 'top',
				infoArray: [],
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
					category_id: [{
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
							name: this.data.name,
							category_id: this.data.category_id
						}
						options = JSON.stringify(options);
						AddAttribute(options).then((res) => {
							loading.close();
							if(res.data.code == ERR_CODE) {
								showNotification('success', '提交成功');
								this.$router.push({
									path: '/attributeList'
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
		},
		created() {
			AllCagecory().then((res) => {
				console.log(res)
				if(res.data.code == ERR_CODE) {
					for(let i = 0; i < res.data.data.length; i++) {
						let obj = {
							label: res.data.data[i].title,
							value: res.data.data[i].cagegory_id,
						}
						this.infoArray.push(obj)
					}
				}
			})
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