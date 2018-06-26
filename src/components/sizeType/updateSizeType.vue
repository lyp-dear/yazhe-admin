<template>
	<div class="box">
		<div class="container">
			<el-radio-group v-model="labelPosition" size="small">
				<el-radio-button label="left">左对齐</el-radio-button>
				<el-radio-button label="right">右对齐</el-radio-button>
				<el-radio-button label="top">顶部对齐</el-radio-button>
			</el-radio-group>
			<el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
				<el-form-item label="尺寸名称" prop="title">
					<el-input v-model="data.title" placeholder="请填写尺寸名称"></el-input>
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
	import { UpdateSizeType } from 'api/sizeType'

	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification } from 'common/js/common'

	export default {
		data() {
			return {

				postData: {},
				labelPosition: 'top',

				data: {
					title: '',
					type: '',

				},
				sizeTypeId: '',
				rules: {
					title: [{
						required: true,
						message: '请填写尺寸名称',
						trigger: 'blur,input,change'
					}]
				}
			};
		},
		methods: {
			getData() {
				if(this.$route.params.title == undefined) {
					this.$router.push({
						path: '/sizeTypeList'
					})
					return;
				}
				this.data.title = this.$route.params.title;
				this.sizeTypeId = this.$route.params.id;
				if(this.$route.params.type === '全定制') {
					this.data.type = true;
				} else {
					this.data.type = false;
				}
			},
			submitForm(formName) {
				console.log(this.data.type)
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const loading = showLoading();
						let options = {
							title: this.data.title,
							id: this.sizeTypeId,
							status: 0
						}
						if(this.data.type) {
							options.type = 1;
						} else {
							options.type = 0;
						}
						options = JSON.stringify(options);
						UpdateSizeType(options).then((res) => {
							loading.close();
							if(res.data.code == ERR_CODE) {
								showNotification('success', '添加成功');
								this.$router.push({
									path: '/sizeTypeList'
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
			this.getData();
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