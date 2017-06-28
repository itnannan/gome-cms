const express = require('express')
const fs = require('fs')
const util = require('util')
const stream = require('stream')
const path = require('path')
const mongoose = require('mongoose')
const PlatformModel = require('./db/model/platform')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const Vue = require('vue')
const {createRenderer} = require('vue-server-renderer')
const windows = require('./generate/web/main/test.js').windows

const port = 12345

mongoose.connect('mongodb://127.0.0.1/webMain')

app.listen(port)
app.use(express.static(path.join(__dirname,'dist')))
app.use(bodyParser.json())

app.all('*',function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
    	res.sendStatus(200)
    }else{
    	next()
    }
})

//录入页首页
app.get('/',function(req,res){
	res.sendFile('index.html',{root:__dirname+'/dist/'})
})


//上传 下载首页 录入信息
app.post('/upload/main',function(req,res){
	console.log('upload in')
	console.log(req.body.form)
	app.locals.form = req.body.form
	res.send({msg:'ok',code:0,data:req.body.form})
})

//预览地址 首页
app.post('/api/platform/:id',function(req,res){
    if(app.locals.form){
	   res.send(app.locals.form)
    }else{
        res.send({msg:'数据库取数据',code:1})
    }
})


function Transform (str){
    stream.Transform.call(this)
    this.str = str
}
util.inherits(Transform, stream.Transform)

Transform.prototype._transform  = function(chunk,encoding,cb){
    //this.push(chunk.toString())
    //console.log('this is tranform',chunk.toString())
    this.push(chunk)
    cb()
}
Transform.prototype._flush  = function(cb){
    this.push(this.str)
    cb()
}
//确定生成页面
app.post('/api/confirm',function(req,res){
    console.log(' generate a page')
    const data = app.locals.form
    app.locals.form = ''
    const win = windows(data)
    console.log(win)
    
    delete data.fileList

    PlatformModel.findOne({platform:data.platform},function(err,plat){
        if(plat){
            PlatformModel.update({platform:'windows'},data,function(err,data){
                if(err){
                    console.log(err)
                }else{
                    console.log(data)
                    const file = fs.createReadStream(path.join(__dirname,'/generate/web/main/header.html'))
                    const write = fs.createWriteStream(path.join(__dirname,'/generate/dist/main/main.html'))
                    file.pipe(new Transform(win)).pipe(write)

                    write.on('close',function(){
                        res.send({msg:'ok'})
                    })
                }
            })
        }else{
            new PlatformModel(data).save(function(err,data){
                if(err){
                    console.log(err)
                }else{
                    const file = fs.createReadStream(path.join(__dirname,'/generate/web/main/header.html'))
                    const write = fs.createWriteStream(path.join(__dirname,'/generate/dist/main/main.html'))
                    file.pipe(new Transform(win)).pipe(write)

                    write.on('close',function(){
                        res.send({msg:'ok'})
                    })
                }
            })
        }
    })
})

//重新编辑
app.post('/api/edit',function(req,res){
    res.send({msg:'ok'})
})

