<template>
  <div id="page-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">患者列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row style="margin-top: 1em;">
      <el-form :inline="true"  ref="searchForm" :model="searchForm" class="search-form">
        <label>病理诊断</label>
        <el-form-item style="margin-right: 0;">
          <el-select v-model="searchForm.type" placeholder="搜索条件" >
            <el-option label="全部" value="0"></el-option>
            <el-option label="肺腺癌" value="1"></el-option>
            <el-option label="肺鳞癌" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" class="button-new" @click="create" icon="plus">新建</el-button>
        <el-button type="button" @click="handleSubmit" icon="search">查询</el-button>
      </el-form>
    </el-row>
    <el-table :data="tableData" border v-loading="loadingList" element-loading-text="拼命加载中" style="width: 100%" stripe>
      <el-table-column
        label="编号"
        width="100"
        align="center"
      >
        <template scope="scope">
          <p>0</p>
        </template>
      </el-table-column>

      <el-table-column
                       label="姓名"
                       width="100"
                       align="center"
      >
        <template scope="scope" >
          <p class="table-text">{{ scope.row.name }}</p>

        </template>
      </el-table-column>
      <el-table-column
        label="年龄"
        width="70"
        align="center"
      >
        <template scope="scope">
          <p>{{ scope.row.age }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作日期"
        width="120"
        align="center"
      >
        <template scope="scope">
          <p>{{ scope.row.date }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="气管镜"
        width="120"
        align="center"
      >
        <template scope="scope">
          <p>{{ scope.row.weasand_lens}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="病理诊断"
        width="150"
        align="left"
      >
        <template scope="scope">
          <p>{{ scope.row.pathology_diagnosis }}</p>
        </template>
      </el-table-column>

      <el-table-column
        label="ROSE诊断"
        align="left"
      >
        <template scope="scope">
          <p>{{ scope.row.diagnosis }}</p>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template scope="scope">
          <el-button type="text" >查看</el-button>
          <el-button type="text">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row>
      <div class="block">
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          :total="total"
          :layout="pageLayout"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import PatientApi from '../api/Patient'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      params: {
        page: 1,
        pageSize: 15
      },
      searchForm: {
        type: '0'
      },
      tableData:[],
      loadingList: false,
      currentPage: 0,
      pageSize: 15,
      pageSizes: [15, 30, 50, 80],
      total: 0,
      pageLayout: 'total, prev, pager, next, jumper'
    }
  },
  methods: {
    handleSubmit () {
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.fetch({page})
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.fetch({pageSize})
    },
    fetch (data = {}) {
      this.loadingList = true
        const params = Object.assign(this.params, this.searchForm, data)
        PatientApi.list(params, response => {
          let data = response.data.result
          this.tableData = data.dataList
          this.total = data.total
          this.loadingList = false
        }, error => {
          this.loadingList = false
          console.log('error: ' + JSON.stringify(error))
        })
    },
    create () {
      this.$router.push('/new')
    }
  },
  created () {
      if (this.tableData.length === 0) {
        this.fetch()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  #page-list {
    padding: 20px;
  }
</style>
