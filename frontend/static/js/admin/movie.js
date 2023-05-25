// Targeting elements in the "Create" section
var cMovieNameInput = document.getElementById("cMovieName");
var cPosterInput = document.getElementById("cPoster");
var cGenreInput = document.getElementById("cGenre");
var cDurationInput = document.getElementById("cDuration");
var createButton = document.getElementById("create-btn");

// Targeting elements in the "Delete" section
var dMovieIDInput = document.getElementById("dMovieID");
var deleteButton = document.getElementById("del-btn");

// Targeting elements in the "Edit" section
var eMovieID = document.getElementById("eMovieID");
var eMovieNameInput = document.getElementById("eMovieName");
var ePosterInput = document.getElementById("ePoster");
var eGenreInput = document.getElementById("eGenre");
var eDurationInput = document.getElementById("eDuration");
var editButton = document.getElementById("edit-btn");



createButton.addEventListener("click", async (event) => {
  try {
    event.preventDefault();
    const fetched = await fetch("/admin/movie/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie: cMovieNameInput.value,
        poster:cPosterInput.value,
        genre: cGenreInput.value,
        duration: cDurationInput.value
      })
    });
    const result = await fetched.json();
    alert(result.message);
   
  } catch (error) {
    alert(error);
  }
});

    
   deleteButton.addEventListener("click",async (event)=>{
    try {
            event.preventDefault()
            const fetched = await fetch("/admin/movie/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({movieID: dMovieIDInput.value})
            })
            const result = await fetched.json()
           alert(result.message)
    } catch (error) {
        alert(error)
    }})

    
   editButton.addEventListener("click",async (event)=>{
    try {
            event.preventDefault()
            const fetched = await fetch("/admin/movie/edit", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({movieID: eMovieID.value, movie: eMovieNameInput.value, 
                    poster: ePosterInput.value, genre: eGenreInput.value, duration: eDurationInput.value})
            })
            const result = await fetched.json()
           alert(result.message)
        
        
    
    } catch (error) {
        alert(error)
    }
  
   
  
   })
   
