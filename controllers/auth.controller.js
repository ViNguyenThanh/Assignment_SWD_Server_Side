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
                return res.render("auth/register.ejs", {
                    errorMessage: "Tên này đã tồn tại",
                    currentYear: new Date().getFullYear(),
                    layout: "auth/masterAuth.ejs",
                })
            }

            if (bodyData.memberName == "") {
                return res.render('auth/register.ejs', {
                    errorMessage: "Username cannot be left blank",
                    currentYear: new Date().getFullYear(),
                    layout: "auth/masterAuth.ejs",
                })
            }
            if (bodyData.password == "") {
                return res.render('auth/register.ejs', {
                    errorMessage: "Password cannot be left blank",
                    currentYear: new Date().getFullYear(),
                    layout: "auth/masterAuth.ejs",
                })
            }
            if (bodyData.name == "") {
                return res.render('auth/register.ejs', {
                    errorMessage: "Full Name cannot be left blank",
                    currentYear: new Date().getFullYear(),
                    layout: "auth/masterAuth.ejs",
                })
            }
            if (bodyData.yob == "") {
                return res.render('auth/register.ejs', {
                    errorMessage: "Year of birth cannot be left blank",
                    currentYear: new Date().getFullYear(),
                    layout: "auth/masterAuth.ejs",
                })
            }
            const yob = parseInt(bodyData.yob, 10);
            const currentYear = new Date().getFullYear();

            if (isNaN(yob) || yob < 1900 || yob > currentYear || bodyData.yob.length !== 4) {
                return res.render('auth/register.ejs', {
                    errorMessage: `Year of birth must be a 4-digit number between 1900 and ${currentYear}`,
                    currentYear: currentYear,
                    layout: "auth/masterAuth.ejs",
                });
            }

            const newMember = await MemberModel.create({
                ...bodyData,
                password: hashPassword,
            })
            // res.redirect(
            //     url.format({
            //         pathname: "/register-success",
            //         query: {
            //             memberName: newMember.memberName,
            //             name: newMember.name,
            //             yob: newMember.yob
            //         },
            //     },
            // ));
            res.redirect("/")
        } catch (error) {
            console.log(error.message)
        }
    },
    renderRegisterPage: async (req, res) => {
        res.render("auth/register.ejs", {
            errorMessage: "",
            currentYear: new Date().getFullYear(),
            layout: "auth/masterAuth.ejs",
        })
    },
    // registerSuccess: async (req, res) => {
    //     res.render("auth/registerSuccess.ejs", {
    //         memberName: req.query.memberName,
    //         name: req.query.name,
    //         yob: req.query.yob
    //     })
    // },

    login: async (req, res) => {
        const bodyData = req.body
        // console.log(bodyData)
        try {
            const member = await MemberModel.findOne({ memberName: bodyData.memberName })

            if (bodyData.memberName == "") {
                return res.render('auth/login.ejs', {
                    errorMessage: "Username cannot be left blank",
                    layout: "auth/masterAuth.ejs",
                })
            }
            if (!member) {
                return res.render("auth/login.ejs", {
                    errorMessage: "Account does not exist",
                    layout: "auth/masterAuth.ejs",
                })
            }
            // KO XÀI ĐƯỢC DO ĐÃ HASH PASSWORD
            // if(member.password !== bodyData.password){
            //     return res.render("auth/login", {
            //         errorMessage: "Mật khẩu không đúng"
            //     })
            // }
            if (bodyData.password == "") {
                return res.render('auth/login.ejs', {
                    errorMessage: "Password cannot be left blank",
                    layout: "auth/masterAuth.ejs",
                })
            }
            const isPasswordCorrect = await bcrypt.compare(
                bodyData.password,
                member.password
            )
            if (!isPasswordCorrect) {
                return res.render("auth/login", {
                    errorMessage: "Incorrect password",
                    layout: "auth/masterAuth.ejs",
                })
            }

            req.session.memberId = member._id.toString()
            req.session.memberName = member.memberName; // Lưu tên người dùng vào session
            req.session.isAdmin = member.isAdmin

            // res.redirect(
            //     url.format({
            //         pathname: "/login-success",
            //         query: {
            //             memberName: member.memberName,
            //         }
            //     })
            // )

            if (member.isAdmin) {
                // res.redirect('/admin')
                res.redirect('/brands')
            } else {
                res.redirect("/")
            }
        } catch (error) {
            console.log(error.message)
        }
    },
    renderLoginPage: async (req, res) => {
        res.render("auth/login.ejs", {
            errorMessage: "",
            layout: "auth/masterAuth.ejs"
        })
    },
    // loginSuccess: async (req, res) => {
    //     res.render("auth/loginSuccess.ejs", {
    //         memberName: req.query.memberName,
    //     })
    // },
    renderAdminPage: async (req, res) => {
        res.render("admin/dashboard.ejs", { 
            errorMessage: "", 
            layout: "admin/masterDashboard.ejs" 
        })
    },
    logout: async (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/');
        });
    }
}
