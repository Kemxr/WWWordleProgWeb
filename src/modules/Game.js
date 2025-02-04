import { Answer } from "./Answer";
export class Game {
    answer = [];
    compteur;
    constructor(tentatives){
        this.tentatives = tentatives;
        for (let i = 0; i < this.tentatives; i++) {
            this.compteur = i;
            this.answer.push(new Answer(i));
        }
        this.answer[0].switchInert();
        this.answer[0].focus();
    }

    nextTentative(){
        const actualForm = document.querySelector(`form[id='row-${this.tentatives}']`);
        const anyForm = document.querySelector(`form[id='row-${this.tentatives + 1}']`);

        if (!actualForm.hasAttribute("inert")) {
            actualForm.inert = true;
        }else{
            anyForm.removeAttribute("inert");
        }
    }

    displayMessage(message){
        const messageElement = document.querySelector(".message");
        messageElement.textContent = message;
    }

}