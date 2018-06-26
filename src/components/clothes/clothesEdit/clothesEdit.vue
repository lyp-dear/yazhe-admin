<template>
	<div id="goods">
		<el-radio-group v-model="labelPosition" size="small">
			<el-radio-button label="left">左对齐</el-radio-button>
			<el-radio-button label="right">右对齐</el-radio-button>
			<el-radio-button label="top">顶部对齐</el-radio-button>
		</el-radio-group>
		<el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
			<el-form-item label="商品名称" prop="goods_name">
				<el-input v-model="data.goods_name"></el-input>
			</el-form-item>
			<el-form-item label="商品分类" prop="category_id">
				<el-select v-model="data.category_id" clearable placeholder="请选择">
					<el-option v-for="item in categoryOption" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="封面" prop="picture_url">
				<upload-image v-on:selectCover="getCover" :imgUrl="data.picture_url" ref="upload"></upload-image>
			</el-form-item>
			<el-form-item label="商品图片">
				<el-upload class="upload-demo" action="https://upload-z2.qiniup.com" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :on-success="uploadSuccess" multiple :before-upload="beforeAvatarUpload" :limit="10" :on-exceed="handleExceed" :data="postData" :file-list="fileList" list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
				</el-upload>
			</el-form-item>
			<el-form-item label="价格" prop="price">
				<el-input v-model="data.price"></el-input>
			</el-form-item>
			<el-form-item label="市场价" prop="market_price">
				<el-input v-model="data.market_price"></el-input>
			</el-form-item>
			<el-form-item label="库存" prop="stock">
				<el-input v-model="data.stock"></el-input>
			</el-form-item>
			<el-form-item label="定制类型" prop="type">
				<el-select v-model="data.type" clearable placeholder="请选择">
					<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<div class="pay-info">
				<div class="title">
					<el-row>
						<el-col :span="6">
							<div class="grid-content bg-purple"><span style="color: #f56c6c;">*</span>商品属性</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content bg-purple-light"><span style="color: #f56c6c;">*</span>商品属性值</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content bg-purple-light"><span style="color: #f56c6c;">*</span>商品价格</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content bg-purple-light"><span style="color: #f56c6c;">*</span>商品商品</div>
						</el-col>
						<el-col :span="3">

						</el-col>
					</el-row>
				</div>
				<el-form-item>
					<div class="input-pay-box" v-for="(item,index) in data.goodsAndAttributeVo" :key="index">
						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content bg-purple">
									<el-form-item :prop="'goodsAndAttributeVo.' + index + '.attribute_id'" :rules="[{required: true,message: '请选择商品规格',trigger: 'blur,input,change'}]">
										<el-select v-model="item.attribute_id" clearable placeholder="请选择">
											<el-option v-for="item in attrOptions" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</div>
							</el-col>
							<el-col :span="6">
								<el-form-item :prop="'goodsAndAttributeVo.' + index + '.value'" :rules="[{required: true,message: '请输入商品尺寸',trigger: 'blur,input,change'}]">
									<el-input placeholder="请输入商品尺寸" v-model.trim="item.value"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :prop="'goodsAndAttributeVo.' + index + '.price'" :rules="[{required: true,message: '请输入商品价格',trigger: 'blur,input,change'}]">
									<el-input placeholder="请输入商品价格" v-model.trim="item.price"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :prop="'goodsAndAttributeVo.' + index + '.picture'" :rules="[{required: true,message: '请上传商品图片',trigger: 'blur,input,change'}]">

									<el-upload class="upload-demo" action="https://upload-z2.qiniup.com" :on-preview="handleGoodsPreview" :on-remove="handleGoodsRemove" :on-success="uploadGoodsSuccess" :before-upload="beforeGoodsUpload(index)" multiple :limit="1" :data="postData" :on-exceed="handleGoodsExceed" :file-list="goodsImgList">
										<el-button size="small" type="primary">点击上传</el-button>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="3">
								<el-button type="info" plain v-if="index != 0" @click="removeGoodsAndAtt(item)">删除</el-button>
							</el-col>
						</el-row>
					</div>
				</el-form-item>
				<div class="add-pay">
					<el-button type="primary" @click="addGoodsAndAtt">添加商品规格</el-button>
				</div>
			</div>
			<el-form-item label="详情" prop="remark">
				<editor v-on:listenToDetail="getDetail" :description="data.remark"></editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('data')">提交</el-button>
				<el-button @click="resetForm('data')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>
<script>
	import { CommodityList } from 'api/commodity'
	import { AttributeList } from 'api/attribute'
	import { AddGood, Detail, Update } from 'api/clothes'
	import { GetToken } from 'api/banner'
	import { ERR_CODE } from 'api/config'

	import UploadImage from 'base/uploadImage'
	import Editor from 'base/editor'
	import { showLoading, showNotification } from 'common/js/common'

	export default {
		data() {
			return {
				currentPage: 1,
				id: '',
				fileList: [],
				postData: {},
				labelPosition: 'top',
				goodsImgIndex: 0,
				goodsImgList: [],
				data: {
					goods_name: '',
					category_id: '',
					picture_url: '',
					price: '',
					market_price: '',
					stock: '',
					type: '',
					remark: '',
					goodsAlbumVO: [],
					goodsAndAttributeVo: []

				},
				categoryOption: [],
				typeOptions: [{
					value: 0,
					label: '半定制',
				}, {
					value: 1,
					label: '全定制',
				}, {
					value: 2,
					label: '居家生活',
				}, {
					value: 3,
					label: '特惠',
				}],
				attrOptions: [],
				rules: {
					goods_name: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur,change'
					}],
					category_id: [{
						required: true,
						message: '请选择商品分类',
						trigger: 'blur,change'
					}],
					cagegory_id: [{
						required: true,
						message: '请选择商品类型',
						trigger: 'blur,change'
					}],
					gender: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					picture_url: [{
						required: true,
						message: '请上传封面图片',
						trigger: 'blur,change'
					}],
					goodsAlbumVO: [{
						required: true,
						message: '请上传商品图片',
						trigger: 'blur,change'
					}],
					price: [{
						required: true,
						message: '请输入价格',
						trigger: 'blur,change'
					}],
					market_price: [{
						required: true,
						message: '请输入市场价',
						trigger: 'blur,change'
					}],
					stock: [{
						required: true,
						message: '请输入库存',
						trigger: 'blur,change'
					}],
					type: [{
						required: true,
						message: '请选择类型',
						trigger: 'blur,change'
					}],
					remark: [{
						required: true,
						message: '请输入详情',
						trigger: 'blur,change'
					}],
				}
			};
		},
		methods: {
			beforeAvatarUpload(file) {
				let isJPG = file.type.split('/')[0];
				const isLt2M = file.size / 1024 / 1024 < 5;

				if(isJPG != 'image') {
					isJPG = false;
					showNotification('error', '上传商品图片只能是图片!');
				}
				if(!isLt2M) {
					showNotification('error', '上传商品图片大小不能超过 5MB!');
				}
				return isJPG && isLt2M;
			},
			getData() {
				let data = this.$route.params;
				if(data.goods_id == undefined) {
					this.$router.push({
						path: '/clothesList'
					})
					return;
				}
				this.id = data.goods_id;
				let options = {
					goods_id: data.goods_id
				}
				Detail(options).then(res => {
					if(res.data.code === ERR_CODE) {
						let data = res.data.data;
						this.data.goods_name = data.goods_name;
						this.data.category_id = data.category_id;
						this.data.price = data.price;
						this.data.market_price = data.market_price;
						this.data.stock = data.stock;
						this.data.picture_url = data.picture_url;
						this.data.market_price = data.market_price;
						this.data.remark = data.remark;
						data.goodsAlbum.map((item, index) => {
							let obj = {
								name: index + 1,
								url: item.image_url
							}
							this.fileList.push(obj)
							this.data.goodsAlbumVO.push({
								image_url: item.image_url
							})
						})

						data.goodsAndAttribute.map((item,index) => {
							let obj = {
								name: index + 1,
								url: item.picture
							}
							this.goodsImgList.push(obj)
							this.data.goodsAndAttributeVo.push({
								attribute_id: item.attribute_id,
								price: item.price,
								picture: item.picture,
								value: item.value,
							})
						})
						this.data.goodsAndAttributeVO = data.goodsAndAttributeVO;
						this.data.type = data.type;
					}
				})

			},
			getCover(val) {
				this.data.picture_url = val;
			},
			uploadSuccess(res) {
				this.data.goodsAlbumVO.push({
					image_url: `http://p5of89u6y.bkt.clouddn.com/${res.key}`
				})
			},
			handleRemove(file, fileList) {
				this.data.goodsAlbumVO = [];
				fileList.map(item => {
					if(item.response != undefined) {
						this.data.goodsAlbumVO.push({
							image_url: `http://p5of89u6y.bkt.clouddn.com/${item.response.key}`
						})
					} else {
						this.data.goodsAlbumVO.push({
							image_url: item.url
						})
					}
				})
			},
			handlePreview(file) {},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//商品
			beforeAvatarGoodsUpload(file) {
				let isJPG = file.type.split('/')[0];
				const isLt2M = file.size / 1024 / 1024 < 5;

				if(isJPG != 'image') {
					isJPG = false;
					showNotification('error', '上传商品图片只能是图片!');
				}
				if(!isLt2M) {
					showNotification('error', '上传商品图片大小不能超过 5MB!');
				}
				return isJPG && isLt2M;
			},
			uploadGoodsSuccess(res) {
				//				this.data.goodsAlbumVO.push({
				//					image_url: `http://p5of89u6y.bkt.clouddn.com/${res.key}`
				//				})
				this.data.goodsAndAttributeVo[this.goodsImgIndex].picture = `http://p5of89u6y.bkt.clouddn.com/${res.key}`;

			},
			handleGoodsRemove(file, fileList) {},

			handleGoodsPreview(file) {},
			handleGoodsExceed(files, fileList) {
				this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeGoodsUpload(index) {
				this.goodsImgIndex = index;
			},
			getCommodityList() {
				const loading = showLoading();
				CommodityList(100, this.currentPage).then((res) => {
					loading.close();
					if(res.data.code === ERR_CODE) {
						let data = res.data.data;
						for(let i = 0; i < res.data.data.length; i++) {
							let obj = {
								value: data[i].cagegory_id,
								label: data[i].title
							}
							this.categoryOption.push(obj);
						}
					} else {
						showNotification('warning', res.data.msg)
					}
				})

			},
			getAttributeList() {
				const loading = showLoading();
				AttributeList(this.currentPage).then((res) => {
					loading.close();
					if(res.data.code == ERR_CODE) {
						let data = res.data.data;
						for(let i = 0; i < res.data.data.length; i++) {
							let obj = {
								value: data[i].attribute_id,
								label: data[i].name
							}
							this.attrOptions.push(obj);
						}
					} else {
						showNotification('warning', res.data.msg)
					}
				})

			},
			getDetail(val) {
				this.data.remark = val;
			},
			//添加员工信息数组
			addGoodsAndAtt() {
				this.data.goodsAndAttributeVo.push({
					attribute_id: '',
					value: '',
					price: '',
					picture: ''
				});
			},
			//删除员工信息数据
			removeGoodsAndAtt(item) {
				var index = this.data.goodsAndAttributeVo.indexOf(item)
				if(index !== -1) {
					this.data.goodsAndAttributeVo.splice(index, 1)
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const loading = showLoading();
						let options = {
							goods_name: this.data.goods_name,
							category_id: this.data.category_id,
							price: this.data.price,
							market_price: this.data.market_price,
							stock: this.data.stock,
							picture_url: this.data.picture_url,
							market_price: this.data.market_price,
							remark: this.data.remark,
							goodsAlbumVO: this.data.goodsAlbumVO,
							type: this.data.type,
							goodsAndAttributeVO: this.data.goodsAndAttributeVo,
							status: 0,
							goods_id: this.id
						}
						options = JSON.stringify(options);
						Update(options).then((res) => {
							loading.close();
							if(res.data.code == ERR_CODE) {
								showNotification('success', '修改成功');
								this.$router.push({
									path: '/clothesList'
								});
							} else {
								showNotification('warning', res.data.msg);
							}
						}).catch((res) => {
							loading.close();
							showNotification('error', '网络错误,请稍后!')
						})
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.$refs.upload.removeCover();
			}
		},
		created() {
			GetToken().then((res) => {
				if(res.data.code == ERR_CODE) {
					this.postData = {
						token: res.data.data
					}
				}
			})
		},
		mounted() {
			this.getData();
			this.getCommodityList();
			this.getAttributeList();

		},
		watch: {
			$route(val) {
				if(val.name == 'clothesEdit') {
					this.getData();
				}
			}
		},
		components: {
			UploadImage,
			Editor
		},
	}
</script>
<style scoped>
	#goods {
		width: 1000px;
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
	
	.pay-info {
		width: 60%;
	}
	
	.title {
		padding: 20px 0;
		text-align: center;
		color: #5a5e66;
	}
	
	.input-pay-box {
		padding: 0 10px 10px 10px;
	}
	
	.add-pay {
		text-align: left;
		margin-left: 10px;
		margin-bottom: 40px;
	}
</style>