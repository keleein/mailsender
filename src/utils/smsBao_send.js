export default {
    name:'smsBao',
    send_sms,
}

const crypto = require('crypto');
const http = require('http');
const querystring = require('querystring');

//结果判断对象
let resultNum = {send:0,success:0,failed:0}

async function send_sms(user,password,content,select){
    return new Promise((resolve)=>{
        resultNum.send=select.length
        try{
            let smsapi="api.smsbao.com"
            const md5 = crypto.createHash('md5');
            let pass = md5.update(password).digest('hex')
            //用正则表达式匹配{name}
            let reg_name = new RegExp('{name}','g')
            let reg_code = new RegExp('{code}','g')
            //遍历发送
            select.forEach((item)=>{
                    //对表格选中的参数进行处理
                    console.log('数据监测区------》')
                    console.log(item.name)
                    let phone = item.phone
                    let data={
                        'u':user,
                        'p':pass,
                        'm':phone,
                        'c':content.replace(reg_name,item.name).replace(reg_code,item.code)
                    }
                    let options={
                        hostname:smsapi,
                        path:'/sms?'+querystring.stringify(data),
                        method:'GET'
                    }
                    console.log('options---------->')
                    console.log(options)
                    console.log(typeof(options))
                    let req=http.request(options,function(res){
                        res.setEncoding('utf-8');
                        res.on('data',function(result){
                            statusStr(result)
                        });
                        res.on('end',function(){
                        });
                    });
                    req.on('error',function(err){
                        console.error(err);
                    });
                    req.end();
                })

        }catch(e){
            console.log('发送代码出错：------》')
            console.log(e)
        }
        resolve(resultNum)
    })
}

function statusStr(result){
       switch(result)
       {
           case '0':
               resultNum.success++
               console.log('第'+resultNum.success+'条成功短信')
               break
           case '-1':
               resultNum.failed++
               console.log('第'+resultNum.failed+'条失败短信：'+'参数不全')
               break
           case '-2':
               resultNum.failed++
               console.log('第'+resultNum.failed+'条失败短信：'+'服务器空间不支持,请确认支持curl或者fsocket，联系您的空间商解决或者更换空间！')
               break
           case '30':
               resultNum.failed++
               console.log('第'+resultNum.failed+'条失败短信：'+'密码错误')
               break
           case '40':
               resultNum.failed++
               console.log('第'+resultNum.failed+'条失败短信：'+'账户不存在')
               break
           case '41':
               resultNum.failed++
               console.log('第'+resultNum.failed+'条失败短信：'+'余额不足')
               break
           case '42':
               resultNum.failed++
               console.log('第'+resultNum.failed+'条失败短信：'+'账户已过期')
               break
           case '43':
               resultNum.failed++
               console.log('第'+resultNum.failed+'条失败短信：'+'IP地址限制')
               break
           case '50':
               resultNum.failed++
               console.log('第'+resultNum.failed+'条失败短信：'+'内容含有敏感字')
               break
       }
}