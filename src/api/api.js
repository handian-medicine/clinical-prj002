import axios from 'axios'

let base = ''
//这里api是代理flag,通过这个api告诉webpack把请求发到3000端口,即express后端
let baseUrl = 'http://127.0.0.1:8080/api'

// 登录
export const requestLogin = params => { return axios.post(`${baseUrl}/login`, params).then(res => res.data) }
// 添加患者
export const addPatientInfo = params => { return axios.post(`${baseUrl}/user/add`, params) }
// 获取患者列表
export const getPatientsList = params => { return axios.post(`${baseUrl}/user/list`, { params: params }) }

// 获取单个患者一般信息
// tip 使用params,对于get请求,会把params的参数附加在url后面,实际发送的是一个完整的带参数url请求
export const getPatientInfoForm = params => { return axios.get(`${baseUrl}/user/info`, { params: params }) }
// 修改单个患者一般信息
export const updatePatientInfoForm = params => { return axios.post(`${baseUrl}/user/info`, { params: params }) }


export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }) }

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }) }

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }) }

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }) }

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }
