const mysql = require("mysql");

const db = mysql.createPool({
    user: "admin",
    password: "55SDcKGB",
    host: "mysql-128019-0.cloudclusters.net",
    port: "19922",
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