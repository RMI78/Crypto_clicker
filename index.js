// function increment() {
//   var button = document.getElementById("value").value;
//   button++;
// };


window.addEventListener('load', () => {
  const counter = document.querySelector('#value');
  const triggerButton = document.querySelector('#clickme')
  const activeBonusButton = document.querySelector('#active_bonus')
  const activeBonusCost = document.querySelector('#active_bonus_cost')
  const currentActiveBonus = document.querySelector('#current_active_bonus')
  const messageArea = document.querySelector('#message_area')
  const saveTextButton = document.querySelector('#save_text')
  const inputSave = document.querySelector('#output_save')
  const saveCacheButton = document.querySelector('#save_cache')
  const autoSaveToggle = document.querySelector('#auto_save')
  const resetButton = document.querySelector('#reset')
  
  
  function saveCacheGame(){
    let number = parseInt(counter.textContent)
    let bonus=parseInt(currentActiveBonus.textContent);
    var save = {
        score: number,
        activeBonus: bonus
    }    
    localStorage.setItem("save", JSON.stringify(save))
  }
  
  
  triggerButton.addEventListener('click', () => {
    //put variable in html file then get it at each function call with the following line
    let bonus=parseInt(currentActiveBonus.textContent);
    let number = parseInt(counter.textContent);
    number++;
    counter.textContent = Number(number+bonus);
    messageArea.textContent = "Mining Money ^^"
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

    saveTextButton.addEventListener('click', ()=>{
      let number = parseInt(counter.textContent)
      let bonus=parseInt(currentActiveBonus.textContent);
      var save = {
          score: number,
          activeBonus: bonus
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




})