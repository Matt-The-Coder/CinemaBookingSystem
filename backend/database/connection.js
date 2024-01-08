const mysql = require("mysql");

// const db = mysql.createPool({
//     user: "root",
//     password: "",
//     host: "localhost",
//     port: "3307",
//     database: "cinemabook"
// })

const db = mysql.createPool({
    host: 'bjxwp9zadzdyfnlsid8b-mysql.services.clever-cloud.com',
    user:'uyo3diweamt0qrca',
    password:'SSSLkR8oQLwUFVl0kyWU',
    database: "bjxwp9zadzdyfnlsid8b",
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