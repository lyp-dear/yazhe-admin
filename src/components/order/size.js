import axios from 'axios'
import { host } from 'api/config'

export function MySize(openId) {
	let options = {
		openId: openId
	}
	const url = host + '/user/size/list';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

export function SizeConfig() {
	const url = host + '/user/sizeConfig';
	let options = {
		currentPage:0,
		pageSize: 1000
	}
	return axios.post(url,options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

export function SizeConfigByModel() {
	const url = host + '/user/sizeConfigByModel';
	return axios.post(url).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}


export function AddSize(options) {
	const url = host + '/user/size/insert';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

export function Remove(options) {
	const url = host + '/user/size/update';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}
