const MemberModel = require('../models/member.model')

module.exports = {
    getAccount: async (req, res) => {
        try {
            const response = await MemberModel.find({isAdmin: false})
            // console.log(response)
            return res.render("admin/account/get-account.ejs", {
                accounts: response, 
                errorMessage: "", 
                layout: "admin/masterDashboard.ejs"
            });
        } catch (error) {
            console.log(error.message)
        }
    }
}