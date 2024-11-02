// Seleção de Elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

// Novas funcionalidades
const openCloseGeneratorButton = document.querySelector("#open-generate-password")
const generatedPasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")

// Funções
//Letras, Números e Símbolos
const getLetterLowerCase = () => {

    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {

    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
}

const getSymbols = () => {
    const symbols = "(){}=<>/.,!@#$%&+-*";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbols) => {

    let password = ""

    // Segunda versão
    const passwordLength = +lengthInput.value;

    const maxNumbersLength = 3;

    const generators = [];

    if(lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase)
    }

    if(numbersInput.checked && maxNumbersLength <= 3) {
        generators.push(getNumber)
    }   

    if(symbolsInput.checked) {
        generators.push(getSymbols)
    }

    if(generators.length === 0) {
        return;
    }

    for(i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
          const randomValue = 
            generators[Math.floor(Math.random() * generators.length)]();
            
        password += randomValue;
      
        });
    }

    password = password.slice(0, passwordLength);

    generatedPasswordElement.style.display = "block"
    generatedPasswordElement.querySelector("h4").innerText = password;
};

// Eventos
generatePasswordButton.addEventListener("click", () => {
    generatePassword( 
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbols);
});

openCloseGeneratorButton.addEventListener("click", () => {
    generatedPasswordContainer.classList.toggle("hide");
})

copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault()

    const password = generatedPasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Senha copiada com  sucesso!";

        setTimeout(() => {
            copyPasswordButton.innerText = "Copiar";
        }, 1000);
    });
});
