<template>
    <div id="layout">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">ROSE</el-menu-item>
        <el-submenu index="2" v-if="user != null">
          <template slot="title" >{{user.username}}</template>
          <el-menu-item index="2-1" @click="logout">退出</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="container">
        <keep-alive>
          <router-view v-if="!$route.meta.notKeepAlive"></router-view>
        </keep-alive>
        <router-view v-if="$route.meta.notKeepAlive"></router-view>
      </div>

    </div>
</template>
<style lang="less" ref="stylesheet/less">
  .container {
    max-width: 1290px;
    margin: 0 auto;
  }
  #layout {
    .el-menu {
      background: #20a0ff;
      color: white;
      .el-menu-item.is-active {
        color: white;
      }
      .el-submenu {
        color: white;
        float: right;
        .el-submenu__title {
          color: white;
        }
      }
      .el-submenu:hover, .el-submenu .el-submenu__title {
        background: #20a0ff;
        color: white;
      }
      .el-submenu__icon-arrow.el-icon-caret-bottom {
        color: white;
      }
      .el-menu-item:hover {
        background-color: #0090ff;
      }
    }
  }
</style>
<script>
  import UserApi from '../api/User'
  export default {
    name: 'Layout',
    data () {
      return {
        user: null
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key)
        if (key === '2-1') {
          UserApi.logout()
          this.$router.replace({name: 'Login'})
        } else if (key === '1'){
          this.$router.replace('/home')
        }

      },
      logout () {

      }
    },
    beforeMount () {
      this.user = UserApi.getUser()
    }
  }
</script>
