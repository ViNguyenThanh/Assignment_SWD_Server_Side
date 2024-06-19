const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/auth.controller')
const admin = require("../middlewares/verify")

// router.get("/login", (req, res) => {
//     res.render("auth/login.ejs") // phải thêm auth chứ ko bên index.js mình định nghĩa app.set("views", "views"); nó ko hiểu 
// })

router.get("/register", AuthController.renderRegisterPage)
router.post("/register", AuthController.register)
router.get("/register-success", AuthController.registerSuccess)

router.get("/login", AuthController.renderLoginPage)
router.post("/login", AuthController.login)
router.get("/admin", admin, AuthController.renderAdminPage)
// router.get("/login-success", AuthController.loginSuccess)

module.exports = router