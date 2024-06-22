const MemberModel = require('../models/member.model')
const bcrypt = require("bcrypt")

module.exports = {
    getAccount: async (req, res) => {
        try {
            const response = await MemberModel.find({isAdmin: false})
            // console.log(response)
            return res.render("admin/account/get-account.ejs", {
                accounts: response, 
                errorMessage: "", 
                layout: "admin/masterDashboard.ejs"
            });
        } catch (error) {
            console.log(error.message)
        }
    }, 

    renderUserPage: async (req, res) => {
        const memberId = req.params.id;
        try {
            res.render("member/member.ejs", { 
                errorMessage: "", 
                layout: "member/masterMember.ejs" 
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    renderUserInfoPage: async (req, res) => {
        const memberId = req.params.id
        try {
            const response = await MemberModel.findOne({_id: memberId})
            res.render("member/view-member-info.ejs", {
                memberId,
                errorMessage: "", 
                member: response, 
                currentYear: new Date().getFullYear(),
                layout: "member/masterMember.ejs"
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    renderUserInfoEditPage: async (req, res) => {
        const memberId = req.params.id
        try {
            const response = await MemberModel.findOne({_id: memberId})
            res.render("member/edit-member-info.ejs", {
                errorMessage: "", 
                memberId,
                member: response, 
                currentYear: new Date().getFullYear(),
                layout: "member/masterMember.ejs"
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    editUserInfo: async (req, res) => {
        const bodyData = req.body
        // console.log(bodyData)
        const memberId = req.params.id
        try {
            const response = await MemberModel.findOne({_id: memberId})
            if(bodyData.name == ""){
                return res.render('member/edit-member-info.ejs', {
                    errorMessage: "Full Name cannot be left blank", 
                    memberId,
                    member: response, 
                    currentYear: new Date().getFullYear(),
                    layout: "member/masterMember.ejs"
                })
            }
            if(bodyData.yob == ""){
                return res.render('member/edit-member-info.ejs', {
                    errorMessage: "Year of Birth cannot be left blank", 
                    memberId,
                    member: response, 
                    currentYear: new Date().getFullYear(),
                    layout: "member/masterMember.ejs"
                })
            }

            const yob = parseInt(bodyData.yob, 10);
            const currentYear = new Date().getFullYear();

            if (isNaN(yob) || yob < 1900 || yob > currentYear || bodyData.yob.length !== 4) {
                return res.render('member/edit-member-info.ejs', {
                    errorMessage: `Year of birth must be a 4-digit number between 1900 and ${currentYear}`,
                    memberId,
                    member: response, 
                    currentYear: currentYear,
                    layout: "member/masterMember.ejs",
                });
            }

            await MemberModel.findByIdAndUpdate(memberId, bodyData)
            res.redirect(`/member-info/${memberId}`)
        } catch (error) {
            console.log(error.message)
        }
    },
    renderChangePasswordPage: async (req, res) => {
        const memberId = req.params.id;
        try {
            res.render("member/change-password.ejs", {
                memberId,
                errorMessage: "",
                layout: "member/masterMember.ejs"
            });
        } catch (error) {
            console.log(error.message);
        }
    },

    changePassword: async (req, res) => {
        const memberId = req.params.id;
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        try {
            const member = await MemberModel.findById(memberId);

            const isMatch = await bcrypt.compare(currentPassword, member.password);
            // console.log(isMatch)
            if (!isMatch) {
                return res.render('member/change-password.ejs', {
                    memberId,
                    errorMessage: "Current password is incorrect",
                    layout: "member/masterMember.ejs"
                });
            }

            // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới
            if (newPassword !== confirmNewPassword) {
                return res.render('member/change-password.ejs', {
                    memberId,
                    errorMessage: "New password do not match",
                    layout: "member/masterMember.ejs"
                });
            }

            // Mã hóa mật khẩu mới
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Cập nhật mật khẩu
            member.password = hashedPassword;
            await member.save();

            res.redirect(`/member-info/${memberId}`);
        } catch (error) {
            console.log(error.message);
        }
    }
}