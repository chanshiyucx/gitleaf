<template>
  <div id="comment">
    <button v-show="showModeBtn" @click="switchMode">{{ anonymous ? 'Gitalk 评论' : '游客评论' }}</button>
    <div>
      <div v-show="!anonymous" id="gitalk" />
      <div v-show="anonymous && showModeBtn" id="valine" />
    </div>
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import Valine from 'valine'

export default {
  name: 'Comment',
  props: ['title'],
  data() {
    return {
      anonymous: false,
      showModeBtn: false,
      tagName: this.$route.hash,
      timer: ''
    }
  },
  mounted() {
    // 判断切换到 Valine
    if (this.tagName) {
      this.anonymous = true
      const hash = window.location.hash
      window.location.hash = hash.split(this.tagName)[0]
    }

    setTimeout(() => {
      this.showModeBtn = true
    }, 1000)

    this.renderGitalk()
    this.renderValine()
  },
  methods: {
    switchMode() {
      this.anonymous = !this.anonymous
    },
    // 加载 Gitalk
    renderGitalk() {
      const gitalk = new Gitalk({
        ...this.$config.gitalk,
        title: this.title
      })
      gitalk.render('gitalk')
    },
    // 加载 Valine
    renderValine() {
      new Valine({
        el: '#valine',
        appId: this.$config.leancloud.appId,
        appKey: this.$config.leancloud.appKey,
        path: window.location.href,
        avatar: 'identicon',
        notify: false,
        placeholder: '蝉鸣如雨，花宵道中'
      })

      setTimeout(() => {
        this.showModeBtn = true
        if (this.anonymous && this.tagName) {
          let toggle, anchor
          let count = 0
          this.timer = setInterval(() => {
            if (count > 10) return clearInterval(this.timer)
            count++
            toggle = document.querySelector('#comment')
            anchor = document.getElementById(this.tagName.slice(1))
            if (toggle && anchor) {
              clearInterval(this.timer)
              this.$scroll(anchor, toggle)
            }
          }, 500)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
#comment {
  margin-top: 24px;
  padding-top: 16px;
  button {
    cursor: pointer;
    margin-bottom: 16px;
    padding: 3px 10px;
    color: #4f93e0;
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    outline: none;
    border: 1px solid #77aeee;
    border-radius: 3px;
    background-color: #fff;
    &:hover {
      background-color: #e6ebf1;
      background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);
      background-position: -0.5em;
      border-color: rgba(27, 31, 35, 0.35);
    }
  }
}
</style>
