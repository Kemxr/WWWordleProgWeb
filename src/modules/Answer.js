
export class Answer {
    formElement;
    game;
    constructor(row){
        this.formElement = this.#generateForm(row);
        document.querySelector("main").append(this.formElement);
        this.keyEvents();
        this.submit();
    }

    isAlphaNumericKey(key) {
        return /^([\x30-\x39]|[\x61-\x7a])$/i.test(key);
    }

    keyEvents(){
        const input1 = document.querySelector("input[name='letter-0']");
        const input2 = document.querySelector("input[name='letter-1']");
        const input3 = document.querySelector("input[name='letter-2']");
        const input4 = document.querySelector("input[name='letter-3']");
        const input5 = document.querySelector("input[name='letter-4']");

        input1.addEventListener("keyup", key => {
            const alphaNumeric = this.isAlphaNumericKey(key);
            if ( alphaNumeric ||  key.code === "ArrowRight") {
                input2.focus();
            }else if(key.code === "ArrowLeft"){
                input5.focus();
            }
        })

        input2.addEventListener("keyup", key => {
            const alphaNumeric = this.isAlphaNumericKey(key);
            if ( alphaNumeric ||  key.code === "ArrowRight") {
                input3.focus();
            }else if(key.code === "ArrowLeft"){
                input1.focus();
            }
        })

        input3.addEventListener("keyup", key => {
            const alphaNumeric = this.isAlphaNumericKey(key);
            if ( alphaNumeric ||  key.code === "ArrowRight") {
                input4.focus();
            }else if(key.code === "ArrowLeft"){
                input2.focus();
            }
        })

        input4.addEventListener("keyup", key => {
            const alphaNumeric = this.isAlphaNumericKey(key);
            if ( alphaNumeric ||  key.code === "ArrowRight") {
                input5.focus();
            }else if(key.code === "ArrowLeft"){
                input3.focus();
            }
        })

        input5.addEventListener("keyup", key => {
            const alphaNumeric = this.isAlphaNumericKey(key);
            if ( alphaNumeric ||  key.code === "ArrowRight") {
                input1.focus();
            }else if(key.code === "ArrowLeft"){
                input4.focus();
            }
        })



    }

    focus(){
        const firstInput = document.querySelector("form > input");
        firstInput.focus();
    }

    switchInert(){
        if (this.formElement.hasAttribute("inert")) {
            this.formElement.removeAttribute("inert");
        }else{
            this.formElement.inert = true;
        }
    }

    #generateForm(row){
       const form = document.createElement("form");
       form.classList.add("row"); 
       form.id =`row-${row}`;
       form.inert = true;

       const input1 = document.createElement("input");
       input1.classList.add("letter");
       input1.type ="text";
       input1.name ="letter-0";
       input1.id =`row-${row}--0`;
       input1.maxLength ="1";

       const input2 = document.createElement("input");
       input2.classList.add("letter");
       input2.type ="text";
       input2.name ="letter-1";
       input2.id =`row-${row}--1`;
       input2.maxLength ="1";

       const input3 = document.createElement("input");
       input3.classList.add("letter");
       input3.type ="text";
       input3.name ="letter-2";
       input3.id =`row-${row}--2`;
       input3.maxLength ="1";

       const input4 = document.createElement("input");
       input4.classList.add("letter");
       input4.type ="text";
       input4.name ="letter-3";
       input4.id =`row-${row}--3`;
       input4.maxLength ="1";

       const input5 = document.createElement("input");
       input5.classList.add("letter");
       input5.type ="text";
       input5.name ="letter-4";
       input5.id =`row-${row}--4`;
       input5.maxLength ="1";

       const submit = document.createElement("input");
       submit.type ="submit";
       submit.hidden = true;

       form.append(input1);
       form.append(input2);
       form.append(input3);
       form.append(input4);
       form.append(input5);
       form.append(submit);

       return form;
    }

    submit(){
        this.formElement.addEventListener("submit", async e => {
            e.preventDefault();
            const formData = new FormData(this.formElement);
            

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                            },
                body: JSON.stringify(formData.values())
            }

            if (formData.values() < 5) {
                console.log("salut")
            }else{
                
                const res = await fetch("https://progweb-wwwordle-api.onrender.com/guess",options)
                const data = await res.json();
                console.log(data)
                return data;
            }

            

        })
    }
}

        

       