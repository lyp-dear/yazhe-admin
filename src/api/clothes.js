import axios from 'axios'
import { host } from './config'

//添加商品
export function AddGood(options) {
	const url = host + '/goods/insert';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//商品列表
export function GoodList(options) {
	const url = host + '/goods/list';
	var options = JSON.stringify(options);
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//商品列表
export function Update(options) {
	const url = host + '/goods/update';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

export function Detail(options) {
	const url = host + '/goods/detail';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}