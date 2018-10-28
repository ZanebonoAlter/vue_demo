<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="管理员名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="$router.push('/adminAdd')">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="aId" label="Id" width="80">
			</el-table-column>
			<el-table-column prop="aName" label="名称" sortable>
			</el-table-column>
			<el-table-column prop="aAccount" label="账号" width="150" sortable>
			</el-table-column>
			<!--<el-table-column prop="aPassword" label="密码" width="150" sortable>
			</el-table-column>-->
			<el-table-column prop="aState" label="状态" width="150" sortable>
				<template slot-scope="scope">
					<el-tag type="danger" v-if="scope.row.aState==0">已删除</el-tag>
					<el-tag type="success" v-if="scope.row.aState==1">正常</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="图片" width="200" sortable>
				<template slot-scope="scope">
					<img :src="scope.row.aImg" style="margin: 10px; height: 50%"/>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="250">
				<template slot-scope="scope">
					<el-button type="primary" size="medium" @click="$router.push({path:'/adminDetail',query:{aId:scope.row.aId}})">查看</el-button>
					<el-button size="medium" @click="$router.push({path:'/adminUpdate',query:{aId:scope.row.aId}})">编辑</el-button>
					<el-button type="danger" size="medium" @click="updateState(scope.row.aId,0)" v-if="scope.row.aState==1">删除</el-button>
					<el-button type="success" size="medium" @click="updateState(scope.row.aId,1)" v-else>恢复</el-button>
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
		    this.adminlist();
//			getData.bannerList().then(res => { //测试外部接口（环鹏）
//
//			})
        },
		methods: {
            adminlist(){
		        var params ={
		            pageIndex:this.pageIndex,
					pageSize:this.pageSize,
					name:this.filters.name,
				}
				getData.adminList(params).then(res => {
				    console.log(res);
					this.list=	res.data.admins;
				    this.total = res.data.count;
				})
			},
			updateState(aId,state){
                this.$confirm('是否修改数据？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '放弃修改'
                })
                    .then(() => {
                        getData.updateAdminState(aId,state).then(res=>{
                            if(res.data.message="删除成功"){
                                this.adminlist();
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
                this.adminlist();
			},
			handleCurrentChange(val) {
				this.pageIndex = val;
                this.adminlist();
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
		},
	}

</script>

<style scoped>

</style>
