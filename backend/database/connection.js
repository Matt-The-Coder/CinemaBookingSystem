const mysql = require("mysql");

const db = mysql.createPool({
    user: "Matthew",
    password: "",
    host: "localhost",
    port: "3307",
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