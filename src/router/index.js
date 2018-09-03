import Vue from 'vue'
import Router from 'vue-router'
import VueClipboard from 'vue-clipboard2'

let Xsc = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/xsc'))
  })
}

let Cjxs = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/cjxs'))
  })
}

let Fabuxuqiu = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/fabuxuqiu'))
  })
}

let Zhifu = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/zhifu'))
  })
}

let Czts = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/czts'))
  })
}

let Wd = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/wd'))
  })
}

let Xx = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/xx'))
  })
}

let Yetx = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/yetx'))
  })
}

let Yetxcg = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/yetxcg'))
  })
}

let Wdfabu = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/wdfabu'))
  })
}

let Fbxq = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/fbxq'))
  })
}

let Dzfdd = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/dzfdd'))
  })
}

let Sztxzh = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/sztxzh'))
  })
}

let Zhszcg = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/zhszcg'))
  })
}

let Szjymm = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/szjymm'))
  })
}

let Zcszjymm = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/zcszjymm'))
  })
}

let Szjl = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/szjl'))
  })
}

let Register = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/register'))
  })
}

let Userxy = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/userxy'))
  })
}

let Pays = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/pays'))
  })
}

let Drag = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/components/makename/pages/drag'))
  })
}

Vue.use(Router)
Vue.use(VueClipboard)

let router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/makename/',
      name: 'xsc',
      meta: {
        title: '悬赏池',
        keepAlive: true,
        index: 1,
      },
      component: Xsc
    },
    {
      path: '/makename/cjxs',
      name: 'cjxs',
      meta: {
        title: '参加悬赏',
        index: 2,
      },
      component: Cjxs
    },
    {
      path: '/makename/fabuxuqiu',
      name: 'fabuxuqiu',
      meta: {
        title: '发布需求',
        index: 3,
      },
      component: Fabuxuqiu
    },
    {
      path: '/makename/zhifu',
      name: 'zhifu',
      meta: {
        title: '支付',
        index: 4,
      },
      component: Zhifu
    },
    {
      path: '/makename/czts',
      name: 'czts',
      meta: {
        title: '操作提示',
        index: 5,
      },
      component: Czts
    },
    {
      path: '/makename/wd',
      name: 'wd',
      meta: {
        title: '我的',
        index: 6,
      },
      component: Wd
    },
    {
      path: '/makename/xx',
      name: 'xx',
      meta: {
        title: '消息',
        index: 7,
      },
      component: Xx
    },
    {
      path: '/makename/yetx',
      name: 'yetx',
      meta: {
        title: '余额提现',
        index: 8,
      },
      component: Yetx
    },
    {
      path: '/makename/yetxcg',
      name: 'yetxcg',
      meta: {
        title: '余额提现成功',
        index: 9,
      },
      component: Yetxcg
    },
    {
      path: '/makename/wdfabu',
      name: 'wdfabu',
      meta: {
        title: '我的发布',
        index: 10,
      },
      component: Wdfabu
    },
    {
      path: '/makename/fbxq',
      name: 'fbxq',
      meta: {
        title: '发布详情',
        index: 11,
      },
      component: Fbxq
    },
    {
      path: '/makename/dzfdd',
      name: 'dzfdd',
      meta: {
        title: '待支付订单',
        index: 12,
      },
      component: Dzfdd
    },
    {
      path: '/makename/sztxzh',
      name: 'sztxzh',
      meta: {
        title: '设置提现账户',
        index: 13,
      },
      component: Sztxzh
    },
    {
      path: '/makename/zhszcg',
      name: 'zhszcg',
      meta: {
        title: '账户设置成功',
        index: 14,
      },
      component: Zhszcg
    },
    {
      path: '/makename/szjymm',
      name: 'szjymm',
      meta: {
        title: '设置交易密码',
        index: 15,
      },
      component: Szjymm
    },
    {
      path: '/makename/zcszjymm',
      name: 'zcszjymm',
      meta: {
        title: '再次设置交易密码',
        index: 16,
      },
      component: Zcszjymm
    },
    {
      path: '/makename/szjl',
      name: 'szjl',
      meta: {
        title: '收支记录',
        index: 17,
      },
      component: Szjl
    },
    {
      path: '/makename/register',
      name: 'register',
      meta: {
        title: '快捷登陆',
        index: 18,
      },
      component: Register
    },
    {
      path: '/makename/userxy',
      name: 'userxy',
      meta: {
        title: '用户中心',
        index: 19,
      },
      component: Userxy
    },
    {
      path: '/makename/pays',
      name: 'pays',
      meta: {
        title: '支付页面',
        index: 20,
      },
      component: Pays
    },
    {
      path: '/makename/drag',
      name: 'drag',
      component: Drag
    }
  ],
})

//设置title
router.afterEach((to, from) => {
  if (to.meta.title) {
    window.document.title = to.meta.title
  } else {
    window.document.title = '商标名片'
  }
})

export default router

