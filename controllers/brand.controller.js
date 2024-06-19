const BrandModel = require('../models/brand.model')
const url = require('url')

module.exports = {
    createBrand: async (req, res) => {
        try {
            const bodyData = req.body
            if(bodyData.brandName == ""){
                return res.render('admin/brand/create-brand.ejs', {errorMessage: "Cannot be left blank",  layout: "admin/masterDashboard.ejs"})
            }

            const isBrandNameExited = await BrandModel.findOne({brandName: bodyData.brandName})
            if (isBrandNameExited) {
                return res.render('admin/brand/create-brand.ejs', {errorMessage: "Must not be the same as an existing name",  layout: "admin/masterDashboard.ejs"})
            }
            
            const newBrand = await BrandModel.create(bodyData)

            // return res.render ("admin/brand/create-brand.ejs", {errorMessage: "Create successfully", layout: "admin/masterDashboard.ejs"})
            res.redirect("/brands")
        } catch (error) {
            console.log(error.message)
        }
    },
    renderCreateBrandPage: async (req, res) => {
        res.render("admin/brand/create-brand.ejs", { errorMessage: "", layout: "admin/masterDashboard.ejs"})
    },
    getBrand: async (req, res) => {
        try {
            const response = await BrandModel.find()
            // console.log(response)
            return res.render("admin/brand/get-brand.ejs", {brands: response, layout: "admin/masterDashboard.ejs"});
        } catch (error) {
            console.log(error.message)
        }
    },
    deleteBrand: async (req, res) => {
        const brandId = req.params.id // trong đg link là /deleteProduct/:id nên nhớ viết id thoy
        // console.log(productId)
        try {
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
            res.render("admin/brand/edit-brand", {errorMessage: "", brand: response, layout: "admin/masterDashboard.ejs"})
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
                return res.render('admin/brand/edit-brand.ejs', {errorMessage: "Please update the new name", brand: response, layout: "admin/masterDashboard.ejs"})
            }

            await BrandModel.findByIdAndUpdate(brandId, bodyData)
            res.redirect("/brands")
        } catch (error) {
            console.log(error.message)
        }
    }
}
