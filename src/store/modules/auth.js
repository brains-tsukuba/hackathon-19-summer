import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/** 元データ */
const state = {
  access_token: "",
  secret_token: "",
  username: "",
}

/** 使うときはここから呼び出す */
const getters = {
  /** this.$store.getters.apiKey
   *  || state.getters.apiKey */
  accessToken: (state, getters) => {
    return state.access_token
  },
  secretToken:  (state, getters) => {
    return state.secret_token
  },
  authenticated: (state, getters) => {
    return state.access_token !== ""
  },
  username: (state, getters) => {
    return state.username
  }
}

/** 値の変更を行なう関数 */
const mutations = {
  /** this.$store.commit('updateApikey', "jaoihgoianv") 
   *  || state.commit('updateApiKey', "jaohvia") */
  updateAccessToken(state, key) {
    state.access_token = key
  },
  updateSecretToken(state, key) {
    state.secret_token = key
  },
  updateUserName(state,name) {
    state.username = name;
  }

}

// https://vuex.vuejs.org/ja/guide/actions.html
/** 
 * 非同期な関数
store.dispatch('incrementAsync', {
  amount: 10
}) 
*/
const actions = {
  login({commit},{token,secret,username}) {
    commit('updateAccessToken',token)
    commit('updateSecretToken',secret)
    commit('updateUserName',username)
  },
  logout({commit}) {
    commit('updateAccessToken','')
    commit('updateSecretToken','')
    commit('updateUserName', '')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
