const express = require('express')
const router = express.Router()

const BrandController = require('../controllers/brand.controller')
const admin = require("../middlewares/verify")

router.get("/create-brand", BrandController.renderCreateBrandPage)
router.post("/create-brand", BrandController.createBrand)
router.get("/brands", BrandController.getBrand)
router.get("/delete-brand/:id", BrandController.deleteBrand)
router.get("/edit-brand/:id", BrandController.renderEditBrandPage)
router.post("/edit-brand/:id", BrandController.editBrand)

module.exports = router