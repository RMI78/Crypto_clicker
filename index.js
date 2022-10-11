// function increment() {
//   var button = document.getElementById("value").value;
//   button++;
// };


window.addEventListener('load', () => {
  //Game element 
  const counter = document.querySelector('#value');
  const triggerButton = document.querySelector('#clickme')
  const activeBonusButton = document.querySelector('#active_bonus')
  const activeBonusCost = document.querySelector('#active_bonus_cost')
  const currentActiveBonus = document.querySelector('#current_active_bonus')
  const messageArea = document.querySelector('#message_area')
  const overclockingButton  = document.querySelector("#overclock_mouse")
  const overclockingCost = document.querySelector('#overclock_bonus_cost')

  //Saves Elements
  const saveTextButton = document.querySelector('#save_text')
  const inputSave = document.querySelector('#output_save')
  const saveCacheButton = document.querySelector('#save_cache')
  const autoSaveToggle = document.querySelector('#auto_save')
  const resetButton = document.querySelector('#reset')
  const reloadTextButton = document.querySelector('#reload_from_text')
  const reloadCacheButton = document.querySelector('#reload_from_cache')

  //pseudo-global variables
  // window.overclockValue = false
  
  //various MISC functions

  function saveCacheGame(){
    let number = parseInt(counter.textContent)
    let bonus=parseInt(currentActiveBonus.textContent);
    let overclockCost = parseInt(overclockingCost.textContent)
    var save = {
        score: number,
        activeBonus: bonus,
        overclockCost: overclockCost
    }    
    localStorage.setItem("save", JSON.stringify(save))
  }
  
  //Events Game Function

  triggerButton.addEventListener('click', () => {
    //put variable in html file then get it at each function call with the following line
    let bonus=parseInt(currentActiveBonus.textContent);
    let number = parseInt(counter.textContent);
    if(!window.overclockValue){
      number++;
      counter.textContent = Number(number+bonus);
      messageArea.textContent = "Mining Money ^^"
    }
    else{
      counter.innerText = parseInt(number)+parseInt(bonus)*Math.sign((Math.random()-0.5))*Math.floor(10*Math.random())
    }
  })

  activeBonusButton.addEventListener('click', ()=>{
        let number = parseInt(counter.textContent)
        let bonus=parseInt(currentActiveBonus.textContent);
        let costActiveBonus=Number(activeBonusCost.textContent);
        if(number>=costActiveBonus){
          bonus++;
          number-=costActiveBonus;
          costActiveBonus+=10
          activeBonusCost.textContent = costActiveBonus; 
          counter.textContent = number
          currentActiveBonus.textContent = bonus
        }
        else{
          messageArea.textContent = "not enough money :'("
        }
  })

  overclockingButton.addEventListener('click', ()=>{
    if(counter.textContent>=overclockingCost.textContent && !window.overclockValue){
      counter.textContent-=Number(overclockingCost.textContent)
      overclockingCost.textContent= Number(overclockingCost.textContent)+75
      var randTimer = Math.floor(10*Math.random()+5);
      messageArea.textContent = "WOW YOUR MOUSE IS OVERCLOCKED FOR "+randTimer+" seconds"
      window.overclockValue = true
      setTimeout((tmp) => {
        window.overclockValue = false
      }, 1000*randTimer);
    }
    else{
      messageArea.textContent = "Not enough money to overclock"
    }
  })

  //Event Saves functions
  saveTextButton.addEventListener('click', ()=>{
    let number = parseInt(counter.textContent)
    let bonus=parseInt(currentActiveBonus.textContent);
    let overclockCost = parseInt(overclockingButton.textContent)
    var save = {
        score: number,
        activeBonus: bonus,
        overclockCost: overclockCost

    }
    inputSave.value = JSON.stringify(save)
  })

  saveCacheButton.addEventListener('click', ()=>{
    saveCacheGame()
  })

  autoSaveToggle.addEventListener('click', ()=>{
    let currentStr = autoSaveToggle.textContent
    const str2toggle1 = "Disable Auto Save"
    const str2toggle2 = "Enable Auto Save"
    if(currentStr === str2toggle2){
      autoSaveToggle.textContent = str2toggle1
      window.value =  window.setInterval(function(){saveCacheGame()}, 1000)
    }
    else{
      autoSaveToggle.textContent = str2toggle2
      window.clearInterval(window.value)
    }
  })

  resetButton.addEventListener('click', ()=>{
    counter.textContent = 0
    currentActiveBonus.textContent = 0
    activeBonusCost.textContent = 0
    if(window.value){
      window.clearInterval(window.value)
      autoSaveToggle.textContent = "Enable Auto Save"
    }
    window.localStorage.removeItem('save')
  })

  reloadTextButton.addEventListener('click', ()=>{
    const tmp = [counter.textContent, currentActiveBonus.textContent, activeBonusCost.textContent]
    try{
      const save=JSON.parse(inputSave.value)
      counter.textContent = save.score
      currentActiveBonus.textContent = save.activeBonus
      activeBonusCost.textContent = save.activeBonus*10
      overclockingCost.textContent = save.overclockCost
      messageArea.textContent = "Save Loaded successfully" 
    }catch{
      counter.textContent = tmp[0]
      currentActiveBonus.textContent = tmp[1]
      activeBonusCost.textContent = tmp[2]
      messageArea.textContent = "failed to load text save :/"
    }
  })

  reloadCacheButton.addEventListener('click', ()=>{
    const tmp = [counter.textContent, currentActiveBonus.textContent, activeBonusCost.textContent]
    try{
      const save=JSON.parse(localStorage.getItem('save'))
      counter.textContent = save.score
      currentActiveBonus.textContent = save.activeBonus
      activeBonusCost.textContent = save.activeBonus*10
      overclockingCost.textContent = save.overclockCost
      messageArea.textContent = "Save Loaded successfully" 
    }catch{
      counter.textContent = tmp[0]
      currentActiveBonus.textContent = tmp[1]
      activeBonusCost.textContent = tmp[2]
      messageArea.textContent = "Failed to load text save :/"
    }
  })



})