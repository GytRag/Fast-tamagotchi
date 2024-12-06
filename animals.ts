

const animalHTML = document.querySelector('.animalList') as HTMLElement;


const animals:string[] = ['🐶','🐱','🐰','🐭','🦊','🐼','🐯','🦁','🐵','🐥','🐸','🐴'];

animals.map((pet) => {
    animalHTML.innerHTML += `
        <div class="animal">
            <div>
                ${pet}
            </div>
        </div>
    `
})

const animalBtn = document.querySelectorAll('.animal') as NodeListOf<HTMLButtonElement>;

animalBtn.forEach((animal, index) => {
    animal.onclick = () => {
        localStorage.setItem('animal', JSON.stringify(index));
        window.location.href = 'index.html'
    }
})
