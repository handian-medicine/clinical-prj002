import axios from 'axios'

//这里api是代理flag,通过这个api告诉webpack把请求发到3000端口,即express后端
// let baseUrl = 'http://127.0.0.1:8080/api' //开发环境用
let baseUrl = ''

// 登录
export const apiLogin = params => { return axios.post(`${baseUrl}/login`, params).then(res => res.data) }
// 添加患者
export const apiAddPatient = params => { return axios.post(`${baseUrl}/user/add`, params) }
// 搜索患者
export const apiSearchPatient = params => { return axios.post(`${baseUrl}/user/search`, params) }
// 获取患者列表
export const apiGetPatientsList = params => { return axios.post(`${baseUrl}/user/list`, params) }
// 删除单个患者信息
export const apiRemovePatient = params => { return axios.post(`${baseUrl}/user/remove`, params) }

// 获取单个患者一般信息
// tip 使用params,对于get请求,会把params的参数附加在url后面,实际发送的是一个完整的带参数url请求
export const apiGetPatientInfoForm = params => { return axios.get(`${baseUrl}/user/info`, {params:params}) }
// 修改单个患者一般信息
export const apiUpdatePatientInfoForm = params => { return axios.post(`${baseUrl}/user/info`, params) }

// 获取单个患者病情概要
export const apiGetPatientSummaryForm = params => { return axios.get(`${baseUrl}/user/summary`, {params:params}) }
// 修改单个患者病情概要
export const apiUpdatePatientSummaryForm = params => { return axios.post(`${baseUrl}/user/summary`, params) }

// 获取单个患者专科病史
export const apiGetPatientHistoryForm = params => { return axios.get(`${baseUrl}/user/history`, {params:params}) }
// 修改单个患者专科病史
export const apiUpdatePatientHistoryForm = params => { return axios.post(`${baseUrl}/user/history`, params) }

// 获取单个患者实验室检查
export const apiGetPatientExperimentForm = params => { return axios.get(`${baseUrl}/user/experiment`, {params:params}) }
// 修改单个患者实验室检查
export const apiUpdatePatientExperimentForm = params => { return axios.post(`${baseUrl}/user/experiment`, params) }

// 获取单个患者B超
export const apiGetPatientBxrayForm = params => { return axios.get(`${baseUrl}/user/bxray`, {params:params}) }
// 修改单个患者B超
export const apiUpdatePatientBxrayForm = params => { return axios.post(`${baseUrl}/user/bxray`, params) }

// 获取单个患者治疗
export const apiGetPatientCureForm = params => { return axios.get(`${baseUrl}/user/cure`, {params:params}) }
// 修改单个患者治疗
export const apiUpdatePatientCureForm = params => { return axios.post(`${baseUrl}/user/cure`, params) }




export const batchRemoveUser = params => { return axios.get(`${baseUrl}/user/batchremove`, { params: params }) }
