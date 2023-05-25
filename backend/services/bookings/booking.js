const db = require("../../database/connection")

module.exports =()=>{
    
    const select = async ()=>{
        try {
           const query = `SELECT * FROM book` 
           const result = await db(query);
           return result;
        } catch (error) {
            console.log(error)
        }
    }
    return {
        booking: select,
        
    }
}