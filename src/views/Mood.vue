<template>
  <div id="mood">
    <div>
      <ul class="mood-list">
        <li v-for="item in mood.moods" :key="item.id">
          <MarkDown :content="item.body" />
          <div class="footer">
            <span>
              <svg-icon icon-class="calendar" />
              {{ item.created_at }}
            </span>
          </div>
        </li>
      </ul>
      <Pagination
        :loading="loading"
        :isDisabledPrev="isDisabledPrev"
        :isDisabledNext="isDisabledNext"
        @handleClick="queryMood"
      />
    </div>
    <Comment v-if="$config.comment.mood" title="心情" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MarkDown from '@/components/MarkDown'
import Pagination from '@/components/Pagination'
import Comment from '@/components/Comment'

export default {
  name: 'Mood',
  components: {
    MarkDown,
    Pagination,
    Comment
  },
  computed: {
    ...mapGetters(['loading', 'mood', 'moodCount']),
    currentCount() {
      let count = 0
      this.mood.list.forEach((o, i) => {
        if (i <= this.mood.page) {
          count += o.length
        }
      })
      return count
    },
    isDisabledPrev() {
      return this.mood.page <= 1
    },
    isDisabledNext() {
      return this.currentCount >= this.moodCount
    }
  },
  methods: {
    // 获取文章列表
    async queryMood(type = 'next') {
      await this.$store.dispatch('queryMood', { type })
      this.$scroll(0)
    }
  }
}
</script>

<style lang="less" scoped>
#mood {
  .mood-list {
    li {
      padding: 24px 0;
      border-bottom: 1px solid #e1e4e8;
      color: #586069;
      .footer {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 12px;
        font-size: 12px;
        svg {
          margin-right: 2px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
