<template>
  <el-dialog title="一般情况" class="my-dialog" :rules="rules"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="90%" center>
    <el-form ref="infoForm" :model="infoForm" label-width="90px" label-position="right">
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

          <el-radio v-model="infoForm.shenghuo_sport"
                    v-for="item in shenghuo_sport"
                    :key="item" :label="item">
          </el-radio>
          <el-checkbox v-for="(val, key) in shenghuo_xingwei" :key="key"
                      v-model="infoForm[key]" :label="val">
          </el-checkbox>
          <el-input v-model="infoForm.zhong_xu_qita" placeholder="其他"></el-input>

      <h4>病人来源</h4>
        <el-radio v-model="infoForm.patients_from"
                  v-for="item in patients_from"
                  :key="item" :label="item">
        </el-radio>
      <h4>出生日期</h4>
        <el-date-picker v-model="infoForm.patient_birth"
                type="month" placeholder="选择日期"
                format="yyyy 年 MM 月"
                value-format="yyyy-MM">
        </el-date-picker>
      <h4>身高</h4>
        <el-input v-model="infoForm.height" placeholder="身高"></el-input>
      <h4>体重</h4>
        <el-input v-model="infoForm.weight" placeholder="体重"></el-input>
      <h4>民族</h4>
        <el-select v-model="infoForm.nation" placeholder="请选择">
          <el-option v-for="item in nationSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      <h4>职业</h4>
        <el-select v-model="infoForm.career" placeholder="请选择">
          <el-option v-for="item in careerSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      <h4>文化程度</h4>
        <el-select v-model="infoForm.culture1" prop="culture" placeholder="请选择">
          <el-option v-for="item in cultureSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      <h4>配偶的受教育程度</h4>
        <el-select v-model="infoForm.culture2" prop="culture" placeholder="请选择">
          <el-option v-for="item in cultureSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      <h4>特殊接触环境</h4>
      <h4>职业体力劳动强度</h4>
      <h4>生活工作方式</h4>
      <h4>饮食偏好</h4>
      <h4>特殊嗜好</h4>
      <h4>传染病史</h4>
      <h4>其他病史</h4>
      <h4>月经史</h4>
      <h4>带下史</h4>
      <h4>婚姻状况</h4>
      <h4>孕产史</h4>
      <h4>家族史</h4>

      <el-form-item label="患者姓名" prop="patient_name">
        <el-input v-model="infoForm.patient_name"></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="patient_phone">
        <el-input v-model="infoForm.patient_phone"></el-input>
      </el-form-item>

      <el-form-item label="就诊医院" prop="hospital_name">
        <el-input v-model="infoForm.hospital_name"></el-input>
      </el-form-item>


      <el-form-item label="病人现住址">
        <el-input v-model="infoForm.address"></el-input>
      </el-form-item>

      <el-form-item label="体重指数">
        <el-tag>
          {{infoForm.weight2height = BMI }}kg/m<sup>2</sup>
        </el-tag>
      </el-form-item>

      <el-form-item label="臀围">
        <el-input v-model="infoForm.hipline" type="number" min="0">
          <template slot="append">cm</template>
        </el-input>
      </el-form-item>

      <el-form-item label="腰围">
        <el-input v-model="infoForm.waistline" type="number" min="0">
          <template slot="append">cm</template>
        </el-input>
      </el-form-item>

      <el-form-item label="腰臀比">
        <el-tag>
          {{infoForm.waist2hip =  waist2hip }}
        </el-tag>
      </el-form-item>

      <el-form-item label="血压">
        <el-input placeholder="舒张压" v-model="infoForm.blood_pressure_diastolic" type="number" min=0 class="input-embedding">
          <el-input v-model="infoForm.blood_pressure_systolic" slot="prepend" type="number" min=0 placeholder="收缩压">
          </el-input>
          <template slot="append">mm Hg</template>
        </el-input>
      </el-form-item>
      <el-form-item label="脉搏">
        <el-input v-model="infoForm.pulse" type="number" min="0">
          <template slot="append">次/分</template>
        </el-input>
      </el-form-item>
      <el-form-item label="呼吸">
        <el-input v-model="infoForm.breath" type="number" min="0">
          <template slot="append">次/分</template>
        </el-input>
      </el-form-item>
      <el-form-item label="体温">
        <el-input v-model="infoForm.temperature" type="number" min="0">
          <template slot="append">℃</template>
        </el-input>
      </el-form-item>

      <el-form-item label="特殊工作环境">
        <el-checkbox v-for="(val, key) in specialCheckbox" :key="key" :label="val" v-model="infoForm[key]">
        </el-checkbox>
      </el-form-item>

      <el-form-item label="饮食偏好">
        <el-checkbox v-for="(val, key) in dietCheckbox" :key="key" :label="val" v-model="infoForm[key]">
        </el-checkbox>
        <el-input v-model="infoForm.yinshi_qita" placeholder="其他"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer">
        <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from '@/api/api-prj005'
export default {
  name: "InfoForm",
  data() {
    return {
      dialogVisible: false,
      infoForm: {},
      'patients_from':['门诊', '病房'],
      "nationSelection": ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
                        "瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族","傈傈族","佤族","畲族","高山族","拉祜族",
                        "水族","东乡族","纳西族","景颇族","科尔克孜族","土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族",
                        "毛难族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族",
                        "崩龙族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族","其它"],
      "careerSelection": ["学生","专业技术人员","机关、企业、单位负责人","农、林、牧、渔生产人员","军人","办事人员和有关人员","商业和服务业人员","生产运输、设备操作人员","无业","其它"],
      "cultureSelection": ["未接受国家教育","小学及以下","初中","高中/中专 ","大专","本科","研究生及以上"],
      "specialCheckbox": {"wu":"无","special_gaowen":"高温","special_diwen":"低温","special_yeban":"夜班","special_zao":"噪声","special_fu":"辐射","special_hua":"化工污染","special_ju":"剧烈运动","special_qi":"汽油","special_kong":"高空","special_wu":"无"},
      "dietCheckbox":    {"yinshi_wuteshu":"无特殊","yinshi_qingdan":"清淡","yinshi_suan":"酸","yinshi_xian":"咸","yinshi_xinla":"辛辣","yinshi_you":"油腻","yinshi_gaozhi":"高脂","yinshi_laji":"垃圾食品"},
      
      
      rules:{
          patient_name: [
            {required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          patient_date: [
            {required: true, message: '请输入就诊日期', trigger: 'blur' }
          ],
          hospital_name:[
            {required: true, message: '请填写就诊医院名称'}
          ],
          hospital_belong:  [
            {required: true, message: '请填写就诊医院所属级别'}
          ],
          patient_phone: [
            {required: true, pattern: /^1\d{10}$/, message: '请输入11位手机号码',trigger: 'blur'}
          ]
        },
      exist: true,
      formName:'',
      isOwnedByUser: true,
      check_status:''
    }
  },
  computed:{
    BMI () {
      const flag = (this.infoForm.weight==undefined) || (this.infoForm.height==undefined) || (this.infoForm.weight==null) || (this.infoForm.height==null) || Number(this.infoForm.height)== 0
      if (!flag) {
        var bmi = 10000 * Number(this.infoForm.weight) / (Number(this.infoForm.height) * Number(this.infoForm.height))
        return bmi.toFixed(1)
      }
      else {
        return 0
      }
    },
    waist2hip () {
      const flag = (this.infoForm.waistline==undefined) || (this.infoForm.hipline==undefined) || (this.infoForm.waistline==null) || (this.infoForm.hipline==null) || Number(this.infoForm.hipline)== 0
      if (!flag) {
        var ratio = Number(this.infoForm.waistline) / Number(this.infoForm.hipline)
        return ratio.toFixed(2)
      }
      else {
        return 0
      }
    }
  },
  methods: {
    showmsg(message){
      console.log(message)
    },
    updateInfoForm () {
      apiUpdatePatientDataForm({formData:this.infoForm,formName:this.formName})
      .then((res)=> {
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
  },
  created() {
      this.$on("openEvent", (data)=>{
        console.log('一般情况获取到的数据',data)
        this.dialogVisible = true
        this.exist = data.exist
        this.formName = data.formName
        this.check_status = data.check_status
        this.isOwnedByUser = data.isOwnedByUser
        if (!data.exist) {
          //未创建
          this.infoForm.info = data.formData.info
        } else {
          //已创建(修改)
          this.infoForm = data.formData
        }
      });
    }
};
</script>
<style lang="scss">
</style>
