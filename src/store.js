import Vue from 'vue'
import Vuex from 'vuex'
import { queryPosts, queryHot, queryCategory, queryTag, queryPage } from './utils/services'
import { formatPost, formatCategory, formatPage } from './utils/format'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    archives: {
      pageSize: 30,
      pageNum: 0,
      maxPage: 0,
      posts: [],
      list: []
    },
    categories: [],
    tags: [],
    friends: []
  },
  mutations: {
    // 设置 loading 状态
    setLoading(state, loading) {
      state.loading = loading
    },
    // 设置归档
    setArchives(state, archives) {
      state.archives = {
        ...state.archives,
        ...archives
      }
    },
    // 设置分类
    setCategories(state, data) {
      state.categories = data
    },
    // 设置标签
    setTags(state, data) {
      state.tags = data
    },
    // 设置页面
    setPage(state, { type, data }) {
      state[type] = data
    }
  },
  actions: {
    // 归档文章
    async queryArchives({ state, dispatch, commit }, type = 'next') {
      const { pageSize, pageNum, list } = state.archives
      const queryPage = type === 'prev' ? pageNum - 1 : pageNum + 1

      // 如果缓存列表里已存在
      if (list[queryPage]) {
        return commit('setArchives', {
          posts: list[queryPage],
          pageNum: queryPage
        })
      }

      commit('setLoading', true)
      let posts = dispatch('queryPosts', {
        pageSize,
        pageNum: queryPage
      })
      commit('setLoading', false)

      if (posts.length === 0) {
        return commit('setArchives', { maxPage: queryPage - 1 })
      }
      if (posts.length < state.archives.pageSize) {
        commit('setArchives', { maxPage: queryPage })
      }

      list[queryPage] = posts
      commit('setArchives', {
        pageNum: queryPage,
        posts,
        list
      })

      posts = await dispatch('queryHot', { posts })
      commit('setArchives', { posts })
    },
    // 获取文章列表
    async queryPosts(context, payload) {
      let data = await queryPosts(payload)
      data.forEach(formatPost)
      return data
    },
    // 获取文章热度
    async queryHot(context, { posts, isAdd = false }) {
      return await queryHot(posts, isAdd)
    },
    // 获取分类
    async queryCategory({ commit }) {
      let data = await queryCategory()
      data = formatCategory(data)
      commit('setCategories', data)
    },
    // 获取标签
    async queryTag({ commit }) {
      let data = await queryTag()
      data = data.filter(
        o => o.name !== 'Mood' && o.name !== 'Friend' && o.name !== 'Book' && o.name !== 'About'
      )
      commit('setTags', data)
    },
    // 获取书单 & 友链 & 关于
    async queryPage({ commit }, { type }) {
      let data = await queryPage(type)
      data = formatPage(data, type)
      commit('setPage', { type, data })
    }
  },
  getters: {
    loading: state => state.loading,
    archives: state => state.archives,
    categories: state => state.categories,
    tags: state => state.tags
  }
})
