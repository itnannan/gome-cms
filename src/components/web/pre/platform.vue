<template>
	<div>
		<div class="header-box">
			<div class="header">
				<div class="fl clearfix">
					<a class="fl title" href="javascript:;">国美互联网企业云</a>
					<a href="javascript:;" class="fl header-btn active">下载</a>
				</div>
				<div class="fr">
					<a class="fl login-btn" href="javascript:;">登录</a>
					<a class="fl create-company-btn" href="javascript:;" >创建公司</a>
				</div>
			</div>
		</div>
		<div class="nav" id="nav">
			<span class="window-btn" :class="[isActive=='windows'?active:'']" @click="changeActive('windows')">Windows</span>
			<span class="mac-btn" :class="[isActive=='mac'?active:'']" @click="changeActive('mac')">Mac</span>
			<span class="android-btn" :class="[isActive=='android'?active:'']" @click="changeActive('android')">Android</span>
			<span class="ios-btn" :class="[isActive=='ios'?active:'']" @click="changeActive('ios')">iOS</span>
		</div>
		<div class="content-box" id="contentBox">
			<div class="windows-content" :class="{show : isActive=='windows'?true:false}">
				<div class="download" >
					<p class="title">{{banner.windows.title}}</p>
					<p class="slogan">{{banner.windows.summary}}</p>
					<p class="size-version"><span class="size">大小：{{banner.windows.size}}</span><span class="version">版本：{{banner.windows.version}}</span></p>
					<p class="system-time"><span class="system">适应系统：{{banner.windows.system}}</span><span class="time">发布日期： {{banner.windows.time}}</span></p>
					<a :href="banner.windows.address" class="download-btn"><span>Windows版</span></a>
				</div>
				<div class="version-list">
					<p class="title">更新日志</p>
					<ul>
						<li v-for="item in details.windows"><a href="javascript:;" @click="toDetail('windows',banner.windows.version)">{{item.title}}<span class="time">{{item.time}}</span></a></li>
					</ul>
					<a class="more" href="../versionList/versionList.html#Windows">查看更多>></a>
				</div>
			</div>
			<div class="mac-content" :class="{show : isActive=='mac'?true:false}">
				<div class="download" >
					<p class="title">{{banner.mac.title}}</p>
					<p class="slogan">{{banner.mac.summary}}</p>
					<p class="size-version"><span class="size">大小：{{banner.mac.size}}</span><span class="version">版本：{{banner.mac.version}}</span></p>
					<p class="system-time"><span class="system">适应系统：{{banner.mac.system}}</span><span class="time">发布日期： {{banner.mac.time}}</span></p>
					<a :href="banner.mac.address" class="download-btn"><span>Mac版</span></a>
				</div>
				<div class="version-list">
					<p class="title">更新日志</p>
					<ul>
						<li v-for="item in details.mac"><a :href="'../detail/mac-' + item.version + '.html'">{{item.title}}<span class="time">{{item.time}}</span></a></li>
					</ul>
					<a class="more" href="../versionList/versionList.html#Mac">查看更多>></a>
				</div>
			</div>
			<div class="android-content"  :class="{show : isActive=='android'?true:false}">
				<div class="download" >
					<p class="title">{{banner.android.title}}</p>
					<p class="slogan">{{banner.android.summary}}</p>
					<p class="size-version"><span class="size">大小：{{banner.android.size}}</span><span class="version">版本：{{banner.android.version}}</span></p>
					<p class="system-time"><span class="system">适应系统：{{banner.android.system}}</span><span class="time">发布日期： {{banner.android.time}}</span></p>
				</div>
				<div class="version-list">
					<p class="title">更新日志</p>
					<ul>
						<li v-for="item in details.android"><a :href="'../detail/android-' + item.version + '.html'">{{item.title}}<span class="time">{{item.time}}</span></a></li>
					</ul>
					<a class="more" href="../versionList/versionList.html#Android">查看更多>></a>
				</div>
			</div>
			<div class="ios-content"  :class="{show : isActive=='ios'?true:false}">
				<div class="download" >
					<p class="title">{{banner.ios.title}}</p>
					<p class="slogan">{{banner.ios.summary}}</p>
					<p class="size-version"><span class="size">大小：{{banner.ios.size}}</span><span class="version">版本：{{banner.ios.version}}</span></p>
					<p class="system-time"><span class="system">适应系统：{{banner.ios.system}}</span><span class="time">发布日期： {{banner.ios.time}}</span></p>
				</div>
				<div class="version-list">
					<p class="title">更新日志</p>
					<ul>
						<li v-for="item in details.ios"><a :href="'../detail/ios-' + item.version + '.html'">{{item.title}}<span class="time">{{item.time}}</span></a></li>
					</ul>
					<a class="more" href="../versionList/versionList.html">查看更多>></a>
				</div>
			</div>
		</div>
		<div class="buttons">
			<el-button type="primary" @click='confirm'>确定</el-button>
			<el-button type="primary" @click='edit'>编辑</el-button>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import "./main.css"
	export default {
	    data() {
			return {
				banner:{
					windows:{},
					mac:{},
					ios:{},
					android:{}
				},
				details:{
					windows:[],
					mac:[],
					ios:[],
					android:[]
				},
				active:'active',
				isActive:'windows'
			};
	    },
	    created(){
	    	const activePlatform = this.$route.params.platform
	    	const _this = this
	    	this.banner[activePlatform] = _this.$store.state.banner
	    	if(_this.$store.state.details.version){
	    		this.details[activePlatform].push(_this.$store.state.details)
	    	}

	    	this.changeActive(activePlatform)
	    	//this.banner[platform] = this.$store.state.banner
	    	//this.banner[platform].details = this.$store.state.details

	    	function getDate(platform){
	    		axios.get('http://127.0.0.1:12345/api/web/version/' + platform)
	    			.then(function(res){
	    				//console.log('res',res)
	    				let details = res.data.details

	    				if(details && details.length){
	    					if(_this.details[platform].length){
	    						details = details.map(function(item){
	    							if(item.version == _this.details[platform][0].version){
	    								return _this.details[platform][0]
	    							}else{
	    								return item
	    							}
	    						})
	    					}
	    					_this.details[platform] = details
	    				}

						_this.details[platform] = _this.details[platform].sort((item1,item2) =>{
							return (item2.ctime - item1.ctime)
						})

	    			}).catch(function(err){
	    				console.log(err)
	    			})

	    		if(activePlatform == platform){
	    			return;
	    		}
	    		axios.get('http://127.0.0.1:12345/api/web/banner/' + platform)
	    			.then(function(res){
						if(res.data.data){
	    					_this.banner[platform] = res.data.data
	    				}
	    			}).catch(function(err){
	    				console.log(err)
	    			})

	    	}

	    	getDate('windows')
	    	getDate('android')
	    	getDate('mac')
	    	getDate('ios')
	    },
	    computed:{
	    	background:function(){
	    		const platform = this.$route.params.id;
	    		const img = this[platform].fileList[0]?this[platform].fileList[0].result:""
	    		return img?'background-image:url('+img+')':''
	    	}
	    },
	    methods: {
	    	//tab 按钮切换
	    	changeActive:function(platform){
	    		this.isActive = platform
	    	},
	    	//确定按钮
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
			//编辑按钮
			edit(){
				console.log(this.banner[this.isActive].version, this.isActive)
				this.$router.push({path:'/edit',query:{platform:this.isActive,version: this.banner[this.isActive].version}})
			},
			//跳转详情页
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
</style>