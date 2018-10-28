<template>
  <!--列表-->
  <el-table :data="list" highlight-current-row style="width: 100%;">
    <el-table-column type="selection" width="55">
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
        addForm: {},
        list: []
      }
    },
    mounted () {
      var type = this.$route.query.type;
      var name1 = this.$route.query.name1;
      var name2 = this.$route.query.name2;
      console.log(name1)
      console.log(name2)
      this.init(name1, name2)
    },
    methods: {
      init (name1, name2) {
        getData.transfer_Info(name1, name2).then(res => {
          this.list = res.data.list;
          if (this.list.length) {
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].transferRecordCreateTime = format(this.list[i].transferRecordCreateTime);
              this.list[i].transferRecordPayTime = format(this.list[i].transferRecordPayTime);
            }
          }
        })
      },
    }
  }

</script>

<style scoped>
  span, img {
    margin-left: 50px;
  }
</style>
