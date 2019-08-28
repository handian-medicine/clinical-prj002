const express = require("express")
const router = express.Router()

const mobile_prj001 = require('./prj001/mobile_prj001')
const mobile_prj002 = require('./prj002/mobile_prj002')
const mobile_prj003 = require('./prj003/mobile_prj003')

router.use('/prj001',mobile_prj001)
router.use('/prj002',mobile_prj002)
router.use('/prj003',mobile_prj003)

module.exports = router