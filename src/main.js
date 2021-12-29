import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

//Conexion SocketIO
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

const socket = io(`https://ikcount.com/live?`, //URL base
  { //Opciones de conexion
  transports: ['polling'],
  query:{atoken:'Y2xpY2tlcjEuZGVtbzo1Y2E4ZThlODgzNWIxOTNkZDMwZmJlZGNiNzc0N2Q1MmU4NjVjMzg3Y2Q2ZGNmZTllMWRiMTNjOGE2ZWYxNTc0YWU1NjMzMDU3NDZlMjY3M2RkZGZkYzJiN2NjYjFlZTBiNTE0N2JmMzc0NDI4YjIzZTRhNjRlZjU3ODZlMDRlNDpJS0xBQjAwNQ=='},
  }) 

Vue.use( VueSocketIOExt, socket, { store })
//bootstrap
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue, BootstrapVueIcons)

//Fontawesome
import {library} from '@fortawesome/fontawesome-svg-core'
import { faUser, faTimes, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faTimes, faPlus, faMinus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import {Chart} from 'chart.js'
import Chartkick from 'vue-chartkick'
Vue.use(Chartkick.use(Chart));
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
