import axios from 'axios'
import { host } from './config'


//添加定制类型
export function AddCustomized(options) {
	const url = host + '/customized/insert';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//定制类型列表
export function CustomizedList(options) {
	const url = host + '/customized/list';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//定制类型删除
export function UpdateCustomized(options) {
	const url = host + '/customized/update';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}


//添加定制类型值
export function AddCustomizedValue(options) {
	const url = host + '/customized/value/insert';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//定制类型值列表
export function CustomizedValueList(options) {
	const url = host + '/customized/value/list';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}


//定制类型删除
export function UpdateCustomizedValue(options) {
	const url = host + '/customized/value/update';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}