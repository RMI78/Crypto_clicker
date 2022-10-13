

window.addEventListener('load', () => {
  //Game element 
  const counter = document.querySelector('.text-primary'); //done
  const rating = document.querySelector('#rate') //done
  const triggerButton = document.querySelector('#about-us') //done
  const activeBonusButton = document.querySelector('#active_bonus') 
  const activeBonusCost = document.querySelector('#active_bonus_cost') //done
  const currentActiveBonus = document.querySelector('#current_active_bonus') //done
  const PassiveBonusButton = document.querySelector('#passive_bonus_button') //done
  const currentPassiveBonus = document.querySelector('#current_passive_bonus')
  const passiveBonusCost = document.querySelector('#passive_bonus_cost') //done
  const overclockingButton  = document.querySelector("#overclock_mouse") //done
  const overclockingCost = document.querySelector('#overclock_bonus_cost') //done
  const messageArea = document.querySelector('#bonus-btn') //done

  //Saves Elements
  const saveTextButton = document.querySelector('#save_text') //done 
  const inputSave = document.querySelector('#output_save') //done
  const saveCacheButton = document.querySelector('#save_cache') //done
  const autoSaveToggle = document.querySelector('#auto_save') //done
  const resetButton = document.querySelector('#reset') //done
  const reloadTextButton = document.querySelector('#reload_from_text') //done
  const reloadCacheButton = document.querySelector('#reload_from_cache') //done

  //pseudo-global variables
  window.overclockValue = false
  window.pRate = 0
  window.previousValueRate=0
  
  //various MISC functions

  function saveCacheGame(){
    let number = parseInt(counter.textContent)
    let bonus=parseInt(currentActiveBonus.textContent);
    let overclockCost = parseInt(overclockingCost.textContent)
    let passiveBonus = parseInt(window.pRate)
    var save = {
        score: number,
        activeBonus: bonus,
        PassiveBonus: passiveBonus,
        overclockCost: overclockCost
    }    
    localStorage.setItem("save", JSON.stringify(save))
  }

  function passiveRate(){
    counter.textContent = window.pRate+parseInt(counter.textContent)
  }
  window.setInterval(function(){passiveRate()}, 1000)

  function computeRate(){
    var tmp = parseInt(counter.textContent)-window.previousValueRate
    rate.textContent = (tmp>=0 ? tmp : 0)
    window.previousValueRate =  parseInt(counter.textContent)
  }
  window.setInterval(function(){computeRate()}, 1000)

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
      var tmp = parseInt(number)+parseInt(bonus)*Math.sign((Math.random()-0.25))*Math.floor(10*Math.random())
      counter.textContent = (tmp>=0 ? tmp : 0)
    }
  })

  activeBonusButton.addEventListener('click', ()=>{
      if(!window.overclockValue){
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
      }
  })

  PassiveBonusButton.addEventListener('click', ()=>{
    if(counter.textContent>=passiveBonusCost.textContent)
    {
      counter.textContent = parseInt(counter.textContent)-parseInt(passiveBonusCost.textContent)
      window.pRate+=1
      passiveBonusCost.textContent = parseInt(passiveBonusCost.textContent)+1000
      currentPassiveBonus.textContent = parseInt(currentPassiveBonus.textContent)+1
    }
    else{
      messageArea.textContent = "not enough money :'("
    }
  })

  overclockingButton.addEventListener('click', ()=>{
    if(parseInt(counter.textContent)>=parseInt(overclockingCost.textContent) && !window.overclockValue){
      counter.textContent-=Number(overclockingCost.textContent)
      overclockingCost.textContent= parseInt(overclockingCost.textContent)+75
      var randTimer = Math.round(3*Math.random()+5);
      messageArea.textContent = "WOW YOUR MOUSE IS OVERCLOCKED FOR "+randTimer+" SECONDS"
      window.overclockValue = true
      setTimeout(() => {
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
    let bonus=parseInt(currentActiveBonus.textContent)
    let passiveBonus = parseInt(window.pRate)
    let overclockCost = parseInt(overclockingCost.textContent)
    var save = {
        score: number,
        activeBonus: bonus,
        passiveBonus: passiveBonus,
        overclockCost: overclockCost

    }
    inputSave.value = JSON.stringify(save)
  })

  saveCacheButton.addEventListener('click', ()=>{
    saveCacheGame()
  })

  autoSaveToggle.addEventListener('click', ()=>{
    let currentStr = autoSaveToggle.textContent
    const str2toggle1 = "Engistrement automatique activé"
    const str2toggle2 = "Engistrement automatique désactivé"
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
    passiveBonusCost = 0
    window.pRate = 0
    overclockingCost.textContent = 0
    if(window.value){
      window.clearInterval(window.value)
      autoSaveToggle.textContent = "Enable Auto Save"
    }
    window.localStorage.removeItem('save')
  })

  reloadTextButton.addEventListener('click', ()=>{
    const tmp = [counter.textContent, currentActiveBonus.textContent, activeBonusCost.textContent, window.pRate]
    try{
      const save=JSON.parse(inputSave.value)
      counter.textContent = save.score
      currentActiveBonus.textContent = save.activeBonus
      activeBonusCost.textContent = save.activeBonus*10
      window.pRate = parseInt(save.passiveBonus) //for passive stuff
      passiveBonusCost.textContent = Number(window.pRate)*1000
      overclockingCost.textContent = save.overclockCost
      messageArea.textContent = "Save Loaded successfully" 
    }catch{
      counter.textContent = tmp[0]
      currentActiveBonus.textContent = tmp[1]
      activeBonusCost.textContent = tmp[2]
      window.pRate = tmp[3]
      passiveBonusCost.textContent = window.pRate*1000
      messageArea.textContent = "failed to load text save :/"
    }
  })

  reloadCacheButton.addEventListener('click', ()=>{
    const tmp = [counter.textContent, currentActiveBonus.textContent, activeBonusCost.textContent, window.pRate]
    try{
      const save=JSON.parse(localStorage.getItem('save'))
      counter.textContent = save.score
      currentActiveBonus.textContent = save.activeBonus
      activeBonusCost.textContent = save.activeBonus*10
      window.pRate = parseInt(save.passiveBonus)
      passiveBonusCost.textContent = Number(window.pRate)*1000
      overclockingCost.textContent = save.overclockCost
      messageArea.textContent = "Save Loaded successfully" 
    }catch{
      counter.textContent = tmp[0]
      currentActiveBonus.textContent = tmp[1]
      activeBonusCost.textContent = tmp[2]
      window.pRate = tmp[3]
      passiveBonusCost.textContent = window.pRate*1000
      messageArea.textContent = "Failed to load text save :/"
    }
  })
})
