import axios from 'axios';
import qs from 'qs'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };


export const bannerList = params => { return axios.get('/api/index/Banner/bannerList', { params: params }); };

export const bookList = params => { return axios.get('/back/book/searchBook.action', { params: params }); };

export const bookDetail = (bookId) =>{ return axios.get('/back/book/getUpdateBook.action?bookId='+bookId); };
// export const bookDetail = (bookId) =>{ return axios.post('/back/book/getUpdateBook.action',`bookId=${bookId}`); };
export const bookDetail_Params = params => { return axios.get('/back/book/getUpdateBook.action', { params: params }); };

export const orderList = params => { return axios.get('/back/order/getLimitOrder.action', { params: params }); };

export const addBook = (bookName,bookPrice,bookNumber,bookImg) => { return axios.post('/back/book/addBook.action',
    `bookName=${bookName}&bookPrice=${bookPrice}&bookNumber=${bookNumber}&bookImg=${bookImg}`); };

export const updateBook = (bookName,bookPrice,bookNumber,bookImg,bookId) => { return axios.post('/back/book/updateBook.action',
    `bookName=${bookName}&bookPrice=${bookPrice}&bookNumber=${bookNumber}&bookImg=${bookImg}&bookId=${bookId}`); };
/*
更改书本状态
 */
export const updateBookState = (bookId,state) => { return axios.post('/back/book/changeBook.action',
    `bookId=${bookId}&state=${state}`); };
/*
//获取管理员列表
 */
export const adminList = params => { return axios.get('/back/admin/getAdminList.action', { params: params }); };
/*
//更改管理员状态
 */
export const updateAdminState = (aId,state) => { return axios.post('/back/admin/changeAdminState.action',
    `aId=${aId}&state=${state}`); };
/*
//获取指定管理员
 */
export const adminDetail = (aId) =>{ return axios.get('/back/admin/getAdminById.action?aId='+aId); };
/*
添加管理员
 */
export const addAdmin = (aName,aAccount,aPassword,aImg,roleList) => { return axios.post('/back/admin/addAdmin.action',
    `aName=${aName}&aAccount=${aAccount}&aPassword=${aPassword}&aImg=${aImg}&roleList=${roleList}`); };
/*
更改管理员信息
 */
export const updateAdmin = (aId,aName,aAccount,aPassword,aImg,roleList) => { return axios.post('/back/admin/updateAdmin.action',
    `aId=${aId}&aName=${aName}&aAccount=${aAccount}&aPassword=${aPassword}&aImg=${aImg}&roleList=${roleList}`); };
/*
获取角色列表
 */
export const getAllRoleList = params => { return axios.get('/back/role/findAllRole.action', { params: params }); };
/*
获取分页角色列表
 */
export const roleList = params => { return axios.get('/back/role/getRoleListLimit.action', { params: params }); };
/*
改变角色状态
 */
export const changeRoleState = (roleId,State) => { return axios.post('/back/role/changeRoleState.action',
    `roleId=${roleId}&State=${State}`); };
/*
递归获取权限结果树
 */
export const permissionTree = params => { return axios.get('/back/permission/getPermissionTree.action', { params: params }); };
/*
添加角色
 */
export const addRole = (roleName,roleDescription,pId) => { return axios.post('/back/role/addRole.action',
    `roleName=${roleName}&roleDescription=${roleDescription}&pId=${pId}`); };
/*
获取角色信息
 */
export const roleDetail = (roleId) =>{ return axios.get('/back/role/getRole.action?roleId='+roleId); };
/*
更改角色
 */
export const updateRole = (roleName,roleDescription,roleId,pId) => { return axios.post('/back/role/updateRole.action',
    `roleName=${roleName}&roleDescription=${roleDescription}&roleId=${roleId}&pId=${pId}`); };
/*
递归获取权限结果树,默认禁选
*/
export const permissionTreeFalse = params => { return axios.get('/back/permission/getPermissionTreeFalse.action', { params: params }); };
/*
登录
 */
export const login = (aAccount,aPassword) => { return axios.post('/back/admin/login.action',
    `aAccount=${aAccount}&aPassword=${aPassword}`); };
/*
获取资金流列表-所有
 */
export const transferList_All = (pageIndex,pageSize,params) =>{
  return axios.get('/back/transferrecord/select/selectAll/'+pageIndex+'/'+pageSize, {params: params})}
/*
选择性(暂时最多1千条)
 */
export const transferList_Search = (pageIndex,pageSize,query, params) =>{return axios.get('/back/transferrecord/select/selectSearch/'+pageIndex+'/'+pageSize+'/'+query, {params: params})}

/*
获取购物列表-所有
*/
export const buyList_All = (pageIndex,pageSize) =>{return axios.get('/back/buyrecord/select/selectAll/'+pageIndex+'/'+pageSize)}
/*
选择性(暂时最多1千条)
 */
export const buyList_Search = (pageIndex,pageSize,query) =>{return axios.get('/back/buyrecord/select/selectSearch/'+pageIndex+'/'+pageSize+'/'+query)}
//图形信息获取
export const graph_Info = (query) =>{return axios.get('/back/transferrecord/graph?query='+query)}
//人员往来的转账记录查询
export const transfer_Info = (name1,name2) =>{return axios.get('/back/transferrecord/peopleDetail?name1='+name1+"&name2="+name2)}
//根据人名和查询字段获取节点信息-购物记录-转账记录-个人信息
export const person_buy_Info = params =>{return axios.get('/back/person/selectBuyRecordByName',{ params: params })}
export const person_transfer_Info = params =>{return axios.get('/back/person/selectTransferByName',{ params: params })}
export const person_person_Info = params =>{return axios.get('/back/person/personInfo',{ params: params })}
//记录重点人员，删除重点人员
export const add_person = (name) =>{return axios.put('/back/person/name/'+name)}
export const delete_person = (name) =>{return axios.delete('/back/person/name/'+name)}
//获取所有重点人员
export const person_keyPerson = params =>{return axios.get('/back/person/keyPerson')}
//更新重点人员信息
export const update_person = params =>{return axios.put('/back/person/keyPerson',params, {headers: {'Content-Type': 'application/json'}})}
//获取指定的重点人员信息
export const key_person_info = (name) =>{return axios.get('/back/person/keyPerson/'+name)}

//获取所有的人员以及类型
export const people_List = params =>{return axios.get('/back/person/allPeopleList',{ params: params })}
//获取一层挖掘
export const one_person_List = params =>{return axios.get('/back/transferrecord/firstFloor',{ params: params })}
//获取二层挖掘
export const two_person_List = params =>{return axios.get('/back/transferrecord/secondFloor',{ params: params })}
//获取当前资金流数量
export const transferRecord = params =>{return axios.get('/back/transferrecord/currentCount')}
//获取当前购物记录数量
export const buyRecord = params =>{return axios.get('/back/buyrecord/currentCount')}
//获取有多个支付宝的用户列表
export const getMuliZhifubao = params =>{return axios.get('/back/transferrecord/getMuliZhifubao')}
// 查询指定日期内的时间，分页查询
export const getDateFilter = (pageIndex,pageSize,query) =>{return axios.get('/back/transferrecord/queryDate/'+pageIndex+'/'+pageSize+'/'+query)}
//查询指定人名的转入转出条数
export const queryInfoName = params =>{return axios.get('/back/transferrecord/queryInfoName',{ params: params })}
// 上下线分析一层
export const queryGraphFirst = (custom, number) =>{return axios.get(`/back/transferrecord/queryGraphFirst?custom=${custom}&number=${number}`)}
// 上下线分析二层s
export const queryGraphSecond = (custom) =>{return axios.get(`/back/transferrecord/queryGraphSecond?custom=${custom}`)}
// 异常资金流
export const exceptionRecord = (minFee, maxFee) =>{return axios.get(`/back/transferrecord/exceptionRecord?minFee=${minFee}&maxFee=${maxFee}`)}
// 重点人关系
export const queryGraph = (query) =>{return axios.get('/back/transferrecord/queryGraph?custom='+query)}
//登录
export const Login = (account,password) =>{return axios.post('/back/user/login',`account=${account}&password=${password}`)}
//获取扩展节点信息
export const Extend_Graph = (name,level) =>{return axios.get('/back/transferrecord/onePersonGraph?name='+name+"&level="+level)}
