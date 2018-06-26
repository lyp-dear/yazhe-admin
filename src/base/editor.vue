<template>
	<div class="editor-box">
		<quill-editor ref="myTextEditor" v-model="content" @change="onEditorChange($event)" :option="editorOption"></quill-editor>
	</div>
</template>

<script type="text/ecmascript-6">
	import { randomWord, getDate, handle, showLoading, showNotification } from 'common/js/common'
	import { GetToken, qiNiuUpload } from 'api/banner'
	import { ERR_CODE } from 'api/config'

	//	import browserMD5File from 'browser-md5-file'

	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	import {
		quillEditor
	} from 'vue-quill-editor';

	export default {
		props: {
			description: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				content: '',
				editorOption: {},
				token: '',
			}

		},

		created() { /*this.cityData = CityInfo*/

		},
		mounted() {
			this.$refs.myTextEditor.quill.getModule('toolbar').addHandler('image', this.imgClick)
		},
		computed: {
			editor() {
				return this.$refs.myTextEditor.quill
			}
		},
		methods: {
			imgClick() {
				GetToken().then((res) => {
					console.log(res);
					if(res.data.code === ERR_CODE) {
						this.token = res.data.data;
					}
				})
				var input = document.createElement('input')
				input.type = 'file'
				input.name = this.fileName
				input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
				input.onchange = this.onFileChange
				input.click()
			},
			onFileChange(e) {
				const loading = showLoading();
				let that = this;
				var fileInput = e.target;
				qiNiuUpload(that.token, fileInput.files[0]).then((res) => {
					loading.close();
					if(res.status == 200){
						showNotification('success', '添加图片成功')
						that.editor.insertEmbed(that.editor.getSelection().index, 'image', 'http://p5of89u6y.bkt.clouddn.com/' + res.data.key)
					}
				}).catch((res) =>{
					showNotification('info', '网络错误,请稍后!')
					
				})
			},
			onEditorChange({
				quill,
				html,
				text
			}) {
				this.$emit("listenToDetail", html)
			},
		},
		watch: {
			description(val) {
				this.content = val;
			}
		}
	}
</script>

<style scoped>
	.quill-editor {}
	
	.ql-toolbar {
		text-align: left;
	}
</style>