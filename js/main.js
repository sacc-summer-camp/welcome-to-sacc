let isClickContact                  =                  false;
let isClick                         =                  false;

window.onload = function () {
  console.log("123");
  saccAnimation();
}

var saccAnimation = function () {
  const div1 = document.querySelector("#main_logo");
  setTimeout(function () {
      div1.style.backgroundColor = 'black';
      div1.style.width = '100%'
  } ,1000);
}

var menuIconRotate = function () {
  var rollDom = document.querySelectorAll(".line");
  isClick = !isClick;
  var page2=document.getElementById("page2");				
  var home=document.getElementById("home");
  
  if (isClick) {
    rollDom[0].style.opacity = 0;
    rollDom[3].style.opacity = 0;
    rollDom[1].style.transform = 'rotate(45deg)';
    rollDom[2].style.transform = 'rotate(-45deg)';
    page2.className="menu-display"; 
  }	
  else {
    setTimeout(function () {
      rollDom[0].style.opacity = 1;
      rollDom[3].style.opacity = 1;
    }, 200)
    rollDom[1].style.transform = 'rotate(0deg)';
    rollDom[2].style.transform = 'rotate(0deg)';
    page2.className="menu-disappear";
  }
}

var contactShow = function () {
  const page1 = document.querySelector("#page1");
  isClickContact = !isClickContact;
  console.log(isClickContact);
  page1.style.transform = isClickContact ? 'translateX(0)' : 'translateX(-100%)'
}