<template>
  <el-dialog title="治疗" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="cureForm" :model="cureForm" label-width="160px" label-position="left">
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

      <el-form-item label="治疗方式">
        <el-checkbox v-for="(val, key) in cure_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
      </el-form-item>

      <h4>中医治疗</h4>
      <el-form-item label="中医治疗方式">
        <el-checkbox v-for="(val, key) in zhong_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="中医治法">
      </el-form-item>
      <el-form-item label="①实证治法">
        <el-checkbox v-for="(val, key) in zhong_shi_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.zhong_shi_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="②虚实夹杂证治法">
        <el-checkbox v-for="(val, key) in zhong_jia_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.zhong_jia_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="中药汤药治疗">
      </el-form-item>
      <el-form-item label="①实证代表方">
        <el-checkbox v-for="(val, key) in zhong_tang_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.zhong_tang_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="②虚实夹杂证代表方">
        <el-checkbox v-for="(val, key) in zhong_tang_za_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.zhong_tang_za_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="药汤药服用疗程">
          <label>共服用</label>
          <el-input v-model="cureForm.drink_total" style="width: 250px;">
            <template slot="append">天</template>
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>共服用中药</label>
          <el-input v-model="cureForm.drink_zhong"  style="width: 250px;">
            <template slot="append">付</template>
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>若现在正在服用，使用方剂名称</label>
          <el-input v-model="cureForm.drink_name"  style="width: 250px;">
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>已服用</label>
          <el-input v-model="cureForm.drink_already"  style="width: 250px;">
            <template slot="append">天</template>
          </el-input>
      </el-form-item>

      <el-form-item label="中成药治疗">
      </el-form-item>
      <el-form-item label="①实证中成药">
        <el-checkbox v-for="(val, key) in medicine_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.medicine_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="②虚实夹杂证中成药">
        <el-checkbox v-for="(val, key) in medicine_za_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.medicine_za_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="③直肠导入中成药">
        <el-checkbox v-for="(val, key) in medicine_zhi_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.medicine_zhi_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="中成药服用疗程">
          <label>共服用</label>
          <el-input v-model="cureForm.drink_zc_total" style="width: 250px;">
            <template slot="append">天</template>
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>共服用中成药</label>
          <el-input v-model="cureForm.drink_zc_zhong"  style="width: 250px;">
            <template slot="append">种</template>
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>若现在正在服用，服用中成药名称</label>
          <el-input v-model="cureForm.drink_zc_name"  style="width: 250px;">
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>已服用</label>
          <el-input v-model="cureForm.drink_zc_already"  style="width: 250px;">
            <template slot="append">天</template>
          </el-input>
      </el-form-item>

      <el-form-item label="中医特色治疗">
        <el-checkbox v-for="(val, key) in character_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.character_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="中医特色治疗疗程">
          <label>共使用</label>
          <el-input v-model="cureForm.character_total" style="width: 250px;">
            <template slot="append">天</template>
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>共使用中医特色疗法</label>
          <el-input v-model="cureForm.character_zc_zhong"  style="width: 250px;">
            <template slot="append">种</template>
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>若现在正在使用中医特色治疗，治疗项目名称</label>
          <el-input v-model="cureForm.character_zc_name"  style="width: 250px;">
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>已开展</label>
          <el-input v-model="cureForm.character_zc_already"  style="width: 250px;">
            <template slot="append">天</template>
          </el-input>
      </el-form-item>

      <h4>西医治疗</h4>
      <el-form-item label="治疗途径">
        <el-checkbox v-for="(val, key) in xi_cure_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="抗生素药物治疗">
        <el-switch v-model="cureForm.xi_kangsheng" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item label="抗生素给药方式">
        <el-checkbox v-for="(val, key) in xi_way_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
      </el-form-item>

      <el-form-item label="抗生素静脉给药具体药物">
        <el-checkbox v-for="(val, key) in xi_kang_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.xi_kang_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="抗生素静脉给药疗程">
          <label>既往用药情况</label>
          <el-input v-model="cureForm.xi_kang_lc" style="width: 250px;">
            <template slot="append">个疗程</template>
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>共使用</label>
          <el-input v-model="cureForm.xi_kang_lc_total"  style="width: 250px;">
            <template slot="append">天</template>
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>若现在仍在使用，使用抗生素的种类是</label>
          <el-input v-model="cureForm.xi_kang_lc_type"  style="width: 250px;">
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>预计给药</label>
          <el-input v-model="cureForm.xi_kang_lc_yu"  style="width: 250px;">
            <template slot="append">天</template>
          </el-input>
      </el-form-item>

      <el-form-item label="抗生素肌注给药具体药物">
        <el-checkbox v-for="(val, key) in injection_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.injection_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="抗生素肌注给药疗程">
          <label>既往用药情况</label>
          <el-input v-model="cureForm.injection_lc" style="width: 250px;">
            <template slot="append">个疗程</template>
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>共使用</label>
          <el-input v-model="cureForm.injection_lc_total"  style="width: 250px;">
            <template slot="append">天</template>
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>若现在仍在使用，使用抗生素的种类是</label>
          <el-input v-model="cureForm.injection_lc_kang"  style="width: 250px;">
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>预计给药</label>
          <el-input v-model="cureForm.injection_lc_yu"  style="width: 250px;">
            <template slot="append">天</template>
          </el-input>
      </el-form-item>

      <el-form-item label="抗生素口服给药具体药物">
        <el-checkbox v-for="(val, key) in eat_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-show="cureForm.eat_toubao" v-model="cureForm.eat_toubao_name" placeholder="二/三代头孢具体药物名称"></el-input>
        <el-input v-model="cureForm.eat_qita" placeholder="其他"></el-input>
      </el-form-item>
      <el-form-item label="抗生素口服给药疗程">
          <label>既往用药情况</label>
          <el-input v-model="cureForm.eat_lc_kou" style="width: 250px;">
            <template slot="append">个疗程</template>
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>共使用</label>
          <el-input v-model="cureForm.eat_lc_total"  style="width: 250px;">
            <template slot="append">天</template>
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>若现在仍在使用，使用抗生素的种类是</label>
          <el-input v-model="cureForm.eat_lc_type"  style="width: 250px;">
          </el-input>
      </el-form-item>
      <el-form-item label="">
          <label>预计给药</label>
          <el-input v-model="cureForm.eat_lc_yu"  style="width: 250px;">
            <template slot="append">天</template>
          </el-input>
      </el-form-item>

      <el-form-item label="既往抗生素使用频次">
        <el-switch v-model="cureForm.use_times_yes" active-text="使用" inactive-text="未使用"></el-switch>
      </el-form-item>
      <el-form-item v-show="cureForm.use_times_yes" label="">
        <el-radio v-model="cureForm.use_times_yes_num"
                  v-for="item in use_times_yes_num_Radio"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <el-form-item label="因盆腔炎性疾病及其后遗症进行手术治疗">
        <el-switch v-model="cureForm.op_after" active-text="有" inactive-text="无"></el-switch>
      </el-form-item>
      <h4>请填患者因以下哪种情况行手术治疗</h4>
      <el-form-item label="①手术原因">
        <el-checkbox v-for="(val, key) in op_reason_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="②手术方式">
        <el-checkbox v-for="(val, key) in op_way_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.op_way_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="西医其他治疗(物理治疗)">
        <el-checkbox v-for="(val, key) in xi_others_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.xi_others_qita" placeholder="具体治疗方法"></el-input>
      </el-form-item>

      <el-form-item label="患者对治疗方法的依从性总体影响">
        <el-radio v-model="cureForm.infection_all"
                  v-for="item in infection_all_Radio"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="①对抗生素治疗的依从性">
        <el-radio v-model="cureForm.infection_kang"
                  v-for="item in infection_kang_Radio"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="②患者对西医其他治疗（物理治疗）的依从性">
        <el-radio v-model="cureForm.infection_xi"
                  v-for="item in infection_xi_Radio"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="③患者对中医汤药治疗的依从性">
        <el-radio v-model="cureForm.infection_tang"
                  v-for="item in infection_tang_Radio"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="④患者对中成药治疗的依从性">
        <el-radio v-model="cureForm.infection_cheng"
                  v-for="item in infection_cheng_Radio"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="⑤患者对中医外治方法的依从性">
        <el-radio v-model="cureForm.infection_wai"
                  v-for="item in infection_wai_Radio"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <el-form-item label="影响治疗依从性的原因">
        <el-checkbox v-for="(val, key) in infection_reason_Checkbox"
            :key="key" :label="val" v-model="cureForm[key]">
        </el-checkbox>
        <el-input v-model="cureForm.infection_reason_qita" placeholder="其他原因"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" v-if="exist"  @click="updateCureForm">确定</el-button>
      <el-button :disabled="check_status=='审核通过'" type="primary" v-else  @click="createCureForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj005'
export default {
  name:'CureForm',
  data() {
    return {
      cure_Checkbox:{cure_zhong:"中医治疗", cure_xi:"西医治疗", cure_zhongxi:"中西医结合治疗"},
      zhong_Checkbox:{zhong_zhu:"住院治疗", zhong_men:"门诊治疗"},
      zhong_shi_Checkbox:{zhong_shi_tui:"清热解毒，凉血退热", zhong_shi_huo:"清热解毒，利湿活血", zhong_shi_shi:"清热利湿，活血止痛", zhong_shi_liang:"清热凉血，化瘀止痛", zhong_shi_chu:"清热除湿，化瘀止痛", zhong_shi_shu:"疏肝行气，化瘀止痛", zhong_shi_han:"祛寒除湿，化瘀止痛"},
      zhong_jia_Checkbox:{zhong_jia_yi:"益气健脾，化瘀止痛", zhong_jia_bu:"补肾活血，化瘀止痛"},
      zhong_tang_Checkbox:{zhong_tang_wu:"五味消毒饮合大黄牡丹皮汤", zhong_tang_yin:"银翘红酱解毒汤", zhong_tang_xian:"仙方活命饮加减", zhong_tang_chai:"柴枳败酱散", zhong_tang_bai:"白莲散结汤", zhong_tang_jia:"银甲丸", zhong_tang_pen:"盆炎汤", zhong_tang_man:"慢盆汤", zhong_tang_miao:"四逆散合四妙散", zhong_tang_shi:"四逆散金铃子散合失笑散", zhong_tang_xue:"血府逐瘀汤", zhong_tang_ge:"膈下逐瘀汤", zhong_tang_qi:"丹芍活血行气汤", zhong_tang_fu:"少腹逐瘀汤", zhong_tang_ding:"暖宫定痛汤", zhong_tang_ling:"桂枝茯苓丸"},
      zhong_tang_za_Checkbox:{zhong_tang_za_li:"理冲汤", zhong_tang_za_ju:"举元煎合失笑散", zhong_tang_za_dang:"当归芍药散", zhong_tang_za_wen:"温胞饮合失笑散", zhong_tang_za_du:"杜断桑寄失笑散", zhong_tang_za_tiao:"调肝汤", zhong_tang_za_bu:"补肾祛瘀方"},
      medicine_Checkbox:{medicine_qianjin:"妇科千金片/胶囊", medicine_jingang:"金刚藤胶囊/片/颗粒/糖浆", medicine_fuyan:"康妇炎胶囊", medicine_jinying:"金英胶囊", medicine_kunfu:"坤复康胶囊", medicine_honghua:"红花如意丸", medicine_penyan:"盆炎净颗粒", medicine_yanshu:"妇炎舒胶囊", medicine_kangfu:"抗妇炎胶囊", medicine_huahong:"花红胶囊/片/颗粒", medicine_fule:"妇乐颗粒", medicine_gongyan:"宫炎平片/滴丸/胶囊", medicine_huangteng:"黄藤素片", medicine_puling:"蒲苓盆炎康颗粒", medicine_jing:"妇炎净胶囊", medicine_jinxiang:"金香胶囊", medicine_xiao:"妇炎消胶囊", medicine_yankang:"妇炎康片", medicine_fu:"妇乐片", medicine_jinji:"金鸡胶囊", medicine_kou:"妇康口服液", medicine_tai:"妇炎泰颗粒", medicine_yan:"金丹附延颗粒", medicine_ning:"经带宁胶囊", medicine_jiao:"宫炎康胶囊", medicine_ping:"妇平胶囊", medicine_ying:"英花片", medicine_yu:"玉清抗宫炎胶囊", medicine_meng:"蒙药黄柏八味片", medicine_jin:"妇可靖胶囊", medicine_huayu:"金鸡化瘀颗粒", medicine_xuefu:"血府逐瘀胶囊", medicine_sheng:"胜红清热胶囊", medicine_guizhi:"桂枝茯苓胶囊/丸", medicine_shaofu:"少腹逐瘀胶囊/丸"},
      medicine_za_Checkbox:{medicine_za_fu:"妇宝颗粒", medicine_za_nv:"女金胶囊", medicine_za_dan:"丹黄祛瘀胶囊", medicine_za_zhi:"止痛化癥胶囊/片/颗粒"},
      medicine_zhi_Checkbox:{medicine_zhi_fu:"康妇消炎栓", medicine_zhi_hua:"化瘀散结灌肠液", medicine_zhi_hong:"红虎灌肠液", medicine_zhi_pen:"盆腔炎水溶性栓剂", medicine_zhi_ye:"野菊花栓", medicine_zhi_yan:"盆炎清栓"},
      character_Checkbox:{character_guan:"中药保留灌肠", character_men:"中药栓剂肛门塞入", character_wai:"中药外敷", character_li:"中药离子导入", character_xun:"中药熏蒸", character_zhen:"针刺", character_ai:"艾灸", character_wenzhen:"温针灸", character_re:"热敏灸", character_ge:"隔药灸（隔姜灸、隔附子灸等）", character_tui:"推拿", character_dou:"耳穴压豆", character_er:"耳针", character_she:"穴位注射", character_tie:"穴位敷贴"},
      xi_cure_Checkbox:{xi_cure_yuan:"住院治疗", xi_cure_zhen:"门诊治疗"},
      xi_way_Checkbox:{xi_way_jing:"静脉", xi_way_ji:"肌肉注射", xi_way_kou:"口服"},
      xi_kang_Checkbox:{xi_kang_ti:"头孢替坦", xi_kang_xi:"头孢西丁", xi_kang_qu:"头孢曲松", xi_kang_chuo:"头孢唑肟", xi_kang_sai:"头孢噻肟", xi_kang_ba:"氨苄西林舒巴坦钠", xi_kang_ke:"阿莫西林克拉维酸钾", xi_kang_sha:"氧氟沙星", xi_kang_zuo:"左氧氟沙星", xi_kang_huan:"环丙沙星", xi_kang_duo:"多西环素", xi_kang_mi:"米诺环素", xi_kang_aqi:"阿奇霉素", xi_kang_lin:"林可霉素", xi_kang_qing:"庆大霉素", xi_kang_mei:"克林霉素", xi_kang_li:"强力霉素", xi_kang_lv:"氯洁霉素", xi_kang_jia:"甲硝唑", xi_kang_xiao:"替硝唑", xi_kang_ao:"奥硝唑"},
      injection_Checkbox:{injection_xi:"头孢西丁", injection_qu:"头孢曲松", injection_chuo:"头孢唑肟", injection_kui:"头孢噻肟", injection_da:"庆大霉素"},
      eat_Checkbox:{eat_toubao:"二/三代头孢", eat_bing:"丙磺舒", eat_zuo:"左氧氟沙星", eat_yang:"氧氟沙星", eat_mo:"莫西沙星", eat_duo:"多西环素", eat_mi:"米诺环素", eat_a:"阿奇霉素", eat_qiang:"强力霉素", eat_lv:"氯洁霉素", eat_jia:"甲硝唑", eat_ao:"奥硝唑"},
      use_times_yes_num_Radio:["1次", "2次", "3次", "4次", "5次及以上"],
      op_reason_Checkbox:{op_reason_shu:"因盆腔炎性疾病及其后遗症进行手术治疗", op_reason_du:"脓肿破裂，出现腹膜炎或有中毒休克", op_reason_shi:"脓肿经药物治疗后病情好转，脓肿包块仍未消失但已局限化", op_reason_ji:"输卵管积水", op_reason_yun:"输卵管粘连或盆腔粘连影响生育导致不孕者"},
      op_way_Checkbox:{op_way_fu:"腹腔镜手术", op_way_chuan:"传统开腹手术", op_way_yin:"穿刺引流术", op_way_nong:"经阴道切开排脓术", op_way_nian:"盆腔分粘术", op_way_qie:"输卵管切除术", op_way_huan:"患侧附件切除术", op_way_zi:"子宫及双附件切除术"},
      xi_others_Checkbox:{xi_others_duan:"超短波理疗", xi_others_wei:"微波理疗", xi_others_ti:"体外冲击波治疗", xi_others_tdp:"TDP", xi_others_wai:"体外电场热疗", xi_others_ji:"盆底肌肉电刺激", xi_others_te:"特定电磁波"},
      infection_all_Radio:["好", "较好", "较差", "差"],
      infection_kang_Radio:["好", "较好", "较差", "差"],
      infection_xi_Radio:["好", "较好", "较差", "差"],
      infection_tang_Radio:["好", "较好", "较差", "差"],
      infection_cheng_Radio:["好", "较好", "较差", "差"],
      infection_wai_Radio:["好", "较好", "较差", "差"],
      infection_reason_Checkbox:{infection_reason_yao:"	对病情未重视，不愿意坚持用药", infection_reason_fu:"担心使用抗生素的副作用", infection_reason_kou:"药物口感影响服药", infection_reason_jian:"煎药不方便", infection_reason_zhi:"到医院做治疗不方便", infection_reason_zuo:"工作原因影响治疗", infection_reason_ji:"因经济原因影响治疗", infection_reason_gai:"用药后症状未改善", infection_reason_liao:"用药后症状改善，但未坚持完成疗程", infection_reason_shu:"不愿手术治疗"},

      cureForm:{
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      check_status:'',
      isOwnedByUser: true,
    }
  },
  methods: {
    updateCureForm () {
      apiUpdatePatientDataForm({formData:this.cureForm,formName:this.formName})
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
    createCureForm () {
      apiCreatePatientDataForm({formData:this.cureForm,formName:this.formName})
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
      this.cureForm = {}
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
        this.cureForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.cureForm = data.formData
      }

    })
  }

};
</script>
<style lang="">
</style>
