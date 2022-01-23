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
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getUserInfo () {
    return baseApi().get('/?results=5')
  }
}
