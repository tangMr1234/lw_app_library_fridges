import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from '@/router/index'
import {
  ConfirmPlugin,
  AlertPlugin,
  TransferDom,
  ViewBox,
  XHeader,
  Flexbox,
  FlexboxItem,
  Group,
  Cell,
  Panel,
  Tab,
  TabItem,
  Card,
  Previewer,
  Tabbar,
  TabbarItem,
  Divider,
  XImg,
  XInput,
  XButton,
  Blur,
  Popup,
  Masker,
  XSwitch,
  Calendar,
  XTextarea,
  Box,
  Selector,
  XNumber,
  Range,
  DatetimeRange,
  Checker,
  CheckerItem,
  Loading
} from 'vux'
import BScroll from '@/components/BScroll.vue'
import utils from '@/utils/utils'

require('./assets/icon/iconfont');

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component('b-scroll', BScroll)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.directive('transfer-dom', TransferDom)
Vue.component('view-box', ViewBox)
Vue.component('x-header', XHeader)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('panel', Panel)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('card', Card)
Vue.component('previewer', Previewer)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('divider', Divider)
Vue.component('x-img', XImg)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)
Vue.component('blur', Blur)
Vue.component('popup', Popup)
Vue.component('masker', Masker)
Vue.component('x-switch', XSwitch)
Vue.component('calendar', Calendar)
Vue.component('x-textarea', XTextarea)
Vue.component('selector', Selector)
Vue.component('box', Box)
Vue.component('x-number', XNumber)
Vue.component('range', Range)
Vue.component('datetime-range', DatetimeRange)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('loading', Loading)

FastClick.attach(document.body)
const store = new Vuex.Store({}) // 这里你可能已经有其他 module

store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})

Vue.config.productionTip = false
//注册全局方法，用来获取url传递的参数
Vue.prototype.$utils = utils
//关闭loading的全局方法
Vue.prototype.loadingRemove = function () {
  store.commit('updateLoadingStatus', {isLoading: false})
}
//注册弹窗的全局方法
Vue.prototype.confirm = function (title, content, buttonText, func) {
  this.$vux.confirm.show({
    title: title,
    content: content,
    confirmText: buttonText,
    onConfirm() {
      if (func && func != "") {
        func();
      }
    }
  })
}
//注册alert的全局方法
Vue.prototype.alert = function (title, content, buttonText, func) {
  this.$vux.alert.show({
    title: title,
    content: content,
    buttonText: buttonText,
    onHide() {
      if (func && func != "") {
        func();
      }
    }
  })
}
//刷新页面的全局方法
Vue.prototype.reload = function () {
  window.location.reload();
}

router.beforeEach(function (to, from, next) {
  if (to.path != "/login") {
    store.commit('updateLoadingStatus', {isLoading: true})
  }
  next()
})

router.afterEach(function (to) {
  // store.commit('updateLoadingStatus', {isLoading: false})
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
