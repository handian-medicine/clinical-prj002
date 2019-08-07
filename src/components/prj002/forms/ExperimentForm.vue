<template>
  <el-dialog title="实验室检查" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="experimentForm" :model="experimentForm" label-width="210px" label-position="left">
      <el-form-item v-for="(val, key) in mydata" :key="key" :label="val">
        <!-- 这里应该提供度量单位 -->
        <el-input v-model="experimentForm[key]" type="number" min="0"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer">
      <el-button type="primary" v-if="exist"  @click="updateExperimentForm">确定</el-button>
      <el-button type="primary" v-else  @click="createExperimentForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api'
export default {
  name:'ExperimentForm',
  data() {
    return {
      experimentForm:{
          check_gaotong:'',           //睾酮（T）
          check_ci:'',                //雌二醇（E2）
          check_huangti:'',           //黄体生成素（LH）
          check_luanpao:'',           //卵泡刺激素（FSH）
          check_xue:'',               //血清泌乳素（PRL）
          check_xuetang:'',           //空腹血糖（FPG）
          check_yidaosu:'',           //空腹胰岛素（FINS）
          check_canxue:'',            //餐后30mins血糖（FPG）
          check_canyi:'',             //餐后30mins胰岛素（FINS）
          check_cantang:'',           //餐后60mins血糖（FPG）
          check_candao:'',            //餐后60mins胰岛素（FINS）
          check_canxuetang:'',        //餐后120mins血糖（FPG）
          check_canyidao:'',          //餐后1200mins胰岛素（FINS）
          check_xuezhi:'',            //空腹血脂
          check_gaomizhi:'',          //空腹高密度脂蛋白
          check_dimizhi:''            //空腹低密度脂蛋白
      },
      mydata:{
            'check_gaotong':'睾酮（T）','check_ci':'雌二醇（E2）','check_huangti':'黄体生成素（LH）',
            'check_luanpao':'卵泡刺激素（FSH）','check_xue':'血清泌乳素（PRL）','check_xuetang':'空腹血糖（FPG）',
            'check_yidaosu':'空腹胰岛素（FINS）','check_canxue':'餐后30mins血糖（FPG）',
            'check_canyi':'餐后30mins胰岛素（FINS）','check_cantang':'餐后60mins血糖（FPG）',
            'check_candao':'餐后60mins胰岛素（FINS）','check_canxuetang':'餐后120mins血糖（FPG）',
            'check_canyidao':'餐后1200mins胰岛素（FINS）','check_xuezhi':'空腹血脂','check_gaomizhi':'空腹高密度脂蛋白',
            'check_dimizhi':'空腹低密度脂蛋白'
      },
      dialogVisible: false,
      exist: true,
      formName:''
    }
  },
  methods: {
    updateExperimentForm () {
      apiUpdatePatientDataForm({formData:this.experimentForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch(
      )
    },
    createExperimentForm () {
      apiCreatePatientDataForm({formData:this.experimentForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch(
      )
    },
    resetDialog () {
      this.experimentForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      if (!data.exist) {
        //未创建
        this.experimentForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.experimentForm = data.formData
      }
    })
  }

};
</script>
<style lang="">
</style>