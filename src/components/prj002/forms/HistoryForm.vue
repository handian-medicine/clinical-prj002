<template>
  <el-dialog title="专病情况" class="my-dialog history-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="historyForm" :model="historyForm" label-width="80px" label-position="left">
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

      <table border="1" cellspacing="0">
        <caption>Feriman－Gallwey多毛症评分表</caption>
        <tr>
          <th>区域</th>
          <th>0分</th> <th>1分</th> <th>3分</th> <th>4分</th>
        </tr>
        <tr v-for="(val, key) in hairy_table" :key="key">
          <td>{{val.name}}</td>
          <td v-for="item in val.list" :key="item"><el-radio v-model="historyForm[key]" :label="item"></el-radio></td>
        </tr>
      </table>

      <el-form-item label="多毛评分">
        <el-input v-model="historyForm.hairy" type="number" min="0"></el-input>
        <img src="@/assets/hair.png" width="90%" alt="多毛图片" />
      </el-form-item>

      <el-form-item label="婚姻史">
        <el-radio v-model="historyForm.marriage"
                  v-for="item in mydata.marriage"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <el-form-item label="孕产史">
        <el-col :sm="24" :md="12" :lg="8" v-for="(val, key) in mydata.pastpreg" :key="key">
          <el-input type="number" min="0" v-model="historyForm[key]">
            <template slot="prepend">{{val}}</template>
            <template slot="append">次</template>
          </el-input>
        </el-col>
          <el-input v-model="historyForm.pastpreg_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <el-form-item label="避孕措施">
        <el-switch v-model="historyForm.prevent_wu" active-text="有" inactive-text="无"></el-switch>
        <div v-show="historyForm.prevent_wu">
          <el-checkbox v-model="historyForm.prevent_jieza" label="结扎" ></el-checkbox>
          <el-checkbox v-model="historyForm.prevent_jieyuqi" label="宫内节育器" ></el-checkbox>
          <el-checkbox v-model="historyForm.prevent_biyuntao" label="避孕套" ></el-checkbox>
          <el-checkbox v-model="historyForm.prevent_biyunyao" label="口服避孕药" ></el-checkbox>
        </div>
      </el-form-item>

      <el-form-item label="家族史">
        一级亲属（父母、兄弟姐妹、子女）其他疾病史
        <el-switch v-model="historyForm.is_pastfamily_womb" active-text="有" inactive-text="无"></el-switch>
        <div v-show="historyForm.is_pastfamily_womb">
          <el-checkbox v-model="historyForm.pastfamily_minus"  label="甲减" ></el-checkbox>
          <el-checkbox v-model="historyForm.pastfamily_plus"  label="甲亢" ></el-checkbox>
          <el-checkbox v-model="historyForm.pastfamily_duonangluanchao"  label="多囊卵巢综合征" ></el-checkbox>
          <el-checkbox v-model="historyForm.pastfamily_tangniaobing"  label="糖尿病" ></el-checkbox>
          <el-checkbox v-model="historyForm.pastfamily_buxiang"  label="不详" ></el-checkbox>
          <el-input v-model="historyForm.pastfamily_qita"></el-input>
        </div>
      </el-form-item>

    </el-form>

    <span slot="footer">
      <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist"  @click="updateHistoryForm">确定</el-button>
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
      hairy_table:{
        "shangchun":{name:"上唇",list:["无毛","散在几根","外侧1/4","全部上唇"]},
        "xiae":     {name:"下额",list:["无毛","散在几根","散在，较多","覆盖下额，密"]},
        "xiongbu":  {name:"胸部",list:["无毛","乳晕周围","乳晕，胸中线","覆盖前胸"]},
        "shangfu":  {name:"上腹",list:["无毛","中线几根","中线，较多","覆盖上腹全部"]},
        "xiafu":    {name:"下腹",list:["无毛","中线几根","中线，细带状","与阴毛相连，菱形"]},
        "shangtun": {name:"上臀",list:["无毛","内侧几根","覆盖内侧面1/2","覆盖内侧面，密"]},
        "datui":    {name:"大腿",list:["无毛","内侧几根","覆盖内侧面1/3","覆盖内侧面，密"]},
        "shangbei": {name:"上背",list:["无毛","散在几根","覆盖上背部1/2","覆盖上背，密"]},
        "yaodi":    {name:"腰骶",list:["无毛","骶部几根","覆盖腰骶部1/2","覆盖整个腰骶部"]},
      },
      mydata:{
        "shangchun":"1",
        first_time:["10岁以前","11岁以后","14岁以后","16岁以后"],
        is_normal:true,
        normal:["21-25天","26-30天","31-35天"],
        abnormal:["或1月多次","1-2个月1行","2-3个月1行","3-4个月1行","4-6个月1行",">6个月1行"],
        cyclicity_sum:["≤2天","3-7天","7天以上甚至半月"],
        blood_cond:["≤5张卫生巾(日用)","6-10张卫生巾(日用)","11-19张卫生巾(日用)","≥20张卫生巾(日用或夜用)","几乎不用卫生巾,用护垫即可"],
        blood_color:["淡红","鲜红","暗红","紫红","紫黯","紫黑","褐色",],
        blood_quality:["正常","粘稠","清稀"],
        blood_block:["无血块","经常出现血块","偶有血块","夹少量小血块","夹较大血块","其他"],
        blood_character:["顺畅","势急暴下","淋漓不断","点滴即净"],
        leucorrhea_quantity:["带下量正常","带下量少","带下量多"],
        leucorrhea_color:["带下透明","带下色黄","带下色白","带下色黄绿"],
        leucorrhea_feature:["带下质黏而不稠","带下质清稀","带下质稠"],
        marriage:["未婚无性生活","未婚有性生活","已婚同居","已婚分居","离婚","丧偶"],
        pastpreg:{pastpreg_yuncount:'怀孕', pastpreg_shunchan:'顺产', pastpreg_pougong:'剖宫产',
                  pastpreg_zaochan:'早产', pastpreg_yaoliu:'药物流产', pastpreg_renliu:'人工流产',
                  pastpreg_ziranliu:'自然流产', pastpreg_yiweirenshen:'异位妊娠',
                  pastpreg_qinggongshu:'清宫术'},
      },
      historyForm:{
        first_time:'', first_time_qita:'',            //月经初潮年龄
        is_normal:true, normal:'', abnormal:'',       //月经周期
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
        this.$parent.getPatients()
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
<style scoped>
.el-input {
  margin-top: 10px;
}
.history-dialog td {
    text-align:left;
}
</style>