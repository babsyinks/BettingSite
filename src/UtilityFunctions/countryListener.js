import selectLeague from './selectLeague.js'

 function leagueListener(altColor,country,league){
  return async function(){
    
      if (!altColor) {
        this.setAttribute('style', 'color:rgb(255, 255, 255); background-color:rgb(84, 3, 160);font-weight:bold')
        altColor = true
        await selectLeague(country,league)
      } else {
        this.setAttribute('style', 'color:black; background-color:white; font-weight:normal; border:1px solid grey')
        altColor = false
          const disp = document.getElementById('display')
          if (disp.hasChildNodes()) {
            let c_arr = Array.from(disp.children)
            for (const v of c_arr) {
              if(v.id === `${league}Wrapper`){
                disp.removeChild(v)
              }
            }
          }
        
          if(disp.childElementCount === 0){
            const heading = document.createElement('h2')
            heading.id = 'betChampHeader'
            heading.textContent = 'Select a country from any of the menus on the left,then choose a league'
            disp.appendChild(heading)
            const img = document.createElement('img')
            img.id = 'betChamp'
            img.src = '/images/betChamp.jpg'
            disp.appendChild(img)

          }

          const calculateDiv = document.getElementById('calculate')
          if(calculateDiv.hasChildNodes()){
            const arrOfChildren = Array.from(calculateDiv.children)
            for (const ch of arrOfChildren) {
              const splitedClassName = ch.className.split('_')
              if(splitedClassName[1] === league){
                calculateDiv.removeChild(ch)
              }
            }
          }
      }
  }
}

 export default function countryListener(div,country,isClicked) {
    return function(){
      
        const children = div.children
        const arrVal = Array.from(children)
        //remove the children on the div
        for (let ch of children) {
          div.removeChild(ch)
        }
        if (!isClicked) {
          //add the various leagues under the right country
          let altColor = false
          for (let i = 0; i < arrVal.length; i++) {
    
            arrVal[i].setAttribute('style', 'display:block')
    
            arrVal[i].setAttribute('style', 'border:1px solid grey')
    
            arrVal[i].className = country + '_League'
            
    
            arrVal[i].addEventListener('click', leagueListener(altColor,country,arrVal[i].id))
            div.after(arrVal[arrVal.length - i - 1])
          }
          isClicked = true
    
          const displ = document.getElementById('display')
    
          if (displ.hasChildNodes()) {
            const dispArr = Array.from(displ.children)
            const choo = document.getElementById('chooser')
            const chsArr = Array.from(choo.children)
            for (let ch of dispArr) {
                for (let b of chsArr) {
                  if (ch.id.includes(b.id)) {
                    b.setAttribute('style', 'color:rgb(255, 255, 255); background-color:rgb(84, 3, 160);font-weight:bold')
                    altColor = true
                  }
                }
            }
          }
        } else {
          const chooser = document.getElementById('chooser')    
          const nodeVals = document.getElementsByClassName(country + '_League')
          const arr = Array.from(nodeVals)
          for (const n of arr) {
            chooser.removeChild(n)
            n.setAttribute('style', 'display:none')
            div.appendChild(n)
          }
          isClicked = false
        }
    }
  }