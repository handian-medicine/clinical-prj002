<template>
  <el-dialog title="治疗" :visible.sync="dialogVisible" :close-on-click-modal="false" width="100%" @close='resetDialog'>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientCureForm, apiCreatePatientCureForm } from '@/api/api'
export default {
  name:'CureForm',
  data() {
    return {
      cureForm:{},
      dialogVisible: false,
      exist: true,
    }
  },
  methods: {
    updateCureForm () {
      apiUpdatePatientCureForm(this.cureForm)
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch(
      )
    },
    createCureForm () {
      apiCreatePatientCureForm(this.cureForm)
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
      this.cureForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      if (!data.exist) {
        //未创建
        this.cureForm.info = data.cureForm.info
        this.dialogVisible = true
        this.exist = data.exist
      } else {
        //已创建(修改)
        this.cureForm = data.cureForm
        this.dialogVisible = true
        this.exist = data.exist
      }

    })
  }

};
</script>
<style lang="">
</style>