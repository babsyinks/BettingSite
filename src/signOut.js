  const signOut = async ()=>{
  const resp = await fetch('access/signOut')
  const {logout} = await resp.json()
  console.log(logout)
  if(logout){
      localStorage.removeItem('token')
      
      window.location = '/'
  }
}