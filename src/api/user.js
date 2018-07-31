import axios from 'axios'
import {
  host
} from './config'

//用户列表
export function UserList(options) {
  const url = host + '/user/list';
  return axios.post(url, options).then((res) => {
    return Promise.resolve(res)
  }).catch((res) => {　

  })
}
export function GetUserInfo(openId) {
  const host = 'http://www.argesz.com/yazhe/mobile';

  const url = host + '/user/get';
  let options = {
    openId: openId
  }
  return axios.post(url, options).then((res) => {
    return Promise.resolve(res)
  }).catch((res) => {　

  })
}
//用户反馈列表
export function FeedbackList(options) {
  const url = host + '/user/feedback/list';
  return axios.post(url, options).then((res) => {
    return Promise.resolve(res)
  }).catch((res) => {　

  })
}

//更改用户vip级别
export function Update(options) {
  const url = `${host}/mobile/user/update`;
  return axios.post(url, options).then((res) => {
    return Promise.resolve(res)
  }).catch((res) => {　

  })
}
