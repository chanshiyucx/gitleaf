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
        <span @click="handleFilter(item)">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArchiveList from '@/components/ArchiveList'
import Pagination from '@/components/Pagination'

export default {
  name: 'Category',
  components: {
    ArchiveList,
    Pagination
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
    margin-top: 24px;
    ul,
    li {
      list-style: inherit;
    }
    ul {
      padding-left: 30px;
      li {
        line-height: 1.7;
        span {
          cursor: pointer;
          color: #0366d6;
        }
      }
    }
  }
}
</style>
