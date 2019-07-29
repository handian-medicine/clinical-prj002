<template>
  <el-dialog title="实验室检查" :visible.sync="dialogVisible" :close-on-click-modal="false" width="100%">
  </el-dialog>
</template>
<script>
export default {
  name:'ExperimentForm',//改
  data() {
    return {
      experimentForm:{},//改
      dialogVisible: false,
    }
  },
  methods: {
    updateExperimentForm () { //改

    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.experimentForm = data;//改
      this.dialogVisible = true;
    })
  }
};
</script>
<style lang="">
</style>