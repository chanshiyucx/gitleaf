<template>
  <div id="about">
    <MarkDown :content="about.body" />
    <Comment v-if="$config.comment.about" title="关于" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MarkDown from '@/components/MarkDown'
import Comment from '@/components/Comment'

export default {
  name: 'About',
  components: {
    MarkDown,
    Comment
  },
  computed: {
    ...mapGetters(['about'])
  }
}
</script>

<style lang="less" scoped>
#about {
  margin-top: 16px;
}
</style>
