<template>
  <div class="markdown" v-html="html"></div>
</template>

<script>
import marked from 'marked'
import hljs from '@/assets/lib/highlight'

const renderer = new marked.Renderer()

marked.setOptions({
  renderer,
  highlight: code => hljs.highlightAuto(code).value
})

export default {
  name: 'MarkDown',
  props: {
    content: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    },
    onlyRender: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      html: ''
    }
  },
  created() {
    this.marked()
  },
  watch: {
    content() {
      this.marked()
    }
  },
  methods: {
    marked() {
      this.html = marked(this.content)

      // 对于只是纯解析文字不需要代码高亮和灯箱
      if (this.onlyRender) return
      this.$nextTick(() => {
        // 并不是每个 marked 都需要高亮处理
        if (this.target) {
          // 代码行数
          hljs.initLineNumbersOnLoad({
            target: this.target
          })
        }
      })
    }
  }
}
</script>
