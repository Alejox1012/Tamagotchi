let hunger = 100;
let fun = 100;
let sleep = 100;
let gameInterval;
let notifiedHalf = false;
let notifiedFull = {
    hunger: false,
    fun: false,
    sleep: false
};
let startTime;
let elapsedTime = 0;

function selectAnimal(animal) {
    const selectionScreen = document.getElementById('selection-screen');
    const tamagotchi = document.getElementById('tamagotchi');
    const animalImage = document.getElementById('animal-image');
    const tamagotchiTitle = document.getElementById('tamagotchi-title');
    const tamagotchiName = document.getElementById('tamagotchi-name').value;

    selectionScreen.style.display = 'none';
    tamagotchi.style.display = 'flex';

    tamagotchiTitle.innerText = tamagotchiName ? `  Tamagotchi: \n${tamagotchiName}` : '    Tamagotchi';

    let animalImgUrl;
    switch(animal) {
        case 'dog':
            animalImgUrl = "img/perro.jpg";
            break;
        case 'cat':
            animalImgUrl = "img/gato.jpg";
            break;
        case 'chicken':
            animalImgUrl = "img/gallina.png";
            break;
    }

    animalImage.style.backgroundImage = `url(${animalImgUrl})`;


    startTime = Date.now();
    gameInterval = setInterval(() => {
        decreaseNeeds();
        updateTime();
    }, 2000); 
}

function updateTime() {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000); 
    document.getElementById('time-elapsed').innerText = `Tiempo transcurrido: ${timeElapsed}s`;
}

function decreaseNeeds() {
    hunger = Math.max(hunger - 4, 0); 
    fun = Math.max(fun - 6, 0);      
    sleep = Math.max(sleep - 8, 0);   
    updateProgress();
    checkGameOver(); 
}

function updateProgress() {
    const hungerBar = document.getElementById('hunger');
    const funBar = document.getElementById('fun');
    const sleepBar = document.getElementById('sleep');

    hungerBar.value = hunger;
    funBar.value = fun;
    sleepBar.value = sleep;

    if (hunger <= 50 || fun <= 50 || sleep <= 50) {
        if (!notifiedHalf) {
            document.getElementById('warning-text').innerText = "Tu Tamagotchi necesita atención!";
            notifiedHalf = true;
        }
        if (hunger <= 50) hungerBar.classList.add('red-progress');
        if (fun <= 50) funBar.classList.add('red-progress');
        if (sleep <= 50) sleepBar.classList.add('red-progress');
    } else {
        hungerBar.classList.remove('red-progress');
        funBar.classList.remove('red-progress');
        sleepBar.classList.remove('red-progress');
        notifiedHalf = false;
    }

    checkFull();
}

function feed() {
    hunger = Math.min(hunger + 10, 100);
    showActionImage("img/hamburguesa.jpg", "Tu Tamagotchi está comiendo.");
    updateProgress();
}

function play() {
    fun = Math.min(fun + 10, 100);
    showActionImage("img/pelota.jpg", "Tu Tamagotchi está jugando.");
    updateProgress();
}

function rest() {
    sleep = Math.min(sleep + 10, 100);
    showActionImage("img/almohada.jpg", "Tu Tamagotchi está durmiendo.");
    updateProgress();
}

function showActionImage(imageUrl, text) {
    const actionImage = document.getElementById('action-image');
    const actionText = document.getElementById('action-text');
    actionImage.style.backgroundImage = `url(${imageUrl})`;
    actionImage.style.display = 'block';
    actionText.innerText = text;
    setTimeout(() => {
        actionImage.style.display = 'none';
        actionText.innerText = '';
    }, 1000); 
}

function checkFull() {
    if (hunger === 100 && !notifiedFull.hunger) {
        document.getElementById('warning-text').innerText = "Tu mascota está llena";
        notifiedFull.hunger = true;
    }
    if (fun === 100 && !notifiedFull.fun) {
        document.getElementById('warning-text').innerText = "Tu mascota está feliz";
        notifiedFull.fun = true;
    }
    if (sleep === 100 && !notifiedFull.sleep) {
        document.getElementById('warning-text').innerText = "Tu mascota ya durmió lo suficiente";
        notifiedFull.sleep = true;
    }
}

function checkGameOver() {
    if (hunger <= 0 || fun <= 0 || sleep <= 0) {
        document.getElementById('warning-text').innerText = "¡Game Over! Tu mascota ha muerto :(";
        clearInterval(gameInterval);
        gameInterval = null; 
        setTimeout(() => {
            resetGame();
        }, 2000); 
    }
}

function resetGame() {
    hunger = 100;
    fun = 100;
    sleep = 100;
    notifiedHalf = false;
    notifiedFull = {
        hunger: false,
        fun: false,
        sleep: false
    };
    updateProgress();
    document.getElementById('warning-text').innerText = '';
    document.getElementById('animal-image').style.backgroundImage = '';
    document.getElementById('action-image').style.display = 'none';
    document.getElementById('action-text').innerText = '';
    document.getElementById('tamagotchi-name').value = '';
    document.getElementById('selection-screen').style.display = 'block';
    document.getElementById('tamagotchi').style.display = 'none';
    document.getElementById('time-elapsed').innerText = 'Tiempo transcurrido: 0s'; 
}
