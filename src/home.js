const getRoute = async (route,location)=>{
    const token = localStorage.getItem('token')

    if(!token){
        await fetch('/access/signIn')
        return
    }

    try {
        const response = await fetch(route,{
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'X-Auth-Token':localStorage.getItem('token')
        }
    })

    const data = await response.json()
        if(data.message === 'Welcome'){
            window.location.href = location
        } 
    } catch (error) {
        console.log(error.message)
    }
}
 
const setOdds = ()=>{
    getRoute('/bets/setOdds','admin.html')
}

const placeBets = ()=>{
    getRoute('/display/placeBets','displayOdds.html')
} 



