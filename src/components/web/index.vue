<template>
    <div class="hello">
    <el-form :label-position="labelPosition" ref="form" :model="banner" :rules="rules" label-width="100px">
      <el-form-item label="平台" prop="platform">
        <el-radio-group v-model="banner.platform" >
          <el-radio-button label="windows">windows</el-radio-button>
          <el-radio-button label="mac">mac</el-radio-button>
          <el-radio-button label="android">android</el-radio-button>
          <el-radio-button label="ios">ios</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="背景图">
        <el-upload
         name="pic"
         class="upload-demo"
         action="http://127.0.0.1:12345/api/web/pic"
         :on-remove="remove"
         :file-list="banner.background"
         :before-upload="beforUpload"
         :on-success="backgroundUpload"
         label="背景图" >
            <div slot="tip" class="el-upload__tip">封面背景图,只能上传jpg/png文件,最大5000kb</div>
            <el-button size="small" type="primary" class="upload-button">点击上传</el-button>
         </el-upload>
      </el-form-item> 
      <el-form-item label="发布日期" prop="releaseTime">
        <el-date-picker
          v-model="releaseTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="大标题" prop="title">
        <el-input v-model="banner.title"></el-input>
      </el-form-item>
      <el-form-item label="小标题" prop="subTitle">
        <el-input v-model="banner.subTitle" placeholder="例: 版本列表 展示的标题"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <el-input v-model="banner.summary"></el-input>
      </el-form-item>
      <el-form-item label="大小" prop="size">
        <el-input v-model="banner.size" placeholder="例: 12.3M"></el-input>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="banner.version" placeholder="例: V1.1.0"></el-input>
      </el-form-item>
      <el-form-item label="适应系统" prop="system">
        <el-input v-model="banner.system" placeholder="例: Win7及以上"></el-input>
      </el-form-item>
     
      <el-form-item label="下载地址" prop="address">
        <el-input v-model="banner.address" placeholder="例: https://gomeplus.com/V1.1.1.exe"></el-input>
      </el-form-item>
      <el-form-item v-for="(detail,index) in details" :key="detail.id" label="详情标题" prop="">
        <el-input v-model="detail.title" placeholder="例: 版本详情页中 条目"></el-input>
        <el-button class="remove" type="primary" size="small"  @click="removeVersionDetail(index)">删除此条</el-button>
        <el-upload
            name='pic'
            action="http://127.0.0.1:12345/api/web/pic"
            ref=""
            class="upload-demo"
            :on-remove="listRemove(index)"
            :file-list="detail.fileList"
            :before-upload="beforUpload"
            :on-success='detailPicUpload(index)'
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
        <!-- <el-dropdown class="marginLeft" trigger="click">
          <el-button type="primary">
            导航<i class="el-icon-caret-bottom el-icon-/-right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item @click="bannerClick" >banner录入页</el-dropdown-item>
            <el-dropdown-item divided><a href="https://www.baidu.com" target="_blank">查看线上效果</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
const rules = {
    platform: [{
        required: true
    }],
    title: [{
        required: true,
        message: '请输入大标题',
        trigger: 'blur'
    }],
    subTitle: [{
        required: true,
        message: '请输入小标题',
        trigger: 'blur'
    }],
    summary: [{
        required: true,
        message: '请输入版本描述',
        trigger: 'blur'
    }],
    size: [{
        required: true,
        message: '请输入文件大小',
        trigger: 'blur'
    }],
    version: [{
        required: true,
        message: "请输入版本号",
        trigger: 'blur'
    }],
    system: [{
        required: true,
        message: '请输入适用系统',
        trigger: 'blur'
    }],
    releaseTime: [{
        message: '请填写时间',
        trigger: 'blur'
    }],
    address: [{
        required: true,
        message: '请填写下载地址',
        trigger: 'blur'
    }]
}
export default {
    data() {
        return {
            banner: {
                platform: 'windows',
                title: '',
                subTitle: '',
                summary: '',
                size: '',
                version: '',
                system: '',
                ctime: 0,
                address: '',
                background: []
            },
            details:[{
                title:'',
                fileList: [],
                id: (new Date()).getTime()
            }],
            rules: rules,
            labelPosition: 'right',
            releaseTime: new Date()
        }
    },
    computed: {
    },
    created(){
        const _this = this
        if(this.$route.fullPath.indexOf('/edit?') > -1){
            const platform = this.$route.query.platform
            const version = this.$route.query.version
            axios.get('http://127.0.0.1:12345/api/web/edit',{
                params:{
                    platform: platform,
                    version: version
                }
            }).then(function(res){
                if(res.data.code != 0)return;
                _this.banner = res.data.data.banner
                _this.details = res.data.data.details.fileList
            }).catch(function(err){
                console.log(err)
            })
        }
    },
    methods: {
        //图片 格式效验
        beforUpload(file) {
            if (!/image\/\w+/.test(file.type)) {
                alert("别闹，一边去！")
                return false;
            }
        },
        //背景图 上传成功
        backgroundUpload(res,file){
            this.banner.background.pop()
            this.banner.background.push({name:res.name,src:res.src})
        },
        //背景图 删除
        remove(file, fileList) {
            this.banner.background.pop()
        },
        //详情图片 添加
        detailPicUpload(index){
            const _this = this
            return function(res,file){
                console.log(_this.details)
                _this.details[index].fileList.push({name:res.name,src:res.src})
            }
        },
        //详情图片 删除
        listRemove(index){
            const _this = this
            return function(file,fileList){
               _this.details[index].fileList.pop()
            }
        },
        //添加版本详情 一条内容
        addVersionDetail(){
            this.details.push({
                    title:'',
                    fileList:[],
                    id:(new Date()).getTime()
                })
        },
        //删除版本详情 一条内容
        removeVersionDetail(index){
            const _this = this
            return function(){
                _this.details.splice(index,1)
            }
        },
        //重置表单(非图片)
        resetForm(formName) {
            this.$refs['form'].resetFields()
        },
        //提交
        previewAddress(formName) {
            const _this = this
            this.$refs[formName].validate((valid) => {
                if(valid){
                    this.banner.ctime = this.releaseTime.getTime()

                    this.$store.commit('emptyDetail')

                    this.$store.commit('upBanner',this.banner)
                    const detail ={
                        address: this.banner.address,
                        ctime: this.banner.ctime,
                        fileList: this.details,
                        platform: this.banner.platform,
                        time: this.banner.time,
                        title: this.banner.subTitle,
                        version: this.banner.version
                    }

                    //function getUserAccount() {return axios.get('/user/12345');}
                    //function getUserPermissions() {return axios.get('/user/12345/permissions');}
                    //axios.all([getUserAccount(), getUserPermissions()]).then(axios.spread(function (acct, perms) {}));
                    axios.get('http://127.0.0.1:12345/api/web/detail/' + detail.platform + '/' + detail.version)
                        .then(function(res){
                            if(!res.data.detail){
                                _this.$store.commit('addLocalDetail',detail)
                            }
                            return axios.get('http://127.0.0.1:12345/api/web/version/'+ detail.platform)
                        }).then(function(res){
                            console.log(1,res)
                            _this.$store.commit('upDetails', res.data.details)

                            _this.$router.push({path:'/preview/platform/' + detail.platform})
                        }).catch(function(err){
                            console.log(err)
                        })
                }
            });


            //this.$store.commit('upBanner',this.banner)
            //
            //
            
            //this.$router.push('/preview/platform/windows')
            /*axios.post('http://127.0.0.1:12345/api/web/confirm',{
                banner:_this.banner,
                details: _this.details
            }).then(function(res){
                console.log(res)
            }).catch(function(err){
                console.log(err)
            })*/
        }
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