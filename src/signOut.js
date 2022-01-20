  const signOut = async ()=>{
  const resp = await fetch('access/signOut')
  const {logout} = await resp.json()
  if(logout){
      localStorage.removeItem('token')
      window.location = '/'
  }
}