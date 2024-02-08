let boxes = document.querySelectorAll(".box");
let newBtn = document.querySelector("#new-btn");
let resetBtn = document.querySelector("#reset-btn");
let winnerHeading = document.querySelector("#new-heading")
let msgContainer = document.querySelector(".msg-container")

let turnO = true; // player O is true
count = 0; // to track if game was draw

const winnerPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.style.color = "green";
            box.innerText = "O";
            turnO = false;
        }else{
            box.style.color = "red";
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            checkDraw();
        }
        
    })
})

const checkWinner = () => {
    for(let pattern of winnerPattern){
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if(position1 != "" && position2 != "" && position3 != ""){
            if(position1 === position2 && position2 === position3){
                disableButtons();
                winResult(position1);
                return true;
            }
        }
    }
}

function winResult(win){
    msgContainer.classList.remove("hide-container");
    winnerHeading.innerText = `Congratulations, ${win} is Winner`;
}

function checkDraw() {
    winnerHeading.innerText = "Game was Draw";
    msgContainer.classList.remove("hide-container");
    disableButtons();
}

const disableButtons = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableButtons = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const reset = () => {
    turnO = true;
    enableButtons();
    msgContainer.classList.add("hide-container")
    count = 0;
}

resetBtn.addEventListener("click", reset)
newBtn.addEventListener("click", reset)