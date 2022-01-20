const signIn = async ()=>{
    const email = document.querySelector('input[name="email"]').value
    const password = document.querySelector('input[name="password"]').value

    try {
        const result = await fetch('/access/signIn',{
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
    window.location.href = '/home.html'
    } catch (error) {
        if(error.message){
            document.getElementsByClassName('error_SignIn')[0].textContent = error.message
        }
    }
 
}