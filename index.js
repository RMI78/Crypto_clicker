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
  const inputSave = document.querySelector('.output_save')
  
  
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

    saveTextButton.addEventListener('click', ()=>{
      let number = parseInt(counter.textContent)
      let bonus=parseInt(currentActiveBonus.textContent);
      var save = {
          score: number,
          activeBonus: bonus
      }
    })

    // console.log(bonus)
  })


})