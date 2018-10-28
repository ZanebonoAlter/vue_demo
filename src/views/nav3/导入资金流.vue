<template>
  <section>
    <el-form ref="addForm">
      <el-row>
        <el-col :span="5">
          <el-form-item>
            <el-button class="upload-btn" size="medium" type="primary">
              <a href="../static/XX转账记录.xlsx" target="_blank">点击下载模板文件</a></el-button>
          </el-form-item>
        </el-col>
        <el-col  :span="5">
          <el-form-item>
            <el-upload
              class="upload-box"
              action="/back/transferrecord/upload"
              :on-success="successUpload">
              <el-button size="medium" type="primary">点击上传Excel文件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="upload-tips">当前已导入{{count}}条</div>
    <div class="desc-wrap">
      注意：
      <p>1.文件命名：使用“XX转账记录”(XX这里指的是姓名)</p>
      <p>1.文件格式：使用EXCEL表格(.xlsx后缀名文件)</p>
    </div>
    <!--<div class="footer">-->
    <!--<el-button type="primary" @click="upload">提交</el-button>-->
    <!--</div>-->
  </section>
</template>

<script>
  import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import * as getData from '../../api/api';

  export default {
    data () {
      return {
        count: 0,
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      downloadFile () {
        window.location.href = '../../../static/XX购物转账记录.xlsx'
      },
      init () {
        getData.transferRecord().then(res => {
          this.count = res.data.count;
        })
      },
      upload () {

      },
      successUpload (response, file, fileList) {
        console.log(response)
        console.log(file)
        if (response.code == 1) {
          this.$message.success('成功导入!' + response.effect_size + ";" + response.new_size + ";" + response.uneffect_size);
        } else {
          this.$message.error(response.error_format_message);
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .footer {
    margin: 50px 0;
    text-align: center;
  }
  .upload-btn {
    a {
      color: #ffffff;
      text-decoration: none;
    }
  }
  .desc-wrap {
    color: red;
    line-height: 30px;
  }
  .upload-tips {
    padding-bottom: 10px;
  }
</style>
