const signUp = async ()=>{

    const email = document.querySelector('input[name="email"]').value
    const password = document.querySelector('input[name="password"]').value

    try {
        const result = await fetch('/access/signUp',{
        method:'post',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
    },
        body:JSON.stringify({
        email,
        password
    })
    })
    const data = await result.json()
    
    if(data.error){
        throw new Error(data.error)
    }
      localStorage.setItem('token',data.token) 
      window.location.href = 'registrationSuccess.html' 
    
    } catch (error) {
        if(error.message){
            document.getElementsByClassName('error_SignUp')[0].textContent = error.message
        }
    }
  }

