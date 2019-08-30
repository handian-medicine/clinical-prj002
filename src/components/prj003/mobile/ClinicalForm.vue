<template>
    <el-form ref="clinicalForm" :model="clinicalForm" :rules="rules"
            label-width="110px" label-position="left" class="mobile">

      <h3>中医诊断</h3>
      <el-form-item label="痛经" >
          <el-switch v-model="clinicalForm.zhong_tongjing" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item label="实证">
        <el-radio v-model="clinicalForm.shizheng"
                  v-for="item in shizheng"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="clinicalForm.shizheng_qita" ></el-input>
      </el-form-item>
      <el-form-item label="虚证">
        <el-radio v-model="clinicalForm.xuzheng"
                  v-for="item in xuzheng"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="clinicalForm.xuzheng_qita" ></el-input>
      </el-form-item>
      <el-form-item label="虚实夹杂证">
        <el-input v-model="clinicalForm.xushi" ></el-input>
      </el-form-item>

      <h3>西医诊断</h3>
      <el-form-item label="原发性痛经" >
          <el-switch v-model="clinicalForm.xi_tongjing" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
    </el-form>

</template>
<script>
export default {
  name:'ClinicalForm',
  data() {
    return {
      shizheng:["寒凝血瘀证","气滞血瘀证","湿热瘀阻证","肝郁化火证"],
      xuzheng:["肾虚证","肾气亏虚证","肝肾亏损证","阳虚内寒证","气血虚弱证"],
      clinicalForm: {
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
