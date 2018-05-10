import Vue from 'vue'
import Router from 'vue-router'

// 主页面框架
const Home = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Home'))
  })
}
// 首页&冰箱列表
const Fridges = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Fridges/Fridges'))
  })
}
// 冰箱详情
const Fridges_Detail = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Fridges/Fridges_Detail'))
  })
}
// 品牌列表
const Manufacturer = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Manufacturer/Manufacturer'))
  })
}
// 品牌详情
const MF_detail = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Manufacturer/MF_detail'))
  })
}
// 动态
const New = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/New/New'))
  })
}
// 动态详情
const New_Detail = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/New/New_detail'))
  })
}
// 错误404
const NotFound = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Layout/404'))
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/404',
      component: NotFound,
      name: '错误界面',
      hidden: true
    },
    {
      path: '*',
      name: '404',
      hidden: true,// 隐藏，在菜单中不显示
      redirect: {path: '/404'}
    },
    {
      path: '/',
      name: '主页面',
      component: Home,
      redirect: {path: '/index'},
      children: [
        {path: '/index', component: Fridges, name: '所有冰箱', icon: 'icon-dangan', meta: {keepAlive: true}},
        {
          path: '/fridges_detail',
          component: Fridges_Detail,
          name: '医用冰箱详情',
          hidden: true,
          meta: {tabbar: false, keepAlive: false}
        },
        {
          path: '/manufacturer',
          component: Manufacturer,
          name: '所有品牌',
          icon: 'icon-scsxx',
          meta: {keepAlive: true}
        },
        {
          path: '/mf_detail',
          component: MF_detail,
          name: '品牌信息',
          hidden: true,
          meta: {tabbar: false, keepAlive: false}
        },
        {path: '/new', component: New, name: '最新动态', icon: 'icon-quanquandongtai', meta: {keepAlive: true}},
        {
          path: '/new_detail',
          component: New_Detail,
          name: '动态详情',
          hidden: true,
          meta: {tabbar: false, keepAlive: false}
        }
      ]
    }
  ]
})
