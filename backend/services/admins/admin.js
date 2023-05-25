const db = require("../../database/connection")
module.exports = ()=>{
    const createacc =async(adminname, password)=>{
        try {
            
            const query = `INSERT INTO admins (adminname, password) values ('${adminname}', '${password}')`
            
          const queried =  await db(query);
         
        } catch (error) {
            return error
        }
    }
    const updateacc = async (adminID, adminname, password)=>{
        try {
            
            const query = `UPDATE admins SET adminname = '${adminname}', password = '${password}' WHERE adminID = ${adminID}`
            await db(query)
            
        } catch (error) {
            return error 
        }
    }
    const deleteacc = async (adminID)=>{
        try {
            const query = `DELETE FROM admins WHERE adminID = ${adminID}`
            await db(query)
        } catch (error) {
            return error 
        }
    }
    const showacc = async ()=>{
        try {
            const query = `SELECT * FROM admins`
            return await db(query)
        } catch (error) {
            return error 
        }
    }
   
    return{
        createAccount : createacc,
        deleteAccount: deleteacc,
        updateAccount : updateacc,
        getAccounts: showacc
    }
}