export default async function extractData(country,league) {
/*  */
//push arrs of form [{name: 'main',match: match1,'1': '2.30','X': '3.40','2': '2.90','1X': '1.40','12': '1.33','X2': '1.56'},{name: 'gg_ng',match: match1,gg: '1.65',ng: '2.46' },etc] to epl_vals
//returned arr is of form [[{},{}],[{},{}],etc]
try {
  const res = await fetch('/display/matches',{
  method:'POST',
  headers:{
  'Accept':'application/json',
  'Content-Type':'application/json',
  'X-Auth-Token':localStorage.getItem('token')
  },
  body:JSON.stringify({country,league})
})
const arrOfMatches = await res.json()
return arrOfMatches
} catch (error) {
  console.log(error.message)
}


  }

  //remember to return arr in above function
