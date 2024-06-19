const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/member-auth-sdn")
        console.log("Connect DB successfully")
    } catch (error) {
        console.log("Connect DB failure" + error.message)
    }
}

module.exports = connectDB