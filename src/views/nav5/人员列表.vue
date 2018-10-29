<template>
  <section>
    <!--工具条-->
    <el-col :span="24" style="padding-bottom: 0">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="list" border highlight-current-row style="width: 100%;">
      <el-table-column align="center" prop="name" label="姓名">
      </el-table-column>
      <el-table-column align="center" prop="type" label="人群范围">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.type==1">重点人员</el-tag>
          <el-tag v-else>普通人员</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
                     @click="$router.push({path:'/peopleList/personDetail?type=node',query:{name:scope.row.name}})">查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!hidden">
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
        filters: {
          name: '',
          cname: ''
        },
        list: [],
        list_key: [],
        total: 1,
        pageIndex: 1,
        pageSize: 10,
        listLoading: false,
        sels: [],//列表选中列
        searchName: '',
        filter_key: false,
        hidden: false
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init () {
        var params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          query: this.filters.cname
        }
        if (this.filters.cname != '')
          this.hidden = true
        else
          this.hidden = false
        getData.people_List(params).then(res => {
          this.list = res.data.list;
          this.total = res.data.count;
        })
      },
      handleCurrentChange (val) {
        this.pageIndex = val;
        this.init();
      },
      search () {
        this.filters.cname = this.filters.name
        this.pageIndex = 1;
        this.init();
      }
    },
  }

</script>

<style scoped>

</style>
