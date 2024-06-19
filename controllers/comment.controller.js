const CommentModel = require('../models/comment.model')

module.exports = {
    createComment: async (req, res) => {
        try {
            const bodyData = req.body           
            const newComment = await CommentModel.create(bodyData)

            res.redirect("/comments")
        } catch (error) {
            console.log(error.message)
        }
    },
    renderCreateCommentPage: async (req, res) => {
        res.render("create-comment.ejs", { layout: ""})
    },
}