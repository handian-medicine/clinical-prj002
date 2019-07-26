<template>
  <el-dialog title="一般情况" :visible.sync="dialogVisible" :close-on-click-modal="false" width="100%">

    <el-form ref="infoForm" :model="patientInfo" label-width="130px" label-position="left">

      <el-form-item label="姓名">
        <el-input v-model="patientInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="手机号码">
        <el-input v-model="patientInfo.phone"></el-input>
      </el-form-item>

      <el-form-item label="就诊医院">
        <el-input v-model="patientInfo.hospital"></el-input>
      </el-form-item>

      <el-form-item label="出生日期">
        <el-input v-model="patientInfo.birth"></el-input>
      </el-form-item>

      <el-form-item label="职业呢">
        <el-input v-model="patientInfo.career"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addInfo">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </el-form-item>

    </el-form>

  </el-dialog>
</template>

<script>
import { addPatientInfo } from '@/api/api'
export default {
    name:'AddInfo',
    data () {
      return {
        patientInfo:{name:'测试', phone:'13110983476', hospital:'汉典医院', birth:'1980-09', career:'个体'},
        dialogVisible: false
      }

    },
    methods: {
      addInfo () {
        let para = {
          patientInfo: this.patientInfo
        }
        addPatientInfo(para)
        .then( (res)=> {
          this.$message({message: '提交成功',type: 'success'})
          this.dialogVisible = false
          }
        )
        .catch()
      }
    },
    created() {
      this.$on("addEvent", function(data) {
        // this.infoForm = data;
        this.dialogVisible = true;
      });
    }
}
</script>