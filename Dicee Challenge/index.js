//generate random numbers
var randomNumber1 = Math.floor(Math.random() * 6)+1;
var randomNumber2 = Math.floor(Math.random() * 6)+1;
var image1 = document.querySelectorAll("img")[0];
var image2 = document.querySelectorAll("img")[1];
//change dicees
image1.setAttribute("src", "images/dice"+randomNumber1+".png");
image2.setAttribute("src", "images/dice"+randomNumber2+".png");
//check who wins
if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").textContent="Player 1 wins!";
}
else if (randomNumber1 < randomNumber2) {
  document.querySelector("h1").textContent="Player 2 wins!";
}
else {
  document.querySelector("h1").textContent=" 🎲Draw!";
}
