// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import { LoginUsers, Users } from '../src/mock/data/user'
// let _Users = Users
const request = require("request");
const express = require("express");
const router = express.Router();
var myConst = require("./const");

// 添加患者
router.post('/add', function (req, res, next) {
  // console.log('req.body.name->', req.body.patientInfo.name)
  const patientInfo = {
    name:req.body.patientInfo.name,
    phone:req.body.patientInfo.phone,
    hospital:req.body.patientInfo.hospital,
    birth:req.body.patientInfo.birth,
    career:req.body.patientInfo.career,
  }
  const options = {
    url: myConst.apiurl + "/prj002/info/",
    form: patientInfo,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
  request.post(options, function (error, response, body) {
    console.log("增加信息", body)
    // var bodyParse = JSON.parse(body)
    // var totalNum = bodyParse.count
    // var patientsList = bodyParse.results
    // console.log('user.js 3.',patientsList)
    res.send({msg:'成功了'})
  })

})

// 信息列表
router.post('/list', function(req, res, next) {
  // console.log('user.js 1.req.body->', req.body)
  // console.log('user.js 2.req.cookies->', req.cookies)
  const options = {
    url: myConst.apiurl + "/prj002/info/",
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
  request.get(options, function (error, response, body) {
    var bodyParse = JSON.parse(body)
    var totalNum = bodyParse.count
    var patientsList = bodyParse.results
    // console.log('user.js 3.',patientsList)
    res.send({patientsList,totalNum})
  })

})

// GET获取一般信息表
router.get('/info', function(req, res, next) {
  console.log('user.js GET获取一般信息表', req.query)

  var options = {
    url: req.query.url,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }

  request.get(options, function (error, response, body) {
    console.log('user.js 看这里2', body)
    var patientInfo = JSON.parse(body)
    res.send(patientInfo)
  })

})
// POST修改一般信息表
router.post('/info', function(req, res, next) {
  console.log('user.js POST修改一般信息表', req.body.params)

  var options = {
    url: req.body.params.url,
    form: req.body.params.infoForm,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }

  request.patch(options, function (error, response, body) {
    console.log('user.js 更新')
    res.send({msg:'ok'})
  })

})

router.get('/summary', function(req, res, next) {
  res.send({name:"hello"})
})
router.get('/history', function(req, res, next) {
  res.send({name:"hello"})
})
router.get('/experiment', function(req, res, next) {
  res.send({name:"hello"})
})
router.get('/bxray', function(req, res, next) {
  res.send({name:"hello"})
})
router.get('/cure', function(req, res, next) {
  res.send({name:"hello"})
})



module.exports = router;
