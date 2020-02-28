import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import Fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
//为事件总线new一个实例
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//解决移动端300ms延时
Fastclick.attach(document.body)
//安装懒加载
Vue.use(VueLazyLoad,{
  //加载失败的图片
  loading:require('./assets/img/common/loading.gif')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
