const mongoose = require('mongoose')

const memberSchema = mongoose.Schema({
    memberName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },
    name: {
        type: String, 
        required: true,
    },
    yob: {
        type: Number,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model("member", memberSchema)