<template>
  <section>
    <!--工具条-->
    <el-col :span="24" style="padding-bottom: 0">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="filters.date"
            type="daterange"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy/MM/dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="$router.push('/crashAdd')">导入</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div class="money-wrap clearfix">
      <div class="money-item fl">转入金额：<span>{{(money.in).toFixed(2)}}元</span></div>
      <div class="money-item fl">转出金额：<span>{{(money.out).toFixed(2)}}元</span></div>
    </div>
    <!--列表-->
    <el-table :data="list" border highlight-current-row @selection-change="selsChange" style="width: 100%;">
      <!--<el-table-column type="selection" width="55">-->
      <!--</el-table-column>-->
      <el-table-column align="center" prop="transferRecordFlowId" label="流水号" width="150">
      </el-table-column>
      <el-table-column align="center" prop="transferRecordCreateTime" label="创建时间" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordPayTime" label="付款时间" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordPayFee" label="金额" width="150" sortable>
        <template slot-scope="scope">
          <span class="text-red" v-if="scope.row.transferRecordPayFee>5000">{{scope.row.transferRecordPayFee}}</span>
          <span class="text-blue" v-else>{{scope.row.transferRecordPayFee}}</span>
          <!--<el-tag type="danger" v-if="scope.row.transferRecordPayFee>5000"></el-tag>-->
          <!--<el-tag v-else>{{scope.row.transferRecordPayFee}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordPayZhifubao" label="付款支付宝" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordPayZhifubaoId" label="付款支付宝ID" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordPayName" label="付款人" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordCollectionZhifubao" label="收款支付宝" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordCollectionZhifubaoId" label="收款支付宝ID" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordCollectionName" label="收款人" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordRemark" label="转账备注" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordFlow" label="资金流向" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordStatus" label="状态" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordProductName" label="转账产品名称" width="150" sortable>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="this.list">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
                     :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import * as getData from '../../api/api';

  function format (time) {
    var d = new Date(time);
    var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    if (times == '1970-1-1 8:0:0')
      return ''
    return times;
  }

  export default {
    data () {
      return {
        money: {
          in: 0,
          out: 0
        },
        filters: {
          date: ['2017/10/1', '2018/10/22'],
          name: ''
        },
        list: [],
        total: 1,
        pageIndex: 1,
        pageSize: 10,
        listLoading: false,
        sels: [],//列表选中列
        searchName: ''
      }
    },
    mounted () {
      this.transferList();
    },
    methods: {
      transferList () {
        var params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          name: this.filters.name,
        }
        let date = {
          beginDate: this.filters.date[0] ? this.filters.date[0] : undefined,
          endDate: this.filters.date[1] ? this.filters.date[1] : undefined
        }
          const load = this.$loading({
              lock: true,
              text: 'Loading',
//              spinner: 'el-icon-loading',
//              background: 'rgba(0, 0, 0, 0.7)'
          });
        getData.transferList_All(this.pageIndex, this.pageSize, {...date}).then(res => {
          this.list = res.data.list;
          this.money.in = res.data.in;
          this.money.out = res.data.out
          if (this.list) {
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].transferRecordCreateTime = format(this.list[i].transferRecordCreateTime);
              this.list[i].transferRecordPayTime = format(this.list[i].transferRecordPayTime);
            }
          }
          this.total = res.data.count;
          load.close();
        })
      },
      search () {
        this.searchName = this.filters.name;
        this.pageIndex = 1;
        let date = {
          beginDate: this.filters.date[0] ? this.filters.date[0] : undefined,
          endDate: this.filters.date[1] ? this.filters.date[1] : undefined
        }
          const load = this.$loading({
              lock: true,
              text: 'Loading',
//              spinner: 'el-icon-loading',
//              background: 'rgba(0, 0, 0, 0.7)'
          });
        if (this.searchName == "") {
          getData.transferList_All(this.pageIndex, this.pageSize, {...date}).then(res => {

            this.list = res.data.list;
            this.money.in = res.data.in;
            this.money.out = res.data.out
            if (this.list) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].transferRecordCreateTime = format(this.list[i].transferRecordCreateTime);
                this.list[i].transferRecordPayTime = format(this.list[i].transferRecordPayTime);
              }
            }
            this.total = res.data.count;
            load.close();
          })
        } else {
          getData.transferList_Search(this.pageIndex, this.pageSize, this.searchName,{...date}).then(res => {
            console.log(res);
            this.list = res.data.list;
            this.money.in = res.data.in;
            this.money.out = res.data.out
            if (this.list) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].transferRecordCreateTime = format(this.list[i].transferRecordCreateTime);
                this.list[i].transferRecordPayTime = format(this.list[i].transferRecordPayTime);
              }
            }
            this.total = res.data.count;
            load.close();
          })
        }
      },
      search_common () {
        let date = {
          beginDate: this.filters.date[0] ? this.filters.date[0] : undefined,
          endDate: this.filters.date[1] ? this.filters.date[1] : undefined
        }
          const load = this.$loading({
              lock: true,
              text: 'Loading',
//              spinner: 'el-icon-loading',
//              background: 'rgba(0, 0, 0, 0.7)'
          });
        if (this.searchName == "") {
          getData.transferList_All(this.pageIndex, this.pageSize, {...date}).then(res => {
            console.log(res);
            this.list = res.data.list;
            this.money.in = res.data.in;
            this.money.out = res.data.out
            if (this.list) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].transferRecordCreateTime = format(this.list[i].transferRecordCreateTime);
                this.list[i].transferRecordPayTime = format(this.list[i].transferRecordPayTime);
              }
            }
            this.total = res.data.count;
            load.close();
          })
        } else {
          getData.transferList_Search(this.pageIndex, this.pageSize, this.searchName, {...date}).then(res => {
            console.log(res);
            this.list = res.data.list;
            this.money.in = res.data.in;
            this.money.out = res.data.out
            if (this.list) {
              for (var i = 0; i < this.list.length; i++) {
                this.list[i].transferRecordCreateTime = format(this.list[i].transferRecordCreateTime);
                this.list[i].transferRecordPayTime = format(this.list[i].transferRecordPayTime);
              }
            }
            this.total = res.data.count;
            load.close();
          })
        }
      },
      handleCurrentChange (val) {
        this.pageIndex = val;
        this.search_common();
      },
      selsChange: function (sels) {
        this.sels = sels;
        console.log(this.sels)
      }
    }
  }

</script>

<style lang="scss" scoped>
.money-wrap {
  padding-bottom: 20px;
  .money-item {
    & + .money-item {
      padding-left: 20px;
    }
    > span {
      color: red;
    }
  }
}
</style>
