<template>
	<div>
		<div class="header-box">
			<div class="header">
				<div class="fl clearfix">
					<a class="fl title" href="/pages/main/main.html">国美互联网企业云</a>
					<a href="/pages/main/main.html" class="fl header-btn active">下载</a>
				</div>
				<div class="fr">
					<a class="fl login-btn" href="/login.html">登录</a>
					<a class="fl create-company-btn" href="/pages/createCompany/createCompany.html" >创建公司</a>
				</div>
			</div>
		</div>
		<div class="nav" id="nav">
			<span class="window-btn" :class="[isActive==0?active:'']">Windows</span>
			<span class="mac-btn" :class="[isActive==1?active:'']">Mac</span>
			<span class="android-btn" :class="[isActive==2?active:'']">Android</span>
			<span class="ios-btn" :class="[isActive==3?active:'']">iOS</span>
		</div>
		<div class="content-box" id="contentBox">
			<div :class="platformClass" :style="background">
				<div class="download">
					<p class="title">{{windows.title}}</p>
					<p class="slogan">{{windows.summary}}</p>
					<p class="size-version"><span class="size">大小：{{windows.size}}</span><span class="version">版本：{{windows.version}}</span></p>
					<p class="system-time"><span class="system">适应系统：{{windows.system}}</span><span class="time">发布日期： {{windows.date}}</span></p>
					<a :href="windows.address" class="download-btn"><span>Windows版</span></a>
				</div>
				<div class="version-list">
					<p class="title">更新日志</p>
					<ul>
						<li><a href="../detail/windows-v1.1.1.html">美办1.1.1 for Windows 优化版本更新机制；支持消息复制，删除，撤回等操作<span class="time">待定</span></a></li>
						<li><a href="../detail/windows-v1.1.0.html">美办1.1.0 for Windows 优化群聊人员管理，优化消息提醒<span class="time">2017-5-12</span></a></li>
						<li><a href="../detail/windows-v1.0.1.html">美办1.0.1 for Windows 新增文件传输，搜索功能实现<span class="time">2017-3-30</span></a></li>
						<li><a href="../detail/windows-v1.0.0.html">美办1.0.0 for Windows 企业通讯录展示，支持单聊群聊<span class="time">2017-3-9</span></a></li>
					</ul>
					<a class="more" href="../versionList/versionList.html#Windows">查看更多>></a>
				</div>
			</div>
			<!-- <div class="mac-content hide">
				<div class="download">
					<p class="title">美办1.0.1 for Mac</p>
					<p class="slogan">优化版本更新机制；支持消息复制，删除，撤回等操作</p>
					<p class="size-version"><span class="size">大小：待定</span><span class="version">版本： V1.0.1</span></p>
					<p class="system-time"><span class="system">适应系统：OS X10.8及以上</span><span class="time">发布日期： 待定</span></p>
					<a href="https://download.meixincdn.com/mxoffice/gomeplus/pc/mac/meiban.dmg" class="download-btn"><span>Mac版</span></a>
				</div>
				<div class="version-list">
					<p class="title">更新日志</p>
					<ul>
						<li><a href="../detail/mac-1.0.1.html">美办1.0.1 for Mac 优化版本更新机制；支持消息复制，删除，撤回等操作<span class="time">待定</span></a></li>
						<li><a href="../detail/mac-u.html">美办 for Mac 抢鲜版 全新上线<span class="time">2017-5-12</span></a></li>
					</ul>
					<a class="more" href="../versionList/versionList.html#Mac">查看更多>></a>
				</div>
			</div>
			<div class="android-content hide">
				<div class="download">
					<p class="title">美办1.1.4 for Android</p>
					<p class="slogan">公告，审批应用，全新上线</p>
					<p class="size-version"><span class="size">大小：38.4M</span><span class="version">版本：V1.1.4</span></p>
					<p class="system-time"><span class="system">适应系统：Android4.0及以上</span><span class="time">发布日期： 2017-6-28</span></p>
				</div>
				<div class="version-list">
					<p class="title">更新日志</p>
					<ul>
						<li><a href="../detail/android-v1.1.4.html">美办1.1.4 for Android 考勤，公告，审批应用，全新上线<span class="time">2017-6-28</span></a></li>
						<li><a href="../detail/android-v1.1.3.html">美办1.1.3 for Android 新增更换手机号码功能，方便安全<span class="time">2017-6-19</span></a></li>
						<li><a href="../detail/android-v1.1.2.html">美办1.1.2 for Android 优化语音播放模式，新增外部转发文件<span class="time">2017-4-28</span></a></li>
						<li><a href="../detail/android-v1.1.1.html">美办1.1.1 for Android 新增文件传输，新增音视频通讯<span class="time">2017-3-30</span></a></li>
						<li><a href="../detail/android-v1.1.0.html">美办1.1.0 for Android 新增群组聊天，方便沟通<span class="time">2017-1-19</span></a></li>
						<li><a href="../detail/android-v1.0.3.html">美办1.0.3 for Android 优化安全性能，保障用户信息安全<span class="time">2016-11-10</span></a></li>
						<li><a href="../detail/android-v1.0.2.html">美办1.0.2 for Android 移动端新增审批功能<span class="time">2016-10-26</span></a></li>
						<li><a href="../detail/android-v1.0.1.html">美办1.0.1 for Android 优化通讯录展示，优化员工管理<span class="time">2016-8-15</span></a></li>
					</ul>
					<a class="more" href="../versionList/versionList.html#Android">查看更多>></a>
				</div>
			</div>
			<div class="ios-content hide">
				<div class="download">
					<p class="title">美办1.1.4 iOS</p>
					<p class="slogan">公告，审批应用，全新上线</p>
					<p class="size-version"><span class="size">大小：22.2M</span><span class="version">版本：V1.1.4</span></p>
					<p class="system-time"><span class="system">适应系统：iOS8.0及以上</span><span class="time">发布日期：2017-6-28</span></p>
				</div>
				<div class="version-list">
					<p class="title">更新日志</p>
					<ul>
						<li><a href="../detail/ios-v1.1.4.html">美办1.1.4 for iOS 考勤，公告，审批应用，全新上线<span class="time">2017-6-28</span></a></li>
						<li><a href="../detail/ios-v1.1.3.html">美办1.1.3 for iOS 新增更换手机号码功能，方便安全<span class="time">2017-6-19</span></a></li>
						<li><a href="../detail/ios-v1.1.2.html">美办1.1.2 for iOS 优化语音播放模式，新增外部转发图片功能<span class="time">2017-4-28</span></a></li>
						<li><a href="../detail/ios-v1.1.1.html">美办1.1.1 for iOS 新增文件传输，新增音视频通讯<span class="time">2017-3-30</span></a></li>
						<li><a href="../detail/ios-v1.1.0.html">美办1.1.0 for iOS 新增群组聊天，方便沟通<span class="time">2017-1-19</span></a></li>
						<li><a href="../detail/ios-v1.0.3.html">美办1.0.3 for iOS 优化安全性能，保障用户信息安全<span class="time">2016-11-10</span></a></li>
						<li><a href="../detail/ios-v1.0.2.html">美办1.0.2 for iOS 移动端新增审批功能<span class="time">2016-10-26</span></a></li>
						<li><a href="../detail/ios-v1.0.1.html">美办1.0.1 for iOS 优化通讯录展示，优化员工管理<span class="time">2016-8-15</span></a></li>
					</ul>
					<a class="more" href="../versionList/versionList.html#Ios">查看更多>></a>
				</div>
			</div> -->
		</div>
		<div class="buttons">
			<el-button type="primary" @click='confirm'>确定</el-button>
			<el-button type="primary" @click='edit'>编辑</el-button>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import router from '@/router/index'
	import "./main.css"
	export default {
	    data() {
			return {
				windows:{
					title: '',
					summary: '',
					size: '',
					version: '',
					system: '',
					date: '',
					address: '',
					fileList:[{}]
				},
				mac:{
					title: '',
					summary: '',
					size: '',
					version: '',
					system: '',
					date: '',
					address: '',
					fileList:[{}]
				},
				android:{
					title: '',
					summary: '',
					size: '',
					version: '',
					system: '',
					date: '',
					address: '',
					fileList:[{}]
				},
				ios:{
					title: '',
					summary: '',
					size: '',
					version: '',
					system: '',
					date: '',
					address: '',
					fileList:[{}]
				},
				active:'active'
			};
	    },
	    created(){
	    	this.getDate()
	    },
	    computed:{
	    	background:function(){
	    		//const platform = this.$route.params.id;
	    		const platform = 'windows';
	    		const img = this[platform].fileList[0]?this[platform].fileList[0].result:""
	    		return img?'background-image:url('+img+')':''
	    	},
	    	platformClass:function(){
				const platform = this.$route.params.id;

				return platform+'-content show';
	    	},
	    	isActive:function(){
	    		const platform = this.$route.params.id;
	    		if(platform == 'windows'){
	    			return 0;
	    		}else if(platform == 'mac'){
	    			return 1;
	    		}else if(platform == 'android'){
					return 2;
	    		}else if(platform == 'ios'){
	    			return 3;
	    		}else{
	    			return 0;
	    		}
	    	}
	    },
	    methods: {
	    	getDate() {
		    	const platform = this.$route.params.id;
		    	//console.log(this.windows)
		    	const _this = this;
		    	console.log(platform)
				axios.post('http://127.0.0.1:12345/api/platform/'+platform)
					.then(function(res){
						console.log('res',res)
						if(res.data.code == 1){

						}else{
							_this['windows'] = res.data
						}
					})
					.catch(function(err){
						console.log(err);
					})
			},
			confirm(){
				axios.post('http://127.0.0.1:12345/api/confirm')
				.then(function(res){
					console.log(res)
					window.location.href = 'http://127.0.0.1:8080/'
				})
				.catch(function(err){
					console.log(err)
				})
			},
			edit(){
				axios.post('http://127.0.0.1:12345/api/edit')
				.then(function(res){
					window.location.href = 'http://127.0.0.1:8080/'
				})
				.catch(function(err){
					console.log(err)
				})
			}
	    }
	  }
</script>

<style scoped>
	.buttons{
		text-align:center;
		margin-bottom:60px;
	}
</style>