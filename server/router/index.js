const express = require("express")
const router = express.Router()

const prj001 = require('./prj001/index')
const prj002 = require('./prj002/index')

router.use('/prj001',prj001)
router.use('/prj002',prj002)

module.exports = router