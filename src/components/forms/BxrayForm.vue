<template>
  <el-dialog title="B超"
            :visible.sync="dialogVisible" 
            :close-on-click-modal="false" width="100%" 
            @close='resetDialog'
            >
    <el-form ref="bxrayForm" :model="bxrayForm" label-width="100px" label-position="right">

      <el-form-item label="子宫">
        <el-row>
          <el-col :span="8">
            <el-form-item label="长径">
              <el-input v-model="bxrayForm.zigong_chang">
                <template slot="append">mm</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="宽径">
              <el-input v-model="bxrayForm.zigong_kuan">
                <template slot="append">mm</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="前后径">
              <el-input v-model="bxrayForm.zigong_qianhou">
                <template slot="append">mm</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="形态">
            <el-switch v-model="bxrayForm.zigong_xingtai" active-text="正常" inactive-text="异常"></el-switch>
            <el-form-item label="具体为">
            <el-input v-model="bxrayForm.zigong_juti"></el-input>
            </el-form-item>
        </el-form-item>
        <el-form-item label="子宫内膜厚度">
          <el-input v-model="bxrayForm.zigong_neimo"></el-input>
        </el-form-item>
        <el-form-item label="是否有子宫肌瘤">
          <el-switch v-model="bxrayForm.zigong_is_jiliu" active-text="是" inactive-text="否"></el-switch>
          <el-form-item label="子宫肌瘤的位置">
            <el-input v-model="bxrayForm.zigong_weizhi"></el-input>
          </el-form-item>
          <el-form-item label="子宫肌瘤的个数">
            <el-input v-model="bxrayForm.zigong_geshu"></el-input>
          </el-form-item>
          <el-form-item label="最大子宫肌瘤的大小">
            <el-row type="flex" justify="space-between">
              <el-col :span="8">
                <el-form-item label="长">
                  <el-input v-model="bxrayForm.zigong_daxiaochang">
                    <!-- <template slot="append">mm</template> -->
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="宽">
                  <el-input v-model="bxrayForm.zigong_daxiaokuan">
                    <!-- <template slot="append">mm</template> -->
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="高">
                  <el-input v-model="bxrayForm.zigong_daxiaogao">
                    <!-- <template slot="append">mm</template> -->
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form-item>
        <el-form-item label="是否有子宫腺肌症">
          <el-switch v-model="bxrayForm.zigong_xainji" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
      </el-form-item>

      <el-form-item label="左卵巢">

        <el-form-item label="大小">
          长径<el-input v-model="bxrayForm.zuo_chang"></el-input>
          横径<el-input v-model="bxrayForm.zuo_kuan"></el-input>
          前后径<el-input v-model="bxrayForm.zuo_qianhou"></el-input>
          体积<el-input v-model="bxrayForm.zuo_tiji"></el-input>
        </el-form-item>

        <el-form-item label="左卵巢是否有直径>10mm的囊肿">
          <el-switch v-model="bxrayForm.zuo_nangzhong" active-text="是" inactive-text="否"></el-switch>
          <el-form-item label="左卵巢最大囊肿大小">
            长径<el-input v-model="bxrayForm.zuo_daxiaochang"></el-input>
            横径<el-input v-model="bxrayForm.zuo_daxiaokuan"></el-input>
          </el-form-item>
        </el-form-item>

        <el-form-item label="形态">
          <el-radio v-model="bxrayForm.zuo_xingtai" label="正常">正常</el-radio>
          <el-radio v-model="bxrayForm.zuo_xingtai" label="PCO （窦卵泡个数≥12个）">PCO （窦卵泡个数≥12个）</el-radio>
        </el-form-item>

        <el-form-item label="窦卵泡数">
          <el-input v-model="bxrayForm.zuo_paoshu"></el-input>
        </el-form-item>

      </el-form-item>

      <el-form-item label="右卵巢">

        <el-form-item label="大小">
          长径<el-input v-model="bxrayForm.you_chang"></el-input>
          横径<el-input v-model="bxrayForm.you_kuan"></el-input>
          前后径<el-input v-model="bxrayForm.you_qianhou"></el-input>
          体积<el-input v-model="bxrayForm.you_tiji"></el-input>
        </el-form-item>

        <el-form-item label="右卵巢是否有直径>10mm的囊肿">
          <el-switch v-model="bxrayForm.you_nangzhong" active-text="是" inactive-text="否"></el-switch>
          <el-form-item label="右卵巢最大囊肿大小">
            长径<el-input v-model="bxrayForm.you_daxiaochang"></el-input>
            横径<el-input v-model="bxrayForm.you_daxiaokuan"></el-input>
          </el-form-item>
        </el-form-item>

        <el-form-item label="形态">
          <el-radio v-model="bxrayForm.you_xingtai" label="正常">正常</el-radio>
          <el-radio v-model="bxrayForm.you_xingtai" label="PCO （窦卵泡个数≥12个）">PCO （窦卵泡个数≥12个）</el-radio>
        </el-form-item>

        <el-form-item label="窦卵泡数">
          <el-input v-model="bxrayForm.you_paoshu"></el-input>
        </el-form-item>

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
      console.log('B超获取到的数据',data)
      this.dialogVisible = true
      this.exist = data.exist
      if (!data.exist) {
        //未创建
        this.bxrayForm.info = data.bxrayForm.info
      } else {
        //已创建(修改)
        this.bxrayForm = data.bxrayForm
      }

    })
  }

}
</script>
<style lang="">
</style>