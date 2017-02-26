<template>
    <div class="p-upload-list">
        <el-upload
                ref="imageUpload"
                :action="action"
                :data="uploadData"
                :on-preview="handlePreview"
                :on-error="handleError"
                :on-success="handleSuccess"
                :before-upload="handleBeforeUpload"
                :default-file-list="fileList"
                :multiple="multiple">
            <el-button size="small" icon="plus" class="p-upload-button"></el-button>
        </el-upload>
        <el-dialog title="" v-model="previewVisible" size="large">
            <div style="text-align: center;">
                <img :src="imagePreview" class="imagePreview"/>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .p-upload-list {
        /*background: #fff;*/
        .imagePreview {
            max-width: 90%;
            height: auto;
            text-align: center;
            margin: 10px auto;
            display: block;
        }
        .el-upload {
            width: auto;
        }
        .el-upload__files {
            display: flex;
            flex-wrap: wrap;
        }

        .el-upload__file {
            position: relative;
            width: 180px;
            height: 180px;
            margin: 5px;
            /*background: #F3F4F6;*/
            background-color: #f9fafc;
            border: 1px solid #c0ccda;
            box-sizing: border-box;
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
            overflow: hidden;
            &__name {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                background: transparent;
            }
            .el-upload__img {
                width: 100%;
                height: 100%;
            }
        }

        .p-upload-button,
        .p-upload-button:hover,
        .p-upload-button:focus,
        .p-upload-button:active {
            width: 180px;
            height: 180px;
            margin: 5px;
            font-size: 32px;
            background: #F3F4F6;
            // color: @text-third-color;
            // border-color: @divider-dark-color;

            &:hover,
            &:focus,
            &:active {
                background: #EBECEE;
            }
        }

        .el-upload__file a [class^="el-icon"] {
            display: none;
        }

        .el-upload__btn-delete {
            display: block;
            position: absolute;
            top: 70px;
            left: 70px;
            width: 30px;
            height: 30px;
            opacity: 0;
            text-indent: -99999px;
            // color: @background-gray;
            &:after {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 30px;
                height: 30px;
                text-align: center;
                font-size: 24px;
                line-height: 30px;
                font-family: element-icons !important;
                font-weight: 400;
                content: "\E624";
                text-indent: 0;
            }
        }
        .el-upload__file:hover:before {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.72);
        }
        .el-upload__file:hover .el-upload__btn-delete {
            opacity: 1;
        }
    }
</style>
<script>
    import OSS from '../api/OSS'
    import {revertListToName, revertListToId, setImageUrl, formatDate, setPreviewImage} from '../utils'
    import Config from '../config'
    export default {
        name: 'UploadList',
        props: {
            defaultImgList: {
                type: Array,
                default: []
            },
            keyPrefix: {
                type: String,
                default: 'key'
            }
        },
        data () {
            return {
                ossDataFinished: false,
                uploadData: {},
                filePathDictionary: {},
                fileList: this.defaultImgList,
                action: Config.uploadServerUrl,
                imagePreview: '',
                previewVisible: false,
                multiple: true
            }
        },
        methods: {
            getFileList () {
                return revertListToId(this.$refs.imageUpload.fileList, 0)
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
                let imgList = this.$refs.imageUpload.$el.querySelectorAll('li.el-upload__file')
                let index = fileList.indexOf(file)
                this.$refs.imageUpload.fileList[index].url = this.filePathDictionary[file.name]
                this.$refs.imageUpload.fileList[index].name = null
                imgList[index].appendChild(this.createImg(fileList, index))
            },
            initAppendImgs () {
                let fileList = this.fileList
                let imgList = this.$refs.imageUpload.$el.querySelectorAll('li.el-upload__file')
                for (let [index] of fileList.entries()) {
                    imgList[index].appendChild(this.createImg(fileList, index))
                }
            },
            createImg (fileList, index) {
                let imgElement = document.createElement('img')
                imgElement.setAttribute('src', setImageUrl(fileList[index].url))
                imgElement.setAttribute('class', 'el-upload__img')
                return imgElement
            },
            handleBeforeUpload (file) {
                let key = this.keyPrefix + '/' + formatDate(new Date())
                this.filePathDictionary[file.name] = key
                this.uploadData.key = key
            },
            setImageList () {
                var imageList = revertListToName(this.defaultImgList) // 讲服务器返回的ImageList转换成Ele上传空间需要的list
                imageList.forEach(function (item) {
                    item.url = setImageUrl(item.url, 'diskCover') // 添加必要前缀，供控件正确显示图片
                })
                this.fileList = imageList
            }
        },
        beforeMount () {
            this.setImageList()
            OSS.fetchPolicy(response => {
                let data = response.data.result
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
        mounted () {
            this.initAppendImgs()
        },
        watch: {
            defaultImgList () {
                let self = this
                this.setImageList()
                setTimeout(function () {
                    self.initAppendImgs()
                }, 500)
            }
        }
    }
</script>
