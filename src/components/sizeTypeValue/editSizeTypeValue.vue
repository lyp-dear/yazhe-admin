<template>
	<div class="box">
		<div class="container">
			<el-radio-group v-model="labelPosition" size="small">
				<el-radio-button label="left">左对齐</el-radio-button>
				<el-radio-button label="right">右对齐</el-radio-button>
				<el-radio-button label="top">顶部对齐</el-radio-button>
			</el-radio-group>

			<el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
				<el-form-item label="尺寸值名称" prop="value">
					<el-input v-model="data.value" placeholder="请填写尺寸值名称"></el-input>
				</el-form-item>
				<el-form-item label="尺寸类型图" prop="image">
					<upload-image v-on:selectCover="getCover" :imgUrl="data.image"></upload-image>
				</el-form-item>
				<!--<el-form-item label="尺寸类型" prop="size_config_id">
					<el-select v-model="data.size_config_id" clearable placeholder="请选择" :disabled="true">
						<el-option v-for="item in infoArray" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>-->
				<el-form-item>
					<el-button type="primary" @click="submitForm('data')">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { UpdateSizeTypeValue, SizeTypeList } from 'api/sizeTypeValue'
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
					value: '',
					image: '',
					//size_config_id: '',

				},
				rules: {
					value: [{
						required: true,
						message: '请填写尺寸值名称',
						trigger: 'blur,input,change'
					}],
					image: [{
						required: true,
						message: '请上传图片',
						trigger: 'blur,change'
					}],
//					size_config_id: [{
//						required: true,
//						message: '请上传图片',
//						trigger: 'blur,change'
//					}]
				}
			};
		},
		methods: {
			getCover(val) {
				this.data.image = val;
			},
			getData() {
				if(this.$route.params.image == undefined) {
					this.$router.push({
						path: '/sizeTypeValueList'
					})
					return;
				}
				this.data.image = this.$route.params.image;
				this.data.value = this.$route.params.value;
			},
			getSizeTypeList() {
				const loading = showLoading();
				SizeTypeList().then((res) => {
					loading.close();
					console.log(res)
					if(res.data.code == ERR_CODE) {
						let data = res.data.data;
						for(let i = 0; i < data.length; i++) {
							let obj = {
								label: data[i].title,
								value: data[i].id,
							}
							this.infoArray.push(obj);
						}
					} else {
						showNotification('warning', res.data.msg)
					}
				})

			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const loading = showLoading();
						let options = {
							value: this.data.value,
							image: this.data.image,
							status: 0,
							id: this.$route.params.id
						}
						options = JSON.stringify(options);
						UpdateSizeTypeValue(options).then((res) => {
							loading.close();
							if(res.data.code == ERR_CODE) {
								showNotification('success', '编辑尺寸类型值成功');
								this.$router.push({
									path: '/sizeTypeValueList'
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
			this.getSizeTypeList();
			this.getData();
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