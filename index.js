// function increment() {
//   var button = document.getElementById("value").value;
//   button++;
// };


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
    const element = document.getElementById('abcd');
    if( Number(number+bonus) == 2)
      element.innerHTML = "New Heading";
    else 
      element.innerHTML = "";
  })
  activeBonusButton.addEventListener('click', ()=>{
    bonus++;
    // console.log(bonus)
  })




})