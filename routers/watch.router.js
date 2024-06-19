const express = require('express')
const router = express.Router()

const WatchController = require('../controllers/watch.controller')
const admin = require("../middlewares/verify")

router.get("/create-watch", WatchController.renderCreateWatchPage)
router.post("/create-watch", WatchController.createWatch)

module.exports = router