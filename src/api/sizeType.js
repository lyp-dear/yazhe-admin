import axios from 'axios'
import { host } from './config'

//尺寸类型列表
export function SizeTypeList(currentPage) {
	let options = {
		pageSize: 10,
		currentPage: currentPage
	}
	options = JSON.stringify(options);
	const url = host + '/size/list';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}
//尺寸类型列表
export function AddSizeType(options) {
	const url = host + '/size/insert';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}
//尺寸类型编辑/删除
export function UpdateSizeType(options) {
	const url = host + '/size/update';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}
