<template>
    <el-form ref="relevantForm" :model="relevantForm" :rules="rules"
            label-width="110px" label-position="left" class="mobile">

      <el-form-item label="体格检查">
        <el-checkbox v-for="(val, key) in body_check" :key="key" :label="val" v-model="relevantForm[key]">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="辅助检查">
        <el-checkbox v-for="(val, key) in assist_check" :key="key" :label="val" v-model="relevantForm[key]">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="检查结果">
        <label>以上检查结果如有异常请输入检查结果</label>
        <el-input v-model="relevantForm.check_result"></el-input>
      </el-form-item>
    </el-form>

</template>
<script>
export default {
  name:'relevantForm',
  data() {
    return {
      body_check:{body_check_wu:"无",body_check_fuke:"妇科检查",body_check_quan:"全身检查"},
      assist_check:{assist_check_wu:"无",assist_check_chao:"超声",assist_check_mri:"盆腔MRI检查",assist_check_gong:"宫腔镜检查",assist_check_fu:"腹腔镜检查",assist_check_zi:"子宫输卵管造影",assist_check_ji:"基础体温测定",assist_check_ji_dan:"单相",assist_check_ji_shuang:"双相",assist_check_pen:"盆腔血流图检查",assist_check_jing:"经血前列腺素测定"},
      relevantForm:{
      },
      rules:{},
    }
  },
  methods: {
  },
};
</script>
<style lang="">
</style>
