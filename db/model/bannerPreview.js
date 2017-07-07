const mongoose = require('mongoose')
const BannerPreviewSchema = require('../schema/bannerPreview')

const bannerPreviewModel = mongoose.model('bannerPreview',BannerPreviewSchema)

module.exports = bannerPreviewModel