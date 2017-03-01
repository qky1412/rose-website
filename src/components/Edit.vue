<template>
  <div id="page-new">
    <el-breadcrumb separator="/" style="padding: 10px;">
      <el-breadcrumb-item :to="{ path: '/home' }">患者列表</el-breadcrumb-item>
      <el-breadcrumb-item >新建</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="patient_form" :modal="form" :rules="rules" label-width="90px" label-position="right" v-loading="posting" v-if="!dataLoading">
      <el-card style="margin-top: 1em;">
        <el-row>
          <el-col :span="8">
            <el-form-item label="日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="编号">
              <el-input v-model="form.no"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="住院号">
              <el-input v-model="form.number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄">
              <el-input-number v-model="form.age" :min="1" :max="150"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别">
              <el-select v-model="form.gender" placeholder="性别">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <label>简要病史</label>
        <single-image ref="image_history"
                      :default-img-list="history_image_list"
                      key-prefix="rose_history">

        </single-image>
        <label>影像图片</label>
        <single-image ref="image_image"
                      :default-img-list="image_image_list"
                      key-prefix="rose_image">

        </single-image>


      </el-card>
      <el-card v-for="(s, $index) in form.smears" style="margin-top: 1em;">
        <el-row>
          <label class="title">涂片{{$index + 1}}</label>
          <el-button @click="deleteSmear($index)" icon="delete" class="btn-delete">删除</el-button>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="位置">
              <el-input v-model="s.location"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="气管镜">
              <el-select v-model="s.weasand_lens" placeholder="气管镜">
                <el-option label="普镜(直视下)" value="0"></el-option>
                <el-option label="普镜(TBLB)" value="1"></el-option>
                <el-option label="外周超声(EBUS-GS)" value="2"></el-option>
                <el-option label="中央超声(EBUS-TBNA)" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="涂片类型">
              <el-select v-model="s.type" placeholder="涂片类型">
                <el-option label="刷检(活检前)" value="0"></el-option>
                <el-option label="刷检(活检后)" value="1"></el-option>
                <el-option label="细针穿刺涂片" value="2"></el-option>
                <el-option label="活检组织印片" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <label class="label">ROSE涂片：</label>
          <upload-list ref="smearImages" :defaultImgList="s.images" keyPrefix="rose_smear"></upload-list>
        </el-row>
        <el-row style="margin-top: 1em;">
          <el-form-item label="ROSE诊断">
            <el-input v-model="s.diagnosis">
            </el-input>
          </el-form-item>
        </el-row>
      </el-card>
      <el-button icon="new" class="btn-new" @click="addSmear" type="primary">增加涂片</el-button>

      <el-card>
        <el-row>
          <el-col :span="8">
            <el-form-item label="细胞室诊断">
              <el-input v-model="form.cell_diagnosis"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="病理诊断">
              <el-select v-model="form.pathology_diagnosis" >
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
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-row style="text-align: center;padding: 1em;">
        <el-button type="primary" @click="onSubmit('patient_form')" size="large">确定</el-button><el-button size="large" @click="goBack">取消</el-button>
      </el-row>
    </el-form>
  </div>


</template>
<script>
import PatientApi from '../api/Patient'
import SingleImage from './SingleImage'
import UploadList from './UploadList'
import {eventHandler} from '../EventHandler'
export default {
  name: 'Edit',
  components: {SingleImage, UploadList},
  data () {
    return {
      imageList: [],
      form: {
        date: '2017-02-24',
        gender: '0',
        age: '0',
        name: '',
        no: '',
        number: '',
        smears: [{location: '', weasand_lens: '0', type: '0', diagnosis: '', images: []}],
        cell_diagnosis: '',
        pathology_diagnosis: '1',
        images: []
      },
      rules : {
        date1: [{ type: 'date', required: true, message: '请输入日期', trigger: 'change'}]
      },
      posting: false,
      dataLoading: true
    }
  },
  beforeMount () {
    this.dataLoading = true
    PatientApi.get(this.$route.params.id, response => {
      console.log(response)
      if (response.data.result.id != null) {
        const patient = response.data.result
        this.form.date = patient.date
        this.form.gender = patient.gender
        this.form.age = patient.age
        this.form.name = patient.name
        this.form.no = patient.no
        this.form.number = patient.number
        this.form.smears = patient.smears
        this.form.cell_diagnosis = patient.cell_diagnosis
        this.form.pathology_diagnosis = patient.pathology_diagnosis
        this.history_image_list = patient.images.filter(function (item) {
          return item.type === 0
        })
        this.image_image_list = patient.images.filter(function (item) {
          return item.type === 1
        })
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
  methods: {
    addSmear () {
      this.form.smears.push({location: '', weasand_lens: '0', type: '0', diagnosis: '', images: []})
    },
    formSmearRefs (index) {
      return 'smearImage' + index
    },
    deleteSmear (index) {
      this.$confirm('确定删除该图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          this.form.smears.splice(index, 1)
          this.$message({
              type: 'success',
              message: '删除成功!'
          })
      }).catch(() => {
      })
    },
    onSubmit (formName) {
      var _self = this
      this.posting = true
      const images = {images: this.$refs.image_history.getFileList(0).concat(this.$refs.image_image.getFileList(1))}
      const params = Object.assign(this.form, images)
      this.form.smears.forEach( function (item, index) {
        var images = _self.$refs.smearImages[index].getFileList(0)
        item.images = images
      })
      console.log(params)
      PatientApi.update(this.$route.params.id, params, response => {
        console.log(response)
        this.posting = false
        eventHandler.$emit('reloadList')
        this.$router.replace('/home')
      }, error => {
        this.posting = false
        this.$message({
          message: JSON.stringify(error),
          type: 'error'
        })
      })
      this.posting = false
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  #page-new {
    padding: 20px;
  }
  .btn-new {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  label.title {
    font-size: 20px;
  }
</style>
