<template>
    <el-form ref="infoForm" :model="infoForm" :rules="rules"
            class="mobile" label-width="100px" label-position="right">
      <el-form-item label="辅助医生" prop="owner">
        <el-select v-model="infoForm.area"
                  @change="getHospital"
                  :loading="loading"
                  placeholder="请选择地区">
          <template slot="prefix"><i class="fa fa-globe" aria-hidden="true"></i></template>
          <el-option v-for="item in area_options" :key="item" :value="item">
          </el-option>
        </el-select>
        <el-select v-model="infoForm.hospital2"
                  @change="getOwner"
                  :loading="loading"
                  placeholder="请选择医院">
          <template slot="prefix"><i class="fa fa-hospital-o" aria-hidden="true"></i></template>
          <el-option v-for="item in hospital_options" :key="item" :value="item">
          </el-option>
        </el-select>
        <el-select v-model="infoForm.owner" placeholder="请选择医生">
          <template slot="prefix"><i class="fa fa-user" aria-hidden="true"></i></template>
          <el-option v-for="item in owner_options" :key="item.id" :value="item.id" :label="item.user_name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="患者姓名" prop="name">
        <el-input v-model="infoForm.name"></el-input>
        <!-- <el-input v-model="infoForm.name"><template slot="prepend">患者姓名</template></el-input> -->
      </el-form-item>

      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="infoForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="就诊医院" prop="hospital">
        <el-input v-model="infoForm.hospital"></el-input>
      </el-form-item>

      <el-form-item label="出生日期" prop="birth">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker v-model="infoForm.birth"
                        type="month" placeholder="选择日期"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="民族">
        <el-select v-model="infoForm.nation" placeholder="请选择">
          <el-option v-for="item in nationSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="职业" prop="career">
        <el-select v-model="infoForm.career" placeholder="请选择">
          <el-option v-for="item in careerSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="病人现住址">
        <el-input v-model="infoForm.address"></el-input>
      </el-form-item>

      <el-form-item label="身高">
        <el-input v-model="infoForm.height" type="number" min="0">
            <template slot="append">cm</template>
        </el-input>
      </el-form-item>

      <el-form-item label="体重">
        <el-input v-model="infoForm.weight" type="number" min="0">
          <template slot="append">kg</template>
        </el-input>
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

      <el-form-item label="特殊工作环境">
        <el-checkbox v-for="(val, key) in specialCheckbox" :key="key" :label="val" v-model="infoForm[key]">
        </el-checkbox>
      </el-form-item>

      <el-form-item label="饮食偏好">
        <el-checkbox v-for="(val, key) in dietCheckbox" :key="key" :label="val" v-model="infoForm[key]">
        </el-checkbox>
        <el-input v-model="infoForm.yinshi_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="多毛评分">
        <el-input v-model="infoForm.hairy" type="number" min="0"></el-input>
      </el-form-item>

      <h4>患者是否有痤疮&nbsp;&nbsp;<el-switch v-model="infoForm.acne" active-text="是" inactive-text="否"></el-switch></h4>
        <div v-show="infoForm.acne">
          <el-col :sm="24" :md="12">
            <el-input v-model="infoForm.acne_part">
              <template slot="prepend">请描述具体部位</template>
            </el-input>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-input v-model="infoForm.acne_score" type="number" min="0" max="5">
              <template slot="prepend">评分</template>
            </el-input>
          </el-col>
            <el-table :data="acneData" style="width: 100%">
              <el-table-column prop="field1" label="评分"></el-table-column>
              <el-table-column prop="field2" label="类型"></el-table-column>
              <el-table-column prop="field3" label="部位"></el-table-column>
            </el-table>
        </div>

      <h4>患者是否有皮脂腺分泌过旺 &nbsp;&nbsp;<el-switch v-model="infoForm.glandula" active-text="是" inactive-text="否"></el-switch></h4>
        <div v-if="infoForm.glandula">
          <el-form-item label="具体部位">
            <el-input v-model="infoForm.glandula_part"></el-input>
          </el-form-item>
          <el-form-item label="分泌程度">
            <el-radio-group v-model="infoForm.glandula_level">
              <el-radio label="轻">轻</el-radio>
              <el-radio label="中">中</el-radio>
              <el-radio label="重">重</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

      <h4>患者是否有雄性脱发&nbsp;&nbsp;<el-switch v-model="infoForm.male" active-text="是" inactive-text="否"></el-switch></h4>
        <div v-if="infoForm.male">
          <el-form-item label="具体部位">
            <el-input v-model="infoForm.male_part"></el-input>
          </el-form-item>
          <el-form-item label="脱发程度">
            <el-radio-group v-model="infoForm.male_level">
              <el-radio label="轻">轻</el-radio>
              <el-radio label="中">中</el-radio>
              <el-radio label="重">重</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

    </el-form>
</template>
<script>
import {apiMobileArea,apiMobileHospital,apiMobileOwner} from '@/api/api-prj002'
export default {
  name: "InfoForm",
  data() {
    return {
      loading: true,
      infoForm: {
        // "name":"prj002mobile",
        // "phone":"13212345678",
        // "hospital":"汉典",
        // "birth":"2000-09",
        // "career":"学生"
        "name":"",
        "phone":"",
        "hospital":"",
        "birth":"",
        "career":"",
        "owner":""
      },
      nationSelection: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
                        "瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族","傈傈族","佤族","畲族","高山族","拉祜族",
                        "水族","东乡族","纳西族","景颇族","科尔克孜族","土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族",
                        "毛难族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族",
                        "崩龙族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族","其它"],
      careerSelection: ["学生","个体","农民","军人","工人","财会人员","技术人员","服务业","科教文卫","行政管理","无业","其它"],
      specialCheckbox: {"special_gaowen":"高温","special_diwen":"低温","special_yeban":"夜班","special_zao":"噪声","special_fu":"辐射","special_hua":"化工污染","special_ju":"剧烈运动","special_qi":"汽油","special_kong":"高空","special_wu":"无"},
      dietCheckbox:    {"yinshi_wuteshu":"无特殊","yinshi_sushi":"素食","yinshi_suan":"酸","yinshi_xian":"咸","yinshi_xinla":"辛辣","yinshi_you":"油","yinshi_shengleng":"生冷","yinshi_cafei":"含咖啡因食物或饮品"},
      acneData:[{field1: '0', field2: '无', field3: '无'},
                {field1: '1', field2: '轻微', field3: '痤疮≥2mm，面部或躯干<10个'},
                {field1: '2', field2: '轻', field3: '痤疮10-20个'},
                {field1: '3', field2: '中', field3: '痤疮>20个或脓疱<20个'},
                {field1: '4', field2: '重', field3: '脓疱≥20个'},
                {field1: '5', field2: '囊性', field3: '炎性病损≥5mm'}],
      rules:{
          name: [{required: true, message: '一般信息: 请输入姓名', trigger: 'blur' }],
          phone: [{required: true, pattern: /^1\d{10}$/, message: '一般信息: 请输入11位手机号码',trigger: 'blur'}],
          hospital:[{required: true, message: '一般信息: 请填写就诊医院名称'}],
          career:  [{required: true, message: '一般信息: 请填写职业'}],
          birth:  [{required: true, message: '一般信息: 请填写出生年月'}],
          owner:  [{required: true, message: '一般信息: 请填写辅助医生信息'}],
        },
      area_options:[],
      hospital_options:[],
      owner_options:[]
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
  mounted () {
    /* 注释块 用来测试，加延时 */
    // var that  = this
    // that.loading = true
    // apiMobileArea()
    //   .then( (res) => {
    //     const area_data = res.data.area_data
    //     console.log('wait for 10 seconds . . . . ');
    //     return new Promise(function(resolve, reject) {
    //         setTimeout(() => {
    //             for(var i = 0, len = area_data.length; i < len; i++){that.area_options.push(area_data[i].area)}
    //             that.loading = false
    //             console.log('10 seconds Timer expired!!!');
    //             resolve();
    //         }, 3000)
    //     });
    //   }).catch()
    this.loading = true
    apiMobileArea()
      .then( (res) => {
        const area_data = res.data.area_data
        for(var i = 0, len = area_data.length; i < len; i++){this.area_options.push(area_data[i].area)}
        this.loading = false
      }).catch()
  },
  methods: {
    getHospital (area) {
      this.loading = true
      this.owner_options = []
      this.hospital_options = []
      this.infoForm.owner = ''
      this.infoForm.hospital2 = ''
      apiMobileHospital({area:area})
      .then( (res) => {
        const hospital_data = res.data.hospital_data
        // console.log("返回医院数据",hospital_data)
        for(var i = 0, len = hospital_data.length; i < len; i++){
          this.hospital_options.push(hospital_data[i].hospital)
        }
        this.loading = false

      }).catch()
    },
    getOwner (hospital) {
      this.loading = true
      this.owner_options = []
      this.infoForm.owner = ''
      apiMobileOwner({hospital:hospital})
      .then( (res) => {
        const owner_data = res.data.owner_data
        // console.log("返回医院数据console.log("返回医生数据",owner_data)
        for(var i = 0, len = owner_data.length; i < len; i++){
          this.owner_options.push(owner_data[i])
        }
        this.loading = false
      }).catch()
    }
  }

}
</script>