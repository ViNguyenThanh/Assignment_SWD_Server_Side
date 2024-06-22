const express = require('express')
const router = express.Router()

const MemberController = require("../controllers/member.controller")
const {admin, verifyMember} = require("../middlewares/verify")

router.get('/accounts', admin, MemberController.getAccount)

router.get("/member/:id", verifyMember, MemberController.renderUserPage)
router.get("/member-info/:id", verifyMember,MemberController.renderUserInfoPage)
router.get("/member-info-edit/:id",verifyMember, MemberController.renderUserInfoEditPage)
router.post("/member-info-edit/:id", verifyMember, MemberController.editUserInfo)
router.get("/change-password/:id",verifyMember, MemberController.renderChangePasswordPage);
router.post("/change-password/:id", verifyMember, MemberController.changePassword);
module.exports = router