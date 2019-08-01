// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import { LoginUsers, Users } from '../src/mock/data/user'
// let _Users = Users
const request = require("request");
const express = require("express");
const router = express.Router();
var myConst = require("./const");

// 搜索
router.post('/search', function (req, res, next) {
  const options = {
    url: myConst.apiurl + "/prj002/search/",
    form: req.body.search,//浏览器发送过来的req的body  和  后端返回的response的body格式类型不一样?
    qs: {page:req.body.page},
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
    console.log("搜索option", options)
  request.post(options, function (error, response, body) {
    var bodyParse = JSON.parse(body)
    console.log("搜索返回结果", bodyParse.count)
    var searchResultsNum = bodyParse.count
    var searchResults = bodyParse.results
    res.send({searchResults, searchResultsNum})
  })
})
// 添加患者信息
router.post('/add', function (req, res, next) {
  // console.log('req.body.name->', req.body.patientInfo.name)
  const options = {
    url: myConst.apiurl + "/prj002/info/",
    form: req.body.patientInfo,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
  request.post(options, function (error, response, body) {
    console.log("增加信息", body)
    res.send({msg:'成功了'})
  })

})
// 删除患者信息
router.post('/remove', function (req, res, next) {
  const options = {
    url: req.body.url,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
  request.del(options, function (error, response, body) {
    res.send({msg:'删除成功了'})
  })

})

// 所有患者信息列表
router.post('/list', function(req, res, next) {
  // console.log('user.js 1.req.body->', req.body)
  // console.log('user.js 2.req.cookies->', req.cookies)
  const options = {
    url: myConst.apiurl + "/prj002/info/",
    qs: {page:req.body.page},
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
    var patientInfo = JSON.parse(body)
    res.send(patientInfo)
  })
})

// PATCH修改一般信息表
router.post('/info', function(req, res, next) {
  console.log('user.js PATCH修改一般信息表', req.body.params)
  var options = {
    url: req.body.url,
    form: req.body.infoForm,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
  request.patch(options, function (error, response, body) {
    console.log('user.js 更新')
    res.send({msg:'ok'})
  })
})
/* 病情概要summary */
// 获取
router.get('/summary', function(req, res, next) {
  console.log('user.js GET获取病情概要', req.query.url)
    var options = {
      url: req.query.url,
      headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
    }
    request.get(options, function (error, response, body) {
      var patientSummary = JSON.parse(body)
      res.send(patientSummary)
    })
})
// 创建
router.post('/summary', function(req, res, next) {
  console.log('user.js POST创建病情概要')
  var options = {
    url: myConst.apiurl + "/prj002/summary/",
    form: req.body,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
    request.post(options, function (error, response, body) {
      res.send({msg:'ok'})
    })
})
// 修改
router.patch('/summary', function(req, res, next) {
  console.log('user.js PATCH修改病情概要',req.body)
  var options = {
    url: req.body.url,
    form: req.body,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
    request.patch(options, function (error, response, body) {
      res.send({msg:'ok'})
    })
})

/* 专科病史history */
//获取
router.get('/history', function(req, res, next) {
  console.log('user.js GET获取专科病史', req.query.url)
    var options = {
      url: req.query.url,
      headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
    }
    request.get(options, function (error, response, body) {
      var patientHistory = JSON.parse(body)
      res.send(patientHistory)
    })
})
//创建
router.post('/history', function(req, res, next) {
  console.log('user.js POST创建专科病史history')
  var options = {
    url: myConst.apiurl + "/prj002/history/",
    form: req.body,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
    request.post(options, function (error, response, body) {
      res.send({msg:'ok'})
    })
})
//修改
router.patch('/history', function(req, res, next) {
  console.log('user.js PATCH修改专科病史history',req.body)
  var options = {
    url: req.body.url,
    form: req.body,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
    request.patch(options, function (error, response, body) {
      res.send({msg:'ok'})
    })
})

/* 实验室检查experiment */
//获取
router.get('/experiment', function(req, res, next) {
  console.log('user.js GET获取实验室检查', req.query.url)
    var options = {
      url: req.query.url,
      headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
    }
    request.get(options, function (error, response, body) {
      var patientExperiment = JSON.parse(body)
      res.send(patientExperiment)
    })
})
//创建
router.post('/experiment', function(req, res, next) {
  console.log('user.js POST创建实验室检查experiment',req.body)
  var options = {
    url: myConst.apiurl + "/prj002/experiment/",
    form: req.body,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
    request.post(options, function (error, response, body) {
      res.send({msg:'ok'})
    })
})
//修改
router.patch('/experiment', function(req, res, next) {
  console.log('user.js PATCH修改实验室检查experiment',req.body)
  var options = {
    url: req.body.url,
    form: req.body,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
    request.patch(options, function (error, response, body) {
      res.send({msg:'ok'})
    })
})

/* B超Bxray */
//获取
router.get('/bxray', function(req, res, next) {
  console.log('user.js GET获取B超Bxray', req.query.url)
    var options = {
      url: req.query.url,
      headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
    }
    request.get(options, function (error, response, body) {
      var patientBxray = JSON.parse(body)
      res.send(patientBxray)
    })
})
//创建
router.post('/bxray', function(req, res, next) {
  console.log('user.js POST创建B超Bxray',req.body)
  var options = {
    url: myConst.apiurl + "/prj002/bxray/",
    form: req.body,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
    request.post(options, function (error, response, body) {
      res.send({msg:'ok'})
    })
})
//修改
router.patch('/bxray', function(req, res, next) {
  console.log('user.js PATCH修改B超Bxray',req.body)
  var options = {
    url: req.body.url,
    form: req.body,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
    request.patch(options, function (error, response, body) {
      res.send({msg:'ok'})
    })
})

/* 治疗Cure */
//获取
router.get('/cure', function(req, res, next) {
  console.log('user.js GET获取治疗Curey', req.query.url)
    var options = {
      url: req.query.url,
      headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
    }
    request.get(options, function (error, response, body) {
      var patientCure = JSON.parse(body)
      res.send(patientCure)
    })
})
//创建
router.post('/cure', function(req, res, next) {
  console.log('user.js POST创建治疗Cure',req.body)
  var options = {
    url: myConst.apiurl + "/prj002/cure/",
    form: req.body,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
    request.post(options, function (error, response, body) {
      res.send({msg:'ok'})
    })
})
//修改
router.patch('/cure', function(req, res, next) {
  console.log('user.js PATCH修改治疗Cure',req.body)
  var options = {
    url: req.body.url,
    form: req.body,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj002token.access_token}
  }
    request.patch(options, function (error, response, body) {
      res.send({msg:'ok'})
    })
})


module.exports = router;
