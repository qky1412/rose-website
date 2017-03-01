<template>
  <div v-loading="dataLoading" style="text-align: left">
    <el-dialog title="" v-model="previewVisible" size="large">
      <div style="text-align: center;">
        <img :src="imagePreview" class="imagePreview"/>
      </div>
    </el-dialog>
    <div style="max-width: 1090px; margin: 0 auto;">
      <el-row>
        <el-col :span="5">Date: {{patient.date}}</el-col>
        <el-col :span="5">Case: {{patient.no}}</el-col>
      </el-row>
      <hr />
      <el-row>
        <el-col :span="5">Name: {{patient.name}}</el-col>
        <el-col :span="5">Sex: {{patient.gender}}</el-col>
        <el-col :span="5">Age: {{patient.age}}</el-col>
      </el-row>
      <hr />
      <el-row>
        <p>简要病史、胸部CT、气管镜报告</p>
        <img v-for="image in patient.images" :src="setImageUrl(image.url)" width="400px" style="max-width: 100%;" @click="previewImage(setImageUrl(image.url))"/>
      </el-row>
      <hr />
      <div v-for="(smear, $index) in patient.smears">
        <p style="text-align: center;">涂片{{$index + 1}}({{smear.location}})</p>
        <hr />
        <el-row>
          <el-col :span="12">气管镜: {{smear.weasand_lens | formatWeasandLens}}</el-col>
          <el-col :span="12">涂片类型: {{smear.type | formatSmearType}}</el-col>
        </el-row>
        <el-row>
          <img v-for="image in smear.images" :src="setImageUrl(image.url)" width="400px" style="max-width: 100%;" @click="previewImage(setImageUrl(image.url))"/>
        </el-row>
        <hr />
        <el-row>ROSE诊断: {{smear.diagnosis}}</el-row>
        <hr />
      </div>
      <el-row>
        <el-col :span="4">结果反馈</el-col>
        <el-col :span="20">
          <el-row>细胞壁室结果: {{patient.cell_diagnosis}}</el-row>
          <el-row>病理结果: {{patient.pathology_diagnosis | formatPathology}}</el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .el-row {
    padding: 1em;
  }
  .imagePreview {
    max-width: 90%;
    height: auto;
    text-align: center;
    margin: 10px auto;
    display: block;
  }
</style>
<script>
import PatientApi from '../api/Patient'
import {setImageUrl} from '../utils'
export default {
  name: 'Preview',
  data () {
    return {
      dataLoading: true,
      patient: {},
      imagePreview: '',
      previewVisible: false
    }
  },
  methods:  {
    setImageUrl (value) {
      return setImageUrl(value)
    },
    previewImage (src) {
      this.imagePreview = src
      this.previewVisible = true
    }
  },
  beforeMount () {
    this.dataLoading = true
    PatientApi.get(this.$route.params.id, response => {
      console.log(response)
      if (response.data.result.id != null) {
        this.patient = response.data.result
        this.dataLoading = false
      } else {
        this.$message({
          message: '获取数据失败',
          type: 'error'
        })
      }
    }, error => {
      this.dataLoading = false
      this.$message({
        message: error,
        type: 'error'
      })
    })
  },
  filters: {
    formatWeasandLens: function (value) {
      switch (value) {
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
    formatSmearType: function (value) {
      switch (value) {
        case 0:
          return '刷检(活检前)'
        case 1:
          return '刷检(活检后)'
        case 2:
          return '细针穿刺涂片'
        case 3:
          return '活检组织印片'
        default:
          return ''
        }
    },
    formatPathology: function (value) {
      switch (value) {
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
