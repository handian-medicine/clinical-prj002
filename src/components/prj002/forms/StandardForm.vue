<template>
  <el-dialog title="多囊卵巢综合征调查诊断标准" class="my-dialog standard-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="form" :model="form" label-width="130px" label-position="left">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <p></p>
      <el-alert v-if="!isOwnedByUser" effect="dark"
                  title="此条信息为其他用户创建，您无法修改"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider></el-divider>


      <h3><el-radio v-model="form.standard" label="Rotterdam的诊断标准" class="h3-radio" border></el-radio></h3>
        <div v-show="form.standard == 'Rotterdam的诊断标准'">
          <el-checkbox v-model="form.rotterdam_1" label="稀发排卵或无排卵"></el-checkbox>
          <p></p>
          <el-checkbox v-model="form.rotterdam_2" label="高雄激素血症或高雄激素的临床表现（如：多毛、痤疮等）"></el-checkbox>
          <p></p>
          <el-checkbox v-model="form.rotterdam_3" label="卵巢多囊样改变：在月经周期或黄体酮撤退后出血的3-5天进行，超声提示一侧或双侧卵巢直径2-9mm的卵泡≥12个，和（或）卵巢体积≥10ml"></el-checkbox>
          <p></p>
          同时，排除其他导致雄激素过多的疾病如先天性肾上腺皮质增生、库欣综合征、分泌雄激素的肿瘤、大剂量外源性雄激素作用、严重的胰岛素抵抗综合征、甲状腺功能异常、并排除低促性腺激素性无排卵和卵巢早衰等。
        </div>

      <h3><el-radio v-model="form.standard" label="2018年多囊卵巢综合征中国诊疗指南的诊断标准" class="h3-radio" border></el-radio></h3>
        <div v-show="form.standard == '2018年多囊卵巢综合征中国诊疗指南的诊断标准'">
          <h4><el-radio v-model="form.pcos" label="(1)育龄期PCOS的诊断" border></el-radio></h4>
            <div v-show="form.pcos == '(1)育龄期PCOS的诊断'">
              <el-checkbox v-model="form.china_1" label="月经稀发或闭经或不规则子宫出血是诊断的必需条件"></el-checkbox>
              <p>符合下列 2 项中的1项</p>
              <el-checkbox v-model="form.china_2" label="高雄激素临床表现或高雄激素血症；"></el-checkbox>
              <el-checkbox v-model="form.china_3" label="超声下表现为PCOM。"></el-checkbox>
              <p></p>
              同时，排除其他可能引起高雄激素的疾病和引起排卵异常的疾病。（库欣综合征、非经典型先天性肾上腺皮质增生、卵巢或肾上腺分泌雄激素的肿瘤、药物性高雄激素血症、功能性下丘脑性闭经、甲状腺疾病、高PRL血症、早发性卵巢功能不全等。）
            </div>


          <h4><el-radio v-model="form.pcos" label="(2)青春期PCOS的诊断" border></el-radio>(必须同时符合以下3个指标)</h4>
            <div v-show="form.pcos == '(2)青春期PCOS的诊断'">
              <ul style="list-style-type:none;">
                <li>①初潮后月经稀发持续至少2年或闭经</li>
                <li>②高雄激素临床表现或高雄激素血症</li>
                <li>③超声下卵巢PCOM表现</li>
              </ul>
              同时，排除其他可能引起高雄激素的疾病和引起排卵异常的疾病。（库欣综合征、非经典型先天性肾上腺皮质增生、卵巢或肾上腺分泌雄激素的肿瘤、药物性高雄激素血症、功能性下丘脑性闭经、甲状腺疾病、高PRL血症、早发性卵巢功能不全等。）
            </div>
        </div>

    </el-form>
    <span slot="footer">
        <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist"  @click="updateForm">确定</el-button>
        <el-button type="primary" v-else  @click="createForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj002'
export default {
  name:'StandardForm',
  data() {
    return {
      activeName: '1',
      mydata: {
      },
      form:{},
      dialogVisible: false,
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:''
    }
  },
  methods: {
    updateForm () {
      apiUpdatePatientDataForm({formData:this.form,formName:this.formName})
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
    createForm () {
      apiCreatePatientDataForm({formData:this.form,formName:this.formName})
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
      // 清空
      this.form = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      this.check_status = data.check_status
      this.isOwnedByUser = data.isOwnedByUser
      //如果form未创建,需要从infoForm取到url;如果form已创建,form都会被传入的form覆盖
      if (!data.exist) {
        //未创建,form的info接受data.url的值,其余字段初始化为空
        this.form.info = data.formData.info
      } else {
        //已创建(修改),form初始化为从api请求得到的数据
        this.form = data.formData
      }
    })
  }
}
</script>
<style lang="scss">
.standard-dialog {
    .el-checkbox__label {
      display: inline;
    }
    .el-checkbox, .el-checkbox__input {
      white-space: normal;
    }
}
.h3-radio .el-radio__label {
    font-size: 16px;
    padding-left: 10px;
    color:black;
}
</style>

