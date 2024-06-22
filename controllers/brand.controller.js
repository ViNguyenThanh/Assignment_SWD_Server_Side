const BrandModel = require('../models/brand.model')
const WatchModel = require("../models/watch.model")

module.exports = {
    createBrand: async (req, res) => {
        try {
            const bodyData = req.body
            if(bodyData.brandName == ""){
                return res.render('admin/brand/create-brand.ejs', {
                    brand: bodyData,
                    errorMessage: "Cannot be left blank",  
                    layout: "admin/masterDashboard.ejs"
                })
            }

            const isBrandNameExited = await BrandModel.findOne({brandName: bodyData.brandName})
            if (isBrandNameExited) {
                return res.render('admin/brand/create-brand.ejs', {
                    brand: bodyData,
                    errorMessage: "Must not be the same as an existing name", 
                    layout: "admin/masterDashboard.ejs"
                })
            }
            
            await BrandModel.create(bodyData)

            // return res.render ("admin/brand/create-brand.ejs", {errorMessage: "Create successfully", layout: "admin/masterDashboard.ejs"})
            res.redirect("/brands")
        } catch (error) {
            console.log(error.message)
        }
    },
    renderCreateBrandPage: async (req, res) => {
        const bodyData = req.body
        try {
            res.render("admin/brand/create-brand.ejs", { 
                brand: bodyData,
                errorMessage: "", 
                layout: "admin/masterDashboard.ejs"
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    getBrand: async (req, res) => {
        try {
            const response = await BrandModel.find()
            // console.log(response)
            return res.render("admin/brand/get-brand.ejs", {
                brands: response, 
                errorMessage: "", 
                layout: "admin/masterDashboard.ejs"
            });
        } catch (error) {
            console.log(error.message)
        }
    },
    deleteBrand: async (req, res) => {
        const brandId = req.params.id // trong đg link là /delete-brand/:id nên nhớ viết id thoy
        // console.log(brandId)
        try {
            const response = await BrandModel.find()
            const exitedBrandOfWatch = await WatchModel.findOne({brand: brandId})
            // console.log(exitedBrandOfWatch)
            if (exitedBrandOfWatch){
                return res.render("admin/brand/get-brand.ejs", {
                    brands: response, 
                    errorMessage: "The brand cannot be deleted because there is still a watch for this brand", 
                    layout: "admin/masterDashboard.ejs"});
                // res.send("The brand cannot be deleted because there is still a watch for this brand")
            }
            await BrandModel.findOneAndDelete({_id: brandId})
            res.redirect("/brands")
        } catch (error) {
            console.log(error.message) 
        }
    },
    renderEditBrandPage: async (req, res) => {
        const brandId = req.params.id
        try {
            const response = await BrandModel.findOne({_id: brandId})
            res.render("admin/brand/edit-brand", {
                errorMessage: "", 
                brand: response, 
                layout: "admin/masterDashboard.ejs"
            })
        } catch (error) {
            console.log(error.message)
        }
    }, 
    editBrand: async (req, res) => {
        const bodyData = req.body
        // console.log(bodyData)
        const brandId = req.params.id
        try {
            const response = await BrandModel.findOne({_id: brandId})
            const isBrandNameExited = await BrandModel.findOne({brandName: bodyData.brandName})
            if (isBrandNameExited) {
                return res.render('admin/brand/edit-brand.ejs', {
                    errorMessage: "Please update the new name", 
                    brand: response, 
                    layout: "admin/masterDashboard.ejs"
                })
            }
            if(bodyData.brandName == ""){
                return res.render('admin/brand/edit-brand.ejs', {
                    errorMessage: "Brand cannot be left blank", 
                    brand: response, 
                    layout: "admin/masterDashboard.ejs"
                })
            }

            await BrandModel.findByIdAndUpdate(brandId, bodyData)
            res.redirect("/brands")
        } catch (error) {
            console.log(error.message)
        }
    }
}
