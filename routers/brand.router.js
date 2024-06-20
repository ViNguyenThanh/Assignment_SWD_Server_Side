const express = require('express')
const router = express.Router()

const BrandController = require('../controllers/brand.controller')
const admin = require("../middlewares/verify")

router.get("/create-brand", admin, BrandController.renderCreateBrandPage)
router.post("/create-brand", admin, BrandController.createBrand)
router.get("/brands", admin, BrandController.getBrand)
router.get("/delete-brand/:id", admin, BrandController.deleteBrand)
router.get("/edit-brand/:id", admin, BrandController.renderEditBrandPage)
router.post("/edit-brand/:id", admin, BrandController.editBrand)

module.exports = router