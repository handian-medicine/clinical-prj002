<template>
    <el-dialog title="相关治疗" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
            <!-- 这里改 -->
        <el-form ref="cureForm" :model="cureForm" label-width="auto" label-position="left">



        </el-form>
    </el-dialog>
</template>

<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj001'

export default {
    name:'Relevant',
    data () {
        return {
            cureForm:{},//修改
            dialogVisible: false,
            exist: true,
            formName:''
        }
    },
    methods: {
        updateCureForm () {
            apiUpdatePatientDataForm({formData:this.cureForm,formName:this.formName})
            .then((res)=> {
                this.resetDialog()
                this.$message({message: '提交成功',type: 'success'})
                this.dialogVisible = false
                this.$parent.getPatients()
            })
            .catch()
        },
        createCureForm () {
            apiCreatePatientDataForm({formData:this.cureForm,formName:this.formName})
            .then((res)=> {
                this.resetDialog()
                this.$message({message: '提交成功',type: 'success'})
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
            if (!data.exist) {
                //未创建
                this.cureForm.info = data.formData.info // 这里改cureForm
            } else {
                //已创建(修改)
                this.cureForm = data.formData // 这里改cureForm
            }
        })
    }
}
</script>
