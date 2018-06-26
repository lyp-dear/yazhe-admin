<template>
	<div class="box">
		<div class="container">
			<el-radio-group v-model="labelPosition" size="small">
				<el-radio-button label="left">左对齐</el-radio-button>
				<el-radio-button label="right">右对齐</el-radio-button>
				<el-radio-button label="top">顶部对齐</el-radio-button>
			</el-radio-group>
			<el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
				<el-form-item label="咨询标题" prop="title">
					<el-input v-model="data.title" clearable placeholder="请填写咨询标题"></el-input>
				</el-form-item>
				<el-form-item label="封面" prop="picture">
					<upload-image v-on:selectCover="getCover"></upload-image>
				</el-form-item>
				<el-form-item label="咨询来源" prop="source">
					<el-input v-model="data.source" clearable placeholder="请填写咨询来源"></el-input>
				</el-form-item>
				<el-form-item label="作者" prop="auth">
					<el-input v-model="data.auth" clearable placeholder="请填写作者"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-select v-model="data.type" clearable placeholder="请选择">
						<el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="内容" prop="context">
					<editor v-on:listenToDetail="getDetail"></editor>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('data')">提交</el-button>
				</el-form-item>
			</el-form>
		</div>

	</div>
</template>

<script>
	import { AddBanner } from 'api/banner'
	import { AddConsult } from 'api/consult'
	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification } from 'common/js/common'
	import UploadImage from 'base/uploadImage'
	import Editor from 'base/editor'

	export default {
		data() {
			return {

				postData: {},
				labelPosition: 'top',

				data: {
					title: '',
					source: '',
					picture: '',
					auth: '',
					context: '',
					type: ''
				},
				typeOption: [{
					value: '1',
					label: '着装品格'
				}, {
					value: '2',
					label: '面料养护'
				}, {
					value: '3',
					label: '奢侈驿站'
				}, {
					value: '4',
					label: '财经咨询'
				}, {
					value: '5',
					label: '公司咨询'
				}],
				rules: {
					picture: [{
						required: true,
						message: '请上传图片',
						trigger: 'blur,change'
					}],
					title: [{
						required: true,
						message: '请填写咨询标题',
						trigger: 'blur,change'
					}],
					source: [{
						required: true,
						message: '请填写咨询来源',
						trigger: 'blur,change'
					}],
					auth: [{
						required: true,
						message: '请填写作者',
						trigger: 'blur,change'
					}],
					type: [{
						required: true,
						message: '请选择类型',
						trigger: 'blur,change'
					}],
					context: [{
						required: true,
						message: '请填写内容',
						trigger: 'blur,change'
					}],
				}
			};
		},
		methods: {
			getCover(val) {
				this.data.picture = val;
			},
			getDetail(val) {
				this.data.context = val;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const loading = showLoading();
						let options = this.data;
						AddConsult(options).then((res) => {
							loading.close();
							if(res.data.code == ERR_CODE) {
								showNotification('success', '添加成功');
								this.$router.push({
									path: '/consultList'
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
		created() {},
		components: {
			UploadImage,
			Editor
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