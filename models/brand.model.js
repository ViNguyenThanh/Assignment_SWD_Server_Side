const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
    brandName: String,
}, {
    versionKey: false,
    timestamps: true, 
})

module.exports = mongoose.model("brand", brandSchema)