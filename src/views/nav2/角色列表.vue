<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="角色名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
				<el-form-item >
					<el-button type="primary" @click="$router.push('/roleAdd')" v-if="$checkPermissions('roleAdd')">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="roleId" label="Id" width="80">
			</el-table-column>
			<el-table-column prop="roleName" label="名称" sortable>
			</el-table-column>
			<el-table-column prop="roleDescription" label="描述" width="150" sortable>
			</el-table-column>
			<!--<el-table-column prop="aPassword" label="密码" width="150" sortable>
			</el-table-column>-->
			<el-table-column prop="roleState" label="状态" width="150" sortable>
				<template slot-scope="scope">
					<el-tag type="danger" v-if="scope.row.roleState==0">已冻结</el-tag>
					<el-tag type="success" v-if="scope.row.roleState==1">正常</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="250">
				<template slot-scope="scope">
					<el-button type="primary" size="medium" @click="$router.push({path:'/roleDetail',query:{roleId:scope.row.roleId}})" >查看</el-button>
					<el-button size="medium" @click="$router.push({path:'/roleUpdate',query:{roleId:scope.row.roleId}})" v-if="$checkPermissions('roleEdit')">编辑</el-button>
					<el-button type="danger" size="medium" @click="updateState(scope.row.roleId,0)" v-if="scope.row.roleState==1 && $checkPermissions('roleEdit')">冻结</el-button>
					<el-button type="success" size="medium" @click="updateState(scope.row.roleId,1)" v-if="scope.row.roleState==0 && $checkPermissions('roleEdit')">恢复</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import * as getData from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				list: [],
				total: 1,
				pageIndex: 1,
				pageSize:10,
				listLoading: false,
				sels: [],//列表选中列

			}
		},
        mounted() {
		    this.rolelist();
//			getData.bannerList().then(res => { //测试外部接口（环鹏）
//
//			})
        },
		methods: {
            rolelist(){
		        var params ={
		            pageIndex:this.pageIndex,
					pageSize:this.pageSize,
					name:this.filters.name,
				}
				getData.roleList(params).then(res => {
				    console.log(res);
					this.list=	res.data.roles;
				    this.total = res.data.count;
				})
			},
			updateState(roleId,state){
                this.$confirm('是否修改数据？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '放弃修改'
                })
                    .then(() => {
                        getData.changeRoleState(roleId,state).then(res=>{
                            if(res.data.code=1){
                                this.rolelist();
                            }
                        })
                    })
                    .catch(action => {
                        this.$message({
                            type: 'success',
                            message: '取消成功'
                        })
                    });
			},
			search(){
                this.rolelist();
			},
			handleCurrentChange(val) {
				this.pageIndex = val;
                this.rolelist();
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
		},
	}

</script>

<style scoped>

</style>
