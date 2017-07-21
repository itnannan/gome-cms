const express = require('express')
const fs = require('fs')
const util = require('util')
const stream = require('stream')
const path = require('path')
const _ = require('underscore')
const moment = require('moment')
const mongoose = require('mongoose')
const Banner = require('./db/model/banner')
const Detail = require('./db/model/detail')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const picPath = 'target/'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, picPath)
    }
})

const upload = multer({storage: storage})

const port = 12345

mongoose.connect('mongodb://127.0.0.1/webMain')

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

app.listen(port)
app.use("/target",express.static(path.join(__dirname,'target')))
app.use(express.static(path.join(__dirname,'src/components/web/')))

app.use(bodyParser.json({limit:5000000}))
app.use(bodyParser.urlencoded({ extended: true ,limit:5000000}))

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

//图片上传
app.post('/api/web/pic', upload.single('pic'), function(req,res){
    console.log(req.file)
    const mimetype = req.file.mimetype.split('/')[1]
    const filename = req.file.filename 
    const destination = req.file.destination

    const oldpath = path.join(__dirname,destination,filename)
    const newpath = destination + filename + '.' + mimetype
    //改名
    fs.renameSync(oldpath, path.join(__dirname,newpath))
    
    res.send({msg:'ok',code:0, src:'http://127.0.0.1:12345/' + newpath,name:req.file.originalname})
})

//确定生成页面
app.post('/api/web/confirm',function(req,res,next){
    console.log(req.body)

    if(!req.body.details || !req.body.details.platform || !req.body.details.lists[0].title){
        return res.send({msg:"跟新详情至少一条",code:1})
    }
    const platform = req.body.banner.platform
    if(!platform){
        return res.send({msg:"没有选择平台",code:1})
    }

    //效验 参数是否为
    const bannerValues = _.values(req.body.banner)
    for(let i=0; i<bannerValues.length; i++){
        if(!bannerValues[i] && bannerValues[i] != 0){
            return res.send({msg:"有参数为空",code:1});
        }
    }

    //效验 发布时间
    const ctime = req.body.banner.ctime
    let time;
    if(/^\d+$/.test(ctime)){
        time = moment(ctime).format('YYYY-MM-DD')
    }else{
        return res.send({msg:"发布日期填写错误",code:1})
    }

    //去除版本号  前后空格
    req.body.banner.version = req.body.banner.version.replace(/^\s+|\s+$/g,'')

    //banner背景图 
    if(req.body.banner.background.length == 0){
        Banner.sortByTime(platform,function(err,banners){
            console.log(banners)
            if(!banners.length || !banners[0].background.length){
                return res.send({msg:"请选择背景图片",code:1})
            }
            req.body.banner.background = banners[0].background

            _.extend(req.body.banner,{time:time})
            next()
        })
    }else{
        _.extend(req.body.banner,{time:time})
        next()
    }
},function(req,res,next){
    Detail.findOne({platform:req.body.banner.platform, version:req.body.banner.version},function(err,detail){
        if(detail){
            Detail.update({platform:req.body.banner.platform, version:req.body.banner.version},{
                    platform: req.body.banner.platform,
                    lists: req.body.details.lists,
                    title: req.body.banner.subTitle,
                    version: req.body.banner.version,
                    address: req.body.banner.address,
                    ctime: req.body.banner.ctime,
                    time: req.body.banner.time
                },function(err,num,raw){
                    if(err){
                        return console.log(err)
                    }
                    console.log('update')
                    next()
                })
        }else{
            new Detail({
                platform: req.body.banner.platform,
                lists: req.body.details.lists,
                title: req.body.banner.subTitle,
                version: req.body.banner.version,
                address: req.body.banner.address,
                ctime: req.body.banner.ctime,
                time:req.body.banner.time
            }).save(function(err,detail){
                if(err){
                    return console.log(err)
                }
                console.log('save')
                next()
            })
        }
    })
},function(req,res,next){
    Banner.findOne({platform:req.body.banner.platform, version:req.body.banner.version},function(err,banner){
        if(err){
            return console.log(err)
        }
        if(banner){
            Banner.update({platform:req.body.banner.platform, version:req.body.banner.version},{
                platform: req.body.banner.platform,
                title: req.body.banner.title,
                subTitle: req.body.banner.subTitle,
                summary: req.body.banner.summary,
                version: req.body.banner.version,
                ctime: req.body.banner.ctime,
                size: req.body.banner.size,
                system: req.body.banner.system,
                address: req.body.banner.address,
                time: req.body.banner.time,
                background: req.body.banner.background
            },function(err,num,raw){
                if(err){
                    return console.log(err)
                }
                next()
            })
        }else{
            new Banner({
                platform: req.body.banner.platform,
                title: req.body.banner.title,
                subTitle: req.body.banner.subTitle,
                summary: req.body.banner.summary,
                version: req.body.banner.version,
                ctime: req.body.banner.ctime,
                size: req.body.banner.size,
                system: req.body.banner.system,
                address: req.body.banner.address,
                time: req.body.banner.time,
                background: req.body.banner.background
            }).save(function(err,banner){
                    if(err){
                        console.log(err)
                    }
                    console.log(banner)
                    next()
                })
        }
    })
},function(req,res){
    res.send({msg:'ok',code:0})
})

//列表
app.get('/api/web/version/:platform',function(req,res){
    const platform = req.params.platform

    Detail.findByPlatform(platform,function(err,details){
        if(err){
            return console.log(err)
        }
        //console.log(details)
        res.send({msg:'ok',code:0,details:details})
    })
})

//版本详情
app.get('/api/web/detail/:platform/:version',function(req,res){
    const platform = req.params.platform
    const version = req.params.version

    Detail.findOne({platform:platform, version: req.params.version},function(err, detail){
        if(err){
            return console.log(err)
        }

        if(detail){
            res.send({msg:"ok",code:0,detail:detail})
        }else{
            res.send({msg:'no data', code :1})
        }
    })
})

//编辑
app.get('/api/web/edit',function(req,res){
    const platform = req.query.platform
    const version = req.query.version
    Banner.findOne({platform:platform, version:version}).exec(function(err,banner){
        if(err){
            return console.log(err)
        }
        if(!banner){
            return res.send({msg:'没有此版本',code:1})
        }
        Detail.findOne({platform:platform, version:version}).exec(function(err,detail){
            if(err){
                return console.log(err)
            }
            if(!detail){
                return res.send({msg:'没有此版本',code:1})
            }
            console.log(detail)
            res.send({msg:'ok',code:0,data:{banner:banner,details:detail}})
        })
    })
})

//删除
app.get('/api/web/delete',function(req,res){
    const platform = req.query.platform
    const version = req.query.version
    Banner.findOne({platform:platform, version:version}).exec(function(err,banner){
        if(err){
            return console.log(err)
        }
        Detail.findOne({platform:platform, version:version}).exec(function(err,detail){
            if(err){
                return console.log(err)
            }
            res.send({msg:'ok',code:0,data:{banner:banner,details:detail}})
        })
    })
})

//获取获取最新banner
app.get('/api/web/banner/:platform',function(req,res){
    const platform = req.params.platform

     Banner.find({platform:platform}).sort({ctime:'-1'}).exec(function(err,banners){
        if(err){
            return console.log(err)
        }
        if(banners.length){
            console.log(banners)
            res.send({msg:'ok',code:0,data:banners[0]})
        }else{
            res.send({msg:'没有此版本',code:1})
        }
    })
})