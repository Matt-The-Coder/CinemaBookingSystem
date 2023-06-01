var sMovieInput = document.getElementById("sMovie");
var sDateInput = document.getElementById("sDate");
var sTimeInput = document.getElementById("sTime");
var sSeatSelect = document.getElementById("sSeat");
var id = document.querySelector("#userid");
var uname = document.querySelector("#username");
var password = document.querySelector("#userpassword");
var btns = document.querySelector(".button");

document.querySelectorAll('#modal-form').forEach((element)=>{
  element.addEventListener("click", function() {
    document.querySelector('.bg-modal').style.display = "flex";
  });
})

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});

btns.addEventListener("click", async (event) => {
  try {
   
    event.preventDefault();
    const data = {
      CustomerID: id.value,
      CustomerName: uname.value,
      password: password.value,
      seat: sSeatSelect.value,
      time: sTimeInput.value,
      date: sDateInput.value,
      movie: sMovieInput.value
    };
    const fetched = await fetch("/book", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await fetched.json();
    alert(result.message);
  } catch (error) {
    alert(error.message);
  }
});
