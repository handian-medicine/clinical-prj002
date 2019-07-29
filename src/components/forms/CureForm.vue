<template>
  <el-dialog title="治疗" :visible.sync="dialogVisible" :close-on-click-modal="false" width="100%">
  </el-dialog>
</template>
<script>
export default {
  name:'CureForm',//改
  data() {
    return {
      cureForm:{},//改
      dialogVisible: false,
    }
  },
  methods: {
    updateCureForm () { //改

    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.cureForm = data;//改
      this.dialogVisible = true;
    })
  }
};
</script>
<style lang="">
</style>