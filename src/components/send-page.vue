<template>
  <div class="father-box">

    <el-row>
      <el-col :span="24">
          <div class="head-box">
            <p style="margin-top: 45px">邮件发送辅助程序</p>
          </div>
      </el-col>
    </el-row>

    <el-row>

      <el-col :span="24">

        <div class="table-selector">

          <el-table
              ref="multipleTable"
              :data="tableData"
              stripe
              tooltip-effect="dark"
              style="width: 80%;margin: 0 auto;"
              height="300"
              @selection-change="handleSelectionChange">

            <el-table-column
                type="selection"
                width="55">
            </el-table-column>

            <el-table-column
                prop="name"
                label="姓名"
                width="120">
            </el-table-column>

            <el-table-column
                prop="mail"
                label="邮箱"
                show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                prop="phone"
                label="电话号码"
                show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                prop="code"
                label="验证码"
                show-overflow-tooltip>
            </el-table-column>

          </el-table>

        </div>

      </el-col>

    </el-row>

    <el-row :gutter="20">

      <el-col :span="8">
        <div class="pre_send">
          <el-button type="primary" @click="change">发送邮件</el-button>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="pre_send">
          <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="pre_send">
          <el-button type="primary" @click="get">数据刷新</el-button>
        </div>
      </el-col>

    </el-row>

    <el-drawer
        title="发送配置"
        :visible.sync="drawer"
        :direction="direction">

      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>

        <el-menu-item index="/nodemailer_send">nodemailer发送</el-menu-item>

        <el-menu-item index="/API_interface">API接口发送</el-menu-item>

        <el-menu-item index="/smsBao">smsBao发送</el-menu-item>

      </el-menu>

      <div class="navContent">
        <router-view></router-view>
      </div>

    </el-drawer>

  </div>
</template>

<script>
import get from "@/utils/get";
import Objects from "@/utils/entity/Objects";
import Vue from 'vue';

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      direction: 'btt',
      tableData: [],
      activeIndex: '/nodemailer_send',
    }
  },
  created() {
    get.get_data().then(res=>{
      this.tableData=res
    })
  },
  methods:{
    change(){
      this.drawer=true
      switch (this.activeIndex) {
        case '/nodemailer_send':
          this.$router.push('/nodemailer_send')
          break;
        case '/API_interface':
          this.$router.push('/API_interface')
          break;
        case '/smsBao':
          this.$router.push('/smsBao')
          break;
      }
    },
    //取消多选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //表格多选集总
    handleSelectionChange(val) {
      Objects.currentSelect = val;
    },
    //数据库表格数据获取
    get(){
      get.get_data().then(res=>{
        this.tableData=res
        Vue.prototype.$message({
          message: '数据刷新成功',
          type: 'success'
        })
    },reject=>{
        if(!reject){
          Vue.prototype.$message({
            message: '数据刷新失败',
            type: 'error'
          })
        }
      })
    },
    //导航菜单
    handleSelect(key, keyPath) {
      console.log(key);
      console.log(keyPath);
      if(key==='/nodemailer_send'){
        try {
          this.$router.push({
            name:'nodemailer_send',
          })
          this.activeIndex= '/nodemailer_send'
        }catch (e) {
          console.log('跳转失败----------》')
          console.log(e)
        }
      }else if(key==='/API_interface'){
        try{
          this.$router.push({
            name:'API_interface',
          })
          this.activeIndex='/API_interface'
        }catch (e) {
          console.log('跳转失败----------》')
          console.log(e)
        }
      }else if(key==='/smsBao'){
        try{
          this.$router.push({
            name:'smsBao',
          })
          this.activeIndex='/smsBao'
        }catch (e) {
          console.log('跳转失败----------》')
          console.log(e)
        }
      }
    },

  }
}
</script>

<style scoped>
.father-box{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: url("../assets/images/background.jpg") repeat;
  font-size: 25px;
  font-weight: bold;
}

.head-box{
  width:100%;
  height: 100px;
  text-align: center;
}

.pre_send {
  width: 100%;
  text-align: center;
}

:deep(.el-input){
  margin: 5px auto;
}

:deep(.el-button){
  margin: 5px auto;
}

.table-selector {
  width:100%;
  height: 500px;
  margin: 0 auto;
  box-sizing: border-box;
}

:deep(.el-table){
  height:100%!important;
}

:deep(.el-drawer) {
  height: 80% !important;
}

</style>