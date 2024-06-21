const BrandModel = require("../models/brand.model");
const WatchModel = require("../models/watch.model");


module.exports = {
    getWatch: async (req, res) => {
        try {
            const response = await WatchModel.find()
            // console.log(response)
            const brands = await BrandModel.find()
            return res.render("home.ejs", {
                watches: response, 
                brands: brands,
                errorMessage: "", 
                // layout: "master.ejs"
            });
        } catch (error) {
            console.log(error.message)
        }
    },
    getWatchDetail: async (req, res) => {
        const watchId = req.params.id
        const brands = await BrandModel.find()
        try {
            const response = await WatchModel.findOne({_id: watchId})
            res.render("detail-watch", {
                brands: brands,
                errorMessage: "", 
                watch: response, 
                // layout: "master.ejs"
            })
        } catch (error) {
            console.log(error.message)
        }
    }, 
}