<template>
  <div class="send-box">

    <el-input v-model="account" placeholder="smsbao短信平台账号"></el-input>

    <el-input v-model="sms_password" placeholder="请输入密码"></el-input>

    <el-input
        v-model="sms_content"
        placeholder="请输入内容"
        autosize
        type="textarea">
    </el-input>

    <el-row :gutter="20">

      <el-col :span="8">
        <div class="pre_send">
          <el-button type="primary" @click="smsBao()">发送短信</el-button>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="pre_send">
          <el-button type="primary" @click="smsStore">保存配置</el-button>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="pre_send">
          <el-button type="primary" @click="smsRecover">还原配置</el-button>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import smsBao from "@/utils/smsBao_send";
import Objects from "@/utils/entity/Objects";
import msg_reminder from "@/utils/msg_reminder";

export default {
  name: "smsBao",
  data(){
    return {
      account: '',
      sms_password: '',
      sms_content: '',
    }
  },
  methods:{
    //短信宝发送
    async smsBao(){
      smsBao.send_sms(this.account,this.sms_password,this.sms_content,Objects.currentSelect).then(resolve=>{
        msg_reminder.msg_smsBao(resolve)
      })
    },
    //创建electron-store实例
    store_obj(){
      const Store = window.require('electron-store')
      let option={
        name: 'smsBaocongig',
        fileExtension: 'json',
        cwd:window.process.cwd()+"/smsBaoconfig",
        clearInvalidConfig:true,
        encryptionKey:'963852741'
      }
      return new Store(option)
    },
    //保存smsBao配置
    smsStore(){
      new Promise((resolve,reject)=>{
        try{
          let smsStore_config=this.store_obj()
          smsStore_config.set("account",this.account)
          smsStore_config.set("sms_password",this.sms_password)
          smsStore_config.set("sms_content",this.sms_content)
          resolve(true)
        }catch(e){
          console.log(e)
          reject(false)
        }
      }).then(resolve=>{
        msg_reminder.msg_store(resolve)
      },reject=>{
        msg_reminder.msg_store(reject)
      })
    },
    //恢复smsBao配置
    smsRecover(){
      new Promise((resolve,reject)=>{
        try{
          let smsBao_config=this.store_obj()
          this.account=smsBao_config.get('account')
          this.sms_password=smsBao_config.get('sms_password')
          this.sms_content=smsBao_config.get('sms_content')
          resolve(true)
        }catch(e){
          console.log(e)
          reject(false)
        }
      }).then(resolve=>{
        msg_reminder.msg_recover(resolve)
      },reject=>{
        msg_reminder.msg_recover(reject)
      })
    }
  }
}
</script>

<style scoped>
.send-box {
  text-align: center;
  width:400px;
  height:300px;
  margin: 0 auto;
}
</style>