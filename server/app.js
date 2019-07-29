const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');//
const path = require('path');

const user = require('./router/user');
const login = require('./router/login');

const app = express()
//设置存放views文件的目录, 即存放模板文件的地方,dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('views', path.join(__dirname, 'views'))
//为 express.static 函数提供的文件创建虚拟路径前缀（路径并不实际存在于文件系统中）
app.use('/static', express.static(path.join(__dirname, './static')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/user', user)
app.use('/login', login)
app.use('/', login)

app.listen(3000, () => {
    // console.log(path.join(__dirname, 'dist'))
    console.log('app listening on port 3000.')
})


