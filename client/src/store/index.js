import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    login:true,
    username:null
  },
  getters: {
    login: state => {
      return state.login
    },
    username:state=>{
      return state.username
    }
  },
  mutations: {
    checkLogin: (state, payload) => {
      state.login = payload;
    },
    user:(state,payload)=>{
      state.username = payload;
    }
  },
  actions: {
    checkLogin: ({ commit }, payload) => {
      commit('checkLogin', payload);
    },
    user:({commit},payload)=>{
      commit('user',payload)
    }
  }
})