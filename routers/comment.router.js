const express = require('express')
const router = express.Router()

const CommentController = require("../controllers/comment.controller");
const { verify } = require('../middlewares/verify');

// router.get("/detail/:id", CommentController.renderCreateCommentPage);
router.post("/create-comment/:id", verify, CommentController.createComment);

module.exports = router