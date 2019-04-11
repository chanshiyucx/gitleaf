<template>
  <div id="friend">
    <ul>
      <li v-for="item in friend" :key="item.name">
        <a :href="item.link" class="info" target="_blank">
          <img :src="item.avatar" alt />
          <span>{{ item.name }}</span>
        </a>
        <button>
          <a :href="item.link" target="_blank">Follow</a>
        </button>
      </li>
    </ul>
    <Comment v-if="$config.comment.friend" title="友链" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Comment from '@/components/Comment'

export default {
  name: 'Friend',
  components: {
    Comment
  },
  computed: {
    ...mapGetters(['friend'])
  }
}
</script>
<style lang="less" scoped>
#friend {
  li {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 24px 0;
    border-bottom: 1px solid #e1e4e8;
    .info {
      display: flex;
      img {
        margin-right: 12px;
        width: 50px;
        height: 50px;
      }
      span {
        font-size: 16px;
        line-height: 24px;
        color: #24292e;
        &:hover {
          color: #0366d6;
        }
      }
    }
    a {
      color: #24292e;
      text-decoration: none;
    }
    button {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 10px;
      font-size: 12px;
      font-weight: 600;
      line-height: 20px;
      color: #24292e;
      outline: none;
      border-radius: 3px;
      border: 1px solid rgba(27, 31, 35, 0.2);
      background-color: #eff3f6;
    }
  }
}
</style>
