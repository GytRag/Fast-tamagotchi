"use strict";
const animalHTML = document.querySelector('.animalList');
const animals = ['🐶', '🐱', '🐰', '🐭', '🦊', '🐼', '🐯', '🦁', '🐵', '🐥', '🐸', '🐴'];
animals.map((pet) => {
    animalHTML.innerHTML += `
        <div class="animal">
            <div>
                ${pet}
            </div>
        </div>
    `;
});
const animalBtn = document.querySelectorAll('.animal');
animalBtn.forEach((animal, index) => {
    animal.onclick = () => {
        localStorage.setItem('animal', JSON.stringify(index));
        window.location.href = 'index.html';
    };
});
