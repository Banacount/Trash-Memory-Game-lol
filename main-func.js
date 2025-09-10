
//Quick essentials
function id_(id){
    return document.getElementById(id);
}

//Lists
let ansNums = [];
//Variables
let min = 1; let max = 9;
let numChosen = -1;
let toGuessNum = -5;
let memShowDelay = 1000; //In miliseconds
let lives = 3;
let scoreNum = 0;
//Elements
let ui2 = id_("UI-2");
let scoreDis = id_("scoreDisplay");

//Functions
function determineWon(){
    let stillHas = false;
    ansNums.map((it) => {
        if(it == toGuessNum){
            stillHas = true;
        }
    });
    if(!stillHas){
        resetGame();
    }
    if(lives <= 0){
        lives = 3;
        scoreNum = 0;
        scoreDis.innerHTML = scoreNum;
        resetGame();
    }
}
function clearRows(){
    let row1 = id_('ansRow1');
    let row2 = id_('ansRow2');
    let row3 = id_('ansRow3');
    let row4 = id_('ansRow4');
    row1.innerHTML = "";
    row2.innerHTML = "";
    row3.innerHTML = "";
    row4.innerHTML = "";
}
function resetAns(){
    ansNums = [];
    clearRows();
    for(let i = 0; i <= 11; i++){
        let ranNum = Math.floor(Math.random() * (max - min + 1) + min);
        ansNums.push(ranNum);
    }

    ansNums.map((item, ind) => {
        let parent = id_(`ansRow${parseInt((ind / 3) + 1)}`);
        let selBox = document.createElement("div");
        let isActive = true;
        selBox.className = "sel-box";
        selBox.innerHTML = item;
        selBox.addEventListener('click', () => {
            if(!isActive){ return; }
            isActive = false;
            numChosen = item;
            if(item == toGuessNum){
                ansNums[ind] = 0;
                selBox.classList.add('card-drop');
                scoreNum += 1;
                scoreDis.innerHTML = scoreNum;
            } else {
                selBox.classList.add('card-wrong');
                lives -= 1;
                determineWon();
            }
            determineWon();
        });
        selBox.addEventListener('animationend', (e) => {
            isActive = true;
            if(e.animationName == "card-drop-keyframes"){
                selBox.remove();
            } else if(e.animationName == "card-wrong-keyframes"){
                selBox.classList.remove('card-wrong');
            }
        })
        parent.append(selBox);
    });
}
function revealMem(value){
    let memDisplay = id_("memoryNum");
    ui2.style.display = 'flex';
    memDisplay.innerHTML = value;
    setTimeout(() => {
        ui2.style.display = 'none';
    }, memShowDelay);
}
function randNum(min_, max_){ return Math.floor(Math.random() * (max_ - min_ + 1) + min); }
function resetGame(){
    resetAns();
    while(true){
        let randNum = Math.floor(Math.random() * (max - min + 1) + min);
        let doesExist = false;
        ansNums.map((it) => {
            if(it == randNum){
                doesExist = true;
            }
        });
        if(doesExist){
            toGuessNum = randNum;
            revealMem(toGuessNum);
            break;
        } else {
            resetAns();
        }
    }
}

//Init
resetAns();
resetGame()