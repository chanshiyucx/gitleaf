import Vue from 'vue'
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
