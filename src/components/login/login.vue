<template>
	<div class="login">
		<div class="filter"></div>
		<div class="landscape"></div>
		<canvas class="canvas" ref="canvas"></canvas>
		<div class="all">
			<h1>雅者定制管理系统</h1>
			<input type="text" required="required" placeholder="用户名" v-model.trim="account" />
			<input type="password" required="required" placeholder="密码" v-model.trim="pass" @keyup.enter="login" />
			<!-- <div class="wangji">
            <router-link to="" >忘记密码</router-link>
        </div> -->
			<el-button class="but" type="primary" @click.native="login">登录</el-button>
			<!-- <button class="but" @click="login">登录</button>   -->
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import star from "./star";
	//	import { userLogin } from 'api/login'
	import { showLoading, showNotification } from 'common/js/common'

	export default {
		data() {
			return {
				account: '',
				pass: '',
				checked: false,
			}
		},
		methods: {
			login(ev) {
				let that = this;
				const account = this.account;
				const pass = this.pass;

				if(account === '') {
					showNotification('warning', '账号不能为空')
					return;
				}
				if(pass === '') {
					showNotification('warning', '密码不能为空')
					return;
				}
				if(this.checked) {
					let options = {
						'account': this.account,
						'pass': this.pass,
						'type': true
					}
					options = JSON.stringify(options);
					localStorage.setItem('loginInfo', options)

				}
				if(this.checked) {
					let options = {
						'account': this.account,
						'pass': this.pass,
						'type': true
					}
					options = JSON.stringify(options);
					localStorage.setItem('loginInfo', options)

				}
				const loading = showLoading();
				setTimeout(() => {
					loading.close();
					showNotification('success', '登录成功');
					setTimeout(() => {
						that.$router.push({
							path: '/home'
						});
					}, 1000)

				}, 2000)

			}
		},
		mounted() {
			star(this.$refs.canvas);
		},
		created() {
			let that = this;
			let loginInfo = window.localStorage.getItem('loginInfo')
			loginInfo = loginInfo ? JSON.parse(loginInfo) : '';
			if(loginInfo != '') {
				this.account = loginInfo.account;
				this.pass = loginInfo.pass;
				this.checked = loginInfo.type;
			}

		}
	}
</script>

<style scoped>
	.login {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		overflow: hidden;
		background: #03267a;
		background: linear-gradient(to bottom, #000e30 0%, #224089 100%);
	}
	
	.filter {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: #fe5757;
		animation: colorChange 20s ease-in-out infinite;
		animation-fill-mode: both;
		mix-blend-mode: overlay;
		z-index: 1;
	}
	
	@keyframes colorChange {
		0%,
		100% {
			opacity: 0;
		}
		50% {
			opacity: 0.9;
		}
	}
	
	.landscape {
		position: absolute;
		bottom: 0px;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url("./xkbg.png");
		background-size: 1000px 250px;
		background-repeat: repeat-x;
		background-position: center bottom;
	}
	
	.canvas {
		position: absolute;
		z-index: 2;
	}
	
	h1 {
		text-shadow: 1px 1px 4px fade(#000, 50%);
		color: #fff;
		font-size: 24px;
		letter-spacing: 4px;
		text-align: center;
		font-weight: 200;
		margin-bottom: 20px;
	}
	
	.all {
		position: relative;
		width: 300px;
		height: 300px;
		z-index: 9;
	}
	
	.wangji {
		text-align: right;
		margin-bottom: 8px;
	}
	
	a {
		font-size: 12px;
		letter-spacing: 1px;
		color: #fff;
	}
	
	.login input {
		width: 278px !important;
		height: 18px !important;
		margin-bottom: 10px;
		outline: none;
		padding: 10px;
		font-size: 13px;
		color: #312e3d;
		border: 1px solid #312e3d;
		border-radius: 4px;
		background-color: fade(#fff, 90%);
		box-sizing: content-box;
	}
	
	.but {
		width: 300px;
		min-height: 20px;
		display: block;
		background-color: fade(#4a77d4, 70%);
		border: 1px solid #3762bc;
		color: #fff;
		padding: 9px 14px;
		font-size: 15px;
		line-height: normal;
		border-radius: 5px;
		margin: 0;
		margin-top: 20px;
		transition: 0.6s;
	}
	
	.but:hover {
		border: 1px solid transparent;
		background-color: fade(#ff7e45, 90%);
		box-shadow: 0px 0px 8px fade(#ff7e45, 90%);
	}
</style>