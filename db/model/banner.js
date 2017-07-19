const mongoose = require('mongoose')
const BannerSchema = require('../schema/banner')

const bannerModel = mongoose.model('banner',BannerSchema)

module.exports = bannerModel