const mongoose = require('mongoose')

const DetailSchema = new mongoose.Schema({
	platform: String,
	lists: Array,
    title: String,  //每个版本的标题
    version: String,
    address: String,
    ctime: Number,
    time: String
})

DetailSchema.statics = {
	findByPlatform : function(platform,cb){
		return this.find({platform:platform}).sort({ctime:'-1'}).exec(cb)
	}
}

module.exports = DetailSchema