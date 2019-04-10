import Vue from 'vue'
import isMobile from 'ismobilejs'
import VueProgressBar from 'vue-progressbar'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'

// 全局样式与字体图标
import 'gitalk/dist/gitalk.css'
import './assets/style/layout.less'
import './assets/icons'

// 配置全局变量
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$isMobile = isMobile.phone

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
