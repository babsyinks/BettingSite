const proceedToBet = async ()=>{

    await fetch('/home',{
        method:'GET',
        headers:{
            'X-Auth-Token':localStorage.getItem('token')
        }
    })
}