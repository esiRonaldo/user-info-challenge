import axios from 'axios'

export function baseApi () {
  return axios.create({
    baseURL: 'https://randomuser.me/api',
    headers: {
      Accept: 'application/json'
    },
    timeout: 60000
  })
}

export default {
  getUserInfo () {
    console.log('agha sina')
    return baseApi().get('/?results=5')
  }
}
