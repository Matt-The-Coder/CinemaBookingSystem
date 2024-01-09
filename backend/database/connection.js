const mysql = require("mysql");

// const db = mysql.createPool({
//     user: "root",
//     password: "",
//     host: "localhost",
//     port: "3307",
//     database: "cinemabook"
// })

const db = mysql.createPool({
    host: 'b3dslz04ul4vt7nmplpq-mysql.services.clever-cloud.com',
    user:'u9utldfjxs9cvp2g',
    password:'vem2UNeTH0FcuT9xBfwz',
    database: "b3dslz04ul4vt7nmplpq",
    port: "3306"
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