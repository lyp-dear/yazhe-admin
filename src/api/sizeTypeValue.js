import axios from 'axios'
import { host } from './config'


//尺寸类型值列表
export function SizeTypeValueList(currentPage) {
	let options = {
		pageSize: 10,
		currentPage: currentPage
	}
	options = JSON.stringify(options);
	const url = host + '/size/value/list';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//添加尺寸类型值
export function AddSizeTypeValue(options) {
	const url = host + '/size/value/insert';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}
//尺寸类型编辑/删除
export function UpdateSizeTypeValue(options) {
	const url = host + '/size/value/update';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

export function SizeTypeList() {
	let options = {
		pageSize: 100,
		currentPage: 0
	}
	options = JSON.stringify(options);
	const url = host + '/size/list';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}