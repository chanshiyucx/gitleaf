<template>
  <div id="tag">
    <ul>
      <li v-for="item in tags" :key="item.id">
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Tag',
  computed: {
    ...mapGetters(['tags'])
  }
}
</script>
<style lang="less" scoped>
#tag {
  ul {
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
