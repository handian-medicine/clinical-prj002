<template>
  <el-dialog title="专科病史" :visible.sync="dialogVisible" :close-on-click-modal="false" width="100%">
  </el-dialog>
</template>
<script>
import { apiUpdatePatientHistoryForm } from '@/api/api'
export default {
  name:'HistoryForm',//改
  data() {
    return {
      historyForm:{},//改
      dialogVisible: false,
    }
  },
  methods: {
    updateHistoryForm () { //改

    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.historyForm = data;//改
      this.dialogVisible = true;
    })
  }
};
</script>
<style lang="">
</style>