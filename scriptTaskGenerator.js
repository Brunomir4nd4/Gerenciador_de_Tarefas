const form_task_generator = document.getElementById("form-task-generator")
const tarefa = document.getElementById("tarefa")
const dataInicio = document.getElementById("dataInicio")
const dataFim = document.getElementById("dataFim")
const horaInicio = document.getElementById("horaInicio")
const horaFim = document.getElementById("horaFim")
const descricao = document.getElementById("descricao")

saudacao()
printTask()
form_task_generator.addEventListener("submit", (event) => {
    event.preventDefault();
    
    if (check_Input() != -1) {
        create_Task(tarefa.value, dataInicio.value, dataFim.value, horaInicio.value, horaFim.value, descricao.value)
        printTask()
    }

    document.getElementById('tarefa').value = '';
    document.getElementById('dataInicio').value = '';
    document.getElementById('dataFim').value = '';
    document.getElementById('horaInicio').value = '';
    document.getElementById('horaFim').value = '';
    document.getElementById('descricao').value = '';
})

function saudacao() {
    let username = JSON.parse(localStorage.getItem("username"))
    let h1 = document.getElementById("h1-saudacao");
    h1.innerText = "Bem vindo " + username;
}

function check_Input(){
    let verificador = 0;

    if (tarefa.value == '') {
        verificador = -1;
        errorValidation(tarefa);
    } else {
        normalValidation(tarefa);
    }

    if (dataInicio.value == '') {
        verificador = -1;
        errorValidation(dataInicio);
    } else {
        normalValidation(dataInicio);
    }

    if (dataFim.value == '') {
        verificador = -1;
        errorValidation(dataFim);
    } else {
        normalValidation(dataFim);
    }

    if (horaInicio.value == '') {
        verificador = -1;
        errorValidation(horaInicio);
    } else {
        normalValidation(horaInicio);
    }

    if (horaFim.value == '') {
        verificador = -1;
        errorValidation(horaFim);
    } else {
        normalValidation(horaFim);
    }

    if (descricao.value == '') {
        verificador = -1;
        errorValidation(descricao);
    } else {
        normalValidation(descricao);
    }

    return verificador;
}

function create_Task(tarefa, dataInicio, dataFim, horaInicio, horaFim, descricao) {
    let taskList
    if (JSON.parse(localStorage.getItem(`taskList`)) == null) {
        taskList = [];
    } else {
        taskList = JSON.parse(localStorage.getItem(`taskList`));
    }
    let Task = {
        tarefa: tarefa,
        dataInicio: dataInicio,
        dataFim: dataFim,
        horaInicio: horaInicio,
        horaFim: horaFim,
        descricao: descricao,
        id: taskList.length,
        status: 0
    };


    taskList.push(Task)
    localStorage.setItem(`taskList`, JSON.stringify(taskList));
}

function printTask () {
    let listTasks = JSON.parse(localStorage.getItem('taskList'))
    let tbody = document.getElementById('tbody');
    tbody.innerText = '';

    if (listTasks !== null) {

        for (let i=0; i < listTasks.length; i++) {
            let tr = tbody.insertRow();
            tr.addEventListener("click", () => toggleModal(listTasks[i].tarefa, listTasks[i].descricao));
    
            let td_tarefa = tr.insertCell();
            td_tarefa.classList.add("col-g-5", "col-m-4", "col-p-12");
            let td_inicio = tr.insertCell();
            td_inicio.classList.add("col-g-2", "col-m-2", "col-p-12");
            let td_termino = tr.insertCell();
            td_termino.classList.add("col-g-2", "col-m-2", "col-p-12");
            let td_status = tr.insertCell();
    
            td_tarefa.innerText = listTasks[i].tarefa;
            td_inicio.innerText = listTasks[i].dataInicio + " às " + listTasks[i].horaInicio;
            td_termino.innerText = listTasks[i].dataFim + " às " + listTasks[i].horaFim;

            td_status.innerText = timeTask(listTasks[i]);
            if (timeTask(listTasks[i]) == 'Em andamento') {
                td_status.classList.add("col-g-2", "col-m-2", "col-p-12", 'Em-Andamento');

            } else if (timeTask(listTasks[i]) == 'Em atrazo') {
                td_status.classList.add("col-g-2", "col-m-2", "col-p-12", 'Em-Atrazo');

            } else if (timeTask(listTasks[i]) == 'Pendente') {
                td_status.classList.add("col-g-2", "col-m-2", "col-p-12", 'Pendente');

            } else {
                td_status.classList.add("col-g-2", "col-m-2", "col-p-12", 'Realizada');

            }
    
            let td_botao = document.createElement("td");
            let button = document.createElement("button");
            td_botao.classList.add("col-g-1", "col-m-2", "col-p-12", "button-alterar")
            button.textContent = "Alterar"
            button.setAttribute("value", listTasks[i].id)
            button.setAttribute("onclick", "print_Change_Task(" + JSON.stringify(localStorage.getItem('ObjectChange')) + ")")
            button.addEventListener("click", () =>{
                localStorage.setItem("ObjectChange", JSON.stringify(listTasks[i]));
                localStorage.setItem("IdChangeTask", button.value);
                window.location.href = "alterar.html";
            })
    
    
            td_botao.appendChild(button)
            tr.appendChild(td_botao);
        }
    }
}


function timeTask (taskObject) {
    const dataAtual = new Date();
    const dataCompleta = dataAtual.getDate().toString().padStart(2, "0") + '/' + (dataAtual.getMonth() + 1).toString().padStart(2, "0") + '/' + dataAtual.getFullYear()
   
    if (taskObject.status !== 0) {
        return "Realizada"

    }else if (taskObject.dataInicio > dataCompleta) {
        return "Pendente";

    } else if (taskObject.dataInicio == dataCompleta) {
        if (taskObject.horaInicio < dataAtual.getHours) {
            return "Pendente";
        }

    } else if (taskObject.dataFim < dataCompleta) {
        return "Em atrazo";

    } else if (taskObject.dataFim == dataCompleta) {
        if (taskObject.horaFim < dataAtual.getHours) {
            return "Em atrazo";
        }
    } else {
        return "Em andamento";
    }
}

// Modal
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const h2 = document.querySelector("#h2-modal-header");
const p = document.querySelector("#p-modal-body");

function toggleModal(title, content) {
    /* Faz a autenancia das classes, se ele tiver a classe
    hide ela é retirada, caso contrario ele o adiciona*/
    h2.innerText = title;
    p.innerText = content;
    modal.classList.toggle("hide"); 
    fade.classList.toggle("hide");
}

fade.addEventListener("click", () => toggleModal());
closeModalButton.addEventListener("click", () => toggleModal());

function errorValidation(input) {
    const task_generator = input.parentNode;
    task_generator.className = 'task-generator error';
}
function normalValidation(input) {
    const task_generator = input.parentNode;
    task_generator.className = 'task-generator normal';
}



