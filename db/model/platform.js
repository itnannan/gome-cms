const mongoose = require('mongoose')
const PlatformSchema = require('../schema/platform')

const PlatformModel = mongoose.model('platform',PlatformSchema)

module.exports = PlatformModel