const WatchModel = require('../models/watch.model')
const BrandModel = require('../models/brand.model')

function isPositiveInteger(value) {
    // Kiểm tra xem giá trị có phải là số không âm
    return /^[1-9]\d*$/.test(value);
}

module.exports = {
    createWatch: async (req, res) => {
        const brands = await BrandModel.find()
        try {
            const bodyData = req.body
            if (bodyData.watchName == "") {
                return res.render('admin/watch/create-watch.ejs', { 
                    brands, 
                    watch: bodyData,
                    errorMessage: "Name cannot be left blank", 
                    layout: "admin/masterDashboard.ejs" 
                })
            }

            const isWatchNameExited = await WatchModel.findOne({ watchName: bodyData.watchName })
            if (isWatchNameExited) {
                return res.render('admin/watch/create-watch.ejs', {
                    brands,  
                    watch: bodyData,
                    errorMessage: "Must not be the same as an existing name", 
                    layout: "admin/masterDashboard.ejs" 
                })
            }

            if(bodyData.image == ""){
                return res.render('admin/watch/create-watch.ejs', {
                    brands, 
                    watch: bodyData,
                    errorMessage: "Image cannot be left blank", 
                    layout: "admin/masterDashboard.ejs" })
            }

            if(bodyData.price == ""){
                return res.render('admin/watch/create-watch.ejs', {
                    brands, 
                    watch: bodyData,
                    errorMessage: "Price cannot be left blank", 
                    layout: "admin/masterDashboard.ejs" 
                })
            }
            if (!isPositiveInteger(bodyData.price)) {
                return res.render('admin/watch/create-watch.ejs', {
                    brands, 
                    watch: bodyData,
                    errorMessage: "Price must be a positive integer", 
                    layout: "admin/masterDashboard.ejs" 
                });
            }

            if(bodyData.watchDescription == ""){
                return res.render('admin/watch/create-watch.ejs', {
                    brands, 
                    watch: bodyData,
                    errorMessage: "Description cannot be left blank", 
                    layout: "admin/masterDashboard.ejs" 
                })
            }
            
            await WatchModel.create(bodyData)

            // return res.render ("admin/watch/create-watch.ejs", {errorNameMessage: "Create successfully", layout: "admin/masterDashboard.ejs"})
            res.redirect("/watches")
        } catch (error) {
            console.log(error.message)
        }
    },
    renderCreateWatchPage: async (req, res) => {
        const bodyData = req.body
        try {
            const brands = await BrandModel.find()
            res.render("admin/watch/create-watch.ejs", { 
                brands, 
                watch: bodyData,
                errorMessage: "", 
                layout: "admin/masterDashboard.ejs" 
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    getWatch: async (req, res) => {
        try {
            const response = await WatchModel.find()
            // console.log(response)
            const brands = await BrandModel.find()
            return res.render("admin/watch/get-watch.ejs", {
                watches: response, 
                brands: brands,
                errorMessage: "", 
                layout: "admin/masterDashboard.ejs"
            });
        } catch (error) {
            console.log(error.message)
        }
    }, 
    deleteWatch: async (req, res) => {
        const watchId = req.params.id // trong đg link là /delete-watch/:id nên nhớ viết id thoy
        // console.log(watchId)
        try {
            await WatchModel.findOneAndDelete({_id: watchId})
            res.redirect("/watches")
        } catch (error) {
            console.log(error.message) 
        }
    },
    renderEditWatchPage: async (req, res) => {
        const watchId = req.params.id
        const brands = await BrandModel.find()
        try {
            const response = await WatchModel.findOne({_id: watchId})
            res.render("admin/watch/edit-watch", {
                brands: brands,
                errorMessage: "", 
                watch: response, 
                layout: "admin/masterDashboard.ejs"
            })
        } catch (error) {
            console.log(error.message)
        }
    }, 
    editWatch: async (req, res) => {
        const bodyData = req.body
        // console.log(bodyData)
        const watchId = req.params.id
        const brands = await BrandModel.find()
        try {
            const response = await WatchModel.findOne({_id: watchId})
            const isWatchNameExited = await WatchModel.findOne({watchName: bodyData.watchName})
            if (isWatchNameExited) {
                return res.render('admin/watch/edit-watch.ejs', {
                    brands: brands,
                    errorMessage: "Please update the new name", 
                    watch: response, 
                    layout: "admin/masterDashboard.ejs"
                })
            }
            if(bodyData.watchName == ""){
                return res.render('admin/watch/edit-watch.ejs', {
                    brands: brands,
                    errorMessage: "Name cannot be left blank", 
                    watch: response, 
                    layout: "admin/masterDashboard.ejs"
                })
            }
            if(bodyData.image == ""){
                return res.render('admin/watch/edit-watch.ejs', {
                    brands: brands, 
                    watch: response,
                    errorMessage: "Image cannot be left blank", 
                    layout: "admin/masterDashboard.ejs" 
                })
            }

            if(bodyData.price == ""){
                return res.render('admin/watch/edit-watch.ejs', {
                    brands: brands, 
                    watch: response,
                    errorMessage: "Price cannot be left blank", 
                    layout: "admin/masterDashboard.ejs" 
                })
            }
            if (!isPositiveInteger(bodyData.price)) {
                return res.render('admin/watch/create-watch.ejs', {
                    brands, 
                    watch: bodyData,
                    errorMessage: "Price must be a positive integer", 
                    layout: "admin/masterDashboard.ejs" 
                });
            }

            if(bodyData.watchDescription == ""){
                return res.render('admin/watch/edit-watch.ejs', {
                    brands: brands, 
                    watch: response,
                    errorMessage: "Description cannot be left blank", 
                    layout: "admin/masterDashboard.ejs" })
            }

            await WatchModel.findByIdAndUpdate(watchId, bodyData)
            res.redirect("/watches")
        } catch (error) {
            console.log(error.message)
        }
    }, 
}