const ID = document.querySelector('#ID')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const editbtn = document.querySelector('#editbtn')

editbtn.addEventListener("click",async (event)=>{
    try {
            event.preventDefault()
            const fetched = await fetch("/user/edit", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({CustomerID:ID.value,CustomerName:username.value,password:password.value})
            })
            const result = await fetched.json()
           alert(result.message)
        
        
    
    } catch (error) {
        alert(error)
    }
  
   
  
   })
   
