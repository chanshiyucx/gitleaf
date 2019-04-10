<template>
  <div id="archive">
    <ul class="post-list">
      <li v-for="item in posts" :key="item.id">
        <h2>
          <router-link :to="{ name: 'post', params: { number: item.number } }">{{ item.title }}</router-link>
        </h2>
        <MarkDown class="markdown" :content="item.desc" :onlyRender="true" />
        <div class="tags">
          <span v-for="label in item.labels.slice(0, 2)" :key="label.id">{{ label.name }}</span>
        </div>
        <div class="footer">
          <span> <svg-icon icon-class="calendar" /> {{ item.created_at }} </span>
          <span>
            <svg-icon icon-class="inbox" /> {{ item.milestone ? item.milestone.title : '未分类' }}
          </span>
          <span> <svg-icon icon-class="eye" />{{ item.times || 1 }}℃ </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import MarkDown from '@/components/MarkDown'

export default {
  name: 'Archive',
  components: {
    MarkDown
  },
  data() {
    return {
      loading: false,
      page: 0,
      pageSize: 30,
      maxPage: 0,
      posts: [],
      list: []
    }
  },
  computed: {
    isDisabledPrev() {
      return this.page <= 1
    },
    isDisabledNext() {
      if (!this.maxPage) return false
      return this.page >= this.maxPage
    }
  },
  created() {
    this.queryPosts()
  },
  methods: {
    // 获取文章列表
    async queryPosts(type = 'next') {
      if (this.loading) return
      if (type === 'prev' && this.isDisabledPrev) return
      if (type === 'next' && this.isDisabledNext) return
      const queryPage = type === 'prev' ? this.page - 1 : this.page + 1

      if (this.list[queryPage]) {
        this.posts = this.list[queryPage]
        this.page = queryPage
        return
      }

      this.loading = true
      const posts = await this.$store.dispatch('queryPosts', {
        page: queryPage,
        pageSize: this.pageSize
      })
      this.loading = false
      if (posts.length === 0) {
        this.maxPage = queryPage - 1
        return
      }

      this.page = queryPage
      this.posts = posts
      this.list[queryPage] = posts
      if (posts.length < this.pageSize) {
        this.maxPage = queryPage
      }
      // 获取文章热度
      this.$nextTick(async () => {
        this.posts = await this.$store.dispatch('queryHot', { posts: posts })
      })
    }
  }
}
</script>
<style lang="less" scoped>
#archive {
  .post-list {
    li {
      padding: 24px 0;
      border-bottom: 1px solid #e1e4e8;
      color: #586069;
      h2 {
        margin-bottom: 5px;
        a {
          color: #0366d6;
          text-decoration: none;
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 0.4px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .markdown {
        font-size: 14px;
        line-height: 1.6;
        text-align: justify;
      }
      .tags {
        padding: 8px 0 6px;
        span {
          margin-right: 8px;
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 12px;
          color: #0366d6;
          background-color: rgb(241, 248, 255);
        }
      }
      .footer {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 8px;
        font-size: 14px;
        svg {
          margin-right: 2px;
          font-size: 14px;
        }
        & > span {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
