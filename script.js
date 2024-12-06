"use strict";
const pet = document.querySelector('.pet');
const barGreen = document.querySelectorAll('.barGreen');
const gamePlay = document.querySelector('.gamePlay');
const actionBtn = document.querySelectorAll('.action div');
// random numbers and frequency
const rndPosTop = 12.5;
const rndPosLeft = 25;
const poopFrequency = 10;
const addFundOnClick = 5;
const addSleepPerSleeping = 2.5;
const addFoodPerClick = 3;
const foodFrequency = 2;
// game intervals number
let intervalsSum = 0;
// progress bar
let funBar = 100;
let foodBar = 100;
let sleepBar = 100;
let funCost = 0.5;
let foodCost = 0.5;
let sleepCost = 0.5;
// pet moves
let posTop = 125;
let posLeft = 260;
let petMovingTop = true;
let petMovingLeft = true;
// new game
if (!localStorage.getItem('animal')) {
    window.location.href = 'animals.html';
}
const newGame = document.querySelector('.newGame');
newGame.onclick = () => {
    localStorage.removeItem('animal');
    window.location.href = 'animals.html';
};
// animals
const animalsArr = ['🐶', '🐱', '🐰', '🐭', '🦊', '🐼', '🐯', '🦁', '🐵', '🐥', '🐸', '🐴'];
//@ts-ignore
const animal = JSON.parse(localStorage.getItem('animal'));
pet.innerHTML = `${animalsArr[animal]}`;
// game play arrays
let activeArr = [false, false, false, false];
// food
const foodArr = ['🌮', '🥕', '🥦', '🍞', '🍔', '🍇', '🥯', '🧁', '🍎', '🍊', '🧀', '🍕'];
let foodArrEat = [];
// poop
const poop = '💩';
let poopArr = [];
function addClassActive() {
    activeArr.map((item, index) => {
        if (item) {
            actionBtn[index].classList.add('active');
        }
        if (!item) {
            actionBtn[index].classList.remove('active');
        }
    });
}
actionBtn.forEach((btn, index) => {
    btn.onclick = () => {
        if (!activeArr[index]) {
            for (let i = 0; i < activeArr.length; i++) {
                activeArr[i] = false;
            }
            activeArr[index] = true;
        }
        else {
            activeArr[index] = false;
        }
        addClassActive();
    };
});
setInterval(game, 500);
function rnd(num) {
    const number = Math.round(Math.random() * num);
    return number;
}
function game() {
    if (funBar > 0 && foodBar > 0 && sleepBar > 0) {
        intervalsSum++;
        addClassActive();
        if (!activeArr[0] && !activeArr[1] && !activeArr[2] && !activeArr[3]) {
            progressBarFun();
            progressBarFood(0);
            progressBarSleep(0);
            petMove();
            petPoops();
            displayPoops();
        }
        if (activeArr[0]) {
            progressBarFun();
            progressBarSleep(0.5);
            petMove();
            petPoops();
            addFood();
            petFood();
        }
        if (activeArr[1]) {
            progressBarFun();
            progressBarFood(0.5);
            progressBarSleep(0.5);
            petMove();
            petPoops();
            displayPoops();
            playPushPet();
        }
        if (activeArr[2]) {
            progressBarFood(0.5);
            progressBarSleep(-0.5);
            displayPoops();
            petSleep();
            displayPoops();
        }
        if (activeArr[3]) {
            progressBarFun();
            progressBarFood(0);
            progressBarSleep(0);
            petMove();
            petPoops();
            displayPoops();
        }
    }
    else {
        pet.innerHTML = '☠️';
        return;
    }
}
function progressBarFun() {
    let poopCounter = poopArr.length;
    if (poopCounter < 5) {
        funBar -= funCost;
    }
    if (poopCounter >= 5 && poopCounter < 10) {
        funBar -= funCost * 2;
    }
    if (poopCounter >= 10) {
        funBar -= funCost * 3;
    }
    if (funBar < 100) {
        barGreen[0].style.width = `${funBar}%`;
    }
    if (funBar >= 100) {
        barGreen[0].style.width = '100%';
    }
}
function progressBarFood(x) {
    foodBar -= foodCost + x;
    if (foodBar < 100) {
        barGreen[1].style.width = `${foodBar}%`;
    }
    if (foodBar >= 100) {
        barGreen[1].style.width = `100%`;
    }
}
function progressBarSleep(x) {
    sleepBar -= sleepCost + x;
    if (sleepBar < 100) {
        barGreen[2].style.width = `${sleepBar}%`;
    }
    if (sleepBar >= 100) {
        barGreen[2].style.width = `100%`;
    }
}
function petMove() {
    if (petMovingTop) {
        posTop += rnd(rndPosTop);
        if (posTop >= 220) {
            petMovingTop = false;
        }
    }
    if (!petMovingTop) {
        posTop -= rnd(rndPosTop);
        if (posTop <= 40) {
            petMovingTop = true;
        }
    }
    if (petMovingLeft) {
        posLeft += rnd(rndPosLeft);
        if (posLeft >= 450) {
            petMovingLeft = false;
        }
    }
    if (!petMovingLeft) {
        posLeft -= rnd(rndPosLeft);
        if (posLeft <= 40) {
            petMovingLeft = true;
        }
    }
    pet.style.top = `${posTop}px`;
    pet.style.left = `${posLeft}px`;
}
function petPoops() {
    if (intervalsSum % poopFrequency === 0) {
        poopArr.push({
            posX: posLeft,
            posY: posTop,
            yes: true
        });
    }
}
function displayPoops() {
    gamePlay.innerHTML = '';
    poopArr.map((item) => {
        if (item.yes) {
            gamePlay.innerHTML += `<div class="poop" style="top: ${item.posY}px; left: ${item.posX}px">${poop}</div>`;
        }
    });
    if (activeArr[3]) {
        const pooops = document.querySelectorAll('.poop');
        pooops.forEach((btn, index) => {
            btn.style.cursor = 'pointer';
            btn.onclick = () => {
                poopArr[index].yes = false;
                poopArr = poopArr.filter((item) => item.yes);
                displayPoops();
            };
        });
    }
}
function playPushPet() {
    pet.style.cursor = 'pointer';
    pet.onclick = () => {
        if (funBar <= 100) {
            funBar += addFundOnClick;
        }
        else {
            activeArr[1] = false;
            addClassActive();
            pet.style.cursor = 'default';
        }
    };
}
function petSleep() {
    if (sleepBar <= 100) {
        sleepBar += addSleepPerSleeping;
    }
    else {
        activeArr[2] = false;
        addClassActive();
    }
}
function addFood() {
    if (intervalsSum % foodFrequency === 0) {
        foodArrEat.push({
            posX: rnd(240),
            posY: rnd(450),
            yes: true,
            img: foodArr[rnd(foodArr.length - 1)]
        });
    }
}
function petFood() {
    if (foodBar <= 100) {
        gamePlay.innerHTML = '';
        poopArr.map((item) => {
            if (item.yes) {
                gamePlay.innerHTML += `<div class="poop" style="top: ${item.posY}px; left: ${item.posX}px">${poop}</div>`;
            }
        });
        foodArrEat.map((item) => {
            if (item.yes) {
                gamePlay.innerHTML += `<div class="food" style="top: ${item.posX}px; left: ${item.posY}px">${item.img}</div>`;
            }
        });
        const foooods = document.querySelectorAll('.food');
        foooods.forEach((btn, index) => {
            btn.onclick = () => {
                foodBar += addFoodPerClick;
                foodArrEat[index].yes = false;
                foodArrEat = foodArrEat.filter((item) => item.yes);
                progressBarFood(-1);
                petFood();
            };
        });
    }
    else {
        activeArr[0] = false;
        addClassActive();
    }
}
