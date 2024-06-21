const MemberModel = require("../models/member.model")

const admin = async (req, res, next) => {
    try {
        const memberId = req.session.memberId
        // console.log(memberId)
        if (!memberId){
            return res.redirect("/auth/login")
        }
        const member = await MemberModel.findById(memberId)
        // console.log(member)
        if (!member || !member.isAdmin){
            // return res.send("You do not have access here")
            return res.redirect("/")
        }
        next()
    } catch (error) {
        return res.send("A system error occurred")
    }
}

module.exports = admin