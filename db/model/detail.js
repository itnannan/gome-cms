const mongoose = require('mongoose')
const DetailSchema = require('../schema/detail')

const DetailModel = mongoose.model('detail',DetailSchema)

module.exports = DetailModel