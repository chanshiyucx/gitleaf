import Vue from 'vue'
import Vuex from 'vuex'
import {
  queryArchivesCount,
  queryMoodCount,
  queryFilterArchivesCount,
  queryPosts,
  queryPost,
  queryHot,
  queryCategory,
  queryTag,
  queryMood,
  queryPage,
  visitor
} from './utils/services'
import { formatPost, formatTime, formatPage } from './utils/format'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    archivesCount: 0,
    filterArchivesCount: 0,
    moodCount: 0,
    post: {},
    archives: {
      pageSize: 20,
      page: 0,
      posts: [],
      list: []
    },
    filterArchives: {
      pageSize: 20,
      page: 0,
      posts: [],
      list: []
    },
    mood: {
      pageSize: 20,
      page: 0,
      moods: [],
      list: []
    },
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
    // 设置文章数量
    setArchivesCount(state, payload) {
      state.archivesCount = payload
    },
    // 筛选文章数量
    setFilterArchivesCount(state, payload) {
      state.filterArchivesCount = payload
      state.filterArchives = {
        ...state.filterArchives,
        page: 0,
        posts: [],
        list: []
      }
    },
    // 设置心情数量
    setMoodCount(state, payload) {
      state.moodCount = payload
    },
    // 设置归档
    setArchives(state, payload) {
      state.archives = {
        ...state.archives,
        ...payload
      }
    },
    // 分类 & 标签筛选文章
    setFilterArchives(state, payload) {
      state.filterArchives = {
        ...state.filterArchives,
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
    // 设置心情
    setMood(state, payload) {
      state.mood = {
        ...state.mood,
        ...payload
      }
    },
    // 设置页面
    setPage(state, { type, data }) {
      state[type] = data
    }
  },
  actions: {
    // 获取文章总数
    async queryArchivesCount({ commit }) {
      const data = await queryArchivesCount()
      const count = data.repository.issues.totalCount
      commit('setArchivesCount', count)
    },
    // 获取 分类 & 标签筛选文章数量
    async queryFilterArchivesCount({ commit }, payload) {
      const data = await queryFilterArchivesCount(payload)
      const count = data.search.issueCount
      commit('setFilterArchivesCount', count)
    },
    // 获取心情总数
    async queryMoodCount({ commit }) {
      const data = await queryMoodCount()
      const count = data.repository.issues.totalCount
      commit('setMoodCount', count)
    },
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

      if (posts.length === 0) return
      list[queryPage] = posts
      commit('setArchives', {
        page: queryPage,
        posts,
        list
      })

      posts = await dispatch('queryHot', { posts })
      commit('setArchives', { posts })
    },

    // 分类 & 标签筛选文章
    async queryFilterArchives({ state, dispatch, commit }, { type, filter }) {
      const { pageSize, page, list } = state.filterArchives
      const queryPage = type === 'prev' ? page - 1 : page + 1
      // 如果缓存列表里已存在
      if (list[queryPage]) {
        return commit('setFilterArchives', {
          posts: list[queryPage],
          page: queryPage
        })
      }

      commit('setLoading', true)
      let posts = await dispatch('queryPosts', {
        pageSize,
        page: queryPage,
        filter
      })

      console.log('data!!', posts)
      commit('setLoading', false)

      if (posts.length === 0) return
      list[queryPage] = posts
      commit('setFilterArchives', {
        page: queryPage,
        posts,
        list
      })

      console.log('posts', posts)

      posts = await dispatch('queryHot', { posts })
      commit('setFilterArchives', { posts })
    },
    // 获取文章列表
    async queryPosts(context, payload) {
      let data = await queryPosts(payload)
      data.forEach(formatPost)
      return data
    },
    // 获取心情列表
    async queryMood({ state, commit }, { type }) {
      const { pageSize, page, list } = state.mood
      const queryPage = type === 'prev' ? page - 1 : page + 1
      // 如果缓存列表里已存在
      if (list[queryPage]) {
        return commit('setMood', {
          moods: list[queryPage],
          page: queryPage
        })
      }

      commit('setLoading', true)
      let moods = await queryMood({
        pageSize,
        page: queryPage
      })
      commit('setLoading', false)

      if (moods.length === 0) return
      moods = formatTime(moods)
      list[queryPage] = moods
      commit('setMood', {
        page: queryPage,
        moods,
        list
      })
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
    },
    // 统计访问来源
    async visitorStatistics(context, payload) {
      await visitor(payload)
    }
  },
  getters: {
    loading: state => state.loading,
    archivesCount: state => state.archivesCount,
    filterArchivesCount: state => state.filterArchivesCount,
    moodCount: state => state.moodCount,
    archives: state => state.archives,
    filterArchives: state => state.filterArchives,
    recentPost: state => state.recentPost,
    post: state => state.post,
    categories: state => state.categories,
    tags: state => state.tags,
    mood: state => state.mood,
    friend: state => state.friend,
    about: state => state.about
  }
})
