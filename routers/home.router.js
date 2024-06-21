const HomeController = require('../controllers/home.controller');

const router = require('express').Router()

// router.get("/", (req, res) => res.render("home.ejs"))
router.get("/", HomeController.getWatch)
router.get("/detail-watch/:id", HomeController.getWatchDetail)

module.exports = router;