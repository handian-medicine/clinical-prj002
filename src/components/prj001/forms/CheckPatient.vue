<template>
  <el-dialog title="审查" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="70%" center>

    <el-form ref="patientInfo" :model="patientInfo" :rules="rules" label-width="130px" label-position="left">

      <el-form-item label="就诊医院" prop="hospital">
        <el-input v-model="patientInfo.hospital"></el-input>
      </el-form-item>

    </el-form>
      <span slot="footer">
        <el-button type="primary" @click="checkPatient">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { apiCheckPatient } from '@/api/api-prj002'
export default {
    name:'AddPatient',
    data () {
      return {
        patientInfo: {name:'测试用', phone:'13110983476', hospital:'汉典医院', birth:'1980-09', career:'个体'},
        // patientInfo: {name:'', phone:'', hospital:'', birth:'', career:''},
        careerSelection: ["学生","个体","农民","军人","工人","财会人员","技术人员","服务业","科教文卫","行政管理","无业","其它"],
        dialogVisible: false,
        rules:{
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            {required: true, pattern: /^1\d{10}$/, message: '请输入11位手机号码',trigger: 'blur'}
          ],
          hospital:[{required: true, message: '请填写就诊医院名称'}],
          birth:   [{required: true, message: '请填写出生日期'}],
          career:  [{required: true, message: '请填写职业'}]
        }
      }

    },
    methods: {
      checkPatient () {
        this.$refs.patientInfo.validate( (valid) => {
          if (valid) {
            let para = {
              patientInfo: this.patientInfo
            }
            apiAddPatient(para)
            .then( (res)=> {
              this.$message({message: '提交成功',type: 'success'})
              this.dialogVisible = false
              this.$parent.getPatients()
              }
            )
            .catch()
          } else {
            this.$message({message: '请填写完整信息',type: 'warning'})
            return false;
          }
        })

      }
    },
    created() {
      this.$on("addEvent", function(data) {
        this.dialogVisible = true;
      });
    }
}

</script>

<style lang="scss">

</style>
