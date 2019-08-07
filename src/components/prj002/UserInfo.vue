<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false" width="30%" center
  >
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name:"UserInfo",
  data () {
    return {
      userInfo:{},
      dialogVisible:false
    }
  },
  created () {
    this.$on("getUserEvent", function(data) {
        this.userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
        console.log(this.userInfo.user_name)
        this.dialogVisible = true;
      })
  }
};
</script>
