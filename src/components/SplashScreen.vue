<template>
  <div class="container">
    <h1 class="title-main">
      {{title}}
    </h1>
    <h2 class="title-sub">
      {{sub_title}}
    </h2>
    <el-button type="primary" :loading="true">加载中</el-button>
  </div>
</template>

<script>
export default {
  name: 'Splash',
  data () {
    return {
      title: 'Rapid On-Site Evaluation',
      sub_title: '复旦大学附属中山医院呼吸内科气管镜室'
    }
  },
  methods: {
    goToHome () {
      this.$router.replace('/home')
    }
  },
  mounted () {
    var self = this
    setTimeout(function () {
      self.goToHome()
    }, 4000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .title-main {
    font-size: 45px;
    text-align: center;
    margin-top: 20%;
  }
  .title-sub {
    font-size: 20px;
    text-align: center;
    text-indent: 8em;
  }
  .container {
    text-align: center;
  }
  .el-button {
    margin-top: 2em;
  }
</style>
