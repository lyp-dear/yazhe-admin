import axios from 'axios'
import { host } from './config'

//订单列表
export function OrderList(options) {
	const url = host + '/user/order/list';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//添加生产线编号
export function AddCode(options) {
	const url = host + '/user/order/update';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//发货
export function AddDelivery(options) {
	const url = host + '/user/express';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}
//订单详情
export function OrderDetail(options) {
	const url = host + '/user/order/detail';
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

//导出年份
export function DownYear(year1,year2) {
	const url = host + '/export/partner/' + year1 + '/' + year2;
	return axios.get(url).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {
		alert(res);
	});
}


export function ExportOrder(options){
	const url = host + '/export/order';
	return axios.post(url,options,{responseType:'arraybuffer'}).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {
		alert(res);
	});
}
