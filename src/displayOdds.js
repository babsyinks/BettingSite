import countryListener from './UtilityFunctions/countryListener.js'
function main() {
//set click event for each country div
  function setClick(divId) {
    const div = document.getElementById(divId)
    let isClicked = false
    div.addEventListener('click',countryListener(div,divId,isClicked))
  }

  const ids = ['England', 'Spain', 'Germany', 'Italy']
  ids.forEach(setClick)

}

window.onload = main