<template>
	<div>
		<el-upload class="upload-demo" action="https://upload-z2.qiniup.com" :before-upload="beforeAvatarUpload" :drag="true" :data="postData" :on-success="uploadSuccess" :on-remove="removeCover">
			<i class="el-icon-upload" v-if="!cover"></i>
			<div class="img" v-if="cover">
				<img :src="cover" class="avatar">
			</div>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
		</el-upload>
	</div>
</template>

<script>
	import { GetToken } from 'api/banner'
	import { ERR_CODE } from 'api/config'
	import { showLoading, showNotification } from 'common/js/common'

	export default {
		props: {
			imgUrl: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				postData: {},
				cover: '',
			}
		},
		methods: {
			beforeAvatarUpload(file) {
				console.log(file)
				let isJPG = file.type.split('/')[0];
				const isLt2M = file.size / 1024 / 1024 < 5;

				if(isJPG != 'image') {
					isJPG = false;
					showNotification('error', '上传头像只能是图片!');
				}
				return isJPG;
			},
			uploadSuccess(res,file) {
				console.log(res)
				this.cover = 'http://p5of89u6y.bkt.clouddn.com/' + res.key;
				this.$emit('selectCover', this.cover)
			},
			removeCover(file) {
				this.cover = '';
			},
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
		watch:{
			imgUrl(val){
				this.cover = val;
			}
		}
	}
</script>

<style scoped>
.img{
	width: 360px;
	height: 180px;
}
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>