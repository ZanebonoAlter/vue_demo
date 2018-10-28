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
    name: '人员档案',
    iconCls: 'el-icon-setting',
    hidden: false,
    children: [
      {path: '/personDetail', component: personDetail, name: '人员详情', permission: 'personDetail', hidden: true},
      {path: '/peopleDetail', component: peopleDetail, name: '人员相关记录', permission: 'peopleDetail', hidden: true},         {path: '/keyPerson', component: keyPerson, name: '重点人管理', permission: 'keyPerson'},
      {path: '/peopleList', component: peopleList, name: '一人一档', permission: 'personDetail'},
      {path: '/duplicatePerson', component: duplicatePerson, name: '多支付宝用户', permission: 'duplicatePerson'},
      {path: '/keyPersonEdit', component: keyPersonEdit, name: '编辑重点人员', permission: 'keyPersonEdit', hidden: true},
    ]
  },
  {
    permission: 'systemManager',
    path: '/',
    redirect: '/crashAdd',
    component: Home,
    name: '资金往来',
    iconCls: 'el-icon-setting',
    hidden: false,
    children: [
      // { path:'/crashDetail', component:AdminList, name:'资金流分析',permission:'crashDetail',hidden:true},
      {path: '/crashAdd', component: crashAdd, name: '流水导入', permission: 'crashAdd', hidden: false},
      {path: '/crashTable', component: crashTable, name: '流水查询', permission: 'crashTable', hidden: false},
    ]
  },
  {
    permission: 'systemManager',
    path: '/',
    redirect: '/buyList',
    component: Home,
    name: '线上购物',
    iconCls: 'el-icon-setting',
    hidden: false,
    children: [
      {path: '/buyDetail', component: AdminList, name: '购买人分析', permission: 'buyDetail', hidden: true},
      {path: '/buyList', component: buyList, name: '购买记录查询', permission: 'buyList', hidden: false},
      {path: '/buyAdd', component: buyAdd, name: '购买记录导入', permission: 'buyList', hidden: false},
    ]
  },
  {
    permission: 'systemManager',
    path: '/',
    redirect: '/crashList',
    component: Home,
    name: '综合挖掘',
    iconCls: 'el-icon-setting',
    hidden: false,
    children: [
      // { path:'/crashDetail', component:AdminList, name:'资金流分析',permission:'crashDetail',hidden:true},
      {path: '/crashList', component: crashList, name: '重点人员关系', permission: 'crashList', hidden: false},
      {path: '/lineAnalysis', component: lineAnalysis, name: '上下线分析', permission: 'lineAnalysis', hidden: false},
      {path: '/crashAnalysis', component: crashAnalysis, name: '全网泛化扫描', permission: 'crashAnalysis', hidden: false},
      {path: '/abnormalCapital', component: abnormalCapital, name: '异常资金流', permission: 'abnormalCapital', hidden: false}
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: {path: '/404'}
  }
];

export default routes;
