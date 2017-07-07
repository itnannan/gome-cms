const PlatformModel = require('../db/model/platform')
const bannerPreviewModel = require('../db/model/bannerPreview')
const banner = require('../generate/web/banner/banner')
const stream = require('stream')
const Readable = stream.Readable
const Writable = stream.Writable
const fs = require('fs')
const util = require('util')
const path = require('path')

function Transform (str){
    stream.Transform.call(this)
    this.str = str
}
util.inherits(Transform, stream.Transform)

Transform.prototype._transform  = function(chunk,encoding,cb){
    //this.push(chunk)
    console.log('transform in')
    cb()
}
Transform.prototype._flush  = function(cb){
    this.push(this.str)
    console.log('has push')
    cb()
}

module.exports = {
	//四个平台banner，数据库信息
	bannerInfo: function(req,res,next){
		const platform = req.parmas.platform 

		PlatformModel.findOne({platform:platform},function(err,banner){
			if(err){
				console.log(err)
				res.send({msg:'db err',code:5})
			}else{
				if(banner){
					console.log(banner)
					res.send({msg:'ok',code:0,data:banner})
				}else{
					res.send({msg:'no data',code:1})
				}
			}
			//next()
		})
	},
	//提交banner信息（预览接口）
	preview: function(req,res,next){
		const banner = req.body.banner

		bannerPreviewModel.findOne({platform:banner.platform},function(err,DBbanner){
			if(err){
				console.log(err)
				res.send({msg:'db err',code: 5})
			}else{
				if(DBbanner){
					bannerPreviewModel.update({plarform:banner.platform},banner,function(err,DBbanner){
						if(err){
							console.log(err)
							res.send({msg:'db err',code: 5})
						}else{
							res.send({msg:'ok',code: 0, data:DBbanner})
						}
					})
				}else{
					new bannerPreviewModel(banner).save(function(err,DBbanner){
						if(err){
							console.log(err)
							res.send({msg:'db err',code: 5})
						}else{
							res.send({msg:'ok',code: 0, data:DBbanner})
						}
					})
				}
			}
		})
	},
	//确定生成页面
	confirm: function(req,res,next){
		const platform = req.body.platform
		console.log(platform)
		const data = {
			windows:{
				platform:'windows', 
				versionList:[
				    {version:'v1.1.1',title:'我是长title',time:'2017-3-30'}
				], 
				title: '我是一个大标题',
				summary: '我是一个简介',
				size:'12.3M',
				version:'V1.1.1' ,
				system:'Win7及以上',
				address:'https://work.gomeplus.com......',
				date:'2017-3-30'
			},
			ios:{
				platform:'ios', 
				versionList:[
				    {version:'v1.1.1',title:'我是长title',time:'2017-3-30'}
				], 
				title: '我是一个大标题',
				summary: '我是一个简介',
				size:'12.3M',
				version:'V1.1.1' ,
				system:'Win7及以上',
				address:'https://work.gomeplus.com......',
				date:'2017-3-30'
			},
			android:{
				platform:'android', 
				versionList:[
				    {version:'v1.1.1',title:'我是长title',time:'2017-3-30'}
				], 
				title: '我是一个大标题',
				summary: '我是一个简介',
				size:'12.3M',
				version:'V1.1.1' ,
				system:'Win7及以上',
				address:'https://work.gomeplus.com......',
				date:'2017-3-30'
			},
			mac:{
				platform:'mac', 
				versionList:[
				    {version:'v1.1.1',title:'我是长title',time:'2017-3-30'}
				], 
				title: '我是一个大标题',
				summary: '我是一个简介',
				size:'12.3M',
				version:'V1.1.1' ,
				system:'Win7及以上',
				address:'https://work.gomeplus.com......',
				date:'2017-3-30'
			}
		}

		const html = banner(data)
		console.log(html)
		//图片生成
		/*fs.writeFile(path.join(__dirname, 'target/css/img/download/',platform+'-banner.png'),platform.fileList[0].result,function(err){
			if(err){
				return console.log(err)
				//res.send({msg:'write file err', code: 4})
			}
		})*/
		//html生成
		const readStream =  new Readable();
        //const write = 
        //const write = new Writable(path.join(__dirname,'../target/main/main.html'))
        //readStream.pipe(new Transform(html)).pipe(write)
       /* readStream.pipe(new Transform(html)).pipe(write).on('pipe',function(){
        	console.log('1')
        }).on('close',function(){
        	console.log('close')
            res.send({msg:'ok'})
        })*/
        (new Transform(html)).pipe(fs.createWriteStream(path.join(__dirname,'../target/main/main.html'))).on('close',function(){
        	console.log('close')
        	res.send({msg:'ok'})
        })

        fs.writeFile(path.join(__dirname,'../target/main/main.html'), html, function(){
        	console.log('close')
        	res.send({msg:'ok'})
        });
	}
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
}