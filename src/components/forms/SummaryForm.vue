<template>
  <el-dialog title="病情概要" :visible.sync="dialogVisible" :close-on-click-modal="false" width="100%">
  </el-dialog>
</template>
<script>
export default {
  name:'SummaryForm',//改
  data() {
    return {
      summaryForm:{},//改
      dialogVisible: false,
    }
  },
  methods: {
    updateSummaryForm () { //改

    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.summaryForm = data;//改
      this.dialogVisible = true;
    })
  }
};
</script>
<style lang="">
</style>