const mongoose = require('mongoose')

const PlatformSchema = new mongoose.Schema({
	platform: String,
    title: String,
    summary: String,
    version: String,
    date: String,
    size: String,
    system: String,
    address: String,
    onlineTime: Number
})

PlatformSchema.statics = {
	findByPlatform : function(platform,cb){
		return this.findOne({platform:platform}).exec(cb)
	}
}

/*PlatformSchema.post('save', function (doc) {
	const arr = doc.date.plite('-')
	if(arr.length == 3){
		doc.onlineTime = new Date(arr[0],arr[1]-1,arr[2]).getTime()
		if(isNaN(doc.onlineTime)){
			doc.date = '填写格式不正确'
		}
	}else{
		doc.onlineTime = new Date(3000,1,1).getTime()
	}
})*/

module.exports = PlatformSchema