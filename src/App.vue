<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {}
  }

</script>

<style lang="scss">
  .text-red {
    color: #f56c6c
  }

  .text-blue {
    color: #409EFF
  }

  body {
    margin: 0px;
    padding: 0px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  div, p, ul, li {
    margin: 0;
    padding: 0;
  }

  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    //border:1px solid #dfe6ec;
    margin: 20px 0px;
    border-radius: 5px;
    .el-form-item {
      margin-bottom: 10px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .clearfix {
    zoom: 1;
  }

  .flex-box {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>
