class NameField {
    constructor(name) {
        const field = document.createElement('li');
        field.textContent = name;
        const nameListHook = document.querySelector('#names');
        nameListHook.appendChild(field);
    }
}

class NameGenerator {
    constructor() {
        console.log(this)
        const btn = document.querySelector('button');
        this.names = ['Max', 'Usama', 'Mubashir']
        this.currentName = 0
        // this.addName()
        btn.addEventListener('click', this.addName);
    }

    addName() {
        console.log(this)
        const name = new NameField("Max");
        this.currentName++
        if (this.currentName > this.names.length) {
            this.currentName = 0
        }
    }
}

const gen = new NameGenerator();