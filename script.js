const form = document.getElementById("form1");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form2 = document.getElementById("form2");
const username = document.getElementById("username");
const email2 = document.getElementById("email2");
const password2 = document.getElementById("password2");

// LocalStorege
function criaUsuario(nome, email, senha) {
    const user = {
        nome: nome,
        email: email,
        senha: senha
    };
   
    localStorage.setItem("user", JSON.stringify(user));
}

// Checagem do usuário
form.addEventListener("submit", (event) => {
    if (check_Input() == -1) {

        event.preventDefault();
    }
    
    localStorage.setItem("username", JSON.stringify(username.value));
})

form2.addEventListener("submit", (event) => {
    event.preventDefault();
    
   check_Input2()
})
    
function check_Input() {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    let validador = 0;
    if(emailValue === '') {
            
        errorValidation(email);
        validador = -1;
    } else {
        successValidation(email);
    }
    if(passwordValue === '') {
        
        errorValidation(password);
        validador = -1;
    } else {
        successValidation(password);
    }

    return validador;
}

function check_Input2() {
    const usarnameValue = username.value.trim();
    const email2Value = email2.value.trim();
    const password2Value = password2.value.trim();
    let validador = 0;

    function validarCampo(valor, campo) {
    if (valor === '') {
        errorValidation(campo);
        validador = -1;
    } else {
        successValidation(campo);
    }
    }

    validarCampo(usarnameValue, username);
    validarCampo(email2Value, email2);
    validarCampo(password2Value, password2);

    if (validador === 0) {
        criaUsuario(usarnameValue, email2Value, password2Value);
    }
}

function errorValidation(input) {
    const formContent = input.parentElement;

    formContent.className = 'form-content error'
}

function successValidation(input){
    const formContent = input.parentElement;

    formContent.className = 'form-content success'
}
