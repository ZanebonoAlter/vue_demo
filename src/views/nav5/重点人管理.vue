<template>
  <section>
    <sub-view>
      <!--列表-->
      <el-table :data="list" border highlight-current-row style="width: 100%;">
        <el-table-column align="center" prop="pName" label="姓名">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small"
                       @click="$router.push({path:'/keyPerson/personDetail?type=node',query:{name:scope.row.pName}})">查看
            </el-button>
            <el-button size="small" @click="$router.push({path:'/keyPerson/keyPersonEdit',query:{name:scope.row.pName}})">编辑
            </el-button>
            <!--<el-button type="danger" size="medium" @click="updateState(scope.row.bookId,0)" >删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </sub-view>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import SubView from '../SubView'
  import * as getData from '../../api/api';

  function format (time) {
    var d = new Date(time);
    var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    if (times == '1970-1-1 8:0:0')
      return ''
    return times;
  }

  export default {
    components: {SubView},
    data () {
      return {
        filters: {
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
      this.init();
    },
    methods: {
      init () {
        getData.person_keyPerson().then(res => {
          this.list = res.data.list;
        })
      }
    },
  }

</script>

<style scoped>

</style>
