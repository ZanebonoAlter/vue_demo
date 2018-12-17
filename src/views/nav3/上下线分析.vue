<template>
  <section>
    <sub-view>
      <el-form :model="person" ref="personValidateForm" label-width="110px" class="person-wrap">
        <el-form-item
          :label="'重点人员姓名'"
          prop="pName"
          :rules="{
      required: true, message: '重点人员姓名不能为空', trigger: 'blur'
    }"
        >
          <el-input placeholder="请输入重点人员姓名" class="person-input" v-model="person.pName"></el-input>
          <el-button @click.prevent="addMainPerson('personValidateForm')">新增重点人员</el-button>
          <el-button type="primary" @click="submitForm">筛选</el-button>
          <el-button type="primary" @click="resetSubmit">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="person-list-wrap" v-if="checkList.length">
        <div class="person-list-title">重点人员列表：</div>
        <div class="person-list-box">
          <el-tag
            v-if="tag.pName"
            class="list-item"
            v-for="tag in checkList"
            :key="tag.name"
            closable
            @close="removeMainPerson(tag)"
            :type="tag.type">
            {{tag.pName}}
          </el-tag>
        </div>
      </div>
      <el-row>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-switch
                v-model="isTwo"
                active-text="二层挖掘"
                inactive-text="一层挖掘">
              </el-switch>
            </el-form-item>
            <el-form-item label="请选择节点数量" v-if="!isTwo">
              <el-select v-model="filters.number" placeholder="请选择人员数量" >
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item>-->
            <!--<el-button type="primary" @click="init">筛选</el-button>-->
            <!--</el-form-item>-->
          </el-form>
        </el-col>
      </el-row>
      <el-collapse class="crash-collapse-box" v-model="activeNames" accordion>
        <el-collapse-item title="根节点人物列表" name="0">
          <!--列表-->
          <el-table class="table-box" border :data="node" highlight-current-row style="width: 100%;">
            <el-table-column align="center" prop="nodeName" label="姓名">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small"
                           @click="$router.push({path:'/lineAnalysis/personDetail?type=node',query:{name:scope.row.nodeName}})">查看
                </el-button>
                <!--<el-button type="danger" size="medium" @click="updateState(scope.row.bookId,0)" >删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="一层挖掘人物列表" name="1">
          <el-table class="table-box" border :data="first_list" highlight-current-row style="width: 100%;">
            <el-table-column align="center" prop="nodeName" label="姓名">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small"
                           @click="$router.push({path:'/lineAnalysis/personDetail?type=node',query:{name:scope.row.nodeName}})">查看
                </el-button>
                <!--<el-button type="danger" size="medium" @click="updateState(scope.row.bookId,0)" >删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="二层挖掘人物列表" name="2">
          <el-table class="table-box" border :data="second_list" highlight-current-row style="width: 100%;">
            <el-table-column align="center" prop="nodeName" label="姓名">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small"
                           @click="$router.push({path:'/lineAnalysis/personDetail?type=node',query:{name:scope.row.nodeName}})">查看
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
    computed: {
      checkedList () {
        return this.checkList.map(v => v.pName)
      }
    },
    data () {
      return {
        activeNames: '1',
        showChart: false,
        person: {
          pName: ''
        },
        options: [ 2, 3, 4, 5, 6, 7, 8, 9],
        checkList: [],
        filters: {
          number: 2,
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
        },
      }
    },
    methods: {
      init_list () {
          const load = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
          });
        getData.person_keyPerson().then(res => {
          this.checkList = res.data.list;
          for (var i = 0; i < this.checkList.length; i++) {
            this.checkedList[i] = this.checkList[i].pName;
          }
        load.close();
        })
      },
      addMainPerson (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.checkList.push(this.person)
            this.person = {pName: ''}
            if (this.checkedList.length) {
              this.fetchData()
            } else {
              this.$message({
                message: '请先新增重点人员',
                type: 'warning'
              })
            }
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
      async resetSubmit () {
        await this.init_list()
        this.fetchData()
      },
      submitForm () {
        if (this.checkedList.length) {
          this.fetchData()
        } else {
          this.$message({
            message: '请先新增重点人员',
            type: 'warning'
          })
        }
      },
      removeMainPerson (item) {
        var index = this.checkList.indexOf(item)
        if (index !== -1) {
          this.checkList.splice(index, 1)
          this.fetchData()
        }
      },
      fetchData () {
        this.showChart = true
        let params = {
          custom: this.checkedList,
          number: this.filters.number
        }
        this.$session.set('listStorage', {checkList: this.checkList, number: this.filters.number, isTwo: this.isTwo})
          var old_time = new Date().getTime();
          const load = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
          });
        if (!this.isTwo) {
          //  一层
          getData.queryGraphFirst(params.custom, params.number).then((res) => {
            console.log('queryGraphFirst', res)
            this.first_list = res.data.first_list;
            this.drawChart(res)
              load.close();
          })
        } else {
          //  二层
          getData.queryGraphSecond(params.custom).then((res) => {
            console.log('queryGraphSecond', res)
            this.first_list = res.data.first_list;
            this.drawChart(res)
              var new_time = new Date().getTime()
              console.log(new_time-old_time)
              load.close();
          })
        }
      },
      drawChart (res) {
        this.$nextTick(() => {
          var echarts = require('echarts');
          var dom = document.getElementById("container");
          var myChart = echarts.init(dom);
          myChart.showLoading();
          this.node = res.data.node;
          this.second_list = res.data.second_list;
          this.option.series[0].data = res.data.graph.data;
          this.option.series[0].links = res.data.graph.links;
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
                let {href} = all.$router.resolve({path: '/lineAnalysis/personDetail', query: {type: "node", name: params.name}});
                window.open(href, '_blank');
//              all.$router.push({path: '/lineAnalysis/personDetail', query: {type: "node", name: params.name}})
              });
//              window.location = '#/personDetail?type=node&name=' + params.name;
//                            this.$router.push({path:'/personDetail',query:{type:"node",name:params.name}})
            } else if (params.dataType == "edge") {
              console.log('dfdfdfdfd')
              let {href} = all.$router.resolve({path: '/crashAnalysis/peopleDetail', query: {type: "edge", name1: params.data.source, name2: params.data.target}});
              window.open(href, '_blank');
//            all.$router.push({
//              path: '/lineAnalysis/peopleDetail',
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
          myChart.setOption(this.option, true);
          myChart.hideLoading();
        })
      },
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
    },
    watch: {
      isTwo (val) {
        val ? this.activeNames = '2' : this.activeNames = '1'
      },
      '$route': {
        handler (val, oldVal) {
          const listStorage = this.$session.get('listStorage')
          if (listStorage) {
            this.showChart = true
            this.checkList = listStorage.checkList
            this.filters.number = listStorage.number
            this.isTwo = listStorage.isTwo
            console.log(11111)
            this.$nextTick(() => {
              this.fetchData()
            })
          } else {
            this.init_list()
          }
        },
        immediate: true
      }
    }
  }

</script>

<style lang="scss" scoped>
  .title-box {
    padding: 30px 0 20px 0;
  }

  .person-wrap {
    .person-input {
      width: 300px;
      margin-right: 20px;
    }
    .del-btn {
      cursor: pointer;
      font-size: 12px;
      color: red;
    }
  }

  .check-area {
    padding: 10px 0 20px 0;
  }

  .person-list-wrap {
    border: solid 1px #d3dce6;
    border-radius: 4px;
    .person-list-title {
      padding: 10px;
      background-color: #d3dce6;
    }
    .person-list-box {
      padding: 10px;
    }
    .list-item {
      margin-right: 5px;
    }
  }

  .chart-wrap {
    margin: 20px 0;
  }
</style>
