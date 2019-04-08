import Vue from 'vue'
import Vuex from 'vuex'
import { queryPosts, queryHot } from './utils/services'
import { formatPost } from './utils/format'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    // 获取归档
    async queryPosts(context, payload) {
      let data = await queryPosts(payload)
      data.forEach(formatPost)
      return data
    },
    // 获取文章热度
    async queryHot(context, { posts, isAdd = false }) {
      return await queryHot(posts, isAdd)
    }
  }
})
