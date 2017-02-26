<template>
  <div class="single-image">
    <el-upload
      ref="singleImage"
      type="drag"
      :action="action"
      :data="uploadData"
      :on-preview="handlePreview"
      :on-error="handleError"
      :on-success="handleSuccess"
      :before-upload="handleBeforeUpload"
      :default-file-list="fileList"
      :thumbnail-mode="true"
      :mutiple="false"
      v-if="ossDataFinished"
      >
      <i class="el-icon-upload"></i>
      <div class="el-dragger__text"><em>点击上传</em></div>
    </el-upload>
    <el-dialog title="" v-model="previewVisible" size="large">
      <div style="text-align: center;">
        <img :src="imagePreview" class="imagePreview"/>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .single-image {
    .imagePreview {
      max-width: 90%;
      height: auto;
      text-align: center;
      margin: 10px auto;
      display: block;
    }
    .el-upload__inner.el-dragger {
      border: 1px solid #c0ccda;
      background-color: #f9fafc;
    }
    .el-upload__inner.el-dragger:hover {
      background: #F3F4F6;
    }
    .el-dragger {
      width: 450px;
      height: 180px;

      .el-draggeer__cover__btns span.btn {
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 75px;
        &:hover {
          // transform: none;
        }
        &:first-child {
          display: none;
          // margin: 82px auto 0;
          span {
            display: none;
          }
        }
      }

      .el-dragger__cover__title {
        display: none;
      }

      .el-dragger + .el-upload__tip {
        // text-align: left !important;
      }

    }

    .square .el-dragger {
      width: 180px;
      height: 180px;
      .el-draggeer__cover__btns span.btn {
        &:last-child {

        }
      }

    }
  }
  fieldset:disabled{
    .single-image {
      .el-dragger {
        .el-draggeer__cover__btns span.btn {
          &:first-child {
            display: none;
          }
        }
      }
    }
  }
</style>
<script>
    import OSS from '../api/OSS'
    import {revertListToId, revertListToName, formatDate, setImageUrl, setPreviewImage} from '../utils'
    import Config from '../config'
    export default {
        name: 'SingleImage',
        props: {
            defaultImgList: {
                type: Array,
                default: []
            },
            keyPrefix: {
                type: String,
                default: 'rose'
            },
            isSquare: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                ossDataFinished: false,
                uploadData: {},
                filePathDictionary: {},
                fileList: [],
                action: Config.uploadServerUrl,
                squareClass: 'square',
                imagePreview: '',
                previewVisible: false
            }
        },
        methods: {
            getFileList (type) {
                return revertListToId(this.$refs.singleImage.fileList, type)
            },
            handlePreview (file) {
                this.imagePreview = setPreviewImage(file.url)
                this.previewVisible = true
            },
            handleError (err, response, file) {
                console.log(err)
                if (response.toString().includes('Invalid according to Policy: Policy expired')) {
                    this.$message({
                        message: 'OSS Token 过期，已重新生成，请重试',
                        type: 'warning'
                    })
                    this.ossDataFinished = false
                    OSS.fetchPolicy(response => {
                        console.log(response.data.result)
                        var data = response.data.result
                        this.uploadData = {
                            OSSAccessKeyId: data.accessid,
                            policy: data.policy,
                            signature: data.signature
                        }
                        this.ossDataFinished = true
                    }, error => {
                        console.log(error)
                    })
                }
            },
            handleSuccess (response, file, fileList) {
                let index = fileList.indexOf(file)
                this.$refs.singleImage.fileList[index].url = Config.uploadServerUrl + '/' + this.filePathDictionary[file.name] + '@!thumbnail'
                this.$refs.singleImage.fileList[index].name = null
            },
            handleBeforeUpload (file) {
                let key = this.keyPrefix + '/' + formatDate(new Date())
                this.filePathDictionary[file.name] = key
                this.uploadData.key = key
            },
            setImageList () {
                var imageList = revertListToName(this.defaultImgList) // 讲服务器返回的ImageList转换成Ele上传空间需要的list
                imageList.forEach(function (item) {
                    item.url = setImageUrl(item.url, 'thumbnail') // 添加必要前缀，供控件正确显示图片
                })
                this.fileList = imageList
            }
        },
        beforeMount () {
            this.setImageList()
            OSS.fetchPolicy(response => {
                var data = response.data.result
                this.uploadData = {
                    OSSAccessKeyId: data.accessid,
                    policy: data.policy,
                    signature: data.signature
                }
                this.ossDataFinished = true
            }, error => {
                console.log('errorfetchpolicy:', error)
            })
        },
        watch: {
            defaultImgList () {
                this.setImageList()
            }
        }
    }
</script>
