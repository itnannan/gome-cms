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

//模板
const getDetailText = require('./generate/web/detail/detail')
const getListText = require('./generate/web/list/list')
const getMainText = require('./generate/web/banner/banner')

const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const picPath = 'target/img'
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
app.use(express.static(path.join(__dirname,'target')))
app.use(express.static(path.join(__dirname,'src/components/web/')))
app.use(express.static(path.join(__dirname,'dist/')))

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

//图片上传
app.post('/api/web/pic', upload.single('pic'), function(req,res){
    const mimetype = req.file.mimetype.split('/')[1]
    const filename = req.file.filename 
    const destination = req.file.destination

    const oldpath = path.join(__dirname,destination,filename)
    const newFileName = filename + '.' + mimetype
    //改名
    fs.renameSync(oldpath, path.join(__dirname,destination,newFileName))
    
    res.send({msg:'ok',code:0, src: '/img/' + newFileName ,name:req.file.originalname})
})

//确定生成页面
app.post('/api/web/confirm',function(req,res,next){

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
                    next()
                })
        }
    })
},function(req,res){
    const platform = req.body.banner.platform
    const version = req.body.banner.version
    //三个页面生成
    
    //1.详情页
    const detailPageText = getDetailText(req.body.details)
    fs.writeFile(path.join(__dirname,'target/detail/',platform + '-' + version +'.html'), detailPageText, function(err){
        if(err){
            console.log(err)
            //res.send({msg:err,code:1})
        }
    });

    //2.列表页
    const allDetails = {}
    Detail.findByPlatform('windows',function(err,details){
        if(err){
            return console.log(err)
        }
        allDetails.windows = details
        Detail.findByPlatform('ios',function(err,details){
            if(err){
                return console.log(err)
            }
            allDetails.ios = details
            Detail.findByPlatform('android',function(err,details){
                if(err){
                    return console.log(err)
                }
                allDetails.android = details
                Detail.findByPlatform('mac',function(err,details){
                    if(err){
                        return console.log(err)
                    }
                    allDetails.mac = details

                    const listPageText = getListText(allDetails)
                    fs.writeFile(path.join(__dirname,'target/versionList/versionList.html'), listPageText, function(err){
                        if(err){
                            console.log(err)
                        }
                    });
                })
            })
        })
    })

    //3 下载页
    const allBanners = {
        windows:{},
        ios:{},
        android:{},
        mac:{}
    }
    Banner.find({platform:'windows'}).sort({ctime:'-1'}).exec(function(err,banners){
        if(err){
            return console.log(err)
        }
        if(banners.length){
            allBanners.windows = banners[0]
        }
        Banner.find({platform:'android'}).sort({ctime:'-1'}).exec(function(err,banners){
            if(err){
                return console.log(err)
            }
            if(banners.length){
                allBanners.android = banners[0]
            }
            Banner.find({platform:'mac'}).sort({ctime:'-1'}).exec(function(err,banners){
                if(err){
                    return console.log(err)
                }
                if(banners.length){
                    allBanners.mac = banners[0]
                }
                Banner.find({platform:'ios'}).sort({ctime:'-1'}).exec(function(err,banners){
                    if(err){
                        return console.log(err)
                    }
                    if(banners.length){
                        allBanners.ios = banners[0]
                    }
                    const mainPageText = getMainText(allBanners,allDetails)
                    fs.writeFile(path.join(__dirname,'target/main/main.html'), mainPageText, function(err){
                        if(err){
                            console.log(err)
                        }

                        res.send({msg:'ok',code:0})
                    });
                })
            })
        })
    })
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
    Banner.remove({platform:platform, version:version}).exec(function(err){
        if(err){
            return console.log(err)
        }
        Detail.remove({platform:platform, version:version}).exec(function(err){
            if(err){
                return console.log(err)
            }
            res.send({msg:'ok',code:0})
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