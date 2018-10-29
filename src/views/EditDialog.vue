<template>
  <el-dialog
    title="编辑重点人员"
    :visible.sync="showDialog"
    width="50%"
    center>
    <el-row class="edit-wrap">
      <el-col>
        <el-form :model="addForm" label-width="100px" ref="addForm">
          <el-form-item label="身份证号:" prop="name">
            <el-input v-model="addForm.pIdentity" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="户籍:" prop="price">
            <el-input v-model="addForm.pResidence" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:" prop="stock">
            <el-input v-model="addForm.pEmail" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="stock">
            <el-input v-model="addForm.pPhone" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="微信号:" prop="stock">
            <el-input v-model="addForm.pWeixinId" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="微信名:" prop="stock">
            <el-input v-model="addForm.pWeixin" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="qq账号:" prop="stock">
            <el-input v-model="addForm.pQq" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="支付宝账号:" prop="stock">
            <el-input v-model="addForm.pZhifubao" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="基本信息备注:" prop="stock">
            <el-input v-model="addForm.pRemark" type="textarea"></el-input>
          </el-form-item>
          <!--<el-form-item label="园丁丁等级:" prop="stock">-->
            <!--<el-input v-model="addForm.pYuandingGrade"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="园丁丁网站序号uid:" prop="stock">-->
            <!--<el-input v-model="addForm.pYuandingUid"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="园丁丁网站内名称:" prop="stock">-->
            <!--<el-input v-model="addForm.pYuandingName"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="园丁丁网站内好友数量:" prop="stock">-->
            <!--<el-input-number v-model="addForm.pYuandingFriendNum"></el-input-number>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="园丁丁网站内相册数量:" prop="stock">-->
            <!--<el-input-number v-model="addForm.pYuandingAlbumNum"></el-input-number>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="园丁丁网站发帖数量:" prop="stock">-->
            <!--<el-input-number v-model="addForm.pYuandingPostNum"></el-input-number>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="园丁丁网站主题数:" prop="stock">-->
            <!--<el-input-number v-model="addForm.pYuandingTopicNum"></el-input-number>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="园丁丁网站注册ip:" prop="stock">-->
            <!--<el-input v-model="addForm.pYuandingRegistIp"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="园丁丁网站注册时间:" prop="stock">-->
            <!--<el-date-picker-->
              <!--v-model="addForm.pYuandingRegistTime"-->
              <!--type="datetime"-->
              <!--placeholder="选择日期时间">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="园丁丁网站最后一次登录ip:" prop="stock">-->
            <!--<el-input v-model="addForm.pYuandingLoginLastIp"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="园丁丁网站最后一次登录的地址:" prop="stock">-->
            <!--<el-input v-model="addForm.pYuandingLoginLastAddress"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="园丁丁网站最后一次登录的时间:" prop="stock">-->
            <!--<el-date-picker-->
              <!--v-model="addForm.pYuandingLoginLastTime"-->
              <!--type="datetime"-->
              <!--placeholder="选择日期时间">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="住址信息:" prop="stock">-->
            <!--<el-input v-model="addForm.pAddressInfo" type="textarea"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="活动痕迹:" prop="stock">-->
            <!--<el-input v-model="addForm.pTrajectoryInfo" type="textarea"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="证据指向:" prop="stock">-->
            <!--<el-input v-model="addForm.pEvidence" type="textarea"></el-input>-->
          <!--</el-form-item>-->
        </el-form>
        <div class="footer">
          <el-button type="primary" @click="update">提交</el-button>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
  import util from '../common/js/util'
  //import NProgress from 'nprogress'
  import * as getData from '../api/api';

  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showDialog: this.show,
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
      this.init();
    },
    methods: {
      update () {
        getData.update_person(this.addForm).then(res => {
          if (res.data.code == 1) {
            this.$message.success('success submit!');
            this.showDialog = false
          }
        })
      },
      init () {
        getData.key_person_info(this.$route.query.name).then(res => {
          this.addForm = res.data.addForm
          console.log(this.addForm)
        })
      }
    },
    watch: {
      async show (val) {
        this.showDialog = val
      }
    }
  }

</script>

<style lang="scss" scoped>
  .edit-wrap {
  }

  .footer {
    margin: 50px 0 0;
    text-align: center;
  }
</style>
