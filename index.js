window.addEventListener('load', () => {
  const counter = document.querySelector('#value');
  const triggerButton = document.querySelector('#clickme')
  const activeBonusButton = document.querySelector('#active_bonus')
  let bonus=0;


  
  triggerButton.addEventListener('click', () => {
    //put variable in html file then get it at each function call with the following line
    let number = parseInt(counter.textContent);
    number++;
    counter.textContent = Number(number+bonus);
    const element = document.getElementById('bonus-btn');
    if( (Number(number+bonus) >= 2) && (Number(number+bonus)<20)) 
      element.innerHTML = "gooooood!!!!!";
    else if( (Number(number+bonus)>=20) && (Number(number+bonus)<50)) 
      element.innerHTML = "u can now buy an active bonus!!!";
    else 
      element.innerHTML = " "
  })

  activeBonusButton.addEventListener('click', ()=>{
    bonus++;
    // console.log(bonus)
  })
})