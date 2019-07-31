<template>
  <el-dialog title="B超"
            :visible.sync="dialogVisible" 
            :close-on-click-modal="false" width="100%" 
            @close='resetDialog'>
    <el-form ref="bxrayForm" :model="bxrayForm" label-width="210px" label-position="left">

      <el-form-item>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" v-if="exist"  @click="updateBxrayForm">确定</el-button>
        <el-button type="primary" v-else  @click="createBxrayForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </el-form-item>

    </el-form>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientBxrayForm, apiCreatePatientBxrayForm } from '@/api/api'
export default {
  name:'BxrayForm',
  data() {
    return {
      mydata: {
        'zigong_chang':'子宫长径',
        'zigong_kuan':'子宫宽径',
        'zigong_qianhou':'子宫前后径',
        'zigong_xingtai':'子宫形态',
        'zigong_juti':'具体形态',
        'zigong_neimo':'子宫内膜厚度',
        'zigong_is_jiliu':'是否存在子宫肌瘤',
        'zigong_weizhi':'子宫肌瘤的位置',
        'zigong_geshu':'子宫肌瘤的个数',
        'zigong_daxiaochang':'最大子宫肌瘤的大小-长',
        'zigong_daxiaokuan':'最大子宫肌瘤的大小-宽',
        'zigong_daxiaogao':'最大子宫肌瘤的大小-高',
        'zigong_xainji':'是否有子宫腺肌症',
        'zuo_chang':'左卵巢长径',
        'zuo_kuan':'左卵巢宽径',
        'zuo_qianhou':'左卵巢前后径',
        'zuo_tiji':'左卵巢体积',
        'zuo_nangzhong':'左卵巢是否有直径>10mm的囊肿',
        'zuo_daxiaochang':'左卵巢最大囊肿大小-长',
        'zuo_daxiaokuan':'左卵巢最大囊肿大小-宽',
        'zuo_xingtai':'左卵巢形态',
        'zuo_paoshu':'左卵巢窦卵泡数',
        'you_chang':'右卵巢长径',
        'you_kuan':'右卵巢宽径',
        'you_qianhou':'右卵巢前后径',
        'you_tiji':'右卵巢体积',
        'you_nangzhong':'右卵巢是否有直径>10mm的囊肿',
        'you_daxiaochang':'右卵巢最大囊肿大小-长',
        'you_daxiaokuan':'右卵巢最大囊肿大小-宽',
        'you_xingtai':'右卵巢形态',
        'you_paoshu':'右卵巢窦卵泡数',
      },
      bxrayForm:{
        zigong_chang: '', zigong_kuan: '', zigong_qianhou: '',
        zigong_xingtai: '', zigong_juti: '',
        zigong_neimo: '',
        zigong_is_jiliu: '', zigong_weizhi: '', zigong_geshu: '', zigong_daxiaochang: '', zigong_daxiaokuan: '', zigong_daxiaogao: '', 
        zigong_xainji: '',
        zuo_chang: '', zuo_kuan: '', zuo_qianhou: '', zuo_tiji: '',
        zuo_nangzhong: '', zuo_daxiaochang: '', zuo_daxiaokuan: '',
        zuo_xingtai: '',
        zuo_paoshu: '',
        you_chang: '', you_kuan: '', you_qianhou: '', you_tiji: '',
        you_nangzhong: '', you_daxiaochang: '', you_daxiaokuan: '',
        you_xingtai: '',
        you_paoshu: '',
        },
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