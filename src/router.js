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
    }
    // {
    //   path: '/archive',
    //   name: 'archive',
    //   component: () => import('./views/Archive')
    // },
    // {
    //   path: '/category',
    //   name: 'category',
    //   component: () => import('./views/Category')
    // },
    // {
    //   path: '/tag',
    //   name: 'tag',
    //   component: () => import('./views/Tag')
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
