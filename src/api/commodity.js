import axios from 'axios'
import { host } from './config'

//添加商品类型
export function AddCommodityType(options) {
	const url = host + '/cagegory/insert';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//商品类型列表
export function CommodityList(pageSize,currentPage) {
	let options = {
		pageSize: pageSize,
		currentPage: currentPage
	}
	options = JSON.stringify(options);
	const url = host + '/cagegory/list';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}
//更改删除商品类型
export function UpdateCommodity(options) {
	const url = host + '/cagegory/update';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}