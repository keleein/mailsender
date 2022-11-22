<template>
  <div id="send-box">

    <el-input v-model="sendMailer" placeholder="请输入发送邮箱"></el-input>
    <el-input v-model="authorizationCode" placeholder="请输入发送邮箱授权码"></el-input>
    <el-input v-model="subject" placeholder="请输入邮件主题"></el-input>
    <el-input v-model="ContentPath" placeholder="请输入邮件内容text文件的绝对存放路径"></el-input>

    <el-row :gutter="20">

      <el-col :span="8">
        <div class="pre_send">
          <el-button type="primary" @click="send">发送邮件</el-button>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="pre_send">
          <el-button type="primary" @click="store">保存配置</el-button>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="pre_send">
          <el-button type="primary" @click="recover">还原配置</el-button>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import send from "@/utils/send";
import Objects from "@/utils/entity/Objects";
import msg_reminder from "@/utils/msg_reminder";
import Vue from "vue";

export default {
  name: "nodemailer_send",
  data(){
    return {
      sendMailer: '',
      authorizationCode: '',
      subject: '',
      ContentPath: '',
    }
  },
  methods:{
    //邮件发送函数
    async send(){
        send.QQMailSender(this.sendMailer, this.authorizationCode, Objects.currentSelect, this.subject, this.ContentPath).then(res=>{
          msg_reminder.msg_reminder(res)
        },rej=>{
          msg_reminder.msg_reminder(rej)
        })
    },
    //创建electron-store对象
    store_obj(){
      const Store = window.require('electron-store')
      let option={
        name:'config',
        fileExtension:'json',
        cwd:window.process.cwd()+"/config",
        clearInvalidConfig:true,
        encryptionKey:'1234567890',
      }
      return  new Store(option)
    },
    //用户配置数据保存
    store(){
      try{
        let store_obj=this.store_obj()
        store_obj.set('sendMailer',this.sendMailer)
        store_obj.set('authorizationCode',this.authorizationCode)
        store_obj.set('subject',this.subject)
        store_obj.set('ContentPath',this.ContentPath)
        Vue.prototype.$message({
          message:"保存成功",
          type:'success',
        })
      }catch(e){
        Vue.prototype.$message({
          message:"保存失败",
          type:'error',
        })
      }
    },
    //用户配置数据恢复
    recover(){
      try{
        let store_obj=this.store_obj()
        this.sendMailer=store_obj.get('sendMailer')
        this.authorizationCode=store_obj.get('authorizationCode')
        this.subject=store_obj.get('subject')
        this.ContentPath=store_obj.get('ContentPath')
        Vue.prototype.$message({
          message:"恢复成功",
          type:'success',
        })
      }catch(e){
        Vue.prototype.$message({
          message:"恢复失败",
          type:'error',
        })
      }
    },
  }
}
</script>

<style scoped>
#send-box {
  text-align: center;
  width:400px;
  height:300px;
  margin: 0 auto;
}
</style>