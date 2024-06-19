const mongoose = require('mongoose')
const commentSchema = require('./comment.model')

const watchesSchema = mongoose.Schema({
    watchName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    automatic: {
        type: Boolean,
        default: false,
    },
    watchDescription: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brands",
        require: true,
    }
}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model("watch", watchesSchema)