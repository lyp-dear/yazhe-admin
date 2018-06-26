import axios from 'axios'
import { host } from './config'
import { showLoading, showNotification } from 'common/js/common'


//尺寸类型值列表
export function AttributeList(currentPage) {
	let options = {
		pageSize: 10,
		currentPage: currentPage
	}
	options = JSON.stringify(options);
	const url = host + '/attribute/list';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//商品类型
export function AllCagecory() {
	const url = host + '/cagegory/all';
	return axios.post(url).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//添加商品属性类型
export function AddAttribute(options) {
	const url = host + '/attribute/insert';
	return axios.post(url,options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//更改删除
export function UpdateAttribute(options) {
	const url = host + '/attribute/update';
	return axios.post(url,options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}