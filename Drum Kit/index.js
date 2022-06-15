//add Even listener for all of the buttons
var numberOfDrumBtn = document.querySelectorAll(".drum").length;
// var soundsList = ['tom-1.mp3','tom-2.mp3', 'tom-3.mp3','tom-4.mp3','snare.mp3', 'crash.mp3','kick-bass.mp3'];
for (var i = 0; i < numberOfDrumBtn;i++){
   //document.querySelectorAll("button")[i].addEventListener("click", handleClick);
   //document.querySelectorAll("button")[i].myParam = i;
document.querySelectorAll("button")[i].addEventListener("click",function (){
  // console.log(this.style.color="white";);

   console.log(this.innerHTML);
  var buttonInnerHTML=this.innerHTML;
  makeSound(buttonInnerHTML);
  buttonAnimation(buttonInnerHTML);
});

}
//when key pressed down call the makeSound function
document.addEventListener("keydown", function(evt){
  // alert(evt.key+" key pressed.");
  makeSound(evt.key);
  buttonAnimation(evt.key);
});
//play the sound function
function makeSound(key){
  switch (key) {
    case "w":
      var tom1 = new Audio('sounds/tom-1.mp3');
      tom1.play();
        break;
    case "a":
      var tom2 = new Audio('sounds/tom-2.mp3');
      tom2.play();
        break;
    case "s":
      var tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
        break;
    case "d":
      var tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
        break;
    case "j":
      var snare = new Audio('sounds/snare.mp3');
      snare.play();
        break;
    case "k":
      var crash = new Audio('sounds/crash.mp3');
      crash.play();
        break;
    case "l":
      var kick = new Audio('sounds/kick-bass.mp3');
      kick.play();
        break;

    default:console.log(key);
}
}

function buttonAnimation(currentkey){
  var activeBtn = document.querySelector("."+currentkey);

  activeBtn.classList.add("pressed");
  
  setTimeout(function(){
    activeBtn.classList.remove("pressed");
  }, 100);
}
//function to handle when button has been clicked
// function handleClick(evt){
//
//   //window.alert(evt.currentTarget.myParam);
//   var audio = new Audio('sounds/'+soundsList[evt.currentTarget.myParam]);
//   audio.play();
// }
//debugger; in console ()  shift + enter -> enter function name
