<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="书名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="$router.push('/form')" v-if="$checkPermissions('bookAdd')">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55" >
			</el-table-column>
			<el-table-column prop="bookId" label="Id" width="80">
			</el-table-column>
			<el-table-column prop="bookName" label="书名" sortable>
			</el-table-column>
			<el-table-column prop="bookPrice" label="价格" width="150" sortable>
			</el-table-column>
			<el-table-column prop="bookNumber" label="库存" width="150" sortable>
			</el-table-column>
			<el-table-column prop="bookState" label="状态" width="150" sortable>
				<template slot-scope="scope">
					<el-tag type="danger" v-if="scope.row.bookState==0">已删除</el-tag>
					<el-tag type="success" v-if="scope.row.bookState==1">正常</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="图片" width="200" sortable>
				<template slot-scope="scope">
					<img :src="scope.row.bookImg" style="margin: 10px; height: 50%"/>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="250">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="$router.push({path:'/detail',query:{bId:scope.row.bookId}})">查看</el-button>
					<el-button size="small" @click="$router.push({path:'/edit',query:{bId:scope.row.bookId}})" v-if="$checkPermissions('bookEdit')">编辑</el-button>
					<el-button type="danger" size="small" @click="updateState(scope.row.bookId,0)" v-if="scope.row.bookState==1 && $checkPermissions('bookEdit')" >删除</el-button>
					<el-button type="success" size="small" @click="updateState(scope.row.bookId,1)" v-if="scope.row.bookState==0 && $checkPermissions('bookEdit')">恢复</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" :disabled="this.sels.length===0" @click="deleteAny()">批量删除</el-button>
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
		    this.bookList();
//			getData.bannerList().then(res => { //测试外部接口（环鹏）
//
//			})
        },
		methods: {
		    bookList(){
		        var params ={
		            pageIndex:this.pageIndex,
					pageSize:this.pageSize,
					name:this.filters.name,
				}
				getData.bookList(params).then(res => {
				    console.log(res);
					this.list=	res.data.books;
				    this.total = res.data.count;
				})
			},
			updateState(bookId,state){
                this.$confirm('是否修改数据？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '放弃修改'
                })
                    .then(() => {
                        getData.updateBookState(bookId,state).then(res=>{
                            if(res.data.message="删除成功"){
                                this.bookList();
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
                this.bookList();
			},
			handleCurrentChange(val) {
				this.pageIndex = val;
                this.bookList();
			},
			selsChange: function (sels) {
				this.sels = sels;
				console.log(this.sels)
			},
			deleteAny(){
                this.$confirm('是否修改数据？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '放弃修改'
                })
                    .then(() => {
                        for(var i=0;i<this.sels.length;i++){
                            console.log(this.sels[i])
                            getData.updateBookState(this.sels[i].bookId,0).then(res=>{
                                this.bookList();
                            });
                        }
                        //this.bookList();
                    })
                    .catch(action => {
                        this.$message({
                            type: 'success',
                            message: '取消成功'
                        })
                    });
			}
		},
	}

</script>

<style scoped>

</style>