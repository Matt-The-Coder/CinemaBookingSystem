const username = document.querySelector("#name");
const password = document.querySelector("#password");
const registerbtn = document.querySelector("#register-btn")


   
   registerbtn.addEventListener("click",async ()=>{
    try {
        const fetched = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({user: username.value, pass: password.value})
        })
        const result = await fetched.json()
       alert(result.message)
    
    } catch (error) {
        alert(result.message)
    }
  
    
  
   
  
   })
   