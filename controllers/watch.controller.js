const WatchModel = require('../models/watch.model')

module.exports = {
    createWatch: async (req, res) => {
        try {
            const bodyData = req.body
            if(bodyData.watchName == ""){
                return res.render('admin/brand/create-watch.ejs', {errorMessage: "Cannot be left blank",  layout: "admin/masterDashboard.ejs"})
            }

            const isWatchNameExited = await WatchModel.findOne({watchName: bodyData.watchName})
            if (isWatchNameExited) {
                return res.render('admin/watch/create-watch.ejs', {errorMessage: "Must not be the same as an existing name",  layout: "admin/masterDashboard.ejs"})
            }
            
            const newWatch = await WatchModel.create(bodyData)

            // return res.render ("admin/watch/create-watch.ejs", {errorMessage: "Create successfully", layout: "admin/masterDashboard.ejs"})
            res.redirect("/watches")
        } catch (error) {
            console.log(error.message)
        }
    },
    renderCreateWatchPage: async (req, res) => {
        res.render("admin/watch/create-watch.ejs", { errorMessage: "", layout: "admin/masterDashboard.ejs"})
    },
}