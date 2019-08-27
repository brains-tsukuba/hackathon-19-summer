import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/** 元データ */
const state = {
  apiKey: "aaaa",
  username: "",
}

/** 使うときはここから呼び出す */
const getters = {
  /** this.$store.getters.apiKey
   *  || state.getters.apiKey */
  apiKey: (state, getters) => {
    return state.apiKey
  },
  authenticated: (state, getters) => {
    return state.apiKey !== ""
  },
  username: (state, getters) => {
    return state.username
  }
}

/** 値の変更を行なう関数 */
const mutations = {
  /** this.$store.commit('updateApikey', "jaoihgoianv") 
   *  || state.commit('updateApiKey', "jaohvia") */
  updateApiKey(state, key) {
    state.apiKey = key
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
  login({commit},{key,username}) {
    commit('updateApiKey',key)
    commit('updateUserName',username)
  } 
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
