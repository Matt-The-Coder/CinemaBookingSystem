const db = require("../../database/connection")

module.exports =()=>{
    const add = async (MovieTitle, PictureFile, Genre, MovieDuration)=>{
        try {
            const query = `INSERT INTO movie (MovieTitle, PictureFile, Genre, MovieDuration) values ('${MovieTitle}', '${PictureFile}', '${Genre}', ${MovieDuration});`
               const query2 = `INSERT INTO book (Movie) values('${MovieTitle}');`;
            await db(query);
            await db(query2)
          } catch (error) {
            console.log(error);
          }
        }
    const update = async (MovieID, MovieTitle, PictureFile, Genre, MovieDuration)=>{
        try {
           const query = `UPDATE movie SET MovieTitle = '${MovieTitle}', PictureFile = '${PictureFile}', 
           Genre = '${Genre}', MovieDuration = ${MovieDuration} WHERE MovieID = ${MovieID}` 
           await db(query);
        } catch (error) {
            console.log(error)
        }
    }
    const deletedata = async (MovieID)=>{
        try {
           const query = `DELETE FROM movie where MovieID = ${MovieID} ` 
           await db(query);
        } catch (error) {
            console.log(error)
        }
    }
    const select = async ()=>{
        try {
           const query = `SELECT * FROM movie` 
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