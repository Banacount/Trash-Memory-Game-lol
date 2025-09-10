
//Quick essentials
function id_(id){
    return document.getElementById(id);
}

console.log("I miss javascript lol. Even tho it's an ass language.");
console.log("Ericdoa is a vibe yall should give him a try.")
console.log("Also brakence.")

let ansNums = [];

//Variables
let min = 1; let max = 9;
let numChosen = -1;
let toGuessNum = -5;
let memShowDelay = 1000; //In miliseconds
//Elements
let ui2 = id_("UI-2");

//Functions
function resetAns(){
    for(let i = 0; i <= 11; i++){
        ansNums = [];
        let ranNum = Math.floor(Math.random() * (max - min + 1) + min);
        ansNums.push(ranNum);
    }
    ansNums.map((item, ind) => {
    let parent = id_(`ansRow${parseInt((ind / 3) + 1)}`);
    let selBox = document.createElement("div");
    selBox.className = "sel-box";
    selBox.innerHTML = item;
    selBox.addEventListener('click', () => {
        numChosen = item;
        console.log(numChosen);
        if(item == toGuessNum){
            selBox.classList.add('card-drop');
        } else {
            selBox.classList.add('card-wrong');
        }
    });
    selBox.addEventListener('animationend', (e) => {
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


//Init
for(let i = 0; i <= 11; i++){
    let ranNum = randNum(min, max);
    ansNums.push(ranNum);
}
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
        resetAns()
    }
}

ansNums.map((item, ind) => {
    let parent = id_(`ansRow${parseInt((ind / 3) + 1)}`);
    let selBox = document.createElement("div");
    selBox.className = "sel-box";
    selBox.innerHTML = item;
    selBox.addEventListener('click', () => {
        numChosen = item;
        console.log(numChosen);
        if(item == toGuessNum){
            selBox.classList.add('card-drop');
        } else {
            selBox.classList.add('card-wrong');
        }
    });
    selBox.addEventListener('animationend', (e) => {
        if(e.animationName == "card-drop-keyframes"){
            selBox.remove();
        } else if(e.animationName == "card-wrong-keyframes"){
            selBox.classList.remove('card-wrong');
        }
    })
    parent.append(selBox);
});