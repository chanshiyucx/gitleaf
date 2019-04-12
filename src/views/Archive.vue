<template>
  <div id="archive">
    <ArchiveList :archives="archives.posts" />
    <Pagination
      :loading="loading"
      :isDisabledPrev="isDisabledPrev"
      :isDisabledNext="isDisabledNext"
      @handleClick="queryPosts"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArchiveList from '@/components/ArchiveList'
import Pagination from '@/components/Pagination'

export default {
  name: 'Archive',
  components: {
    ArchiveList,
    Pagination
  },
  computed: {
    ...mapGetters(['loading', 'archives', 'archivesCount']),
    currentCount() {
      let count = 0
      this.archives.list.forEach((o, i) => {
        if (i <= this.archives.page) {
          count += o.length
        }
      })
      return count
    },
    isDisabledPrev() {
      return this.archives.page <= 1
    },
    isDisabledNext() {
      return this.currentCount >= this.archivesCount
    }
  },
  methods: {
    // 获取文章列表
    async queryPosts(type = 'next') {
      await this.$store.dispatch('queryArchives', { type })
      this.$scroll(0)
    }
  },
  beforeDestroy() {
    this.$store.commit('resetArchives')
  }
}
</script>
