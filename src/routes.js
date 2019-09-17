import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    },
    /* 共享页面 */
    {
      path: '/',
      name: '',
      redirect:'/login',
      hidden: true //用户自定义属性,主要用来控制本条路由是否显示在菜单中
    },
    {
      path: '/login',
      component: () => import('@/components/Login.vue'),
      name: '',
      hidden: true //用户自定义属性,主要用来控制本条路由是否显示在菜单中
    },
    {
      path: '/404',
      component: () => import('@/components/404.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/password',
      component: () => import('@/components/ChangePassword.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/home',
      component: () => import('@/components/Home.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/help',
      component: () => import('@/components/Help.vue'),
      name: '',
      hidden: true
    },
    /* ***** */
    /* 手机端 */
    {
      path: '/mobile',
      component: () => import('@/components/MobileHome.vue'),
      name:'',
      hidden: true,
      children: [
        {
          path: '/mobile/prj001',
          name: 'Prj001手机端',
          component: () => import('@/components/prj001/mobile/MobilePrj001.vue'),
        },
        {
          path: '/mobile/prj002',
          name: 'Prj002手机端',
          component: () => import('@/components/prj002/mobile/MobilePrj002.vue'),
        },
        {
          path: '/mobile/prj003',
          name: 'Prj003手机端',
          component: () => import('@/components/prj003/mobile/MobilePrj003.vue'),
        }
      ]
    },
    /* 各项目入口 */
    {
      path: '/prj001',
      component: () => import('@/components/prj001/Prj001.vue'),
      name: '排卵障碍性异常子宫出血',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        { path: '/prj001/table',
          name: '数据列表',
          component: () => import('@/components/prj001/pages/Table.vue'),
          iconCls: 'fa fa-address-card',
          leaf: false
        },
        { path: '/prj001/QRcode',
          name: '移动端录入',
          component: () => import('@/components/prj001/pages/QRcode.vue'),
          iconCls: 'fa fa-qrcode',
          leaf: false
        },
        { path: '/prj001/echarts',
          name: '数据分析',
          component: () => import('@/components/prj001/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart',
          leaf: false
        },
        { path: '/prj001/about',
          name: '关于',
          component: () => import('@/components/prj001/pages/About.vue'),
          iconCls: 'fa fa-id-card-o',
          leaf: false
        }
      ]
    },
    {
      path: '/prj002',
      component: () => import('@/components/prj002/Prj002.vue'),
      name: '多囊卵巢综合征',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        { path: '/prj002/table',
          name: '数据列表',
          component: () => import('@/components/prj002/pages/Table.vue'),
          iconCls: 'fa fa-address-card',
          leaf: false
        },
        { path: '/prj002/QRcode',
          name: '移动端录入',
          component: () => import('@/components/prj002/pages/QRcode.vue'),
          iconCls: 'fa fa-qrcode',
          leaf: false
        },
        { path: '/prj002/echarts',
          name: '数据分析',
          component: () => import('@/components/prj002/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart',
          leaf: false
        },
        { path: '/prj002/about',
          name: '纳入标准与排除标准',
          component: () => import('@/components/prj002/pages/About.vue'),
          iconCls: 'fa fa-bar-chart',
          leaf: false
        }

      ]
    },
    {
      path: '/prj003',
      component: () => import('@/components/prj003/Prj003.vue'),
      name: '原发性痛经',
      iconCls: 'fa fa-address-card',  //用户自定义属性
      leaf: false, //用户自定义属性,用来确定某条菜单是否还有下级菜单
      children: [
        { path: '/prj003/table',
          name: '数据列表',
          component: () => import('@/components/prj003/pages/Table.vue'),
          iconCls: 'fa fa-address-card',
          leaf: false
        },
        { path: '/prj003/QRcode',
          name: '移动端录入',
          component: () => import('@/components/prj003/pages/QRcode.vue'),
          iconCls: 'fa fa-qrcode',
          leaf: false
        },
        { path: '/prj003/echarts',
          name: '数据分析',
          component: () => import('@/components/prj003/pages/Echarts.vue'),
          iconCls: 'fa fa-bar-chart',
          leaf: false
        }
      ]
    },
    /* ***** */
  ]
})
