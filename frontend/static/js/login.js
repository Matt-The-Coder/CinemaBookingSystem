const username = document.querySelector("#name");
const password = document.querySelector("#password");
const loginbtn = document.querySelector("#login-btn");

document.addEventListener("DOMContentLoaded", ()=>{
    loginbtn.addEventListener("click",async ()=>{
        const data = {user: username.value, pass: password.value}
        try {
            const fetched = await fetch("/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
               
            })
    
            const result = await fetched.json();
            alert(result.message)
        } catch (error) {
            alert(result.message)
        }
       
    })
})
