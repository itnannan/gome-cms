const mongoose = require('mongoose')

const BennerPreviewSchema = new mongoose.Schema({
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

BennerPreviewSchema.statics = {
	findByPlatform : function(platform,cb){
		return this.findOne({platform:platform}).exec(cb)
	}
}

module.exports = BennerPreviewSchema