<template>
  <el-dialog title="提交" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="70%" center>

    <el-form ref="patientInfo" :model="checkData" label-width="130px" label-position="left">
      <h3 style="text-align:center">是否提交此条信息审核？</h3>
      <p style="text-align:center">注：提交后，在审核过程中，此条信息不可更改</p>
    </el-form>
      <span slot="footer">
        <el-button type="primary" @click="submitPatient">提交</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { apiCheckPatient } from '@/api/api-prj002'
export default {
    name:'SubmitPatient',
    data () {
      return {
        checkData: {check:'', check_status:'', reason_for_check:''},
        dialogVisible: false,
      }

    },
    methods: {
      submitPatient () {
          this.checkData.check_status = '已提交'
          apiCheckPatient(this.checkData)
          .then( (res)=> {
            this.$message({message: '提交成功',type: 'success'})
            this.dialogVisible = false
            this.$parent.getPatients()
            }
          )
          .catch()
      }
    },
    created() {
        this.$on("submitEvent", function(data) {
        this.dialogVisible = true
        this.checkData = data
      });
    }
}

</script>

<style lang="scss">

</style>
