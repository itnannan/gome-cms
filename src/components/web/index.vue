<template>
    <div class="hello">
    <el-form :label-position="labelPosition" ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="平台" prop="platform">
        <el-radio-group v-model="form.platform" >
          <el-radio-button label="windows">windows</el-radio-button>
          <el-radio-button label="mac">mac</el-radio-button>
          <el-radio-button label="android">android</el-radio-button>
          <el-radio-button label="ios">ios</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="背景图">
        <el-upload
         name="name"
          ref="upload"
         class="upload-demo"
         action="http://127.0.0.1:12345/api/web/bannerPic"
         :on-preview="handlePreview"
         :on-remove="handleRemove"
         :file-list="background" 
         :before-upload="beforUpload"
         :on-success="successed"
         label="背景图" >
            <div slot="tip" class="el-upload__tip">封面背景图,只能上传jpg/png文件,最大5000kb</div>
            <el-button size="small" type="primary" class="upload-button">点击上传</el-button>
         </el-upload>
      </el-form-item>
      <el-form-item label="大标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="小标题" prop="subtitle">
        <el-input v-model="form.subtitle" placeholder="例: 版本列表 展示的标题"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <el-input v-model="form.summary"></el-input>
      </el-form-item>
      <el-form-item label="大小" prop="size">
        <el-input v-model="form.size" placeholder="例: 12.3M"></el-input>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="form.version" placeholder="例: V1.1.0"></el-input>
      </el-form-item>
      <el-form-item label="适应系统" prop="system">
        <el-input v-model="form.system" placeholder="例: Win7及以上"></el-input>
      </el-form-item>
      <el-form-item label="发布日期" prop="date">
        <el-input v-model="form.date" placeholder="例: 2017-1-1"></el-input>
      </el-form-item>
      <el-form-item label="下载地址" prop="address">
        <el-input v-model="form.address" placeholder="例: https://gomeplus.com/V1.1.1.exe"></el-input>
      </el-form-item>
      <el-form-item v-for="(detail,index) in detailList" :key="detail.id" label="详情标题" prop="">
        <el-input v-model="detail.title" placeholder="例: 版本详情页中 条目"></el-input>
        <el-button class="remove" type="primary" size="small"  @click="removeVersionDetail(index)">删除此条</el-button>
        <el-upload
            action=""
            ref="upload"
            class="upload-demo"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="detail.fileList"
            :before-upload="detailBeforUpload(index)"
            label="背景图" >
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,最大5000kb</div>
            <el-button size="small" type="primary" class="upload-button">点击上传</el-button>
         </el-upload>
      </el-form-item>
      <el-form-item>
         <el-button type="primary" size="small" icon="plus" @click="addVersionDetail">添加一条</el-button>
      </el-form-item>
      <el-form-item class='button'>
        <el-button type='primary' @click='previewAddress("form")'>提交</el-button>
        <el-button type='primary' @click='resetForm("form")'>重置</el-button>
        <el-dropdown class="marginLeft" trigger="click">
          <el-button type="primary">
            导航<i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item @click="bannerClick" >banner录入页</el-dropdown-item>
            <el-dropdown-item divided><a href="https://www.baidu.com" target="_blank">查看线上效果</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
//import router from '@/router/index'
const rules = {
    platform: [{
        required: true
    }],
    title: [{
        required: true,
        message: '请输入大标题',
        trigger: 'blur'
    }],
    summary: [{
        message: '请输入版本描述',
        trigger: 'blur'
    }],
    size: [{
        message: '请输入文件大小',
        trigger: 'blur'
    }],
    version: [{
        message: "请输入版本号",
        trigger: 'blur'
    }],
    system: [{
        message: '请输入适用系统',
        trigger: 'blur'
    }],
    date: [{
        message: '请填写时间',
        trigger: 'blur'
    }],
    address: [{
        message: '请填写下载地址',
        trigger: 'blur'
    }]
}
export default {
    data() {
            return {
                form: {
                    platform: 'windows',
                    title: '',
                    summary: '',
                    size: '',
                    version: '',
                    system: '',
                    date: '',
                    address: ''
                },
                //背景图
                background: [],
                //版本详情页 图片
                detailList: [
                    {
                        title:'',
                        fileList:[],
                        id:(new Date()).getTime()
                    }
                ],
                rules: rules,
                labelPosition: 'right'
            }
        },
        computed: {},
        created() {
            this.getDate()
        },
        methods: {
            //添加版本详情 一条内容
            addVersionDetail(){
                this.detailList.push({
                        title:'',
                        fileList:[],
                        id:(new Date()).getTime()
                    })
            },
            //删除版本详情 一条内容
            removeVersionDetail(index){
                if(this.detailList.length == 1)return;
                this.detailList.splice(index,1)
            },
            successed(res,file){
                console.log(res)
                this.test = res.src
            },
            handleRemove(file, fileList) {
                console.log(file, fileList)
                //this.form.fileList.pop()
                console.log()
            },
            handlePreview(file) {
                //console.log(file)
            },
            resetForm(formName) {
                console.log(this.$refs)
                this.$refs['form'].resetFields()
            },
            beforUpload(file) {
                //const _this = this
                if (!/image\/\w+/.test(file.type)) {
                    alert("别闹，一边去！")
                    return false;
                }
               /* this.background.splice(0,1)
                const reader = new FileReader()
                reader.onload = (ev) => {
                        const result = ev.target.result
                            //console.log(result)
                        this.background.push({
                                name: file.name,
                                result: result
                            })
                            
                    }
                reader.onerror = function() {
                    alert('出错了，再传一次，快！')
                }
                reader.readAsDataURL(file)*/
                //return false;
            },
            detailBeforUpload(index){
                const _this = this
                return function(file){
                    const reader = new FileReader()
                    reader.onload = (ev) => {
                            const result = ev.target.result
                                //console.log(result)
                            _this.detailList[index].fileList.push({
                                    name: file.name,
                                    result: result
                                })
                                //console.log(this.form.fileList)
                        }
                        
                    reader.onerror = function() {
                        alert('出错了，再传一次，快！')
                    }
                    reader.readAsDataURL(file)
                    return false;
                }
            },
            preview(formName) {
                this.upload(forName)
            },
            previewAddress(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://127.0.0.1:12345/upload/main', {
                            form: _this.form
                        }).then(function(res) {
                            //console.log("res",res)
                            _this.$router.push('/preview/platform/' + _this.form.platform)
                        }).catch(function(err) {
                            console.log("err", err)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            getDate() {
                const _this = this
                axios.post('http://127.0.0.1:12345/api/platform/all')
                    .then(function(res) {
                        console.log('res', res)
                        if (res.data.code == 1) {

                        } else {
                            _this['form'] = res.data || _this['form']
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
            },
            bannerClick() {},
            listClick() {},
            detailClick() {}
        }
}
</script>
<style scoped>
.hello {
    width: 60%;
    margin: 60px auto;
}
.sform {
    width: 100%;
}
.upload-demo {
    width: 50%;
    float: left;
}
.remove {
    margin-top: 5px;
    float: right;
}

/* .el-upload__tip{
float:right;
} */
.marginLeft {
    margin-left: 10px;
}
</style>
