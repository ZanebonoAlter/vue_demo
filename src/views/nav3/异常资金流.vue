<template>
  <section>
    <!--工具条-->
    <el-col :span="24" style="padding-bottom: 0">
      <el-form :inline="true" :rules="formRules" :model="filters" ref="form">
        <el-form-item prop="minFee">
          <el-input type="number" v-model="filters.minFee" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item>
          <span>-</span>
        </el-form-item>
        <el-form-item prop="maxFee">
          <el-input type="number" v-model="filters.maxFee" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="fetchData">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <!--列表-->
    <el-table :data="list" border highlight-current-row style="width: 100%;">
      <el-table-column align="center" prop="transferRecordFlowId" label="流水号" width="150">
      </el-table-column>
      <el-table-column align="center" prop="transferRecordCreateTime" label="创建时间" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordPayTime" label="付款时间" width="150" sortable>
      </el-table-column>
      <el-table-column align="center" prop="transferRecordPayFee" label="金额" width="150" sortable>
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.transferRecordPayFee>5000">{{scope.row.transferRecordPayFee}}</el-tag>
          <el-tag v-else>{{scope.row.transferRecordPayFee}}</el-tag>
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
      <el-table-column  align="center" prop="transferRecordCollectionName" label="收款人" width="150" sortable>
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
        filters: {
          minFee: '',
          maxFee: ''
        },
        list: [],
        formRules: {
          minFee: [
            {
              required: true,
              message: '请输入金额',
              trigger: 'blur'
            }
          ],
          maxFee: [
            {
              required: true,
              trigger: 'blur',
              validator: async (rule, value, cb) => {
                if (value < this.filters.minFee) {
                  cb(new Error('请输入正确的金额'))
                } else {
                  cb()
                }
              }
            }
          ]
        }
      }
    },
    methods: {
      fetchData () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            getData.exceptionRecord(this.filters.minFee, this.filters.maxFee).then((res) => {
              console.log('res', res)
              this.list = res.data.list;
              if (this.list) {
                for (var i = 0; i < this.list.length; i++) {
                  this.list[i].transferRecordCreateTime = format(this.list[i].transferRecordCreateTime);
                  this.list[i].transferRecordPayTime = format(this.list[i].transferRecordPayTime);
                }
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }

</script>

<style scoped>

</style>
