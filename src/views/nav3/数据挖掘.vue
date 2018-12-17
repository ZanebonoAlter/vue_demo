<template>
  <section>
    <sub-view>
      <!--工具条-->
      <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0;margin-top: 0;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-switch
                v-model="isTwo"
                active-text="二层挖掘"
                inactive-text="一层挖掘">
              </el-switch>
            </el-form-item>
            <el-form-item>
              转账记录数量>=
              <el-input-number v-model="filters.count" placeholder="记录数量" ></el-input-number>
            </el-form-item>
            <el-form-item>
              转账金额>=
              <el-input-number v-model="filters.fee" placeholder="金额数量" ></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="init">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-collapse class="crash-collapse-box" v-model="activeNames" accordion>
        <el-collapse-item title="根节点人物列表" name="0">
          <!--列表-->
          <el-table height="250" class="table-box" border :data="node" highlight-current-row style="width: 100%;">
            <el-table-column align="center" prop="nodeName" label="姓名">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small"
                           @click="$router.push({path:'/crashAnalysis/personDetail?type=node',query:{name:scope.row.nodeName}})">
                  查看
                </el-button>
                <!--<el-button type="danger" size="medium" @click="updateState(scope.row.bookId,0)" >删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="一层挖掘人物列表" name="1">
          <el-table height="250" class="table-box" border :data="first_list" highlight-current-row style="width: 100%;">
            <el-table-column align="center" prop="nodeName" label="姓名">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small"
                           @click="$router.push({path:'/crashAnalysis/personDetail?type=node',query:{name:scope.row.nodeName}})">
                  查看
                </el-button>
                <!--<el-button type="danger" size="medium" @click="updateState(scope.row.bookId,0)" >删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="二层挖掘人物列表" name="2">
          <el-table height="250" class="table-box" border :data="second_list" highlight-current-row style="width: 100%;">
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
        </el-collapse-item>
      </el-collapse>
      <div v-if="showChart" class="chart-wrap" id="container" style="height: 1080px;width: 100%;"></div>
    </sub-view>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import * as getData from '../../api/api';
  import SubView from '../SubView'

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
        showChart: false,
        activeNames: '1',
        filters: {
          count: 100,
          fee: 5000
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
            text: '关系总览',
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
              layout: 'force',
//              circular: {
//                rotateLabel: true
//              },
                  draggable:true,
              force: {
                initLayout: 'circular',
                repulsion: 10000,
                layoutAnimation: true
              },
              focusNodeAdjacency: true,
              itemStyle: {
                normal: {
                  borderColor: '#fff',
                  borderWidth: 1,
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
              },
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
              },
              emphasis: {
                lineStyle: {
                  width: 10
                }
              }
            }
          ]
        }
      }
    },
    mounted () {
//		    this.init();
    },
    methods: {
      init () {
        this.showChart = true
        this.$nextTick(() => {
          var params = {
            num: this.filters.count,
            fee: this.filters.fee
          }
          this.$session.set('netStorage', {count: this.filters.count, fee: this.filters.fee, isTwo: this.isTwo})
          var echarts = require('echarts');
          var dom = document.getElementById("container");
          var myChart = echarts.init(dom);
          myChart.showLoading();
            const load = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
          if (!this.isTwo) {
            getData.one_person_List(params).then(res => {
              this.node = res.data.node;
              this.first_list = res.data.first_list;
              this.option.series[0].data = res.data.graph.data;
              this.option.series[0].links = res.data.graph.links;
              myChart.setOption(this.option, true);
              load.close();
            })
          } else {
            getData.two_person_List(params).then(res => {
              this.node = res.data.node;
              this.first_list = res.data.first_list;
              this.second_list = res.data.second_list;
              this.option.series[0].data = res.data.graph.data;
              this.option.series[0].links = res.data.graph.links;
              myChart.setOption(this.option, true);
                load.close();
            })
          }
          myChart.hideLoading();
          var all = this;
          myChart.on('click', function (params) {
            //window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.data.label.normal.formatter));
            if (params.dataType == "node") {
              all.$confirm('请确认接下来的操作', '确认信息', {
                distinguishCancelAndClose: true,
                showClose: false,
                confirmButtonText: '展开相关节点',
                cancelButtonText: '查看个人信息'
              }).then(() => {
                if (params.data.extend == 0) {
                  var str = params.data.flag;
                  var level = 0;
                  console.log(str)
                  if (str != 0) {
                    level = str.split(",")[0];
                    console.log(level)
                  }
                    const load = all.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                  getData.Extend_Graph(params.data.name, level).then(res => {
                    for (var i = 0; i < res.data.graph.data.length; i++) {
                      var flag = 0;
                      for (var j = 0; j < all.option.series[0].data.length; j++) {
                        if (all.option.series[0].data[j].name == res.data.graph.data[i].name) {
                          flag = 1;
                          break;
                        }
                      }
                      if (flag == 0)
                        all.option.series[0].data.push(res.data.graph.data[i])
                    }
                    for (var i = 0; i < res.data.graph.links.length; i++) {
                      all.option.series[0].links.push(res.data.graph.links[i])
                    }
                    console.log(all.option);
                    myChart.setOption(all.option, true);
                    load.close();
                  })
                  params.data.extend = 1
                } else {

                }
              }).catch(action => {
                let {href} = all.$router.resolve({
                  path: '/crashAnalysis/personDetail',
                  query: {type: "node", name: params.name}
                });
                window.open(href, '_blank');
//              all.$router.push({path: '/crashAnalysis/personDetail', query: {type: "node", name: params.name}})
//              all.$router.push({path: '/crashAnalysis/personDetail', query: {type: "node", name: params.name}})
              });
//              window.location = '#/personDetail?type=node&name=' + params.name;
//                            this.$router.push({path:'/personDetail',query:{type:"node",name:params.name}})
            } else if (params.dataType == "edge") {
              let {href} = all.$router.resolve({
                path: '/crashAnalysis/peopleDetail',
                query: {type: "edge", name1: params.data.source, name2: params.data.target}
              });
              window.open(href, '_blank');
//            all.$router.push({
//              path: '/crashAnalysis/peopleDetail',
//              query: {type: "edge", name1: params.data.source, name2: params.data.target}
//            })
//                            this.$router.push({path:'/personDetail',query:{type:"edge",name1:params.data.source,name2:params.data.target}})
            }
          })
            myChart.on('mouseup',function(params){
                var option=myChart.getOption();
                option.series[0].data[params.dataIndex].x=params.event.offsetX;
                option.series[0].data[params.dataIndex].y=params.event.offsetY;
                option.series[0].data[params.dataIndex].fixed=true;
                myChart.setOption(option);
            });
        })
      }
    },
    watch: {
      isTwo (val) {
        val ? this.activeNames = '2' : this.activeNames = '1'
      },
      '$route': {
        handler (val, oldVal) {
          const netStorage = this.$session.get('netStorage')
          if (netStorage) {
            this.showChart = true
            this.filters.count = netStorage.count
            this.filters.fee = netStorage.fee
            this.isTwo = netStorage.isTwo
            this.$nextTick(() => {
              this.init()
            })
          }
        },
        immediate: true
      }
    }
  }

</script>

<style lang="scss">
  .crash-collapse-box {
    .el-collapse-item__header {
      padding: 0 15px;
      background-color: #d3dce6;
      color: #333;
    }
    .el-collapse-item__wrap {
      border: solid 1px #e9e9eb;
      padding: 20px;
    }
  }
</style>
