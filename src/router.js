import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/archives',
      name: 'archives',
      component: () => import('./views/Archive')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('./views/Category')
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('./views/Tag')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
