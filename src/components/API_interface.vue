<template>
<div class="send-box">

  <el-input v-model="signMsg" placeholder="sign"></el-input>

  <el-input v-model="apiSubject" placeholder="邮件主题"></el-input>

  <el-select v-model="apiMode" placeholder="mode">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
  </el-select>

  <el-input
      type="textarea"
      autosize
      placeholder="请输入内容"
      v-model="apiContent">
  </el-input>

  <el-row :gutter="20">

    <el-col :span="8">
      <div class="pre_send">
        <el-button type="primary" @click="apiSend">发送邮件</el-button>
      </div>
    </el-col>

    <el-col :span="8">
      <div class="pre_send">
        <el-button type="primary" @click="apiStore">保存配置</el-button>
      </div>
    </el-col>

    <el-col :span="8">
      <div class="pre_send">
        <el-button type="primary" @click="apiRecover">还原配置</el-button>
      </div>
    </el-col>

  </el-row>

</div>
</template>

<script>
import apiSend from "@/utils/apiSend";
import Objects from "@/utils/entity/Objects";
import msg_reminder from "@/utils/msg_reminder";
import Vue from 'vue';

export default {
  name: "API_interface",
  data(){
    return {
      options:[
        {
          value: 'text',
          label: 'text'
        },
        {
          value: 'html',
          label: 'html'
        }
      ],
      apiForm:'shark@bigdata.icu',
      signMsg: '',
      apiSubject: '',
      apiMode:'',
      apiContent:'',

    }
  },
  methods: {
    apiSend(){
      apiSend.ApiSend(this.apiForm,this.signMsg,this.apiSubject,this.apiMode,this.apiContent,Objects.currentSelect).then(resolve=>{
        msg_reminder.msg_reminder(resolve)
      },reject=>{
        msg_reminder.msg_reminder(reject)
      })
    },
    store_apiConfig(){
      const Store =window.require('electron-store')
      let option={
        name:'apiConfig',
        fileExtension:'json',
        cwd:window.process.cwd()+"/apiConfig",
        clearInvalidConfig:true,
        encryptionKey:'1234567890'
      }
      return new Store(option)
    },
    apiStore(){
      try{
        let store_apiConfig=this.store_apiConfig()
        store_apiConfig.set('apiForm',this.apiForm)
        store_apiConfig.set('signMsg',this.signMsg)
        store_apiConfig.set('apiSubject',this.apiSubject)
        store_apiConfig.set('apiMode',this.apiMode)
        store_apiConfig.set('apiContent',this.apiContent)
        Vue.prototype.$message({
          message: '保存成功',
          type: 'success'
        });
      }catch(e){
        Vue.prototype.$message({
          message: '保存失败',
          type: 'error'
        });
      }
    },
    apiRecover(){
      try{
        let store_apiConfig=this.store_apiConfig()
        this.apiForm=store_apiConfig.get('apiForm')
        this.signMsg=store_apiConfig.get('signMsg')
        this.apiSubject=store_apiConfig.get('apiSubject')
        this.apiMode=store_apiConfig.get('apiMode')
        this.apiContent=store_apiConfig.get('apiContent')
        Vue.prototype.$message({
          message: '恢复成功',
          type: 'success'
        });
      }catch(e){
        Vue.prototype.$message({
          message: '恢复失败',
          type: 'error'
        });
      }
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

:deep(.el-select){
  width: 400px!important;
}
</style>