<template>
    <div>
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">ROSE</el-menu-item>
      </el-menu>
      <keep-alive>
        <router-view v-if="!$route.meta.notKeepAlive"></router-view>
      </keep-alive>
      <router-view v-if="$route.meta.notKeepAlive"></router-view>
    </div>
</template>
<script>
  export default {
    name: 'Layout',
    data () {
      return {
        fakeMsg: 'this is a fake msg'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        this.$router.replace('/home')
      }
    },
    mounted () {
      console.log(this.fakeMsg)
    }
  }
</script>
