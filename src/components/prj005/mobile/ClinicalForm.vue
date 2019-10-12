<template>
    <el-form ref="clinicalForm" :model="clinicalForm"
            class="mobile" label-width="100px" label-position="left">


      <el-form-item label="1、中医诊断">
          <el-checkbox v-for="(val, key) in mydata.zhongyi" :key="key" :label="val" v-model="clinicalForm[key]"></el-checkbox>
          <el-input v-model="clinicalForm.zhong_qita" placeholder="其他"></el-input>
      </el-form-item>

      <h4 style="color:cornflowerblue">2、辨证分型</h4>
        <el-form-item label="虚证">
          <el-checkbox v-for="(val, key) in mydata.xuzheng" :key="key" :label="val" v-model="clinicalForm[key]"></el-checkbox>
          <el-input v-model="clinicalForm.bian_xu_qita" placeholder="其他" ></el-input>
        </el-form-item>
        <el-form-item label="实证">
          <el-checkbox v-for="(val, key) in mydata.shizheng" :key="key" :label="val" v-model="clinicalForm[key]"></el-checkbox>
          <el-input v-model="clinicalForm.bian_shi_qita" placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item label="虚实夹杂证">
          <el-checkbox v-for="(val, key) in mydata.xushi" :key="key" :label="val" v-model="clinicalForm[key]"></el-checkbox>
          <el-input v-model="clinicalForm.bian_xushi_qita" placeholder="其他"></el-input>
        </el-form-item>

      <el-form-item label="3、西医诊断">
        <el-checkbox label="多囊卵巢综合征" v-model="clinicalForm.xiyi_duonang"></el-checkbox>
        <el-input v-model="clinicalForm.xi_qita" placeholder="其他" ></el-input>
      </el-form-item>

    </el-form>

</template>
<script>
export default {
  name:'ClinicalForm',
  data() {
    return {
      mydata: {
        zhongyi:{"zhong_bijing":"闭经", "zhong_buyun":"不孕", "zhong_zhengjia":"癥瘕", "zhong_benglou":"崩漏", "zhong_shitiao":"月经失调"},
        xuzheng:{"xu_piqixu":"脾气虚证", "xu_pishenyangxu":"脾肾阳虚证", "xu_piyangxu":"脾阳虚证", "xu_shenqixu":"肾气虚证",
                "xu_shenyinxu":"肾阴虚证", "xu_shenyangxu":"肾阳虚证", "xu_xuexu":"血虚证", "xu_yinxuneire":"阴虚内热证"},
        shizheng:{"shi_shire":"肝经湿热证", "shi_qizhi":"肝郁气滞证", "shi_yure":"肝经郁热证", "shi_qizhixueyu":"气滞血瘀证",
                  "shi_tanshi":"痰湿证", "shi_xueyu":"血瘀证", "shi_hujie":"痰瘀互结证"},
        xushi:{"xushi_pixutanshi":"脾虚痰湿证", "xushi_shenxuganyu":"肾虚肝郁证", "xushi_shenxutanshi":"肾虛痰湿证", "xushi_shenxuxueyu":"肾虚血瘀证", "xushi_shenxuneire":"肾虚内热证"}
      },
      clinicalForm: {
        "zhong_bijing":'', "zhong_buyun":'', "zhong_zhengjia":'', "zhong_benglou":'', "zhong_shitiao":'', "zhong_qita":'',
        "xu_piqixu":'', "xu_piyangxu":'', "xu_shenqixu":'', "xu_shenyinxu":'', "xu_shenyangxu":'', "xu_xuexu":'', "xu_yinxuneire":'', "xu_qita":'',
        "shi_shire":'', "shi_qizhi":'', "shi_yure":'', "shi_qizhixueyu":'', "shi_tanshi":'', "shi_xueyu":'', "shi_hujie":'', "shi_qita":'',
        "xushi_pixutanshi":'', "xushi_shenxuganyu":'', "xushi_shenxutanshi":'', "xushi_shenxuxueyu":'', "xushi_shenxuneire":'', "xushi_qita":'',
        "xiyi_duonang":'', "xiyi_qita":'',
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      check_status:''
    }
  },
  methods: {
  },

};
</script>
<style lang="">
</style>