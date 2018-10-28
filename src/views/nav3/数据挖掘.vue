<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-switch
            v-model="isTwo"
            active-text="二层挖掘"
            inactive-text="一层挖掘">
          </el-switch>
        </el-form-item>
        <el-form-item>
          转账记录数量>=&nbsp
          <el-input-number v-model="filters.count" placeholder="记录数量"></el-input-number>
        </el-form-item>
        <el-form-item>
          每笔金额大小>=&nbsp
          <el-input-number v-model="filters.fee" placeholder="金额数量"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="init">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <div class="title-box">根节点人物列表</div>
    <!--列表-->
    <el-table class="table-box" border :data="node" highlight-current-row style="width: 100%;">
      <el-table-column align="center" prop="nodeName" label="姓名">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
                     @click="$router.push({path:'/personDetail?type=node',query:{name:scope.row.nodeName}})">查看
          </el-button>
          <!--<el-button type="danger" size="medium" @click="updateState(scope.row.bookId,0)" >删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <div class="title-box" v-if="!isTwo">一层挖掘人物列表</div>
    <el-table v-if="!isTwo" class="table-box" border :data="first_list" highlight-current-row style="width: 100%;">
      <el-table-column align="center" prop="nodeName" label="姓名">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
                     @click="$router.push({path:'/personDetail?type=node',query:{name:scope.row.nodeName}})">查看
          </el-button>
          <!--<el-button type="danger" size="medium" @click="updateState(scope.row.bookId,0)" >删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <div class="title-box" v-if="isTwo">二层挖掘人物列表</div>
    <el-table class="table-box" border :data="second_list" highlight-current-row style="width: 100%;" v-if="isTwo">
      <el-table-column align="center" prop="nodeName" label="姓名">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small"
                     @click="$router.push({path:'/personDetail?type=node',query:{name:scope.row.nodeName}})">查看
          </el-button>
          <!--<el-button type="danger" size="medium" @click="updateState(scope.row.bookId,0)" >删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="chart-wrap" id="container" style="height: 800px;width: 100%"></div>
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
          count: 0,
          fee: 0
        },
        node: [],
        first_list: [],
        second_list: [],
        total: 1,
        pageIndex: 1,
        pageSize: 10,
        listLoading: false,
        sels: [],//列表选中列
        searchName: '',
        isTwo: false,
        option: {
          title: {
            text: '资金流总览',
            subtext: 'Circular layout',
            top: 'bottom',
            left: 'right'
          },
          tooltip: {},
          legend: [{
            // selectedMode: 'single',
            data: [{name: '重点人员'}, {name: '嫌疑人'}, {name: '非嫌疑人'}]
          }],
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              tooltip: {},
              name: 'Person',
              type: 'graph',
              layout: 'circular',
              circular: {
                rotateLabel: true
              },
              focusNodeAdjacency: true,
              data: [{
                name: '郭燕',
                value: 0,
                symbolSize: 100,
                category: 0,
                label: {
                  normal: {
                    show: true,
                    position: ['50%', '50%'],
                    formatter: '郭燕',
                    fontSize: 20
                  }
                },
                tooltip: {
                  trigger: 'item',
                  textStyle: {
                    align: 'left'
                  },
                  formatter: '姓名:郭燕\n支付宝：549455722@qq.com\n支付宝ID:2088902744752620',
                  extraCssText: ' white-space:pre-wrap'
                },
              }, {
                name: '郑宇',
                value: 0,
                symbolSize: 30,
                category: 0,
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    formatter: '郑宇'
                  }
                },
                tooltip: {
                  trigger: 'item',
                  textStyle: {
                    align: 'left'
                  },
                  formatter: '姓名:郑宇\n支付宝：549455722@qq.com\n支付宝ID:2088902744752620',
                  extraCssText: ' white-space:pre-wrap'
                },
              }, {
                name: '潘文水',
                value: 0,
                symbolSize: 100,
                category: 2,
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    formatter: '潘文水'
                  }
                },
                tooltip: {
                  trigger: 'item',
                  textStyle: {
                    align: 'left'
                  },
                  formatter: '姓名:潘文水\n支付宝：549455722@qq.com\n支付宝ID:2088902744752620',
                  extraCssText: ' white-space:pre-wrap'
                },
              }],
              links: [{
                source: "郑宇",
                target: "郑宇",
                label: {                // 关系对象上的标签
                  normal: {
                    show: true,                 // 是否显示标签
                    position: "middle",         // 标签位置:'top''left''right''bottom''inside''insideLeft''insideRight''insideTop''insideBottom''insideTopLeft''insideBottomLeft''insideTopRight''insideBottomRight'
                    textStyle: {                // 文本样式
                      fontSize: 16
                    },
                    formatter: "100",
                  }
                },
                symbol: ['circle', 'arrow'],
              }, {
                source: "潘文水",
                target: "郑宇",
                label: {                // 关系对象上的标签
                  normal: {
                    show: true,                 // 是否显示标签
                    position: "middle",         // 标签位置:'top''left''right''bottom''inside''insideLeft''insideRight''insideTop''insideBottom''insideTopLeft''insideBottomLeft''insideTopRight''insideBottomRight'
                    textStyle: {                // 文本样式
                      fontSize: 16
                    },
                    formatter: "500",
                  }
                },
                lineStyle: {
                  normal: {
                    width: 5,
                  }
                },
                symbol: ['circle', 'arrow'],
              }, {
                source: "郭燕",
                target: "郑宇",
                label: {                // 关系对象上的标签
                  normal: {
                    show: true,                 // 是否显示标签
                    position: "middle",         // 标签位置:'top''left''right''bottom''inside''insideLeft''insideRight''insideTop''insideBottom''insideTopLeft''insideBottomLeft''insideTopRight''insideBottomRight'
                    textStyle: {                // 文本样式
                      fontSize: 16
                    },
                    formatter: "100",
                  }
                },
                symbol: ['circle', 'arrow'],
              }],
              categories: [{
                "name": "重点人员",//关系网名称
              }
                , {
                  "name": "嫌疑人",//关系网名称
                }
                , {
                  "name": "非嫌疑人",//关系网名称
                }
              ],
              roam: true,
//                            label: {
//                                normal: {
//                                    position: 'right',
//                                    formatter: '{b}'
//                                }
//                            },
              lineStyle: {
                normal: {
                  color: 'source',
                  curveness: 0.3
                }
              }
            }
          ]
        },
      }
    },
    mounted () {
//		    this.init();
    },
    methods: {
      init () {
        var params = {
          num: this.filters.count,
          fee: this.filters.fee
        }
        var echarts = require('echarts');
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        myChart.showLoading();
        if (!this.isTwo) {
          getData.one_person_List(params).then(res => {
            this.node = res.data.node;
            this.first_list = res.data.first_list;
            this.option.series[0].data = res.data.graph.data;
            this.option.series[0].links = res.data.graph.links;
            myChart.setOption(this.option, true);
          })
        } else {
          getData.two_person_List(params).then(res => {
            this.node = res.data.node;
            this.first_list = res.data.first_list;
            this.second_list = res.data.second_list;
            this.option.series[0].data = res.data.graph.data;
            this.option.series[0].links = res.data.graph.links;
            myChart.setOption(this.option, true);
          })
        }
        myChart.hideLoading();
      }
    }
  }

</script>

<style lang="scss" scoped>
  .title-box {
    padding: 30px 0 20px 0;
  }

  .chart-wrap {
    margin: 20px 0;
  }
</style>
