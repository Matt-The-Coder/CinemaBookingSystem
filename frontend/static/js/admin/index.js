// Target the input elements and create variables for them
const Cname = document.querySelector('#adminName');
const Cpassword= document.querySelector('#password');

const Did= document.querySelector('.delete input[type="text"][placeholder="Enter your Admin ID"]');


const Eid = document.querySelector('.edit input[type="text"][placeholder="Enter your Admin ID"]');
const Ename = document.querySelector('.edit input[type="text"][placeholder="Enter your Admin Name"]');
const Epassword = document.querySelector('.edit input[type="text"][placeholder="Enter your Password"]');

// Target the buttons and create variables for them
const createButton = document.querySelector('#create-btn');
const deleteButton = document.querySelector('#del-btn');
const editButton = document.querySelector('#edit-btn');


createButton.addEventListener("click", async (event) => {
  try {
    event.preventDefault();
    const fetched = await fetch("/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminName: Cname.value,
        password:Cpassword.value,
      }),
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
            const fetched = await fetch("/admin/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({adminID: Did.value})
            })
            const result = await fetched.json()
           alert(result.message)
    } catch (error) {
        alert(error)
    }})

    
   editButton.addEventListener("click",async (event)=>{
    try {
            event.preventDefault()
            const fetched = await fetch("/admin/edit", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({adminID: Eid.value, adminName: Ename.value, password: Epassword.value})
            })
            const result = await fetched.json()
           alert(result.message)
        
        
    
    } catch (error) {
        alert(error)
    }
  
   
  
   })
   
