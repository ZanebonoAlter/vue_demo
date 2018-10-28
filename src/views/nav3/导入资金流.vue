<template>
  <section>
    <div class="upload-tips">当前已导入{{count}}条</div>
    <el-form ref="addForm">
      <el-form-item label="请上传excel文件">
        <el-upload
          class="upload-box"
          action="/back/transferrecord/upload"
          :on-success="successUpload">
          <el-button size="medium" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
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

  .upload-tips {
    padding-bottom: 10px;
  }
</style>
