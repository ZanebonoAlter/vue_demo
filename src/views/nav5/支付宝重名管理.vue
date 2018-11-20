<template>
  <section>
    <!--列表-->
    <sub-view>
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
      <el-table border :data="list" highlight-current-row style="width: 100%;">
        <el-table-column align="center" prop="pName" label="姓名">
        </el-table-column>
        <el-table-column align="center" prop="pIds" label="支付宝Id">
          <template slot-scope="scope">
            <li class="box-item" v-for="(value, key) in scope.row.pIds">
              <div><span class="left-label">支付宝Id：</span><span class="label-span" v-for="val in value">{{ val }}</span></div>
            </li>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small"
                       @click="$router.push({path: '/duplicatePerson/personDetail?type=node',query:{name:scope.row.pName}})">查看
            </el-button>

            <!--<el-button type="danger" size="medium" @click="updateState(scope.row.bookId,0)" >删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar" >
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
                       :total="total" style="float:right;">
        </el-pagination>
      </el-col>
    </sub-view>
  </section>
</template>

<script>
  import * as getData from '../../api/api';
  import SubView from '../SubView'

  export default {
    components: {SubView},
    data () {
      return {
        list: [],
          total: 1,
          pageIndex: 1,
          pageSize: 10,
          filters: {
              name: '',
              cname: ''
          },
          needCount:1,
      }
    },
    mounted () {
      this.search_common();
    },
    methods: {
      search_common () {
         var params = {
             pageIndex:this.pageIndex,
             pageSize:this.pageSize,
             needCount:this.needCount,
             query:this.filters.cname
         }
          const load = this.$loading({
              lock: true,
              text: 'Loading',
//              spinner: 'el-icon-loading',
//              background: 'rgba(0, 0, 0, 0.7)'
          });
        getData.getMuliZhifubao(params).then(res => {
          this.list = res.data.list;
          if(res.data.count!=-1){
              this.total=res.data.count;
          }
          if(this.needCount==1)
              this.needCount=0;
          load.close();
        })
      },
        search () {
            const load = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.pageIndex =1
          this.filters.cname=this.filters.name;
            this.needCount=1;
            var params = {
                pageIndex:this.pageIndex,
                pageSize:this.pageSize,
                needCount:this.needCount,
                query:this.filters.cname
            }
            getData.getMuliZhifubao(params).then(res => {
                this.list = res.data.list;
                if(res.data.count!=-1){
                    this.total=res.data.count;
                }
                if(this.needCount==1)
                    this.needCount=0;
                load.close();
            })
        },
        handleCurrentChange (val) {
            this.pageIndex = val;
            this.search_common();
        },
    },
  }

</script>

<style scoped>

</style>
