const express = require("express")
const router = express.Router()

const login = require('./login')
const home = require('./home')
const prj001 = require('./prj001/index')
const prj002 = require('./prj002/index')

router.use('/login',login)
router.use('/home',home)
router.use('/prj001',prj001)
router.use('/prj002',prj002)

module.exports = router