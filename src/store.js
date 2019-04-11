import Vue from 'vue'
import Vuex from 'vuex'
import { queryPosts, queryPost, queryHot, queryCategory, queryTag, queryPage } from './utils/services'
import { formatPost, formatPage } from './utils/format'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    archives: {
      pageSize: 20,
      page: 0,
      maxPage: 0,
      posts: [],
      list: []
    },
    post: {},
    recentPost: [],
    categories: [],
    tags: [],
    friend: [],
    about: {}
  },
  mutations: {
    // 设置 loading 状态
    setLoading(state, loading) {
      state.loading = loading
    },
    // 设置归档
    setArchives(state, payload) {
      state.archives = {
        ...state.archives,
        ...payload
      }
    },
    // 设置近期文章
    setRecentPost(state, payload) {
      state.recentPost = payload
    },
    // 设置当前文章
    setPost(state, payload) {
      state.post = payload
    },
    // 设置分类
    setCategories(state, payload) {
      state.categories = payload
    },
    // 设置标签
    setTags(state, payload) {
      state.tags = payload
    },
    // 设置页面
    setPage(state, { type, data }) {
      state[type] = data
    }
  },
  actions: {
    // 归档文章
    async queryArchives({ state, dispatch, commit }, { type }) {
      const { pageSize, page, list } = state.archives
      const queryPage = type === 'prev' ? page - 1 : page + 1
      // 如果缓存列表里已存在
      if (list[queryPage]) {
        return commit('setArchives', {
          posts: list[queryPage],
          page: queryPage
        })
      }

      commit('setLoading', true)
      let posts = await dispatch('queryPosts', {
        pageSize,
        page: queryPage
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
        page: queryPage,
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
    // 获取文章详情
    async queryPost({ dispatch, commit }, { number }) {
      let post = await queryPost(number)
      post = formatPost(post)
      let posts = await dispatch('queryHot', { posts: [post], isAdd: true })
      commit('setPost', posts[0])
    },
    // 获取文章热度
    async queryHot(context, { posts, isAdd = false }) {
      return await queryHot(posts, isAdd)
    },
    // 获取近期文章
    async queryRecentPost({ dispatch, commit }) {
      let posts = await dispatch('queryPosts', {
        pageSize: 6,
        page: 1
      })
      commit('setRecentPost', posts)
      posts = await dispatch('queryHot', { posts })
      commit('setRecentPost', posts)
    },
    // 获取分类
    async queryCategory({ commit }) {
      const data = await queryCategory()
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
    recentPost: state => state.recentPost,
    post: state => state.post,
    categories: state => state.categories,
    tags: state => state.tags,
    friend: state => state.friend,
    about: state => state.about
  }
})
