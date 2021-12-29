import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'



Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    authState: false,
    accessData:{
        accessToken:"",
        privileges:{}
    },
    current_aforo: 0,
    max_capacity: 0,
  },
  mutations: {
    authSuccess:(state, response)=>{
        state.authState=true
        state.accessData.accessToken=response.access_token
        state.accessData.privileges=response.privileges
    },
    LOGOUT:(state)=>{
      state.authState=false
      state.accessData.accessToken=""
      state.accessData.privileges={}
    },
    SOCKET_WELCOME(state, data){
      state.current_aforo=data.current_aforo
      state.max_capacity=data.max_capacity
    },
    SOCKET_RAW(state, data){
      state.current_aforo=data.current_aforo
      state.max_capacity=data.max_capacity
    },
    SOCKET_SUMMARY(state, data){
      state.current_aforo=data.current_aforo
      state.max_capacity=data.max_capacity
    },
    SOCKET_HEARTBEAT(state, data){
      state.current_aforo=data.current_aforo
      state.max_capacity=data.max_capacity
    },
  },
  actions: {
    getAuth:(context, payload)=>{
        axios.post('https://ikcount.com/iklab/api/login',payload)
        .then((response)=>{
            context.commit('authSuccess', response.data)
        })
        .catch((err)=>console.log(err))
    },
    logout:(context)=>{
      context.commit("LOGOUT")
    },
    regMov:(context, {token, params})=>{
      let url =`https://ikcount.com/iklab/ikcount/api/livecommand?atoken=${token}`
      axios.post(url, params)
      .catch(e=>console.log(e))
    },

  },
  plugins: [vuexLocal.plugin],

})