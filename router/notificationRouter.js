const express = require('express')
const router = express.Router()
const { getnotification } = require('../controller/notificationController')

router.route("/").get(getnotification);

module.exports = router;