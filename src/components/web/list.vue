<template>
<div class="main clearfix">
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
    <div class="ver-bottom clearfix">
     <div class="ver-bottom-box clearfix">
      <h3>美办更新日志</h3>
      <ul class="ver-ul" :class='{"selected":selected("ios")}'  id="Ios">
        <li class="first-li">
          <a href="javascript:;">
            iOS平台
            <span></span>
          </a>
        </li>
        <li class="ver-li" v-for="(detail,index) in ios" :class="[index==ios.length?'last-li':'']"><a href="javascript:;" @click="toDetail(detail.platform, detail.version)" class="ver-li-a">{{detail.title}}<span></span></a><p>发布日期：{{detail.time}}</p></li>
      </ul>
      <ul class="ver-ul"  :class='{"selected":selected("android")}' id="Android">
        <li class="ver-li first-li">
          <a href="javascript:;">
            Android平台
            <span></span>
          </a>
        </li>
        <li class="ver-li" v-for="(detail,index) in android" :class="[index==android.length?'last-li':'']"><a href="javascript:;" @click="toDetail(detail.platform, detail.version)" class="ver-li-a">{{detail.title}}<span></span></a><p>发布日期：{{detail.time}}</p></li>
      </ul>
      <ul class="ver-ul"  :class='{selected:selected("mac")}' id="Mac">
        <li class="ver-li first-li">
          <a href="javascript:;">
            Mac平台
            <span></span>
          </a>
        </li>
        <li class="ver-li" v-for="(detail,index) in mac" :class="[index==mac.length?'last-li':'']"><a href="javascript:;" @click="toDetail(detail.platform, detail.version)" class="ver-li-a">{{detail.title}}<span></span></a><p>发布日期：{{detail.time}}</p></li>
      </ul>
      <ul class="ver-ul"  :class='{selected:selected("windows")}' id="Windows">
        <li class="ver-li first-li">
          <a href="javascript:;">
            Windows平台
            <span></span>
          </a>
        </li>
        <li class="ver-li" v-for="(detail,index) in windows" :class="[(index+1)==windows.length?'last-li':'']"><a href="javascript:;" @click="toDetail(detail.platform, detail.version)" class="ver-li-a">{{detail.title}}<span></span></a><p>发布日期：{{detail.time}}</p></li>
      </ul>
    </div>
  </div>
    <div class="buttons">
        <el-button type="primary" @click='confirm'>确定</el-button>
        <el-button type="primary" @click='edit(detail.platform, detail.version)'>编辑</el-button>
        <el-button type="primary" @click='backToDown(platform)'>返回下载页</el-button>
    </div>
</div> 
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            windows:[],
            ios:[],
            mac:[],
            android:[]
        }
    },
    computed:{
        platform(){
            return this.$store.state.banner.platform
        }
    },
    created(){
        const _this = this
        function getDate(platform){
            axios.get('http://127.0.0.1:12345/api/web/version/' + platform)
                .then((res) => {
                    let details = res.data.details
                    if(platform == _this.$store.state.details.platform){
                        if(details.length){
                            details = details.map((item) => {
                                if(
                                    item.version == _this.$store.state.details.version
                                ){
                                    return _this.$store.state.details
                                }else{
                                    return item
                                }
                            })
                        }else{
                            details.push(_this.$store.state.details)
                        }
                    }
                    
                    _this[platform] = details

                    _this[platform] = _this[platform].sort((item1,item2) =>{
                        return (item2.ctime - item1.ctime)
                    })

                }).catch((err) => {
                    console.log(err)
                })
        }

        getDate('windows')
        getDate('android')
        getDate('mac')
        getDate('ios')
    },
    methods: {
      selected(platform){
         
            console.log(platform)
            if(platform == this.$route.params.platform){
              return true
            }else{
              return false
            }
         
        },
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
        delete(){

        },
        edit(platform,version){
            this.$router.push({path:'/edit',query:{platform:platform,version: version}})
        },
        backToDown(platform){
            this.$router.push({path:'/preview/platform/' + platform})
        },
        toDetail(platform, version){
            this.$router.push({path:'/preview/detail',query:{platform: platform, version:version} })
        }
    }
}
</script>

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
  background-color: #fff;
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

/*详情页盒子*/
.ver-bottom{
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #fff;
}

.ver-bottom-box{
  height: 100%;
  width:800px;
  margin: 0 auto;
  margin-top: 80px;
  background-color: white;
}
/*详情页标题*/
.ver-bottom-box h3{
  font-family: "Helvetica Neue", Helvetica, Arial,"PingFang SC", "Microsoft Yahei", "Hiragino Sans GB", "\5b8b\4f53", sans-serif;
  font-weight: normal;
  font-size: 24px;
  color: #333333;
  margin-left: -7px;
  margin-bottom: 50px;
}
/*详情列表*/
.ver-ul{
  margin-bottom: 90px;
}
/*详情li样式*/
 .ver-li{
  list-style:none;
  position: relative;
  border-left: 1px solid #E5E5E5;
  margin-left: 5px;
  height: 80px;
  max-width:790px;
}
/*发布日期的样式*/
.ver-li p{
  font-family: "Helvetica Neue", Helvetica, Arial,"PingFang SC", "Microsoft Yahei", "Hiragino Sans GB", "\5b8b\4f53", sans-serif;
  font-size: 12px;
  color: #999999;
  margin-left: 44px;
}
/*第一个li特殊样式*/
.first-li{
  height: 64px;
  list-style:none;
  position: relative;
  border-left: 1px solid #E5E5E5;
  margin-left: 5px;
  max-width:790px;
}
.first-li a{
  font-family: "Helvetica Neue", Helvetica, Arial,"PingFang SC", "Microsoft Yahei", "Hiragino Sans GB", "\5b8b\4f53", sans-serif;

  font-size: 18px;
  color: #333333;
  margin-top: -1px;
  line-height: 18px;
  display: block;
  padding-left: 44px;
}
/*最后一个li特殊样式*/
.last-li{
  border: none;
  height: 42px;
}
/*详情中a标签的样式*/
.ver-li-a{
  display: block;
  height: 26px;
  line-height: 18px;
  padding-left: 44px;
  font-family: "Helvetica Neue", Helvetica, Arial,"PingFang SC", "Microsoft Yahei", "Hiragino Sans GB", "\5b8b\4f53", sans-serif;

  font-size: 18px;
  color: #666666;
  width: 94%;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

/*圆圈公共样式*/
.ver-li-a span{
  position: absolute;
  left: -6px;
  top: 3px;
  width: 8px;
  height: 8px;
  border: 2px solid #cccccc;
  border-radius: 50%;
  background-color: #fff;
}
/*第一个li圆圈特殊样式*/
.first-li span{
  width: 16px;
  height: 16px;
  position: absolute;
  border-radius: 50%;
  top: 0px;
  left:-8px;
  border: none;
  background-color:#ccc;
}
/*最后一个li圆圈样式*/
.last-li .ver-li-a span{
  top: 0px;
}
/*每个Li的hover效果*/
 .ver-li-a:hover{
  color:#4B84F9;
}
.ver-li:hover span{
  border-color: #4B84F9;
}

  /*选中时 圆圈的颜色*/
.ver-ul.selected .first-li span{
    background-color: #4B84F9 !important;
 }
</style>
