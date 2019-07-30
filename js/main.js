const div1 = document.querySelector("#main_logo");
setTimeout(function () {
    div1.style.backgroundColor = 'black';
    div1.style.width = '100%'
} ,1000)

var isClick = false;
var rollDom = document.querySelectorAll(".line");
console.log(rollDom);
function menuIconRotate () {
  isClick = !isClick;
  if (isClick) {
    rollDom[0].style.opacity = 0;
    rollDom[3].style.opacity = 0;
    rollDom[1].style.transform = 'rotate(45deg)';
    rollDom[2].style.transform = 'rotate(-45deg)';
  } else {
    setTimeout(function () {
      rollDom[0].style.opacity = 1;
      rollDom[3].style.opacity = 1;
    }, 200)
    rollDom[1].style.transform = 'rotate(0deg)';
    rollDom[2].style.transform = 'rotate(0deg)';
  }
}