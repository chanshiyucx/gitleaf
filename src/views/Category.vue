<template>
  <div id="category">
    <div v-if="filterArchives.posts.length">
      <ArchiveList :archives="filterArchives.posts" />
      <Pagination
        :loading="loading"
        :isDisabledPrev="isDisabledPrev"
        :isDisabledNext="isDisabledNext"
        @handleClick="queryPosts"
      />
    </div>
    <ul v-else class="categories">
      <li v-for="item in categories" :key="item.id">
        <div class="title" @click="handleFilter(item)">
          <svg-icon icon-class="repo" />
          <span>{{ item.title }}</span>
        </div>
        <MarkDown :content="item.summary" />
        <div class="footer">
          <span>
            <svg-icon icon-class="calendar" />
            {{ item.created_at }}
          </span>
          <span>
            <svg-icon icon-class="inbox" />
            文章总数 {{ item.open_issues }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArchiveList from '@/components/ArchiveList'
import Pagination from '@/components/Pagination'
import MarkDown from '@/components/MarkDown'

export default {
  name: 'Category',
  components: {
    ArchiveList,
    Pagination,
    MarkDown
  },
  data() {
    return {
      milestone: ''
    }
  },
  computed: {
    ...mapGetters(['loading', 'categories', 'filterArchives', 'filterArchivesCount']),
    currentCount() {
      let count = 0
      this.filterArchives.list.forEach((o, i) => {
        if (i <= this.filterArchives.page) {
          count += o.length
        }
      })
      return count
    },
    isDisabledPrev() {
      return this.filterArchives.page <= 1
    },
    isDisabledNext() {
      return this.currentCount >= this.filterArchivesCount
    }
  },
  methods: {
    // 筛选文章
    async handleFilter(milestone) {
      if (milestone.number !== this.milestone.number) {
        this.milestone = milestone.number
        await this.$store.dispatch('queryFilterArchivesCount', { milestone: milestone.title })
      }
      this.queryPosts()
    },
    // 获取文章列表
    async queryPosts(type = 'next') {
      const filter = `&milestone=${this.milestone}`
      await this.$store.dispatch('queryFilterArchives', { type, filter })
      this.$scroll(0)
    }
  },
  beforeDestroy() {
    this.$store.commit('resetFilterArchives')
  }
}
</script>
<style lang="less" scoped>
#category {
  .categories {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 24px 0;
    li {
      margin-bottom: 16px;
      padding: 16px;
      width: 359px;
      height: 110px;
      border: 1px solid #d1d5da;
      border-radius: 3px;
      font-size: 12px;
      color: #586069;
      .title {
        svg {
          margin-right: 8px;
          font-size: 16px;
          transform: translate(-2px, 2px);
        }
        span {
          cursor: pointer;
          font-size: 13px;
          color: #0366d6;
          letter-spacing: 0.4px;
          text-decoration: none;
        }
      }
      /deep/.markdown-body {
        margin: 12px 0 16px;
        overflow: hidden;
        font-size: 12px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .footer {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        svg {
          margin-right: 2px;
          font-size: 14px;
        }
        & > span {
          margin-right: 12px;
          span {
            margin-right: 6px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
