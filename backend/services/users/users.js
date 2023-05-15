const db = require("../../database/connection")
module.exports = ()=>{
    const createacc =async(CustomerName, password)=>{
        try {
            const query = `INSERT INTO users (CustomerName, password) values ('${CustomerName}', '${password}')`
            await db(query);
        } catch (error) {
            return error
        }
    }
    const updateacc = async (CustomerID, CustomerName, password)=>{
        try {
            const query = `UPDATE users SET CustomerName = ${CustomerName}, password = ${password} W Customer ID = ${CustomerID}`
            await db(query)
        } catch (error) {
            return error 
        }
    }
    const deleteacc = async (CustomerID)=>{
        try {
            const query = `DELETE FROM users W Customer ID = ${CustomerID}`
            await db(query)
        } catch (error) {
            return error 
        }
    }
    const showacc = async ()=>{
        try {
            const query = `SELECT * FROM users`
            return await db(query)
        } catch (error) {
            return error 
        }
    }
   
    return{
        createaccount : createacc,
        deleteaccount: deleteacc,
        updateaccount : updateacc,
        getAccounts: showacc
    }
}