<template>
  <el-dialog title="专科病史" class="my-dialog history-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="historyForm" :model="historyForm" label-width="80px" label-position="left">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-alert v-if="check_status=='已提交'" effect="dark"
                  title="此条信息已经提交审核,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <p></p>
      <el-alert v-if="!isOwnedByUser" effect="dark"
                  title="此条信息为其他用户创建，您无法修改"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <p></p>
      <h4>感染性疾病史</h4>
        <p>
          ①阴道炎：
          <el-checkbox v-for="(val, key) in vagina"
                    v-model="historyForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
        </p>
        <p>
          ②性传播疾病：
          <el-checkbox v-for="(val, key) in sex"
                    v-model="historyForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
        </p>
        <p>
          ③泌尿道感染：
          <el-checkbox v-for="(val, key) in urinary"
                    v-model="historyForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
        </p>
        <p>
          ④其他感染：
          <el-checkbox v-for="(val, key) in others"
                    v-model="historyForm[key]"
                    :key="key" :label="val">
          </el-checkbox>
        </p>
      <h4>既往手术史</h4>
        <p>
          ①宫腔手术操作史：<el-checkbox v-model="historyForm.operation_gong">有</el-checkbox>
          <el-checkbox v-for="(val, key) in operation_gong"
                    v-model="historyForm[key]"
                    :key="key" :label="val"
                    v-show="historyForm.operation_gong">
          </el-checkbox>
          <el-input v-model="historyForm.operation_gong_qita" placeholder="其他"></el-input>
        </p>
        <p>
          ②盆腔手术史：<el-checkbox v-model="historyForm.operation_pen">有</el-checkbox>
          <el-checkbox v-for="(val, key) in operation_pen"
                    v-model="historyForm[key]"
                    :key="key" :label="val"
                    v-show="historyForm.operation_pen">
          </el-checkbox>
          <el-input v-model="historyForm.operation_pen_qita" placeholder="其他"></el-input>
        </p>
      <h4>性活动</h4>
        <p>
          ①性生活：<el-checkbox v-model="historyForm.sex_life">有</el-checkbox>
        </p>
        <p>
          ②初次性生活年龄：<el-checkbox v-model="historyForm.sex_life">有</el-checkbox>
        </p>
        <p>
          ③性伴侣：<el-checkbox v-model="historyForm.sex_life">有</el-checkbox>
        </p>
        <p>
          ④性伴侣个数（个）：<el-checkbox v-model="historyForm.sex_life">有</el-checkbox>
        </p>
        <p>
          ⑤性生活频次：<el-checkbox v-model="historyForm.sex_life">有</el-checkbox>
        </p>
        <p>
          ⑥性伴侣是否伴有性传播疾病：<el-checkbox v-model="historyForm.sex_life">有</el-checkbox>
        </p>
      <h4>避孕措施</h4>
      <h4>感染性疾病史</h4>
      <h4>性卫生不良</h4>

    </el-form>

    <span slot="footer">
      <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist" @click="updateHistoryForm">确定</el-button>
      <el-button type="primary" v-else  @click="createHistoryForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj002'
export default {
  name:'HistoryForm',
  data() {
    return {
      "vagina":{
          "vagina_wai":"外阴阴道假丝酵母菌病",
          "vagina_xi":"细菌性阴道病",
          "vagina_xu":"需氧菌性阴道炎",
          "vagina_di":"滴虫性阴道炎",
          "vagina_lao":"老年性阴道炎",
      },
      "sex":{
          "sex_lin":"淋球菌感染",
          "sex_sha":"沙眼衣原体感染",
          "sex_jie":"解脲支原体感染",
          "sex_sheng":"生殖支原体感染",
          "sex_ren":"人型支原体感染",
          "sex_hpv":"HPV感染",
          "sex_zhi":"生殖器疱疹",
      },
      "urinary":{
          "urinary_niao":"尿道炎",
          "urinary_pang":"膀胱炎",
          "urinary_shen":"肾盂肾炎",
      },
      "others":{
          "others_lan":"阑尾炎",
          "others_ji":"急性腹膜炎",
          "others_pen":"盆腔结核",
          "others_jie":"结肠憩室炎",
      },
      "operation_gong":{
          "operation_gong_ren":"人工流产术",
          "operation_gong_gua":"刮宫术",
          "operation_gong_zhi":"节育器置入术",
          "operation_gong_qu":"节育器取出术",
          "operation_gong_tong":"输卵管通液术",
          "operation_gong_zao":"输卵管造影术",
          "operation_gong_gong":"宫腔镜检查",
      },
      "operation_pen":{
          "operation_pen_fujian":"附件切除术",
          "operation_pen_chu":"子宫切除术",
          "operation_pen_jia":"全子宫加双附件切除术",
          "operation_pen_wa":"子宫肌瘤挖除术",
          "operation_pen_tong":"输卵管通液术",
          "operation_pen_jie":"输卵管结扎术",
          "operation_pen_luan":"卵巢囊肿剥除术",
          "operation_pen_fennian":"盆腔分粘术",
          "operation_pen_yiwei":"子宫内膜异位症手术",
          "operation_pen_lawei":"阑尾切除术",
      },



      historyForm:{},
      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:''
    }
  },
  methods: {
    updateHistoryForm () {
      apiUpdatePatientDataForm({formData:this.historyForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        if (res.data.detail) {
          this.$message({message: '对不起, 您没有对该记录操作的权限',type: 'error'})
        } else {
          this.$message({message: '提交成功',type: 'success'})
        }
        this.dialogVisible = false
        this.$parent.searchPatient()
        // this.$parent.getPatients()
      })
      .catch()
    },
    createHistoryForm () {
      apiCreatePatientDataForm({formData:this.historyForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        if (res.data.detail) {
          this.$message({message: '对不起, 您没有对该记录操作的权限',type: 'error'})
        } else {
          this.$message({message: '提交成功',type: 'success'})
        }
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch()
    },
    resetDialog () {
      this.historyForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      this.check_status = data.check_status
      this.isOwnedByUser = data.isOwnedByUser
      if (!data.exist) {
        //未创建
        this.historyForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.historyForm = data.formData
      }
    })
  }

};
</script>
<style lang="scss">
.history-dialog .el-input__inner {
  margin-top: 10px;
}
.history-input .el-input__inner {
  margin-top: 10px;
  padding:0 5px;
}
</style>