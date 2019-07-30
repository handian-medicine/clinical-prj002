<template>
  <el-dialog title="B超"
            :visible.sync="dialogVisible" 
            :close-on-click-modal="false" width="100%" 
            @close='resetDialog'>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientBxrayForm, apiCreatePatientBxrayForm } from '@/api/api'
export default {
  name:'BxrayForm',
  data() {
    return {
      bxrayForm:{},
      dialogVisible: false,
      exist: true,
    }
  },
  methods: {
    updateBxrayForm () {
      apiUpdatePatientBxrayForm(this.bxrayForm)
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch(
      )
    },
    createBxrayForm () {
      apiCreatePatientBxrayForm(this.bxrayForm)
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
      this.bxrayForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      if (!data.exist) {
        //未创建
        this.bxrayForm.info = data.bxrayForm.info
        this.dialogVisible = true
        this.exist = data.exist
      } else {
        //已创建(修改)
        this.bxrayForm = data.bxrayForm
        this.dialogVisible = true
        this.exist = data.exist
      }

    })
  }

}
</script>
<style lang="">
</style>