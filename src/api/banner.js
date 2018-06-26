import axios from 'axios'
import { host } from './config'

///yazhe/qiniu/token

//获取上传token
export function GetToken() {
	const url = host + '/qiniu/token';
	return axios.post(url).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}
//广告列表列表
export function BannerList(currentPage) {
	let options = {
		pageSize: 10,
		currentPage: currentPage
	}
	options = JSON.stringify(options);
	const url = host + '/banner/list';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//添加广告
export function AddBanner(options) {
	const url = host + '/banner/insert';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//更新/删除广告
export function UpdateBanner(options) {
	const url = host + '/banner/update';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}


//上传七牛
export function qiNiuUpload(token, fileName) {
	const url = "https://upload-z2.qiniup.com";
	let fd = new FormData();
	fd.append('token', token);
	fd.append('file', fileName);
	let config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	return axios.post(url, fd, config).then((res) => {
		return Promise.resolve(res)
	})
}