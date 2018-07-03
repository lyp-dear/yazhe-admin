import axios from 'axios'

export function UserInfo(openId) {
  const url = `http://www.argesz.com/yazhe/mobile/user/get`;
  let options = {
    openId: openId
  }
  return axios.post(url, options).then((res) => {
    return Promise.resolve(res)
  }).catch((res) => {　

  })
}

export function Top(options) {
  const url = `http://www.argesz.com/yazhe/mobile/user/team/parent`;
  return axios.post(url, options).then((res) => {
    return Promise.resolve(res)
  }).catch((res) => {　

  })
}

export function Bot(options) {
  const url = `http://www.argesz.com/yazhe/mobile/user/team/son`;
  // let options = {
  //   id: id,
  //   proportion: proportion,
  //   pageSize: 100
  // }
  return axios.post(url, options).then((res) => {
    return Promise.resolve(res)
  }).catch((res) => {　

  })
}
