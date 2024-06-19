const express = require('express')
const router = express.Router()

const CommentController = require("../controllers/comment.controller")

router.get('/comments', CommentController.renderCreateCommentPage)

module.exports = router