<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="订单编号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="orderId" label="订单编号">
			</el-table-column>
			<el-table-column label="订单商品" width="200" sortable>
				<template slot-scope="scope">
					<img :src="scope.row.orderImg" style="margin: 10px; height: 50%"/>
				</template>
			</el-table-column>
			<el-table-column prop="orderUsername" label="收货人" sortable>
			</el-table-column>
			<el-table-column prop="orderPrice" label="订单金额(元)" sortable>
			</el-table-column>
			<el-table-column prop="orderCreateTime" label="下单时间" sortable>
			</el-table-column>
			<el-table-column prop="orderStatus" label="订单状态" sortable>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click=" ">查看</el-button>
					<el-button type="danger" size="small">删除</el-button>
				</template>
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

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                list: [],
                total: 1,
                page: 1,
				pageSize:10,
                listLoading: false,
            }
        },
        mounted() {
            var params = {
                pageIndex:this.page,
				pageSize:this.pageSize
            }
            this.init(params);
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
            },
			init(params){
                getData.orderList(params).then(res=>{
					this.list=res.data.orders;
					this.total=res.data.count;
				})
			}
        },
    }

</script>

<style scoped>

</style>