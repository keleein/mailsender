export  default {
    name: 'apiSend',
    ApiSend,
}

import axios from 'axios'

function ApiSend(apiForm,signMsg,apiSubject,apiMode,apiContent,currentSelect) {
    return new Promise((resolve,reject)=>{
        //对currentSelect进行数据名修饰
        currentSelect=JSON.parse(JSON.stringify(currentSelect).replace(/name/g,"nickname").replace(/mail/g,"email"))
        //删除currentSelect中不要的数据
        //1、forEach实现
        // currentSelect.forEach(function (item) {
        //         delete item.id
        //     })
        //2、map实现
        currentSelect.map((element)=>{
            delete element.id
            delete element.phone
        })
        console.log('删除操作处理结果----------》')
        console.log(currentSelect)
        let apiSubmit = {
            from:apiForm,
            subject:apiSubject,
            content:apiContent,
            to:currentSelect,
            mode:apiMode,
            sign:signMsg
        }
        console.log("apiSubmit--------->")
        console.log(typeof(apiSubmit))
        console.log(apiSubmit)
        axios.post('此处填写后端发送邮件api',apiSubmit).then((response)=>{
                console.log('发送成功')
                console.log(response)
                resolve(true)
            }
        ).catch(err=>{
            console.log('发送失败')
            console.log(err)
            reject(false)
        })
    })
}