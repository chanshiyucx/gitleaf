<template>
  <div id="home">
    <h2>Recent post</h2>
    <ul>
      <li v-for="item in posts" :key="item.id">
        <div class="title">{{ item.title }}</div>
        <p class="desc"></p>
        <div class="footer"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      posts: []
    }
  },
  created() {
    this.queryPosts()
  },
  methods: {
    // 获取文章列表
    async queryPosts() {
      const posts = await this.$store.dispatch('queryPosts', {
        page: 1,
        pageSize: 6
      })
      this.posts = posts
      // 获取文章热度
      this.$nextTick(async () => {
        this.posts = await this.$store.dispatch('queryHot', { posts })
      })
    }
  }
}
</script>
<style lang="less" scoped>
#home {
  margin-top: 24px;
  h2 {
    margin-bottom: 6px;
    font-size: 16px;
    font-weight: 400;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 359px;
    }
  }
}
</style>
