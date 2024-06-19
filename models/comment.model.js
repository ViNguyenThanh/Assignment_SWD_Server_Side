const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 3, 
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "members",
        required: true,
    }
})

module.exports = mongoose.model("comment", commentSchema)