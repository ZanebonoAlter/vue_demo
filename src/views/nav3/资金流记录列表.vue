<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="关键字"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="$router.push('/crashAdd')" >导入</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55" >
			</el-table-column>
			<el-table-column prop="transferRecordFlowId" label="流水号" width="150">
			</el-table-column>
			<el-table-column prop="transferRecordCreateTime" label="创建时间" width="150" sortable>
			</el-table-column>
			<el-table-column prop="transferRecordPayTime" label="付款时间" width="150" sortable>
			</el-table-column>
			<el-table-column prop="transferRecordPayFee" label="金额" width="150" sortable>
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.transferRecordPayFee>5000">{{scope.row.transferRecordPayFee}}</el-tag>
                    <el-tag v-else>{{scope.row.transferRecordPayFee}}</el-tag>
                </template>
			</el-table-column>
			<el-table-column prop="transferRecordPayZhifubao" label="付款支付宝" width="150" sortable>
			</el-table-column>
			<el-table-column prop="transferRecordPayZhifubaoId" label="付款支付宝ID" width="150" sortable>
			</el-table-column>
			<el-table-column prop="transferRecordPayName" label="付款人" width="150" sortable>
			</el-table-column>
			<el-table-column prop="transferRecordCollectionZhifubao" label="收款支付宝" width="150" sortable>
			</el-table-column>
			<el-table-column prop="transferRecordCollectionZhifubaoId" label="收款支付宝ID" width="150" sortable>
			</el-table-column>
			<el-table-column prop="transferRecordCollectionName" label="收款人" width="150" sortable>
			</el-table-column>
			<el-table-column prop="transferRecordRemark" label="转账备注" width="150" sortable>
			</el-table-column>
			<el-table-column prop="transferRecordFlow" label="资金流向" width="150" sortable>
			</el-table-column>
			<el-table-column prop="transferRecordStatus" label="状态" width="150" sortable>
			</el-table-column>
			<el-table-column prop="transferRecordProductName" label="转账产品名称" width="150" sortable>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import * as getData from '../../api/api';
	function format(time){
        var d = new Date(time);
        var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        if(times=='1970-1-1 8:0:0')
            return ''
        return times;
    }
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
				searchName:''
			}
		},
        mounted() {
		    this.transferList();
        },
		methods: {

		    transferList(){
		        var params ={
		            pageIndex:this.pageIndex,
					pageSize:this.pageSize,
					name:this.filters.name,
				}
				getData.transferList_All(this.pageIndex,this.pageSize).then(res => {
				    console.log(res);
					this.list=	res.data.list;
					for(var i=0;i<this.list.length;i++){
					    this.list[i].transferRecordCreateTime=format(this.list[i].transferRecordCreateTime);
                        this.list[i].transferRecordPayTime=format(this.list[i].transferRecordPayTime);
					}
				    this.total = res.data.count;
				})
			},
			search(){
		        this.searchName=this.filters.name;
                this.pageIndex=1;
                if(this.searchName==""){
                    getData.transferList_All(this.pageIndex,this.pageSize).then(res => {
                        console.log(res);
                        this.list=	res.data.list;
                        for(var i=0;i<this.list.length;i++){
                            this.list[i].transferRecordCreateTime=format(this.list[i].transferRecordCreateTime);
                            this.list[i].transferRecordPayTime=format(this.list[i].transferRecordPayTime);
                        }
                        this.total = res.data.count;
                    })
                }else{
                    getData.transferList_Search(this.pageIndex,this.pageSize,this.searchName).then(res => {
                        console.log(res);
                        this.list=	res.data.list;
                        for(var i=0;i<this.list.length;i++){
                            this.list[i].transferRecordCreateTime=format(this.list[i].transferRecordCreateTime);
                            this.list[i].transferRecordPayTime=format(this.list[i].transferRecordPayTime);
                        }
                        this.total = res.data.count;
                    })
				}
			},search_common(){
			    if(this.searchName==""){
                    getData.transferList_All(this.pageIndex,this.pageSize).then(res => {
                        console.log(res);
                        this.list=	res.data.list;
                        for(var i=0;i<this.list.length;i++){
                            this.list[i].transferRecordCreateTime=format(this.list[i].transferRecordCreateTime);
                            this.list[i].transferRecordPayTime=format(this.list[i].transferRecordPayTime);
                        }
                        this.total = res.data.count;
                    })
				}else{
                    getData.transferList_Search(this.pageIndex,this.pageSize,this.searchName).then(res => {
                        console.log(res);
                        this.list=	res.data.list;
                        for(var i=0;i<this.list.length;i++){
                            this.list[i].transferRecordCreateTime=format(this.list[i].transferRecordCreateTime);
                            this.list[i].transferRecordPayTime=format(this.list[i].transferRecordPayTime);
                        }
                        this.total = res.data.count;
                    })
				}
            },
			handleCurrentChange(val) {
				this.pageIndex = val;
                this.search_common();
			},
			selsChange: function (sels) {
				this.sels = sels;
				console.log(this.sels)
			},
		},
	}

</script>

<style scoped>

</style>