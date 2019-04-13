<template>
  <div id="post">
    <div class="header">
      <div class="header-inner">
        <div class="posthead">
          <div class="title">
            <svg-icon icon-class="repo" />
            <h1>
              <a href="#">{{ post.title }}</a>
            </h1>
          </div>
          <ul>
            <li>
              <button disabled>
                <svg-icon icon-class="octiconEye" />
                <span>Watch</span>
              </button>
              <span class="count">{{ post.times || 1 }}</span>
            </li>
            <li>
              <button @click="toggleStar">
                <svg-icon icon-class="octiconStar" />
                <span>{{ isStar ? 'Unstar' : 'Star' }}</span>
              </button>
              <span class="count">{{ postStar || post.star || 0 }}</span>
            </li>
          </ul>
        </div>
        <ul class="tabs">
          <li class="selected">
            <svg-icon icon-class="code" />
            <span>Code</span>
          </li>
          <li>
            <svg-icon icon-class="share" />
            <span>Share</span>
          </li>
          <li>
            <svg-icon icon-class="chat" />
            <span>Discussion</span>
          </li>
          <li>
            <svg-icon icon-class="inbox" />
            <span>Categories</span>
          </li>
          <li>
            <svg-icon icon-class="tag" />
            <span>Tags</span>
          </li>
        </ul>
      </div>
    </div>
    <main>
      <div class="main-inner">
        <div class="header">
          <span class="author">
            <img src="@/assets/img/avatar.png" alt />
            {{ post.user ? post.user.login : '' }}
          </span>
          <span>{{ post.created_at }}</span>
        </div>
        <article>
          <MarkDown :content="post.body" />
        </article>
      </div>
      <Comment v-if="$config.comment.post" :title="post.title" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MarkDown from '@/components/MarkDown'
import Comment from '@/components/Comment'
import { localSave, localRead } from '@/utils'

export default {
  name: 'Post',
  components: {
    MarkDown,
    Comment
  },
  data() {
    const star = localRead('star') ? JSON.parse(localRead('star')) : {}
    return {
      star,
      postStar: 0
    }
  },
  computed: {
    ...mapGetters(['post']),
    isStar() {
      return this.star[this.post.id]
    }
  },
  methods: {
    async toggleStar() {
      this.star[this.post.id] = !this.star[this.post.id]
      localSave('star', JSON.stringify(this.star))

      this.$store.dispatch('postStar', { isAdd: this.star[this.post.id] })
    }
  }
}
</script>
<style lang="less" scoped>
#post {
  .header {
    position: relative;
    margin-bottom: 24px;
    padding-top: 24px;
    border-bottom: 1px solid #e1e4e8;
    background-color: #fafbfc;
    .header-inner {
      margin: 0 auto;
      padding: 0 16px;
      max-width: 1012px;
      .posthead {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .title {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          position: relative;
          max-width: 635px;
          color: #586069;
          line-height: 26px;
          font-size: 18px;
          svg {
            transform: translateY(1px);
          }
          h1 a {
            display: block;
            margin-left: 4px;
            color: #0366d6;
            text-decoration: none;
            letter-spacing: 0.6px;
            font-size: 18px;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        ul {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          li {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 10px;
            user-select: none;
            vertical-align: middle;
            white-space: nowrap;
            button,
            .count {
              padding: 3px 10px;
              color: #24292e;
              font-size: 12px;
              font-weight: 600;
              line-height: 20px;
              cursor: pointer;
              border: 1px solid rgba(27, 31, 35, 0.2);
            }
            button {
              display: flex;
              justify-content: center;
              align-items: center;
              outline: none;
              border-radius: 3px 0 0 3px;
              background-color: #eff3f6;
              &:hover {
                background-color: #e6ebf1;
                background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);
                background-position: -0.5em;
                border-color: rgba(27, 31, 35, 0.35);
              }
              svg {
                font-size: 16px;
                transform: translateY(-1px);
              }
              span {
                display: inline-block;
                margin-left: 4px;
              }
            }
            .count {
              background-color: #fff;
              border-left: 0;
              border-radius: 0 3px 3px 0;
            }
          }
        }
      }
      .tabs {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        transform: translateY(1px);
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 7px 15px 8px;
          color: #586069;
          white-space: nowrap;
          border: 1px solid transparent;
          border-radius: 3px 3px 0 0;
          border-top: 3px solid transparent;
          &.selected {
            background-color: #fff;
            color: #24292e;
            border-color: #e36209 #e1e4e8 transparent;
          }
          svg {
            margin-right: 4px;
            font-size: 14px;
            transform: translateY(1px);
          }
          span {
            display: inline-block;
          }
        }
      }
    }
  }
  main {
    margin: 0 auto;
    padding: 0 16px;
    max-width: 1012px;
    .main-inner {
      border: 1px solid #d1d5da;
      border-radius: 3px;
      background-color: #fff;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: -1px -1px 0;
        padding: 8px 16px;
        background-color: #f6f8fa;
        border: 1px solid #d1d5da;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        font-size: 14px;
        line-height: 2;
        .author {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        span {
          display: inline-block;
        }
        img {
          margin-right: 5px;
          width: 20px;
          height: 20px;
          border-radius: 3px;
          transform: translateY(1px);
        }
      }
      article {
        padding: 48px;
      }
    }
  }
}
</style>
