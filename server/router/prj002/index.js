const express = require("express");
const router = express.Router();

const user = require('./user');
const login = require('./login');

router.use('/user',user)
router.use('/login',login)

// 重定向
// router.get('/',function(req,res){
//     res.redirect('/login');
// })
module.exports = router