import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      login:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,

  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      login:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach(async(to, from, next) => {
  const user = router.app.$store.state.authState
  let authRequired = to.matched.some(route => route.meta.login);
  if (user==false && authRequired) {
  next('Login');
  } 
  else {
  next();
  }

})

export default router
