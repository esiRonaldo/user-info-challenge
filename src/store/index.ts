import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../Api/Search_api'

Vue.use(Vuex)

const state = {
  user_infos: [],
  original_user_infos: []
}
const getters = {
  GET_USER_INFO: (state: any) => state.user_infos,
  GET_ORIGINAL_USER_INFO: (state: any) => state.original_user_infos
}
const actions = {
  GET_USER_INFO: async (context: any) => {
    const response = await Api.getUserInfo()
    context.commit('SET_USER_INFO',
      response.data.results), context.commit('SET_ORIGINAL_USER_INFO', response.data.results)
  },
  SET_USER_INFO: (context: any, payload: any) => {
    context.commit('SET_USER_INFO', payload)
  }
}
const mutations = {
  SET_USER_INFO:
    (state: any, payload: any) => {
      state.user_infos = payload
    },
  SET_ORIGINAL_USER_INFO:
    (state: any, payload: any) => {
      state.original_user_infos = payload
    }
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
