const pet = document.querySelector('.pet') as HTMLButtonElement;
const barGreen = document.querySelectorAll('.barGreen') as NodeListOf<HTMLElement>;
const gamePlay = document.querySelector('.gamePlay') as HTMLBodyElement;

const actionBtn = document.querySelectorAll('.action div') as NodeListOf<HTMLButtonElement>;

// random numbers and frequency
const rndPosTop: number = 12.5;
const rndPosLeft: number = 25;
const poopFrequency: number = 10;
const addFundOnClick: number = 5;
const addSleepPerSleeping: number = 2.5;
const addFoodPerClick:number = 3;
const foodFrequency:number = 2;


// interface
interface PoopArrInterface {
    posX: number,
    posY: number,
    yes: boolean
}
interface FoodArrInterface {
    posX: number,
    posY: number,
    yes: boolean,
    img: string
}

// game intervals number
let intervalsSum: number = 0;

// progress bar
let funBar: number = 100;
let foodBar: number = 100;
let sleepBar: number = 100;

let funCost: number = 0.5;
let foodCost: number = 0.5;
let sleepCost: number = 0.5;

// pet moves
let posTop: any = 125;
let posLeft: number = 260;
let petMovingTop: boolean = true;
let petMovingLeft: boolean = true;


// new game
if(!localStorage.getItem('animal')){window.location.href = 'animals.html'}

const newGame = document.querySelector('.newGame') as HTMLButtonElement;
newGame.onclick = () => {
    localStorage.removeItem('animal');
    window.location.href = 'animals.html';
}

// animals
const animalsArr: string[] = ['🐶', '🐱', '🐰', '🐭', '🦊', '🐼', '🐯', '🦁', '🐵', '🐥', '🐸', '🐴'];
//@ts-ignore
const animal = JSON.parse(localStorage.getItem('animal'));
pet.innerHTML = `${animalsArr[animal]}`


// game play arrays
let activeArr: boolean[] = [false, false, false, false];

// food
const foodArr: string[] = ['🌮', '🥕', '🥦', '🍞', '🍔', '🍇', '🥯', '🧁', '🍎', '🍊', '🧀', '🍕'];
let foodArrEat: FoodArrInterface[] = [];

// poop
const poop: string = '💩';
let poopArr: PoopArrInterface[] = [];


function addClassActive() {
    activeArr.map((item, index) => {
        if (item) {
            actionBtn[index].classList.add('active')
        }
        if (!item) {
            actionBtn[index].classList.remove('active')
        }
    })
}

actionBtn.forEach((btn, index) => {
    btn.onclick = () => {
        if (!activeArr[index]) {
            for (let i = 0; i < activeArr.length; i++) {
                activeArr[i] = false
            }
            activeArr[index] = true;
        } else {
            activeArr[index] = false
        }
        addClassActive()
    }
})


setInterval(game, 500);

function rnd(num: number) {
    const number: number = Math.round(Math.random() * num);
    return number
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
            progressBarSleep(0.5)
            petMove();
            petPoops();
            displayPoops();
            playPushPet();
        }
        if (activeArr[2]) {
            progressBarFood(0.5)
            progressBarSleep(-0.5)
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
    } else {
        pet.innerHTML = '☠️';
        return
    }
}

function progressBarFun() {
    let poopCounter: number = poopArr.length;
    if (poopCounter < 5) {
        funBar -= funCost
    }
    if (poopCounter >= 5 && poopCounter < 10) {
        funBar -= funCost * 2
    }
    if (poopCounter >= 10) {
        funBar -= funCost * 3
    }
    if (funBar < 100) {
        barGreen[0].style.width = `${funBar}%`
    }
    if (funBar >= 100) {
        barGreen[0].style.width = '100%'
    }
}
function progressBarFood(x: number) {
        foodBar -= foodCost + x;
        if (foodBar < 100) {barGreen[1].style.width = `${foodBar}%`}
        if (foodBar >= 100) {barGreen[1].style.width = `100%`}
}
function progressBarSleep(x: number) {
     sleepBar -= sleepCost + x;
     if(sleepBar < 100){barGreen[2].style.width = `${sleepBar}%`;}
     if(sleepBar >= 100){barGreen[2].style.width = `100%`;}
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
        })
    }
}

function displayPoops() {
    gamePlay.innerHTML = '';
    poopArr.map((item) => {
        if (item.yes) {
            gamePlay.innerHTML += `<div class="poop" style="top: ${item.posY}px; left: ${item.posX}px">${poop}</div>`
        }
    })

    if (activeArr[3]) {
        const pooops = document.querySelectorAll('.poop') as NodeListOf<HTMLButtonElement>
        pooops.forEach((btn, index) => {
            btn.style.cursor = 'pointer';
            btn.onclick = () => {
                poopArr[index].yes = false;
                poopArr = poopArr.filter((item) => item.yes)
                displayPoops()
            }
        })
    }
}

function playPushPet() {
    pet.style.cursor = 'pointer';
    pet.onclick = () => {
        if (funBar <= 100) {
            funBar += addFundOnClick;
        } else {
            activeArr[1] = false;
            addClassActive()
            pet.style.cursor = 'default';
        }

    }

}

function petSleep() {
    if (sleepBar <= 100) {
        sleepBar += addSleepPerSleeping;
    } else {
        activeArr[2] = false;
        addClassActive()
    }

}

function addFood(){
    if(intervalsSum % foodFrequency === 0){
        foodArrEat.push({
            posX: rnd(240),
            posY: rnd(450),
            yes: true,
            img: foodArr[rnd(foodArr.length-1)]
        })
    }
}

function petFood() {
    if(foodBar <= 100){
        gamePlay.innerHTML = '';
        poopArr.map((item) => {
            if (item.yes) {
                gamePlay.innerHTML += `<div class="poop" style="top: ${item.posY}px; left: ${item.posX}px">${poop}</div>`
            }
        })
        foodArrEat.map((item) => {
            if (item.yes) {
                gamePlay.innerHTML += `<div class="food" style="top: ${item.posX}px; left: ${item.posY}px">${item.img}</div>`
            }
        })

        const foooods = document.querySelectorAll('.food') as NodeListOf<HTMLButtonElement>
        foooods.forEach((btn, index) => {
            btn.onclick = () => {
                foodBar += addFoodPerClick;
                foodArrEat[index].yes = false;
                foodArrEat = foodArrEat.filter((item) => item.yes);
                progressBarFood(-1);
                petFood();
            }
        })
    }else {
        activeArr[0] = false;
        addClassActive()
    }


}