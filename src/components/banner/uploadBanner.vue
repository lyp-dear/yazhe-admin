<template>
	<div class="box">
		<div class="container">
			<el-radio-group v-model="labelPosition" size="small">
				<el-radio-button label="left">左对齐</el-radio-button>
				<el-radio-button label="right">右对齐</el-radio-button>
				<el-radio-button label="top">顶部对齐</el-radio-button>
			</el-radio-group>
			<el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
				<el-form-item label="封面" prop="cover">
					<upload-image v-on:selectCover="getCover"></upload-image>
				</el-form-item>
				<el-form-item label="商品id" prop="id">
					<el-input v-model="data.id" placeholder="请填写商品id"></el-input>
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
	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification } from 'common/js/common'
	import UploadImage from 'base/uploadImage'

	export default {
		data() {
			return {

				postData: {},
				labelPosition: 'top',

				data: {
					cover: '',
					id: '',

				},
				rules: {
					cover: [{
						required: true,
						message: '请上传图片',
						trigger: 'blur,change'
					}],
					id: [{
						required: true,
						message: '请填写商品id',
						trigger: 'blur,input,change'
					}]
				}
			};
		},
		methods: {
			getCover(val){
				this.data.cover = val;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const loading = showLoading();
						let options = {
							image: this.data.cover,
							link: this.data.id
						}
						options = JSON.stringify(options);
						AddBanner(options).then((res) => {
							loading.close();
							if(res.data.code == ERR_CODE) {
								showNotification('success', '添加成功');
								this.$router.push({
									path: '/bannerList'
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