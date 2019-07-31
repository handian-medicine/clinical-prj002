<template>
  <section>
    <!--上方工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchPatient">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addPatient">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--主要内容 列表-->
    <el-table :data="patientsList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;" height="500"><!--height固定表头-->
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="40" fixed>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="90" sortable fixed>
      </el-table-column>
      <el-table-column prop="birth" label="出生日期" width="100" sortable>
      </el-table-column>
      <!-- <el-table-column prop="age" label="年龄" width="100" sortable>
      </el-table-column> -->
      <el-table-column prop="phone" label="手机号码" width="110" sortable>
      </el-table-column>
      <el-table-column prop="hospital" label="就诊医院" width="150" sortable>
      </el-table-column>
      <el-table-column prop="career" label="职业" min-width="90" sortable>
      </el-table-column>
      <el-table-column label="操作" width="610">
        <template v-slot="scope">
          <el-button-group>
          <el-button type="primary" size="small" @click="openInfoForm(scope.$index, scope.row)">一般情况</el-button>
          <el-button type="success" size="small" @click="openSummaryForm(scope.$index, scope.row)">病情概要</el-button>
          <el-button type="info"    size="small" @click="openHistoryForm(scope.$index, scope.row)">专科病史</el-button>
          <el-button type="warning" size="small" @click="openExperimentForm(scope.$index, scope.row)">实验室检查</el-button>
          <el-button type="primary" size="small" @click="openBxrayForm(scope.$index, scope.row)">经阴道或经肛门B超</el-button>
          <el-button type="success" size="small" @click="openCureForm(scope.$index, scope.row)">治疗</el-button>
          <!-- <el-button size="small" style="background:purple">治疗</el-button> -->
          </el-button-group>
          <el-button type="danger" size="small" style="margin-left:8px" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--下方工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <span style="margin-left:100px">共{{totalNum}}条</span>
      <el-pagination layout="prev, pager, next, jumper"
                    @current-change="handleCurrentChange"
                    :page-size="10" :total="totalNum"
                    style="float:right;">
      </el-pagination>
    </el-col>

    <!-- 一般情况dialog -->
    <InfoForm ref="infoForm"></InfoForm>
    <!-- 病情概要dialog -->
    <SummaryForm ref="summaryForm"></SummaryForm>
    <!-- 专科病史dialog -->
    <HistoryForm ref="historyForm"></HistoryForm>
    <!-- 实验室检查dialog -->
    <ExperimentForm ref="experimentForm"></ExperimentForm>
    <!-- B超dialog -->
    <BxrayForm ref="bxrayForm"></BxrayForm>
    <!-- 治疗dialog -->
    <CureForm ref="cureForm"></CureForm>

    <!-- 新增信息dialog -->
    <AddPatient ref="addPatient" ></AddPatient>

  </section>
</template>

<script>
import util from '@/common/js/util'
// axios请求,向express做请求
import {apiGetPatientsList, apiRemovePatient, apiSearchPatient, batchRemoveUser} from '@/api/api'
// 请求各表单内容的api
import {apiGetPatientInfoForm, apiGetPatientSummaryForm, apiGetPatientHistoryForm,
        apiGetPatientExperimentForm, apiGetPatientBxrayForm, apiGetPatientCureForm } from '@/api/api'
// 批量导入子组件
import {AddPatient,InfoForm,SummaryForm,HistoryForm,ExperimentForm,BxrayForm,CureForm} from '@/components/forms'
export default {
  name:'Table',
  components:{AddPatient,InfoForm,SummaryForm,HistoryForm,ExperimentForm,BxrayForm,CureForm},
  data () {
    return {
      filters: {
        name: ''
      },
      patientsList: [], // 数据列表
      totalNum: 0, //  数据总条数
      page: 1, //当前页码
      listLoading: false,
      sels: [], // 列表选中列

    }
  },
  methods: {
    // 搜索功能
    searchPatient () {
      let para = {
        name:'测试',
        page:1
        //phone:'', hospital:'', birth:'', career:'', address:''
      }
      apiSearchPatient(para).then( (res) => {
        this.patientsList = res.data.searchResults
        this.totalNum = res.data.searchResultsNum
        this.listLoading = false
      })
    },
    // 新增信息dialog
    addPatient ( ) {
      this.$refs.addPatient.$emit("addEvent")
    },
    handleCurrentChange (val) {
      this.page = val
      this.getPatients()
    },
    // 获取患者列表
    getPatients () {
      let para = {
        page: this.page
      }
      this.listLoading = true
      apiGetPatientsList(para).then((res) => {
        console.log(res.data)
        this.patientsList = res.data.patientsList
        this.totalNum = res.data.totalNum
        this.listLoading = false
      })
    },
    // 删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'})
      .then(() => {
        this.listLoading = true
        let para = { url: row.url }
        console.log(row.url)
        apiRemovePatient(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getPatients()
        })
      }).catch(() => {})
    },

    selsChange: function (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = { ids: ids }
        batchRemoveUser(para).then((res) => {
          this.listLoading = false
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getPatients()
        })
      }).catch(() => {

      })
    },

    //获取单个患者一般信息
    openInfoForm (index, row) {
      let para = {page: this.page, url: row.url}
      apiGetPatientInfoForm(para)
      .then((res)=> {
        console.log(res.data)
        //父组件通过emit发送 事件 及 所需的参数
        this.$refs.infoForm.$emit("openEvent", res.data)
      })
      .catch(() => {})
    },
    openSummaryForm (index, row) {
      // 如果summary表未创建,不需要请求后端,直接显示空表
      if (row.summary==null) {
        console.log('创建流程')
        // 传一个创建此summary的url进去,这个url是info的url
        this.$refs.summaryForm.$emit("openEvent", {exist:false, summaryForm:{info:row.url} } )
      // 如果summary表已创建,需要请求后端,拿到数据
      } else {
        console.log('修改流程')
        // 此时当前患者的summary已经存在
        console.log('row.summary',row.summary)
        let para = {page: this.page, url: row.summary}// ,formName:'summary'}
        apiGetPatientSummaryForm(para)
        .then((res)=> {
          console.log('拿到的已创建的summary表',res.data)
          this.$refs.summaryForm.$emit("openEvent", {exist:true, summaryForm:res.data})
        })
        .catch(() => {})
      }
    },
    openHistoryForm (index, row) {
      if (row.history==null) {
        console.log('HistoryForm创建流程')
        this.$refs.historyForm.$emit("openEvent", {exist:false, historyForm:{info:row.url} } )
      } else {
        console.log('HistoryForm修改流程')
        let para = {page: this.page, url: row.history}
        apiGetPatientHistoryForm(para)
        .then((res)=> {
          this.$refs.historyForm.$emit("openEvent", {exist:true, historyForm:res.data})
        })
        .catch(() => {})
      }
    },
    openExperimentForm (index, row) {
      if (row.experiment==null) {
        console.log('ExperimentForm创建流程')
        this.$refs.experimentForm.$emit("openEvent", {exist:false, experimentForm:{info:row.url} } )
      } else {
        console.log('ExperimentForm修改流程')
        let para = {page: this.page, url: row.experiment}
        apiGetPatientExperimentForm(para)
        .then((res)=> {
          this.$refs.experimentForm.$emit("openEvent", {exist:true, experimentForm:res.data})
        })
        .catch(() => {})
      }
    },
    openBxrayForm (index, row) {
      if (row.bxray==null) {
        console.log('BxrayForm创建流程')
        this.$refs.bxrayForm.$emit("openEvent", {exist:false, bxrayForm:{info:row.url} } )
      } else {
        console.log('BxrayForm修改流程')
        let para = {page: this.page, url: row.bxray}
        apiGetPatientBxrayForm(para)
        .then((res)=> {
          this.$refs.bxrayForm.$emit("openEvent", {exist:true, bxrayForm:res.data})
        })
        .catch(() => {})
      }
    },
    openCureForm (index, row) {
      if (row.cure==null) {
        console.log('CureForm创建流程')
        this.$refs.cureForm.$emit("openEvent", {exist:false, cureForm:{info:row.url} } )
      } else {
        console.log('CureForm修改流程')
        let para = {page: this.page, url: row.cure}
        apiGetPatientCureForm(para)
        .then((res)=> {
          this.$refs.cureForm.$emit("openEvent", {exist:true, cureForm:res.data})
        })
        .catch(() => {})
      }
    },

  },
  mounted () {
    this.getPatients()
  }
}

</script>

<style scoped>

</style>
