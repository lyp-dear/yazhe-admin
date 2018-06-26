import axios from 'axios'
import { host } from './config'

//添加咨询
export function AddConsult(options) {
	const url = `${host}/news/insert`;
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//咨询列表
export function ConsultList(options) {
	const url = `${host}/news/list`;
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//删除咨询
export function Deleteconsult(options) {
	const url = `${host}/news/update`;
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}
//更新咨询
export function UpdateConsult(options) {
	const url = `${host}/news/update`;
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}