const express = require('express')

const app = express()

const connectDB = require('./configs/connectDb')

const expressLayout = require("express-ejs-layouts")
const session = require("express-session")

const HomeRouter = require('./routers/home.router')
const AuthRouter = require('./routers/auth.router')
const BrandRouter = require('./routers/brand.router')
const CommentRouter = require('./routers/comment.router')
const WatchRouter = require('./routers/watch.router')
const MemberRouter = require('./routers/member.router')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", 'views')

app.set("layout", "./master")


app.use(express.static('./public'))

app.use(expressLayout)

app.use(
    session({
        secret: "MEMBERAUTH", // key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // lưu vào cookie
    })
);

app.use((req, res, next) => {
    res.locals.memberId = req.session.memberId;
    res.locals.memberName = req.session.memberName;
    res.locals.isAdmin = req.session.isAdmin
    next();
});

app.use("/", HomeRouter)
app.use("/", AuthRouter)
app.use("/", BrandRouter)
app.use("/", CommentRouter)
app.use("/", WatchRouter)
app.use("/", MemberRouter)


connectDB()

app.listen(5001, () => console.log("Server start port 5001"))