//引入区
const nodemailer = window.require('nodemailer');
const fs = window.require('fs');

export default {
    name: "send-page",
    QQMailSender,
}


//函数区

//实现文本换行符的分割，并将多余换行符删除，实现纯文本数组
function text_decoration(text) {
    //正则表达式匹配换行符，不能连续匹配，存在空的数组项
    let reg=/\r\n/;
    let para=text.split(reg);
    //删除数组中值为空的元素
    let num=0;
    for(let i=0;i<para.length;i++){
        if(para[i]===null||para[i]===''){
            para.splice(i,1);
            i--;
            num++;
        }
    }
    console.log('删除了'+num+'个空元素');

    //将纯文本数组放入for循环中，判断各部分分属
    let template=[];
    for(let i=0;i<para.length;i++){
        template[i]=`<p style="margin:10px 5px;padding:0;">${para[i]}</p>`
    }

    //返回修饰html文本
    return template.join('\n');
}

//创建发送对象
function create_Transporter(sendMailer,authorizationCode){
    return nodemailer.createTransport({
        host: 'smtp.qq.com',
        secureConnection: true,
        port: 465,
        secure: true,
        auth: {
            user: sendMailer,
            pass: authorizationCode,
        }
    });
}

//获取当前时间
function time_get(){
    let date=new Date();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();
    return `${year}-${month}-${day}`;
}

//邮箱集总
function mail_Sum(data){
    console.log('mail_Sum数据断点')
    console.log(data)
    let mailSum = [];
        for (let i = 0; i < data.length; i++) {
            mailSum[i] = data[i].mail;
        }
        return mailSum;
}

//创建发送配置
function create_mailOption(dataStr,sendMailer,data,subject){
    console.log('create_mailOption数据断点')
    console.log(data)
    return {
        from: sendMailer,
        to: mail_Sum(data).join(','),
        subject: subject,
        html: `
                    <style> img[src="javascript:;"] { display: none; } </style>
                    <div style="position: relative; color:#555;font:12px/1.5 Microsoft YaHei,Tahoma,Helvetica,Arial,sans-serif;max-width:600px;margin:50px auto;border-radius: 5px;box-shadow:0 5px 10px #aaaaaa;background: 0 0 repeat-x #FFF;background-image: -webkit-repeating-linear-gradient(135deg, #4882CE, #4882CE 20px, #FFF 20px, #FFF 35px, #EB1B2E 35px, #EB1B2E 55px, #FFF 55px, #FFF 70px);background-image: repeating-linear-gradient(-45deg, #4882CE, #4882CE 20px, #FFF 20px, #FFF 35px, #EB1B2E 35px, #EB1B2E 55px, #FFF 55px, #FFF 70px);background-size: 100% 10px; hyth-email: true;">
                        <img alt="图片失效" style="position: absolute; right: 15px;top: 20px;width:133px;height: 87px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAABXCAMAAAAd8nYqAAADAFBMVEUAAADW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1taqJyaLAAAA/3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1O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">
                        <div style="padding: 0 15px 8px;">
                            <h2 style="border-bottom:1px solid #e9e9e9;font-size:18px;font-weight:normal;padding:20px 0 10px;">
                                <span style="color: #12ADDB">&gt; </span>

                                来自
                                <a style="text-decoration:none;color: #12ADDB;" href="https://tarsgo.team" title="吉甲大师梦工场" target="_blank">
                                    吉甲大师梦工场
                                </a>
                                的通知邮件
                            </h2>
                            <div style="font-size:14px;color:#777;padding:0 10px;margin-top:18px">
                                <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0">
                                <!-- 分割-->
                                ${text_decoration(dataStr)}
                                <!-- 分割-->
                                </div>
                            </div>
                        </div>
                        <div style="color:#888;padding:10px;border-top:1px solid #e9e9e9;background:#f5f5f5;border-radius: 0 0 5px 5px;">
                            <p style="margin:0;padding:0;">
                                Copyright ©
                                <span style="border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(204,204,204); z-index: 1; position: static;" >${time_get()}</span>
                                <a style="color:#888;text-decoration:none;" href="https://tarsgo.team" title="吉甲大师" target="_blank">吉甲大师</a>
                                - 邮件自动生成，请勿直接回复！
                            </p>
                        </div>
                    </div>
                    `//样例
    };
}

//发送反馈
function send_feedback(transPorter,mailOption){
    return new Promise((resolve,reject)=>{
        transPorter.sendMail(mailOption,(err,info) => {
            if (info) {
                let len = info.accepted.length
                let from = info.envelope.from
                console.log('已从' + from + '邮箱成功发出' + len + '个邮件')
                resolve(true)
            } else {
                console.log('err : ', err)
                reject(false)
            }
        })
    })
}

//主进程
function QQMailSender(sendMailer,authorizationCode,data,subject,ContentPath){
    return new Promise((res,rej)=>{
        console.log('QQMailSender数据断点')
        console.log(data)
        let transPorter=create_Transporter(sendMailer,authorizationCode);
        fs.readFile(ContentPath, 'utf8',(err,dataStr)=>{
            if(err){
                console.log(err);
            }else{
                console.log('读取成功');
                let mailOption=create_mailOption(dataStr,sendMailer,data,subject)
                send_feedback(transPorter,mailOption).then(resolve=>{
                    res(resolve)
                },reject=>{
                    rej(reject)
                })
            }
        })
    })
}



