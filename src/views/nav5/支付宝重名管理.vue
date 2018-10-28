<template>
  <section>
    <!--列表-->
    <el-table border :data="list" highlight-current-row style="width: 100%;">
      <el-table-column align="center" prop="pName" label="姓名">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
                     @click="$router.push({path:'/personDetail?type=node',query:{name:scope.row.pName}})">查看
          </el-button>
          <el-button size="small" @click="$router.push({path:'/keyPersonEdit',query:{name:scope.row.pName}})">编辑
          </el-button>
          <!--<el-button type="danger" size="medium" @click="updateState(scope.row.bookId,0)" >删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import * as getData from '../../api/api';

  export default {
    data () {
      return {
        list: []
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init () {
        getData.getMuliZhifubao().then(res => {
          this.list = res.data.list;
        })
      }
    },
  }

</script>

<style scoped>

</style>
