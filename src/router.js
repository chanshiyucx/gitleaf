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
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('./views/Friend')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About')
    },
    {
      path: '/post/:number',
      name: 'post',
      component: () => import('./views/Post.vue')
    }
  ]
})
