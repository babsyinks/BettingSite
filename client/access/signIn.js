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
    localStorage.setItem('token',data.token)
    window.location = '/home'
    } catch (error) {
        console.log(error.message)
    }
 
}