// accessing all the boxes
let boxes = document.querySelectorAll(".box");
// accessing the reset button
let resetBtn = document.querySelector("#reset-btn");
// accessing new game button
let newGameBtn = document.querySelector("#new-btn");
// accessing the message container
let msgContainer = document.querySelector(".msg-container");
// accessing the message
let msg = document.querySelector("#msg");

//variable for detecting the turn of the player
let turnX = true; //playerX,playerY
let count = 0; //to track draw
// creating the winning patterns in 2D array of game
//[0,1,2
// 3,4,5
// 6,7,8]

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//  adding functionality to the reset game button
const resetGame = () => {
  turnX = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// adding event listner when we click the box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
   
    if (turnX === true) {
      box.innerText = "X";
      turnX = false;
      box.disabled = true; //disabling the box otherwise when clicked again it will be changed
    } else {
      box.innerText = "O";
      turnX = true;
      box.disabled = true; //disabling the box otherwise when clicked again it will be changed
    }
    count++;
    let isWinner = checkWinner(); //declaring the function for checking the winner
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw`;
  msgContainer.classList.remove("hide");
  diableBoxes();
};

// function defination
const checkWinner = () => {
  // checking each patterns of winning
  for (pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // declaring function for showing the winner\
        showWinner(pos1Val);
      }
    }
  }
};

// function defination for the showWinner function
const showWinner = (winner) => {
  msg.innerText = `congratulations, Winner is ${winner}`;
  // removing the class hide from the msgContainer so we can display the winner
  msgContainer.classList.remove("hide");
  // adding function for disabling all buttons once we get the winner
  diableBoxes();
};

//  function for diabling the boxes
const diableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

//  function for enabling the boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
