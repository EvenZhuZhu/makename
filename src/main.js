// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/base.css'
import Utils from './lib/utils'
import axios from 'axios'
import $ from 'jquery'
import VueScroller from 'vue-scroller'


Vue.prototype.$http = axios

let qingbaozhan = new Vue()
export default qingbaozhan

Vue.use(Utils)
Vue.use(VueScroller)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
