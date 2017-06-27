<template>
  <div class="sform">
    <el-form :label-position="labelPosition" ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="平台" prop="platform">
        <el-radio-group v-model="form.platform" >
          <el-radio-button label="windows">windows</el-radio-button>
          <el-radio-button label="moc">moc</el-radio-button>
          <el-radio-button label="android">android</el-radio-button>
          <el-radio-button label="ios">ios</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="大标题" prop="title">
        <el-input v-model="form.title"></el-input>
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
      <el-form-item label="背景图" prop="fileList">
        <el-upload
          ref="upload"
         class="upload-demo"
         action="http://127.0.0.1:12345/upload/main"
         :on-preview="handlePreview"
         :on-remove="handleRemove"
         :file-list="form.fileList" 
         :before-upload="beforUpload"
         label="背景图" >
         <div slot="tip" class="el-upload__tip">封面背景图,只能上传jpg/png文件，且不超过500kb</div>
         <el-button size="small" type="primary" class="upload-button">点击上传</el-button>
         </el-upload>
      </el-form-item>
      
      <!-- <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item> -->
      <!-- <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <!-- <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <!-- <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item> -->
      <el-form-item class='button'>
        <el-button @click='previewAddress("form")'>提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import axios from 'axios'
import router from '@/router/index'
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
          address: '',
          fileList:[]
        },
        rules: {
          platform: [
            { required: true}
          ],
          title: [
            { required: true, message: '请输入大标题', trigger: 'blur' }
          ],
          summary: [
            { required: true, message: '请输入版本描述', trigger: 'blur' }
          ],
          size: [
            {required: true, message: '请输入文件大小', trigger: 'blur' }
          ],
          version: [
            { required: true, message: "请输入版本号", trigger: 'blur' }
          ],
          system: [
            { required: true, message: '请输入适用系统', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请填写时间', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请填写下载地址', trigger: 'blur' }
          ],
          fileList:[
            { required: true, message: '请选择背景图片' }
          ]
        },
        labelPosition: 'right'
      }
    },
    computed:{},
    methods: {
      onSubmit(formName) {
        this.upload(formName)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        //console.log(file)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      beforUpload(file){ 
        //const _this = this
        if(!/image\/\w+/.test(file.type)){  
            alert("别闹，一边去！")
            return false;  
        }
        //this.fileList.splice(0,1)
        const reader = new FileReader()
        reader.onload = (ev)=>{
          const result = ev.target.result
          //console.log(result)
          this.form.fileList.push({name:file.name,result:result})
          //console.log(this.form.fileList)
        }
        /*reader.onload = function(ev){
          console.log("reader inside",this)
          console.log('base64',ev.target.result)
        } */ 
        reader.onerror = function(){
          alert('出错了，再传一次，快！')
        }
        reader.readAsDataURL(file)
        return false;
      },
      preview(formName){
        this.upload(forName)
      },
      previewAddress(formName){
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('http://127.0.0.1:12345/upload/main',{
              form: _this.form
            }).then(function(res){
              //console.log("res",res)
              router.push('/preview/'+_this.form.platform)
            }).catch(function(err){
              console.log("err",err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      }
    }
  }
</script>
<style scoped>
  .sform{
    width:100%;
  }
  .upload-demo{
    margin-bottom: 20px;
  }
  /* .el-upload__tip{
    float:right;
  } */
</style>