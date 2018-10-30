import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Table from './views/nav1/图书列表.vue'
import Form from './views/nav1/新增图书.vue'
import Edit from './views/nav1/编辑图书.vue'
import Detail from './views/nav1/图书详情.vue'
import user from './views/nav1/订单列表.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'

import AdminList from './views/nav2/管理员列表.vue'
import AdminAdd from './views/nav2/新增管理员.vue'
import AdminDetail from './views/nav2/管理员详情.vue'
import AdminUpdate from './views/nav2/编辑管理员.vue'

import RoleList from './views/nav2/角色列表.vue'
import RoleAdd from './views/nav2/新增角色.vue'
import RoleDetail from './views/nav2/角色详情.vue'
import RoleUpdate from './views/nav2/编辑角色.vue'

import crashList from './views/nav3/资金流总览.vue'
import crashTable from './views/nav3/资金流记录列表.vue'
import crashAdd from './views/nav3/导入资金流.vue'
import crashAnalysis from './views/nav3/数据挖掘.vue'
import lineAnalysis from './views/nav3/上下线分析.vue'
import abnormalCapital from './views/nav3/异常资金流.vue'

import buyList from './views/nav4/购物记录列表.vue'
import buyAdd from './views/nav4/导入购物记录.vue'

import personDetail from './views/nav5/人员详情.vue'
import peopleDetail from './views/nav5/相关人员记录详情.vue'
import keyPerson from './views/nav5/重点人管理.vue'
import peopleList from './views/nav5/人员列表.vue'
import keyPersonEdit from './views/nav5/编辑重点人员.vue'
import duplicatePerson from './views/nav5/支付宝重名管理.vue'
import VueRouter from "vue-router";

let routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  {
    path: '/',
    redirect: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  //{ path: '/main', component: Main },
  // {
  //     permission:'bookManager',
  //     path: '/',
  //     component: Home,
  //     name: '图书管理',
  //     hidden: false,
  //     iconCls: 'el-icon-message',//图标样式class
  //     children: [
  //         { path: '/table', component: Table, name: '图书列表',permission:'bookList' },
  //         { path: '/form', component: Form, name: '新增图书',permission:'bookAdd' },
  //         { path: '/edit', component: Edit, name: '编辑图书',hidden:true,permission:'bookEdit' },
  //         { path: '/detail', component: Detail, name: '图书详情',hidden:true,permission:'bookDetail' },
  //         { path: '/user', component: user, name: '订单列表',permission:'orderDetail' },
  //     ]
  // },
  // {
  //     permission:'systemManager',
  //     path: '/',
  //     component: Home,
  //     name: '系统管理',
  //     iconCls: 'el-icon-setting',
  //     hidden: false,
  //     children: [
  //         { path: '/page4', component: Page4, name: '页面4',hidden:true },
  //         { path: '/page5', component: Page5, name: '页面5',hidden:true },
  //         { path:'/adminList', component:AdminList, name:'管理员列表',permission:'adminList' },
  //         { path:'/adminAdd', component:AdminAdd, name:'新增管理员',permission:'adminAdd'},
  //         { path:'/adminDetail', component:AdminDetail, name:'管理员详情',hidden:true,permission:'adminDetail'},
  //         { path:'/adminUpdate', component:AdminUpdate, name:'编辑管理员',hidden:true,permission:'adminEdit'},
  //         { path:'/roleList', component:RoleList, name:'角色列表',permission:'roleList' },
  //         { path:'/roleAdd', component:RoleAdd, name:'新增角色',permission:'roleAdd'},
  //         { path:'/roleDetail', component:RoleDetail, name:'角色详情',hidden:true,permission:'roleDetail'},
  //         { path:'/roleUpdate', component:RoleUpdate, name:'编辑角色',hidden:true,permission:'roleEdit'}
  //     ]
  // },
  {
    permission: 'systemManager',
    path: '/',
    redirect: '/keyPerson',
    component: Home,
    meta: {
      title: '人员档案'
    },
    iconCls: 'el-icon-setting',
    hidden: false,
    children: [
      {
        path: '/peopleDetail',
        component: peopleDetail,
        meta: {
          title: '人员相关记录'
        },
        permission: 'peopleDetail1',
        hidden: true
      },
      {
        path: '/keyPerson',
        component: keyPerson,
        meta: {
          title: '重点人管理'
        },
        permission: 'keyPerson',
        children: [
          {
            path: 'personDetail',
            component: personDetail,
            meta: {
              title: '人员详情'
            },
            permission: 'personDetail',
            hidden: true
          },
          {
            path: 'keyPersonEdit',
            component: keyPersonEdit,
            meta: {
              title: '编辑重点人员'
            },
            permission: 'keyPersonEdit',
            hidden: true
          }
        ]
      },
      {
        path: '/peopleList',
        component: peopleList,
        meta: {
          title: '一人一档'
        },
        permission: 'personDetail',
        children: [
          {
            path: 'personDetail',
            component: personDetail,
            meta: {
              title: '人员详情'
            },
            permission: 'personDetail',
            hidden: true
          }
        ]
      },
      {
        path: '/duplicatePerson',
        component: duplicatePerson,
        meta: {
          title: '编辑重点人员'
        },
        permission: 'duplicatePerson',
        children: [
          {
            path: 'personDetail',
            component: personDetail,
            name: '人员详情',
            permission: 'personDetail',
            hidden: true
          },
          {
            path: 'keyPersonEdit',
            component: keyPersonEdit,
            name: '编辑重点人员',
            permission: 'keyPersonEdit',
            hidden: true
          }
        ]
      },
      {
        path: '/keyPersonEdit',
        component: keyPersonEdit,
        meta: {
          title: '编辑重点人员'
        },
        permission: 'keyPersonEdit',
        hidden: true
      }
    ]
  },
  {
    permission: 'systemManager',
    path: '/',
    redirect: '/crashAdd',
    component: Home,
    meta: {
      title: '资金往来'
    },
    iconCls: 'el-icon-setting',
    hidden: false,
    children: [
      // { path:'/crashDetail', component:AdminList, name:'资金流分析',permission:'crashDetail',hidden:true},
      {
        path: '/crashAdd',
        component: crashAdd,
        meta: {
          title: '流水导入'
        },
        permission: 'crashAdd',
        hidden: false
      },
      {
        path: '/crashTable',
        component: crashTable,
        meta: {
          title: '流水查询'
        },
        permission: 'crashTable',
        hidden: false
      }
    ]
  },
  {
    permission: 'systemManager',
    path: '/',
    redirect: '/buyList',
    component: Home,
    meta: {
      title: '线上购物'
    },
    iconCls: 'el-icon-setting',
    hidden: false,
    children: [
      {
        path: '/buyDetail',
        component: AdminList,
        meta: {
          title: '购买人分析'
        },
        permission: 'buyDetail',
        hidden: true
      },
      {
        path: '/buyList',
        component: buyList,
        meta: {
          title: '购买记录查询'
        },
        permission: 'buyList',
        hidden: false
      },
      {
        path: '/buyAdd',
        component: buyAdd,
        meta: {
          title: '购买记录导入'
        },
        permission: 'buyList',
        hidden: false
      }
    ]
  },
  {
    permission: 'systemManager',
    path: '/',
    redirect: '/crashList',
    component: Home,
    meta: {
      title: '综合挖掘'
    },
    iconCls: 'el-icon-setting',
    hidden: false,
    children: [
      // { path:'/crashDetail', component:AdminList, name:'资金流分析',permission:'crashDetail',hidden:true},
      {
        path: '/crashList',
        component: crashList,
        meta: {
          title: '重点人员关系'
        },
        permission: 'crashList',
        hidden: false,
        children: [
          {
            path: 'personDetail',
            component: personDetail,
            meta: {
              title: '人员详情'
            },
            permission: 'personDetail',
            hidden: true
          },
          {
            path: 'peopleDetail',
            component: peopleDetail,
            meta: {
              title: '人员相关记录'
            },
            permission: 'peopleDetail1',
            hidden: true
          }
        ]
      },
      {
        path: '/lineAnalysis',
        component: lineAnalysis,
        meta: {
          title: '上下线分析'
        },
        permission: 'lineAnalysis',
        hidden: false,
        children: [
          {
            path: 'personDetail',
            component: personDetail,
            meta: {
              title: '人员详情'
            },
            permission: 'personDetail',
            hidden: true
          },
          {
            path: 'peopleDetail',
            component: peopleDetail,
            meta: {
              title: '人员相关记录'
            },
            permission: 'peopleDetail1',
            hidden: true
          }
        ]
      },
      {
        path: '/crashAnalysis',
        component: crashAnalysis,
        meta: {
          title: '全网泛化扫描'
        },
        permission: 'crashAnalysis',
        hidden: false,
        children: [
          {
            path: 'personDetail',
            component: personDetail,
            meta: {
              title: '人员详情'
            },
            permission: 'personDetail',
            hidden: true
          },
          {
            path: 'peopleDetail',
            component: peopleDetail,
            meta: {
              title: '人员相关记录'
            },
            permission: 'peopleDetail1',
            hidden: true
          }
        ]
      },
      {
        path: '/abnormalCapital',
        component: abnormalCapital,
        meta: {
          title: '异常资金流'
        },
        permission: 'abnormalCapital',
        hidden: false
      }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: {path: '/404'}
  }
];
const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('admin');
  }
  //let user = JSON.parse(sessionStorage.getItem('user'));
  // let user = sessionStorage.getItem('admin');
  // if (!user && to.path != '/login') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
  next();
})
export default router;
