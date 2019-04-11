<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <Header />
    <div :class="['content', !isPostPage && 'shrink-content']">
      <Sidebar v-if="!isPostPage" />
      <div class="body">
        <nav v-if="!isPostPage" class="nav">
          <router-link to="/">Overview</router-link>
          <router-link to="archives">
            Archives
            <span class="counter">{{ archivesCount }}</span>
          </router-link>
          <router-link to="categories">
            Categories
            <span class="counter">{{ categories.length }}</span>
          </router-link>
          <router-link to="tags">
            Tags
            <span class="counter">{{ tags.length }}</span>
          </router-link>
          <router-link to="mood">
            Mood
            <span class="counter">{{ moodCount }}</span>
          </router-link>
          <router-link to="friends">
            Friends
            <span class="counter">{{ friend.length }}</span>
          </router-link>
          <router-link to="about">About</router-link>
        </nav>
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import { getLocation } from '@/utils'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Footer
  },
  computed: {
    ...mapGetters(['archivesCount', 'moodCount', 'categories', 'tags', 'friend']),
    isPostPage() {
      return this.$route.name === 'post'
    }
  },
  created() {
    if (!this.$isMobile) {
      // 顶部进度条
      this.initProgress()
    }
    this.init()
  },
  mounted() {
    if (!this.$isMobile) {
      // 顶部进度条
      this.$Progress.finish()
    }
  },
  methods: {
    // 注册顶部进度条
    initProgress() {
      this.$Progress.start()
      this.$router.beforeEach(async (to, from, next) => {
        this.$Progress.start()
        console.log('beforeEach', to, from)
        await this.initPage(to)
        next()
      })
      this.$router.afterEach((to, from) => {
        console.log('afterEach', to, from)
        this.$Progress.finish()
        if (!from.name) {
          this.initPage(to)
        }
      })
    },
    // 初始化全局数据
    init() {
      this.$store.dispatch('queryRecentPost')
      this.$store.dispatch('queryCategory')
      this.$store.dispatch('queryTag')
      this.$store.dispatch('queryPage', { type: 'friend' })
      this.$store.dispatch('queryArchivesCount')
      this.$store.dispatch('queryMoodCount')

      // 统计访客来源
      const referrer = getLocation(document.referrer)
      const hostname = referrer.hostname || '直接访问'
      this.$store.dispatch('visitorStatistics', hostname)
    },
    // 初始化页面数据
    async initPage(route) {
      if (route.name === 'archives') {
        await this.$store.dispatch('queryArchives', { type: 'next' })
      } else if (route.name === 'mood') {
        this.$store.dispatch('queryMood', { type: 'next' })
      } else if (route.name === 'about') {
        this.$store.dispatch('queryPage', { type: 'about' })
      } else if (route.name === 'post') {
        const number = route.params.number
        await this.$store.dispatch('queryPost', { number })
      }
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  .content {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    &.shrink-content {
      margin: 24px auto;
      padding: 0 16px;
      max-width: 1012px;
      .body {
        padding-left: 8px;
      }
    }
  }
  .body {
    flex: 1;
    .nav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #d1d5da;
      a {
        margin-right: 16px;
        padding: 16px 8px;
        color: #24292e;
        font-size: 14px;
        border-bottom: 2px solid transparent;
        text-decoration: none;
        &.router-link-exact-active {
          color: #24292e;
          font-weight: 600;
          border-bottom-color: #e36209;
        }
        &:hover {
          border-bottom-color: #d1d5da;
          color: #24292e;
          text-decoration: none;
          transition: 0.2s ease;
        }
        .counter {
          display: inline-block;
          padding: 2px 5px;
          line-height: 1;
          color: #586069;
          font-size: 12px;
          font-weight: 600;
          border-radius: 20px;
          background-color: rgba(27, 31, 35, 0.08);
        }
      }
    }
  }
}
</style>
