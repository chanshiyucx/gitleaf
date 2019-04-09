<template>
  <div id="app">
    <Header />
    <div class="content">
      <Sidebar />
      <div class="body">
        <nav class="nav">
          <router-link class="selected" to="/">Overview</router-link>
          <router-link to="archives">Archives</router-link>
          <router-link to="categories">Categories</router-link>
          <router-link to="tags">Tags</router-link>
          <router-link to="friends">Friends</router-link>
          <router-link to="about">About</router-link>
        </nav>
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Footer
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化数据项
    init() {
      this.queryCategories()
      this.queryTags()
      this.queryFriends()
    },
    // 获取分类
    async queryCategories() {},
    // 获取标签
    async queryTags() {},
    // 获取友链
    async queryFriends() {}
  }
}
</script>
<style lang="less" scoped>
#app {
  .content {
    margin: 24px auto;
    padding: 0 16px;
    max-width: 1012px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .body {
    flex: 1;
    padding-left: 8px;
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
        &.selected {
          color: #24292e;
          font-weight: 600;
          border-bottom-color: #e36209;
        }
      }
    }
  }
}
</style>
