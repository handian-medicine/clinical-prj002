<template>
  <el-dialog title="专科病史"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%"
            @close='resetDialog'>
    <el-form ref="historyForm" :model="historyForm" label-width="130px" label-position="left">

      <el-form-item label="月经初潮年龄">
        <el-radio v-model="historyForm.first_time" label="10岁以前"></el-radio>
        <el-radio v-model="historyForm.first_time" label="11岁以后"></el-radio>
        <el-radio v-model="historyForm.first_time" label="14岁以后"></el-radio>
        <el-radio v-model="historyForm.first_time" label="16岁以后"></el-radio>
        <el-input v-model="historyForm.first_time_qita"></el-input>
      </el-form-item>

      <el-form-item label="月经周期 尚规律">
        <el-radio v-model="historyForm.normal" label="21-25天"></el-radio>
        <el-radio v-model="historyForm.normal" label="26-30天"></el-radio>
        <el-radio v-model="historyForm.normal" label="31-35天"></el-radio>
      </el-form-item>
      <el-form-item label="月经周期 不规律">
        <el-radio v-model="historyForm.normal" label="或1月多次"></el-radio>
        <el-radio v-model="historyForm.normal" label="1-2个月1行"></el-radio>
        <el-radio v-model="historyForm.normal" label="2-3个月1行"></el-radio>
        <el-radio v-model="historyForm.normal" label="3-4个月1行"></el-radio>
        <el-radio v-model="historyForm.normal" label="4-6个月1行"></el-radio>
        <el-radio v-model="historyForm.normal" label="＞6个月1行"></el-radio>
      </el-form-item>

      <el-form-item label="行经天数">
        <el-radio v-model="historyForm.cyclicity_sum" label="≤2天"></el-radio>
        <el-radio v-model="historyForm.cyclicity_sum" label="3-7天"></el-radio>
        <el-radio v-model="historyForm.cyclicity_sum" label="7日以上甚至半月"></el-radio>
        <el-input v-model="historyForm.cyclicity_sum_qita"></el-input>
      </el-form-item>

      <el-form-item label="总出血量">
        <el-radio v-model="historyForm.blood_cond" label="≤5张卫生巾（日用）"></el-radio>
        <el-radio v-model="historyForm.blood_cond" label="6-10张卫生巾（日用）"></el-radio>
        <el-radio v-model="historyForm.blood_cond" label="11-19张卫生巾（日用）"></el-radio>
        <el-radio v-model="historyForm.blood_cond" label="≥20张卫生巾（日用或夜用）"></el-radio>
        <el-radio v-model="historyForm.blood_cond" label="几乎不用卫生巾，用护垫即可"></el-radio>
        <el-input v-model="historyForm.blood_color_qita"></el-input>
      </el-form-item>

      <el-form-item label="出血颜色">
        <el-radio v-model="historyForm.blood_color" label="淡红"></el-radio>
        <el-radio v-model="historyForm.blood_color" label="鲜红"></el-radio>
        <el-radio v-model="historyForm.blood_color" label="暗红"></el-radio>
        <el-radio v-model="historyForm.blood_color" label="紫红"></el-radio>
        <el-radio v-model="historyForm.blood_color" label="紫黯"></el-radio>
        <el-radio v-model="historyForm.blood_color" label="紫黑"></el-radio>
        <el-radio v-model="historyForm.blood_color" label="褐色"></el-radio>
        <el-input v-model="historyForm.blood_color_qita"></el-input>
      </el-form-item>

      <el-form-item label="出血质地">
        <el-radio v-model="historyForm.blood_quality" label="正常"></el-radio>
        <el-radio v-model="historyForm.blood_quality" label="粘稠"></el-radio>
        <el-radio v-model="historyForm.blood_quality" label="清稀"></el-radio>
        <el-radio v-model="historyForm.blood_block" label="无血块"></el-radio>
        <el-radio v-model="historyForm.blood_block" label="经常出现血块"></el-radio>
        <el-radio v-model="historyForm.blood_block" label="偶有血块"></el-radio>
        <el-radio v-model="historyForm.blood_block" label="夹少量小血块"></el-radio>
        <el-radio v-model="historyForm.blood_block" label="夹较大血块"></el-radio>
      </el-form-item>

      <el-form-item label="出血特点">
        <el-radio v-model="historyForm.blood_character" label="顺畅"></el-radio>
        <el-radio v-model="historyForm.blood_character" label="势急暴下"></el-radio>
        <el-radio v-model="historyForm.blood_character" label="淋漓不断"></el-radio>
        <el-radio v-model="historyForm.blood_character" label="点滴即净"></el-radio>
        <el-input v-model="historyForm.first_time_qita"></el-input>
      </el-form-item>

      <el-form-item label="经期伴随症状">
        <el-switch v-model="historyForm.menstruation_is_accompany" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>

      <el-form-item label="末次行经日期">
        <el-input v-model="historyForm.last_time"></el-input>
      </el-form-item>

      <el-form-item label="平素带下情况">
        <el-form-item label="量">
          <el-radio v-model="historyForm.leucorrhea_quantity" label="顺畅"></el-radio>
          <el-radio v-model="historyForm.leucorrhea_quantity" label="势急暴下"></el-radio>
          <el-radio v-model="historyForm.leucorrhea_quantity" label="淋漓不断"></el-radio>
        </el-form-item>
        <el-form-item label="色">
          <el-radio v-model="historyForm.leucorrhea_color" label="顺畅"></el-radio>
          <el-radio v-model="historyForm.leucorrhea_color" label="势急暴下"></el-radio>
          <el-radio v-model="historyForm.leucorrhea_color" label="淋漓不断"></el-radio>
          <el-input v-model="historyForm.leucorrhea_color_qita"></el-input>
        </el-form-item>
        <el-form-item label="质">
          <el-radio v-model="historyForm.leucorrhea_feature" label="顺畅"></el-radio>
          <el-radio v-model="historyForm.leucorrhea_feature" label="势急暴下"></el-radio>
          <el-radio v-model="historyForm.leucorrhea_feature" label="淋漓不断"></el-radio>
        </el-form-item>
      </el-form-item>

      <el-form-item label="孕产史">
      </el-form-item>

      <el-form-item label="避孕措施">
      </el-form-item>

      <el-form-item label="家族史">
      </el-form-item>

    </el-form>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientHistoryForm, apiCreatePatientHistoryForm } from '@/api/api'
export default {
  name:'HistoryForm',
  data() {
    return {
      historyForm:{
        first_time:'', first_time_qita:'',            //月经初潮年龄
        normal:'', abnormal:'',                       //月经周期
        cyclicity_sum:'', cyclicity_sum_qita:'',      //行经天数
        blood_cond:'', blood_cond_qita:'',            //总出血量
        blood_color:'', blood_color_qita:'',          //出血颜色
        blood_quality:'', blood_block:'',             //出血质地
        blood_character:'',                           //出血特点
        menstruation_is_accompany:'',                 //经期伴随症状
        last_time:'',                                 //末次行经日期
        leucorrhea_quantity:'',                       //平素带下情况
        leucorrhea_color:'', leucorrhea_color_qita:'',//平素带下情况
        leucorrhea_feature:'',                        //平素带下情况
        marriage:'',                                  //婚姻史
        //孕产史
        pastpreg_yuncount:'', pastpreg_shunchan:'', pastpreg_pougong:'', pastpreg_zaochan:'', pastpreg_yaoliu:'', pastpreg_renliu:'', pastpreg_ziranliu:'', pastpreg_yiweirenshen:'', pastpreg_qinggongshu:'', pastpreg_qita:'',
        //避孕措施
        prevent_wu:'', prevent_jieza:'', prevent_jieyuqi:'', prevent_biyuntao:'', prevent_biyunyao:'',
        //家族史
        is_pastfamily_womb:'', pastfamily_minus:'', pastfamily_plus:'', pastfamily_duonangluanchao:'', pastfamily_tangniaobing:'', pastfamily_buxiang:'', pastfamily_qita:''
      },
      dialogVisible: false,
      exist: true,
    }
  },
  methods: {
    updateHistoryForm () {
      apiUpdatePatientHistoryForm(this.historyForm)
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch(
      )
    },
    createHistoryForm () {
      apiCreatePatientHistoryForm(this.historyForm)
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
      this.historyForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      if (!data.exist) {
        //未创建
        this.historyForm.info = data.historyForm.info
        this.dialogVisible = true
        this.exist = data.exist
      } else {
        //已创建(修改)
        this.historyForm = data.historyForm
        this.dialogVisible = true
        this.exist = data.exist
      }

    })
  }

};
</script>
<style lang="">
</style>