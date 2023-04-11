const mysql = require("mysql");

const db = mysql.createPool({
    user: "h8zznl3cxz0jz6y9",
    password: "cjqehezyiaiu61vk",
    host: "en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: "3306",
    database: "yccnla9gm97e9pxm"
})

module.exports = (sql)=>{
    return new Promise((resolve, reject)=>{
        db.getConnection((err, connection)=>{
            if(err){
                reject(err)
            }else{
                connection.query(sql, (err, rows, fields)=>{
                    if (err){
                        reject(err)
                    } else{
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}