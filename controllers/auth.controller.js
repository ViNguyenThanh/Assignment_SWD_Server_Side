const MemberModel = require('../models/member.model')
const bcrypt = require("bcrypt")
const url = require('url')

module.exports = {
    register: async (req, res) => {
        const bodyData = req.body
        // console.log(bodyData);
        try {
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = bcrypt.hashSync(bodyData.password, salt)
            const exitedMember = await MemberModel.findOne({ memberName: bodyData.memberName }) // tìm bất cứ cái field nào của phần tử
            // console.log(bodyData.password.length)
            // if (bodyData.password.length < 8) {
            //     return next(createError(res, 403, "Vui lòng nhập mật khẩu có 8 kí tự")) // check mật khẩu có đủ 8 kí tự hay ko
            // }
            if (exitedMember) {
                return res.render("auth/register", {
                    errorMessage: "Tên này đã tồn tại"
                })
            }
            const newMember = await MemberModel.create({
                ...bodyData,
                password: hashPassword,
            })
            res.redirect(
                url.format({
                    pathname: "/register-success",
                    query: {
                        memberName: newMember.memberName,
                        name: newMember.name,
                        yob: newMember.yob
                    },
                },
            ));
        } catch (error) {
            console.log(error.message)
        }
    },
    renderRegisterPage: async (req, res) => {
        res.render("auth/register.ejs", { errorMessage: "" })
    },
    registerSuccess: async (req, res) => {
        res.render("auth/registerSuccess.ejs", {
            memberName: req.query.memberName,
            name: req.query.name,
            yob: req.query.yob
        })
    },

    login: async (req, res) => {
        const bodyData = req.body
        // console.log(bodyData)
        try {
            const member = await MemberModel.findOne({ memberName: bodyData.memberName })
            if (!member) {
                return res.render("auth/login", {
                    errorMessage: "Tài khoản không tồn tại"
                })
            }
            // if(member.password !== bodyData.password){
            //     return res.render("auth/login", {
            //         errorMessage: "Mật khẩu không đúng"
            //     })
            // }
            const isPasswordCorrect = await bcrypt.compare(
                bodyData.password,
                member.password
            )
            if (!isPasswordCorrect) {
                return res.render("auth/login", {
                    errorMessage: "Mật khẩu không đúng"
                })
            }
            req.session.memberId = member._id  
            // res.redirect(
            //     url.format({
            //         pathname: "/login-success",
            //         query: {
            //             memberName: member.memberName,
            //         }
            //     })
            // )
            // res.redirect("/brands")
            if (member.isAdmin){
                res.redirect('/admin')
            } else{
                res.redirect("/brands")
            }
        } catch (error) {
            console.log(error.message)
        }
    },
    renderLoginPage: async (req, res) => {
        res.render("auth/login.ejs", { errorMessage: "" })
    },
    renderAdminPage: async (req, res) => {
        res.render("admin/dashboard.ejs", {errorMessage: "", layout: "admin/masterDashboard.ejs"})
    }
    // loginSuccess: async (req, res) => {
    //     res.render("auth/loginSuccess.ejs", {
    //         memberName: req.query.memberName,
    //     })
    // }
}