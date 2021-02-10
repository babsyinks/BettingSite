import selectLeague from './selectLeague.js'
import {reCalculateOdds} from './calculateOdds.js'
 function leagueListener(altColor,country,league){
  return async function(){
    //this handles a league selection mouse click event
      if (!altColor[league]) {
        this.setAttribute('style', 'color:rgb(255, 255, 255); background-color:rgb(84, 3, 160);font-weight:bold')
        altColor[league] = true
        await selectLeague(country,league)
      } 
      //this does the opposite of the above comment
      else {
        this.setAttribute('style', 'color:black; background-color:white; font-weight:normal; border:1px solid rgb(221, 221, 221); border-top:0px')
        altColor[league] = false
          const disp = document.getElementById('display').children[0]
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

            const calculateDiv = document.getElementById('calcContainer')
            const msgDiv = document.getElementById('msgDiv')
            const imgDiv = document.getElementById('betChamp')

            const appendBaller = ()=>{
              const baller = document.createElement('img')
              baller.id = 'baller'
              baller.src = '/images/baller.jpg'
              calculateDiv.appendChild(baller)
            }

            if(msgDiv && imgDiv){
              calculateDiv.removeChild(msgDiv)
              appendBaller()
            }
            else if(imgDiv && !msgDiv){
              const calculateDivChildren = Array.from(calculateDiv.children) 
              for (const ch of calculateDivChildren) {
                calculateDiv.removeChild(ch)
              }
              appendBaller()
            }
            else if(!imgDiv && !msgDiv){
              const selectedElems = Array.from(document.getElementsByClassName('selectedMatches')) 
              for (const ch of selectedElems) {
                const leagueClass = ch.classList.item(0)
                const splitedClassName = leagueClass.split('_')
                if(splitedClassName[1] === league){
                  calculateDiv.removeChild(ch)
                }
              }
              reCalculateOdds()
            }
          if(calculateDiv.childElementCount === 0){
            appendBaller()
          }
      }
  }
}

export default function countryListener(div,country,isClicked) {
  let listenersArray = []
  let altColor = {}
  const children = div.children
  const arrVal = Array.from(children)
  for (const lgElem of arrVal) {
    altColor[lgElem.id] = false
  }
  return function(){
    if (!isClicked) {
      //remove the children on the div
      for (let ch of children) {
        div.removeChild(ch)
      }
        if(listenersArray.length>0){
          listenersArray = []
        }
        //add the various leagues under the right country
        for (let i = 0; i < arrVal.length; i++) {
  
          arrVal[i].setAttribute('style', 'display:block')
  
<<<<<<< HEAD
=======
          //arrVal[i].classList.add('')
>>>>>>> b2d4bb1e8256bd219cda10cc4bf3c59c3a20a835
          let clickEventListeners = leagueListener(altColor,country,arrVal[i].id)
          listenersArray.push(clickEventListeners)
          arrVal[i].addEventListener('click',clickEventListeners)
          div.after(arrVal[arrVal.length - i - 1])
        }
        isClicked = true
  
        const displ = document.getElementById('dispContainer')
  
        if (displ.hasChildNodes()) {
          const dispArr = Array.from(displ.children)
          const choo = document.getElementById('chooser')
          const chsArr = Array.from(choo.children)
          for (let dispChild of dispArr) {
              for (let chsChild of chsArr) {
                if (dispChild.id.includes(chsChild.id)) {
                  chsChild.setAttribute('style', 'color:rgb(255, 255, 255); background-color:rgb(84, 3, 160);font-weight:bold')
                  altColor[chsChild.id] = true
                }
              }
          }
        }
      } else { 
        const chooser = document.getElementById('chooser')    
        const nodeVals = document.getElementsByClassName(country + '_League')
        const arr = Array.from(nodeVals)
        const displ = document.getElementById('dispContainer')
        const dispArr = Array.from(displ.children)
        const chsArr = Array.from(chooser.children)
        for (let dispChild of dispArr) {
          for (let chsChild of chsArr) {   
            if (dispChild.id.includes(chsChild.id)) {
              if(chsChild.getAttribute('style') === 'color:rgb(255, 255, 255); background-color:rgb(84, 3, 160);font-weight:bold'){
                altColor[chsChild.id] = true
              }
              else{
                altColor[chsChild.id] = false
              }
              
            }
          }
      }

        for (let i=0;i<arr.length;i++) {
          let val = arr[i] 
          val.removeEventListener('click',listenersArray[i])
          chooser.removeChild(val)
          val.setAttribute('style', 'display:none')
          div.appendChild(val)
        }
        isClicked = false
      }
  }
}