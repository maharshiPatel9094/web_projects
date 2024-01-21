// setting user score and computer score\
let userScore = 0;
let compScore = 0;

// accessing all the choices
let choices = document.querySelectorAll(".choice")
// accessing the msg 
let msg = document.querySelector("#msg");
// accessing the user score
const userScorePara = document.querySelector("#user-score");
// accessing the comp score 
const compScorePara = document.querySelector("#comp-score"); 


// addding event listner to each choices
choices.forEach((choice) => {
// console.log(choice);
    choice.addEventListener("click",()=>{
        const userChoice = choice.getAttribute("id");
        console.log("button was clicked",userChoice);
        // calling play game function
        playGame(userChoice);
    });
});


// game contol is done through this function

// defination for the play game function
const playGame = (userChoice) => {
    console.log("user choice = ",userChoice);
    // generate computer choice\
    const CompChoice = genCompChoice();
    console.log("computer choice = ", CompChoice);

    if(userChoice === CompChoice){
        drawGame();
    }else{
       let userWin = true;
       if(userChoice === "rock") {
        // comp choice = scissor or paper
        userWin = CompChoice === "paper" ? false : true;
       }else if(userChoice === "paper"){
        // comp choice = rock or scissor
        userWin = CompChoice === "scissors" ? false : true;
       }else{
        // user = scissors
        // comp choice = rock or paper
        userWin = CompChoice === "rock" ? false : true;
       }

       showWinner(userWin,userChoice,CompChoice);
    }
}




// defination for generating computer choices
const genCompChoice = () => {
    // rock,paper,scissor
    const options = ["rock","paper","scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

// function for the draw choice
const drawGame = () => {
    console.log("game was draw");
    msg.innerText = "game was draw";
    msg.style.backgroundColor = "blue";
}

// defination for the showWinner function 
const showWinner = (userWin,userChoice,CompChoice) =>{
    if(userWin === true){
        userScore++;
        userScorePara.innerText = userScore;
        console.log(`you win!`);
        msg.innerText = `you win! Your ${userChoice} beats ${CompChoice}`;
        msg.style.backgroundColor = "green";
    }else{
        compScore++;
        compScorePara.innerText = compScore;
        console.log("you lose");
        msg.innerText = `you lose! ${CompChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}