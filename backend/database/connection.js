const mysql = require("mysql");

const db = mysql.createPool({
    user: "admin",
    password: "UXl8TdEc",
    host: "mysql-135607-0.cloudclusters.net",
    port: "17449",
    database: "cinemabook"
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