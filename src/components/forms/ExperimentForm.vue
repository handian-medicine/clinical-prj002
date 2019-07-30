<template>
  <el-dialog title="实验室检查" :visible.sync="dialogVisible" :close-on-click-modal="false" width="100%" @close='resetDialog'>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientExperimentForm, apiCreatePatientExperimentForm } from '@/api/api'
export default {
  name:'ExperimentForm',
  data() {
    return {
      experimentForm:{},
      dialogVisible: false,
      exist: true,
    }
  },
  methods: {
    updateExperimentForm () {
      apiUpdatePatientExperimentForm(this.experimentForm)
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
      apiCreatePatientExperimentForm(this.experimentForm)
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
      if (!data.exist) {
        //未创建
        this.experimentForm.info = data.experimentForm.info
        this.dialogVisible = true
        this.exist = data.exist
      } else {
        //已创建(修改)
        this.experimentForm = data.experimentForm
        this.dialogVisible = true
        this.exist = data.exist
      }

    })
  }

};
</script>
<style lang="">
</style>