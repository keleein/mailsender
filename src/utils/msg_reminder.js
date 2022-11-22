import Vue from "vue"

export default {
    name: 'msg_reminder',
    msg_smsBao,
    msg_store,
    msg_recover,
}

function msg_smsBao(stand){
    if(stand.failed===0){
        Vue.prototype.$message({
            message: '共'+stand.send+'条全部发送成功',
            type: 'success',
            center:true,
        })
    }else if(stand.success===0){
        Vue.prototype.$message({
            message: '共'+stand.send+'条全部发送失败',
            type: 'error',
            center:true,
        })
    }else{
        Vue.prototype.$message({
            message: '共'+stand.send+'条短信:成功'+stand.success+'条，失败'+stand.failed+'条',
            type: 'warning',
            center:true,
        })
    }
}

function msg_store(stand){
    if(stand===true){
        Vue.prototype.$message({
            message: '保存成功',
            type: 'success',
            center:true,
        })
    }else if(stand===false){
        Vue.prototype.$message({
            message: '保存失败',
            type: 'error',
            center:true,
        })
    }
}

function msg_recover(stand){
    if(stand===true){
        Vue.prototype.$message({
            message: '恢复成功',
            type: 'success',
            center:true,
        })
    }else if(stand===false){
        Vue.prototype.$message({
            message: '恢复失败',
            type: 'error',
            center:true,
        })
    }
}