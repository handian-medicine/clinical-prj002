<template>
  <el-dialog title="B超" :visible.sync="dialogVisible" :close-on-click-modal="false" width="100%">
  </el-dialog>
</template>
<script>
export default {
  name:'BxrayForm',//改
  data() {
    return {
      bxrayForm:{},//改
      dialogVisible: false,
    }
  },
  methods: {
    updateBxrayForm () { //改

    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.bxrayForm = data;//改
      this.dialogVisible = true;
    })
  }
};
</script>
<style lang="">
</style>