<template>
  <section>

    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="person-wrap">
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'重点人员' + Number(index + 1)"
        :key="domain.key"
        :prop="'domains.' + index + '.pName'"
        :rules="{
      required: true, message: '重点人员姓名不能为空', trigger: 'blur'
    }"
      >
        <el-input placeholder="请输入重点人员姓名" class="person-input" v-model="domain.pName"></el-input>
        <span class="del-btn" @click.prevent="removeDomain(domain)">点击删除</span>
        <!--<el-button>删除</el-button>-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">筛选</el-button>
        <el-button @click="addDomain">新增重点人员</el-button>
      </el-form-item>
    </el-form>
    <div class="person-list-wrap" v-if="dynamicValidateForm.domains.length">
      <div class="person-list-title">重点人员列表：</div>
      <el-tag
        v-if="tag.pName"
        class="list-item"
        v-for="tag in dynamicValidateForm.domains"
        :key="tag.name"
        closable
        @close="removeDomain(tag)"
        :type="tag.type">
        {{tag.pName}}
      </el-tag>
    </div>

    <!--<el-row>-->
      <!--<el-input-->
        <!--type="textarea"-->
        <!--:rows="5"-->
        <!--placeholder="请输入筛选内容,空格分隔"-->
        <!--v-model="textarea">-->
      <!--</el-input>-->
      <!--<el-checkbox-group-->
        <!--class="check-area"-->
        <!--v-model="checkedList"-->
      <!--&gt;-->
        <!--<el-checkbox v-for="object in checkList" :label="object.pName" :key="object.pId">{{object.pName}}</el-checkbox>-->
      <!--</el-checkbox-group>-->
      <!--<el-button size="medium" type="primary" @click="init">确认筛选</el-button>-->
    <!--</el-row>-->
    <div id="container" style="height: 960px;width: 100%"></div>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import * as getData from '../../api/api';

  export default {
    computed: {
      checkedList () {
        return this.dynamicValidateForm.domains.map(v => v.pName)
      }
    },
    data () {
      return {
        dynamicValidateForm: {
          domains: [{
            pName: ''
          }]
        },
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
        textarea: '',
        checkList: [],
        isIndeterminate: true,
        checkAll: false,
      }
    },
    mounted () {
      this.init_list();
//			getData.bannerList().then(res => { //测试外部接口（环鹏）
//
//			})
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.checkedList)
            if (this.checkedList.length) {
              this.init()
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
      addDomain() {
        this.dynamicValidateForm.domains.push({
          pName: '',
          key: Date.now()
        });
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      test () {
        console.log(this.checkList)
        console.log(this.checkedList)
      },
      init () {
        var echarts = require('echarts');
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        var option = null;
        myChart.showLoading();
        var params = this.textarea.split(" ");
        params.push(this.checkedList)
        console.log(params);
        getData.queryGraph(params).then(res => {
          this.option.series[0].data = res.data.graph.data;
          this.option.series[0].links = res.data.graph.links;
          console.log(this.option)
          myChart.setOption(this.option, true);
          myChart.hideLoading();
          myChart.on('click', function (params) {
            console.log(params)
            //window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.data.label.normal.formatter));
            if (params.dataType == "node") {
              window.location = '#/personDetail?type=node&name=' + params.name;
//                            this.$router.push({path:'/personDetail',query:{type:"node",name:params.name}})
            } else if (params.dataType == "edge") {
              window.location = '#/peopleDetail?type=edge&name1=' + params.data.source + '&name2=' + params.data.target;
//                            this.$router.push({path:'/personDetail',query:{type:"edge",name1:params.data.source,name2:params.data.target}})
            }
          })
        })

      },
      init_list () {
        getData.person_keyPerson().then(res => {
          this.checkList = res.data.list;
          this.dynamicValidateForm.domains = res.data.list
          for (var i = 0; i < this.checkList.length; i++) {
            this.checkedList[i] = this.checkList[i].pName;
          }
        })
      },
    },
  }

</script>

<style lang="scss" scoped>
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
    padding: 10px;
    border: solid 1px red;
    border-radius: 4px;
    .person-list-title {
      padding-bottom: 10px;
    }
    .list-item + .list-item {
      margin-left: 5px;
    }
  }

  #container {
    margin: 20px 0;
  }
</style>
