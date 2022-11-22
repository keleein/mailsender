//暴露脚本
export default {
    name: "get",
    get_data,
}

// 导入mysql数据库模块
const mysql = window.require('mysql')

async function get_data(){

//建立数据库关系，需要用常量接收
    const db = mysql.createPool({
        //host代表本机数据库IP地址
        host:'127.0.0.1',
        //数据库用户名
        user:'root',
        //数据库账户密码(样例)
        password:'password',
        //数据库名称（样例）
        database:'my_db_01'
    })

//用常量接收SQL语句
    const sqlStr='select * from users'

//运用数据库常量通过SQL进行数据库操作
    let res = new Promise((resolve,reject) => {
       db.query(sqlStr, function (err, result) {
            if (err) reject(false)
            resolve(result)
        })
    })
    res = JSON.parse(JSON.stringify(await res))  //深拷贝
    return res
}