// function increment() {
//   var button = document.getElementById("value").value;
//   button++;
// };

window.addEventListener('load', () => {
  const counter = document.querySelector('#value');
  const triggerButton = document.querySelector('#clickme')

  triggerButton.addEventListener('click', () => {
    counter.textContent++;
  })

})