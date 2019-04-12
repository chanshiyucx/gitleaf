<template>
  <div id="tag">
    <div v-if="filterArchives.posts.length">
      <ArchiveList :archives="filterArchives.posts" />
      <Pagination
        :loading="loading"
        :isDisabledPrev="isDisabledPrev"
        :isDisabledNext="isDisabledNext"
        @handleClick="queryPosts"
      />
    </div>
    <ul v-else class="tags">
      <li v-for="item in tags" :key="item.id" @click="handleFilter(item.name)">
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArchiveList from '@/components/ArchiveList'
import Pagination from '@/components/Pagination'

export default {
  name: 'Tag',
  components: {
    ArchiveList,
    Pagination
  },
  data() {
    return {
      label: ''
    }
  },
  computed: {
    ...mapGetters(['loading', 'tags', 'filterArchives', 'filterArchivesCount']),
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
    async handleFilter(label) {
      if (label !== this.label) {
        this.label = label
        await this.$store.dispatch('queryFilterArchivesCount', { label })
      }
      this.queryPosts()
    },
    // 获取文章列表
    async queryPosts(type = 'next') {
      const filter = `&labels=${this.label}`
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
#tag {
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
    li {
      cursor: pointer;
      display: inline-block;
      margin: 0 8px 8px 0;
      padding: 5px 10px;
      border-radius: 3px;
      font-size: 12px;
      color: #0366d6;
      background-color: rgb(241, 248, 255);
    }
  }
}
</style>
