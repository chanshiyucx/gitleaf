import Vue from 'vue'
import isMobile from 'ismobilejs'
import AV from 'leancloud-storage'
import VueProgressBar from 'vue-progressbar'
import SmoothScroll from 'smooth-scroll'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'

// 全局样式与字体图标
import 'gitalk/dist/gitalk.css'
import './assets/style/layout.less'
import './assets/style/github-markdown.css'
import './assets/icons'

// 配置全局变量
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$isMobile = isMobile.phone

// 滚动到锚点
const scrollOpts = {
  updateURL: false,
  emitEvents: false,
  durationMin: 1000,
  durationMax: 1200,
  easing: 'easeOutQuint'
}
const scroll = new SmoothScroll()
Vue.prototype.$scroll = anchor => {
  console.log('animateScroll')
  scroll.animateScroll(anchor, scrollOpts)
}

// Register AV objects to the global
window.AV = AV

// Init Leancloud
AV.init(config.leancloud)

// 顶部进度条
const options = {
  color: '#77B6FF',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
