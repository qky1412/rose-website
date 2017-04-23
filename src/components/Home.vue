<template>
  <div id="page-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">患者列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row style="margin-top: 1em;">
      <el-form :inline="true"  ref="searchForm" :model="searchForm" class="search-form">
        <label>病理诊断</label>
        <el-form-item style="margin-right: 0;">
          <el-select v-model="searchForm.pathology" placeholder="搜索条件" >
            <el-option label="全部" value=""></el-option>
            <el-option label="肺腺癌" value="1"></el-option>
            <el-option label="肺鳞癌" value="2"></el-option>
            <el-option label="小细胞肺癌" value="3"></el-option>
            <el-option label="大细胞肺癌" value="4"></el-option>
            <el-option label="肺部感染(真菌、结核)" value="5"></el-option>
            <el-option label="机化性肺炎" value="6"></el-option>
            <el-option label="间质性肺炎" value="7"></el-option>
            <el-option label="结节病" value="8"></el-option>
            <el-option label="肺肉瘤" value="9"></el-option>
            <el-option label="未见肿瘤及肉芽肿证据" value="10"></el-option>
            <el-option label="其他" value="11"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" class="button-new" @click="create" icon="plus" v-if="user != null && user.username == 'admin'">新建</el-button>
        <el-button type="button" @click="handleSubmit" icon="search">查询</el-button>
      </el-form>
    </el-row>
    <el-table :data="tableData" border v-loading="loadingList" element-loading-text="拼命加载中" stripe>
      <el-table-column
        label="编号"
        width="100"
        align="center"
      >
        <template scope="scope">
          <p>{{ scope.row.no}}</p>
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
          <p>{{ scope.row.weasand_lens | formatWeasandLens}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="病理诊断"
        width="150"
        align="left"
      >
        <template scope="scope">
          <p>{{ scope.row.pathology_diagnosis | formatPathology }}</p>
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
        width="160">
        <template scope="scope">
          <el-button type="text" @click="enterPreview(scope.row)">查看</el-button>
          <el-button type="text" @click="enterEdit(scope.row)" v-if="user != null && user.username == 'admin'">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)" v-if="user != null && user.username == 'admin'" style= "color: red;">删除</el-button>
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
import {eventHandler} from '../EventHandler'
import UserApi from '../api/User'
export default {
  name: 'Home',
  data () {
    return {
      params: {
        page: 1,
        pageSize: 15
      },
      searchForm: {
        pathology: ''
      },
      tableData:[],
      loadingList: false,
      currentPage: 0,
      pageSize: 15,
      pageSizes: [15, 30, 50, 80],
      total: 0,
      pageLayout: 'total, prev, pager, next, jumper',
      user: null
    }
  },
  beforeMount () {
     this.user = UserApi.getUser()
  },
  methods: {
    handleSubmit () {
      this.currentPage = 1
      this.fetch()
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
    },
    enterEdit (row) {
      this.$router.push({name: 'Edit', params: {id: row.id}})
    },
    enterPreview (row) {
      this.$router.push({name: 'Preview', params: {id: row.id}})
    },
    handleDelete (row) {
      const deleteId = row.id
        this.$confirm('此操作将永久删除该患者，是否确定删除？', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          PatientApi.delete(deleteId, response => {
            if (response.data.message === 'ok') {
              this.$message({type: 'success', message: '删除成功!'})
              this.fetch()
            } else {
              this.$message({type: 'error', message: '删除失败!'})
            }
          }, error => {
            console.log(error)
            this.$message({type: 'error', message: '删除失败!'})
          })
        }).catch(() => {
        })
    }
  },
  created () {
      if (this.tableData.length === 0) {
        this.fetch()
      }
      eventHandler.$on('reloadList', this.fetch)
  },
  filters: {
    formatWeasandLens: function (value) {
      switch (value) {
      case -1:
        return ''
      case 0:
        return '普镜(直视下)'
      case 1:
        return '普镜(TBLB)'
      case 2:
        return '外周超声(EBUS-GS)'
      case 3:
        return '中央超声(EBUS-TBNA)'
      default:
        return ''
      }
    },
    formatPathology: function (value) {
      switch (value) {
      case '0':
        return ''
      case '1':
        return '肺腺癌'
      case '2':
        return '肺鳞癌'
      case '3':
        return '小细胞肺癌'
      case '4':
        return '大细胞肺癌'
      case '5':
        return '肺部感染(真菌、结核)'
      case '6':
        return '机化性肺炎'
      case '7':
        return '间质性肺炎'
      case '8':
        return '结节病'
      case '9':
        return '肺肉瘤'
      case '10':
        return '未见肿瘤及肉芽肿证据'
      default:
        return '其他'
      }
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
