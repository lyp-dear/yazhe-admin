<template>
	<div class="box">
		<div class="container">
			<el-radio-group v-model="labelPosition" size="small">
				<el-radio-button label="left">左对齐</el-radio-button>
				<el-radio-button label="right">右对齐</el-radio-button>
				<el-radio-button label="top">顶部对齐</el-radio-button>
			</el-radio-group>

			<el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
				<el-form-item label="定制类型值名称" prop="name">
					<el-input v-model="data.name" placeholder="请填写定制类型值名称"></el-input>
				</el-form-item>
				<el-form-item label="定制类型值图" prop="image">
					<upload-image v-on:selectCover="getCover"></upload-image>
				</el-form-item>
				<el-form-item label="定制类型" prop="customized_id">
					<el-select v-model="data.customized_id" clearable placeholder="请选择">
						<el-option v-for="item in infoArray" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('data')">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { AddSizeTypeValue, SizeTypeList } from 'api/sizeTypeValue'
	import { CustomizedList ,AddCustomizedValue} from 'api/customized'
	
	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification } from 'common/js/common'
	import UploadImage from 'base/uploadImage'

	export default {
		data() {
			return {

				postData: {},
				labelPosition: 'top',
				infoArray: [],

				data: {
					name: '',
					image: '',
					customized_id: '',

				},
				rules: {
					name: [{
						required: true,
						message: '请填写定制类型值名称',
						trigger: 'blur,input,change'
					}],
					image: [{
						required: true,
						message: '请上传图片',
						trigger: 'blur,change'
					}],
					customized_id: [{
						required: true,
						message: '请上传图片',
						trigger: 'blur,change'
					}]
				}
			};
		},
		methods: {
			getCustomizedList() {
				const loading = showLoading();
				let options = {
					pageSize: 1000,
					currentPage: 0
				}
				CustomizedList(options).then((res) => {
					loading.close();
					if(res.data.code == ERR_CODE) {
						let data = res.data.data;
						for(let i = 0; i < data.length; i++) {
							let obj = {
								label: data[i].name,
								value: data[i].id,
							}
							this.infoArray.push(obj);
						}
					} else {
						showNotification('warning', res.data.msg)
					}
				})

			},
			getCover(val) {
				this.data.image = val;
				console.log(this.data.image)
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const loading = showLoading();
						let options = {
							name: this.data.name,
							image: this.data.image,
							customized_id: this.data.customized_id
						}
						options = JSON.stringify(options);
						AddCustomizedValue(options).then((res) => {
							loading.close();
							if(res.data.code == ERR_CODE) {
								showNotification('success', '添加成功');
								this.$router.push({
									path: '/customizedValueList'
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
			this.getCustomizedList();
		},
		components: {
			UploadImage
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