const express = require('express')
const router = express.Router()

const MemberController = require("../controllers/member.controller")
const admin = require("../middlewares/verify")

router.get('/accounts', admin, MemberController.getAccount)

module.exports = router