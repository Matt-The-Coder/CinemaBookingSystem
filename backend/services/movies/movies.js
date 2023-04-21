const db = require("../../database/connection")

module.exports =()=>{
    const add = async (Movie, PictureFile, Date1, Date2)=>{
        try {
           const query = `INSERT INTO book (Movie, PictureFile, Date1, Date2) values ('${Movie}', '${PictureFile}', ${Date1}, ${Date2})` 
           await db(query);
        } catch (error) {
            console.log(error)
        }
    }
    const update = async (movie, bookingid)=>{
        try {
           const query = `UPDATE book SET Movie = '${movie}' WHERE BookingID = ${bookingid}` 
           await db(query);
        } catch (error) {
            console.log(error)
        }
    }
    const deletedata = async (bookingid)=>{
        try {
           const query = `DELETE FROM book where BookingID = ${bookingid} ` 
           await db(query);
        } catch (error) {
            console.log(error)
        }
    }
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
        selectmovie: select,
        addmovie: add,
        updatemovie: update,
        deletemovie: deletedata
    }
}