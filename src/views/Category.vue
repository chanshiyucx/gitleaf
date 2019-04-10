<template>
  <div id="category">
    <ul>
      <li v-for="item in categories" :key="item.id">
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Category',
  computed: {
    ...mapGetters(['categories'])
  }
}
</script>
<style lang="less" scoped>
#category {
  margin-top: 24px;
  ul,
  li {
    list-style: inherit;
  }
  ul {
    padding-left: 30px;
    li {
      line-height: 1.7;
    }
  }
}
</style>
