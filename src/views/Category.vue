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
<style lang="less" scoped></style>
