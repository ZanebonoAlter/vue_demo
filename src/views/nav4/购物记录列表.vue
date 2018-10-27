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
					<el-button type="primary" @click="$router.push('/buyAdd')" >导入</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55" >
			</el-table-column>
			<el-table-column prop="buyRecordOrderId" label="订单编号" width="150">
			</el-table-column>
			<el-table-column prop="buyRecordOrderFee" label="付款金额" width="150" sortable>
			</el-table-column>
			<el-table-column prop="buyRecordBuyerAccount" label="买家账号" width="150" sortable>
			</el-table-column>
			<el-table-column prop="buyRecordSellerAccount" label="卖家账号" width="150" sortable>
			</el-table-column>
			<el-table-column prop="buyRecordGoodsTitle" label="商品标题" width="300" sortable>
			</el-table-column>
			<el-table-column prop="buyRecordGoodsPrice" label="商品单价" width="150" sortable>
			</el-table-column>
			<el-table-column prop="buyRecordGoodsNum" label="数量" width="150" sortable>
			</el-table-column>
			<el-table-column prop="buyRecordAddress" label="收货地址" width="150" sortable>
			</el-table-column>
			<el-table-column prop="buyRecordStatus" label="付款状态" width="150" sortable>
			</el-table-column>
			<el-table-column prop="buyRecordTime" label="付款时间" width="150" sortable>
			</el-table-column>
			<el-table-column prop="buyRecordReceiverName" label="收货人" width="150" sortable>
			</el-table-column>
			<el-table-column prop="buyRecordReceiverPhone" label="收货号码" width="150" sortable>
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
				getData.buyList_All(this.pageIndex,this.pageSize).then(res => {
				    console.log(res);
					this.list=	res.data.list;
					for(var i=0;i<this.list.length;i++){
					    this.list[i].buyRecordTime=format(this.list[i].buyRecordTime);
					}
				    this.total = res.data.count;
                    console.log(this.total);
				})
			},
			search(){
		        this.searchName=this.filters.name;
                this.pageIndex=1;
                if(this.searchName==""){
                    getData.buyList_All(this.pageIndex,this.pageSize).then(res => {
                        console.log(res);
                        this.list=	res.data.list;
                        for(var i=0;i<this.list.length;i++){
                            this.list[i].buyRecordTime=format(this.list[i].buyRecordTime);
                        }
                        this.total = res.data.count;
                    })
                }else{
                    getData.buyList_Search(this.pageIndex,this.pageSize,this.searchName).then(res => {
                        console.log(res);
                        this.list=	res.data.list;
                        for(var i=0;i<this.list.length;i++){
                            this.list[i].buyRecordTime=format(this.list[i].buyRecordTime);
                        }
                        this.total = res.data.count;
                    })
				}
			},search_common(){
			    if(this.searchName==""){
                    getData.buyList_All(this.pageIndex,this.pageSize).then(res => {
                        console.log(res);
                        this.list=	res.data.list;
                        for(var i=0;i<this.list.length;i++){
                            this.list[i].buyRecordTime=format(this.list[i].buyRecordTime);
                        }
                        this.total = res.data.count;
                    })
				}else{
                    getData.buyList_Search(this.pageIndex,this.pageSize,this.searchName).then(res => {
                        console.log(res);
                        this.list=	res.data.list;
                        for(var i=0;i<this.list.length;i++){
                            this.list[i].buyRecordTime=format(this.list[i].buyRecordTime);
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