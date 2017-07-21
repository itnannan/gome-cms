<template>
    <div class="main">
        <div class="header-box">
            <div class="header">
                <div class="fl clearfix">
                    <a class="fl title" href="javascript:;">国美互联网企业云</a>
                </div>
                <a href="javascript:;" class="fc">下载</a>
                <div class="fr">
                    <a class="fl login-btn" href="javascript:;">登录</a>
                    <a class="fl create-company-btn" href="javascript:;" >创建公司</a>
                </div>
            </div>
        </div>
        <div>
            <img :src="topPic" alt="" class="det-img">
        </div>
        <!-- 详情页盒子 -->
        <div class="det-content-box">
            <div class="det-content">
                <div class="det-title">
                    <div class="det-circle"></div>
                    <span>{{detail.title}}</span>
                    <p class="det-date">发布日期：{{detail.time}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布版本：{{detail.version}}</p>
                </div>
                <div class="det-actual" v-for="sDetail in detail.lists">
                    <span>{{sDetail.title}}</span>
                    <img v-for="src in sDetail.fileList" :src='src.src' alt="">
                </div>
            </div>
        </div>

        <div class="buttons">
            <el-button type="primary" @click='confirm'>确定</el-button>
            <el-button type="primary" @click='edit(detail.platform, detail.version)'>编辑</el-button>
            <el-button type="primary" @click='backToList(detail.platform)'>返回列表</el-button>
            <el-button type="primary" @click='backToDown(detail.platform)'>返回下载页</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            detail:{

            }
        }
    },
    computed:{
        topPic(){
            return (this.detail.platform?'http://127.0.0.1:12345/css/img/download/' + this.detail.platform + '-header.png':'')
        }
    },
    created(){
        const platform = this.$route.query.platform
        const version = this.$route.query.version
        //console.log(platform, version)
        if(version == this.$store.state.banner.version){
            this.detail = this.$store.state.details
        }else{
            axios.get('http://127.0.0.1:12345/api/web/detail/' + platform + '/' + version)
                .then((res) => {
                    console.log(res)
                    this.detail = res.data.detail
                }).catch((err) => {
                    console.log(err)
                }) 
        }
    },
    methods:{
        confirm(){
            const _this = this
            axios.post('http://127.0.0.1:12345/api/web/confirm',{
                    details: _this.$store.state.details,
                    banner: _this.$store.state.banner
                }).then((res) => {
                    console.log(res)
                    alert('保存成功')
                    
                    this.$router.push('/')
                })
                .catch((err) => { 
                    console.log(err)
                })
        },
        edit(platform,version){
            this.$router.push({path:'/edit',query:{platform:platform,version: version}})
        },
        backToDown(platform){
            this.$router.push({path:'/preview/platform/' + platform})
        },
        backToList(platform){
            this.$router.push({path:'/preview/list/' + platform})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.buttons{
        text-align:center;
        margin-bottom:60px;
    }
.main {
  width: 100%;
  height: 100%;
  min-width: 1007px;
  min-height: 900px;
  margin: 0;
  padding: 0;
  position: relative;
  background-color: #F6F7FB;;
  -moz-background-size:cover;
  -webkit-background-size:cover;
  -o-background-size:cover;
  background-size: cover;
}
/* 头部样式*/
.fl{
  float: left;
}
.fr{
  float: right;
}
.fc{
  float: left;
  width: 72px;
  height: 70px;
  display: block;
  line-height: 70px;
  text-align: center;
  font-family: "Helvetica Neue", Helvetica, Arial,"PingFang SC", "Microsoft Yahei", "Hiragino Sans GB", "\5b8b\4f53", sans-serif;

  font-size: 16px;
  color: #666666;
}
.fc:hover{
  background:rgba(74,131,249,0.06);
}
.header-box{
  width:100%;
  height: 70px;
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.1);
  background: #ffffff;
}
.header{
  min-width: 1007px;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
}
.header>div{
  height: 100%;
}
.header .title{
  height: 100%;
  line-height: 70px;
  font-size: 20px;
  padding-left:62px;
  padding-right: 50px;
  color: #4B84F9 ;
  background: url(./css/img/download/logo.png) no-repeat 10px center;
  background-size:42px 48px;
}
/* 头部右侧样式*/
.header .login-btn,.header .create-company-btn{
  color:#666666;
  height: 50px;
  line-height: 50px;
  padding:10px;
  font-size: 16px;
}

/*图片样式*/
.det-img{
  display: block;
  width: 100%;
  height: 200px;
}
/*详情页标题样式设置*/
.det-content-box{
  position: relative;
  background-color: #fff;
}
.det-content{
  margin: 0 auto;
  padding-top:60px;
  padding-bottom: 120px;
  width:1000px;
  height: 100%;
}
.det-title{
  margin: 0 auto;
}
.det-title span{
  font-family: "Helvetica Neue", Helvetica, Arial,"PingFang SC", "Microsoft Yahei", "Hiragino Sans GB", "\5b8b\4f53", sans-serif;
  font-size: 22px;
  color: #333333;
}
.det-circle{
  float: left;
  width: 12px;
  height: 12px;
  border: 3px solid #4B84F9;
  border-radius:50%;
  margin:7px 23px 0 0;
}
.det-date{
  font-family: "Helvetica Neue", Helvetica, Arial,"PingFang SC", "Microsoft Yahei", "Hiragino Sans GB", "\5b8b\4f53", sans-serif;

  font-size: 12px;
  color: #999999;
  margin:20px 0 40px 41px;
}
.det-update{
  font-family: "Helvetica Neue", Helvetica, Arial,"PingFang SC", "Microsoft Yahei", "Hiragino Sans GB", "\5b8b\4f53", sans-serif;

  font-size: 14px;
  color: #666666;
  margin-left: 41px;
}

/*详情页标题图片更新样式*/
.det-actual{
  margin-top: 70px;
  padding-left:41px;
}
.det-actual span{
  font-family: "Helvetica Neue", Helvetica, Arial,"PingFang SC", "Microsoft Yahei", "Hiragino Sans GB", "\5b8b\4f53", sans-serif;

  font-size: 18px;
  color: #333333;
}
.det-actual img{
  max-height:700px;
  max-width: 960px;
  margin-top: 40px;
  display: block;
  box-shadow: 0px 1px 2px 0px #ccc;
}

</style>
