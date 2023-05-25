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
            const query = `UPDATE users SET CustomerName = '${CustomerName}', password = '${password}' WHERE CustomerID = ${CustomerID}`
            await db(query)
        } catch (error) {
            return error 
        }
    }
    const updatebook = async (CustomerID, CustomerName, password, seat, time, date, movie) => {
        try {
            console.log("before");
            const query = `UPDATE users SET CustomerName = '${CustomerName}', password = '${password}', SeatNo = '${seat}', Time = '${time}', Date = '${date}', MoviePicked = '${movie}' WHERE CustomerID = ${CustomerID}`;
            await db(query);
            console.log("after");
        } catch (error) {
            return error;
        }
    };
    
    
    
    const deleteacc = async (CustomerID)=>{
        try {
            const query = `DELETE FROM users WHERE CustomerID = ${CustomerID}`
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
        getAccounts: showacc,
        cinema: updatebook
    }
}