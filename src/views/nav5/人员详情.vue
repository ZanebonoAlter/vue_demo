<template>
  <section>
    <el-row>
      <el-col :span="12">
        <div><span class="left-label">姓名：</span>{{this.name}}</div>
        <ul class="zfb-box" :model="zhifubao_result">
      <li class="box-item" v-for="(value, key) in zhifubao_result">
        <div><span class="left-label">支付宝ID：</span>{{key}}</div>
        <div><span class="left-label">对应的支付宝账号：</span><span class="label-span" v-for="val in value">{{ val }}</span></div>
      </li>
      <li class="clearfix box-item">
        <span class="left-label fl">手机号：</span>
        <div class="fl">
          <div v-for="value in phone_list">
            {{ value }}
          </div>
        </div>
      </li>
      <li class="box-item clearfix">
        <span class="left-label fl">淘宝账号：</span>
        <div class="fl">
          <div v-for="value in account">
            {{ value }}
          </div>
        </div>
      </li>
      <li class="box-item">
        <span class="left-label">当前状态：</span>
        <el-tag v-if="this.type=='普通人员'">{{this.type}}</el-tag>
        <el-tag v-else type="danger">{{this.type}}</el-tag>
      </li>
    </ul>
      </el-col>
      <el-col :span="12">
        <div class="edit-box">
          <el-button type="primary" size="medium" v-if='this.type=="重点人员"' @click='showEditDialog = true'>编辑</el-button>
          <el-button type="primary" size="medium" v-if='this.type=="重点人员"' @click='deletePerson'>标记为普通人员</el-button>
          <!--<el-button type="warning" >标记为嫌疑人</el-button>-->
          <el-button type="danger" size="medium" v-else @click="addPerson">标记为重点人员</el-button>
        </div>
      </el-col>
    </el-row>
    <template v-if="type=='重点人员'">
      <el-collapse class="collapse-box" v-model="activeNames">
        <el-collapse-item title="重点人员详细描述" name="1">
          <el-form :model="addForm" ref="addForm">
            <el-row>
              <el-col :span="10" :offset="2">
                <el-form-item label="身份证号:" prop="pIdentity">
                  {{addForm.pIdentity}}
                </el-form-item>
                <el-form-item label="户籍:" prop="pResidence">
                  {{addForm.pResidence}}
                </el-form-item>
                <el-form-item label="邮箱:" prop="pEmail">
                  {{addForm.pEmail}}
                </el-form-item>
                <el-form-item label="手机号:" prop="pPhone">
                  {{addForm.pPhone}}
                </el-form-item>
                <el-form-item label="微信号:" prop="pWeixinId">
                  {{addForm.pWeixinId}}
                </el-form-item>
                <el-form-item label="微信名:" prop="pWeixin">
                  {{addForm.pWeixin}}
                </el-form-item>
                <el-form-item label="qq账号:" prop="pQq">
                  {{addForm.pQq}}
                </el-form-item>
                <el-form-item label="支付宝账号:" prop="pZhifubao">
                  {{addForm.pZhifubao}}
                </el-form-item>
                <el-form-item label="基本信息备注:" prop="pRemark">
                  {{addForm.pRemark}}
                </el-form-item>
                <!--<el-form-item label="园丁丁等级:" prop="stock">-->
                  <!--{{addForm.pYuandingGrade}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="园丁丁网站序号uid:" prop="stock">-->
                  <!--{{addForm.pYuandingUid}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="园丁丁网站内名称:" prop="stock">-->
                  <!--{{addForm.pYuandingName}}-->
                <!--</el-form-item>-->
              </el-col>
              <!--<el-col :span="10" :offset="2">-->
                <!--<el-form-item label="园丁丁网站内好友数量:" prop="stock">-->
                  <!--{{addForm.pYuandingFriendNum}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="园丁丁网站内相册数量:" prop="stock">-->
                  <!--{{addForm.pYuandingAlbumNum}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="园丁丁网站发帖数量:" prop="stock">-->
                  <!--{{addForm.pYuandingPostNum}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="园丁丁网站主题数:" prop="stock">-->
                  <!--{{addForm.pYuandingTopicNum}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="园丁丁网站注册ip:" prop="stock">-->
                  <!--{{addForm.pYuandingRegistIp}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="园丁丁网站注册时间:" prop="stock">-->
                  <!--<el-date-picker-->
                    <!--v-model="addForm.pYuandingRegistTime"-->
                    <!--type="datetime"-->
                    <!--placeholder="选择日期时间">-->
                  <!--</el-date-picker>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="园丁丁网站最后一次登录ip:" prop="stock">-->
                  <!--{{addForm.pYuandingLoginLastIp}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="园丁丁网站最后一次登录的地址:" prop="stock">-->
                  <!--{{addForm.pYuandingLoginLastAddress}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="园丁丁网站最后一次登录的时间:" prop="stock">-->
                  <!--<el-date-picker-->
                    <!--v-model="addForm.pYuandingLoginLastTime"-->
                    <!--type="datetime"-->
                    <!--placeholder="选择日期时间">-->
                  <!--</el-date-picker>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="住址信息:" prop="stock">-->
                  <!--{{addForm.pAddressInfo}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="活动痕迹:" prop="stock">-->
                  <!--{{addForm.pTrajectoryInfo}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="证据指向:" prop="stock">-->
                  <!--{{addForm.pEvidence}}-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </template>
    <el-tabs class="content-wrap" v-model="activeName" type="card">
      <el-tab-pane label="转账记录" name="first">
        <!--工具条-->
        <el-col :span="24" style="padding-bottom: 0">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.Tname" placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="Tsearch">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!--列表-->
        <el-table border :data="transferInfo" highlight-current-row style="width: 100%;">
          <el-table-column align="center" prop="transferRecordFlowId" label="流水号" width="150">
          </el-table-column>
          <el-table-column align="center" prop="transferRecordCreateTime" label="创建时间" width="150" sortable>
          </el-table-column>
          <el-table-column align="center" prop="transferRecordPayTime" label="付款时间" width="150" sortable>
          </el-table-column>
          <el-table-column align="center" prop="transferRecordPayFee" label="金额" width="150" sortable>
            <template slot-scope="scope">
              <span class="text-red" v-if="scope.row.transferRecordPayFee>5000">{{scope.row.transferRecordPayFee}}</span>
              <span class="text-blue" v-else>{{scope.row.transferRecordPayFee}}</span>
              <!--<el-tag type="danger" v-if="scope.row.transferRecordPayFee>5000">{{scope.row.transferRecordPayFee}}-->
              <!--</el-tag>-->
              <!--<el-tag v-else>{{scope.row.transferRecordPayFee}}</el-tag>-->
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
          <el-table-column align="center" prop="transferRecordCollectionName" label="收款人" width="150" sortable>
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
        <el-col :span="24" class="toolbar">
          <el-pagination layout="prev, pager, next" @current-change="ThandleCurrentChange" :page-size="TpageSize"
                         :total="Ttotal" style="float:right;">
          </el-pagination>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="购物记录" name="second"> <!--工具条-->
        <el-col :span="24" style="padding-bottom: 0">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.Bname" placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="medium" type="primary" @click="Bsearch">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="buyInfo" border highlight-current-row style="width: 100%;">
          <el-table-column align="center" prop="buyRecordOrderId" label="订单编号" width="150">
          </el-table-column>
          <el-table-column align="center" prop="buyRecordOrderFee" label="付款金额" width="150" sortable>
          </el-table-column>
          <el-table-column align="center" prop="buyRecordBuyerAccount" label="买家账号" width="150" sortable>
          </el-table-column>
          <el-table-column align="center" prop="buyRecordSellerAccount" label="卖家账号" width="150" sortable>
          </el-table-column>
          <el-table-column align="center" prop="buyRecordGoodsTitle" label="商品标题" width="300" sortable>
          </el-table-column>
          <el-table-column align="center" prop="buyRecordGoodsPrice" label="商品单价" width="150" sortable>
          </el-table-column>
          <el-table-column align="center" prop="buyRecordGoodsNum" label="数量" width="150" sortable>
          </el-table-column>
          <el-table-column align="center" prop="buyRecordAddress" label="收货地址" width="150" sortable>
          </el-table-column>
          <el-table-column align="center" prop="buyRecordStatus" label="付款状态" width="150" sortable>
          </el-table-column>
          <el-table-column align="center" prop="buyRecordTime" label="付款时间" width="150" sortable>
          </el-table-column>
          <el-table-column align="center" prop="buyRecordReceiverName" label="收货人" width="150" sortable>
          </el-table-column>
          <el-table-column align="center" prop="buyRecordReceiverPhone" label="收货号码" width="150" sortable>
          </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
          <el-pagination layout="prev, pager, next" @current-change="BhandleCurrentChange" :page-size="BpageSize"
                         :total="Btotal" style="float:right;">
          </el-pagination>
        </el-col>
      </el-tab-pane>
    </el-tabs>
    <edit-component :show="showEditDialog"></edit-component>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import EditComponent from '../EditDialog'
  import * as getData from '../../api/api';

  function format (time) {
    var d = new Date(time);
    var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    if (times == '1970-1-1 8:0:0')
      return ''
    return times;
  }

  export default {
    components: {EditComponent},
    data () {
      return {
        showEditDialog: false,
        activeName: 'first',
        zhifubao_result: {},
        filters: {
          Tname: '',
          TcurrentName: '',
          Bname: '',
          BcurrentName: '',
        },
        activeNames: [],
        account: [],
        phone_list: [],
        buyInfo: [],
        transferInfo: [],
        TpageIndex: 1,
        TpageSize: 10,
        Ttotal: 1,
        BpageIndex: 1,
        BpageSize: 10,
        Btotal: 1,
        name: '',
        type: '重点人员',
        addForm: {
          pId: 0,
          pName: this.$route.query.name,
          pIdentity: '',
          pResidence: '',
          pEmail: '',
          pPhone: '',
          pWeixinId: '',
          pWeixin: '',
          pQq: '',
          pZhifubao: '',
          pRemark: '',
          pYuandingGrade: '',
          pYuandingUid: '',
          pYuandingName: '',
          pYuandingFriendNum: -1,
          pYuandingAlbumNum: -1,
          pYuandingPostNum: -1,
          pYuandingTopicNum: -1,
          pYuandingRegistIp: '',
          pYuandingRegistTime: '',
          pYuandingLoginLastIp: '',
          pYuandingLoginLastAddress: '',
          pYuandingLoginLastTime: '',
          pAddressInfo: '',
          pTrajectoryInfo: '',
          pEvidence: ''
        },
      }
    },
    mounted () {
      this.name = this.$route.query.name;
      this.init();
      this.transferList();
      this.buyList();
    },
    methods: {
      init () {
        var params = {
          name: this.$route.query.name,
        }
        getData.person_person_Info(params).then(res => {
          this.zhifubao_result = res.data.zhifubao_result;
          this.phone_list = res.data.phone_list;
          this.account = res.data.account;
          this.type = res.data.type;
        })
        if (this.type == "重点人员") {
          getData.key_person_info(this.$route.query.name).then(res => {
            this.addForm = res.data.addForm
          })
        }
      },
      transferList () {
        var params = {
          name: this.$route.query.name,
          pageIndex: this.TpageIndex,
          pageSize: this.TpageSize,
          query: this.filters.TcurrentName
        }
        getData.person_transfer_Info(params).then(res => {
          this.transferInfo = res.data.list;
          for (var i = 0; i < this.transferInfo.length; i++) {
            this.transferInfo[i].transferRecordCreateTime = format(this.transferInfo[i].transferRecordCreateTime);
            this.transferInfo[i].transferRecordPayTime = format(this.transferInfo[i].transferRecordPayTime);
          }
          this.Ttotal = res.data.count;
        })
      },
      ThandleCurrentChange (val) {
        this.TpageIndex = val;
        this.transferList();
      },
      Tsearch () {
        this.filters.TcurrentName = this.filters.Tname;
        this.TpageIndex = 1;
        this.transferList();
      },
      buyList () {
        var params = {
          name: this.$route.query.name,
          pageIndex: this.BpageIndex,
          pageSize: this.BpageSize,
          query: this.filters.BcurrentName
        }
        getData.person_buy_Info(params).then(res => {
          this.buyInfo = res.data.list;
          for (var i = 0; i < this.buyInfo.length; i++) {
            this.buyInfo[i].buyRecordTime = format(this.buyInfo[i].buyRecordTime);
          }
          this.Btotal = res.data.count;
        })
      },
      BhandleCurrentChange (val) {
        this.BpageIndex = val;
        this.buyList();
      },
      Bsearch () {
        this.filters.BcurrentName = this.filters.Bname;
        this.BpageIndex = 1;
        this.buyList();
      },
      addPerson () {
        getData.add_person(this.$route.query.name).then(res => {
          if (res.data.code == 1) {
            this.$message.success('成功标记！')
            this.type = '重点人员'
          }
        })
      },
      deletePerson () {
        this.$confirm('是否修改数据？这将不能恢复', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '放弃修改'
        })
          .then(() => {
            getData.delete_person(this.$route.query.name).then(res => {
              if (res.data.code == 1) {
                this.$message.success('成功删除标记！')
                this.type = '普通人员'
              }
            })
            //this.bookList();
          })
          .catch(action => {
            this.$message({
              type: 'success',
              message: '取消成功'
            })
          });
      },
      editPerson () {
        this.$router.push({path: '/keyPersonEdit', query: {name: this.name}})
      }
    }
  }

</script>

<style lang="scss" scoped>
  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  img {
    margin-left: 50px;
  }

  .left-label {
    padding-right: 10px;
  }
  .label-span + .label-span {
    padding-left: 15px
  }
  .zfb-box {
    .box-item {
      line-height: 30px;
    }
    & + .zfb-box {
      padding-top: 20px;
    }
  }

  .content-wrap {
    margin-top: 40px;
  }
</style>
<style lang="scss">
  .collapse-box {
    margin-top: 20px;
    .el-collapse-item__header {
      padding: 0 15px;
      background-color: #1890FF;
      color: #ffffff;
    }
    .el-form-item {
      margin: 0;
      padding: 5px 0;
    }
  }
</style>
