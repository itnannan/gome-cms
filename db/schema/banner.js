const mongoose = require('mongoose')

const BannerSchema = new mongoose.Schema({
	platform: String,
    title: String,
    subTitle: String,
    summary: String,
    version: String,
    ctime: Number,
    size: String,
    system: String,
    address: String,
    time: String,
    background: Array
})

BannerSchema.statics = {
    sortByTime: function(platform,cb){
        return this.find({platform:platform})
            .sort({time:'-1'})
            .exec(cb)
    }
}

module.exports = BannerSchema