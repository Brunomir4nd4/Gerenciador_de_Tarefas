const form_task_generator = document.getElementById("form-task-generator")
let Task = JSON.parse(localStorage.getItem("ObjecChange"));
let taskList = JSON.parse(localStorage.getItem("taskList"));

form_task_generator.addEventListener("submit", (event) => {
    event.preventDefault();

})
// localStorage.clear()

window.addEventListener('load', function () {
    let Task = JSON.parse(localStorage.getItem("ObjectChange"))
    document.getElementById("tarefa-alterar").value = Task.tarefa;
    document.getElementById("dataInicio-alterar").value = Task.dataInicio;
    document.getElementById("dataFim-alterar").value = Task.dataFim;
    document.getElementById("horaInicio-alterar").value = Task.horaInicio;
    document.getElementById("horaFim-alterar").value = Task.horaFim;
    document.getElementById("descricao-alterar").value = Task.descricao;

    if (Task.status == 1) {
        let button_realizado = document.querySelector(".realizada");
        button_realizado.textContent = "Marcar como não realizada";
        button_realizado.classList.toggle("naoRealizada");
    }
});

function TrocaPagina() {
    window.location = "task_Generator.html"
}

function Cancelar() {
    TrocaPagina();
}

function AccomplishedTask(Task) {
    lista = [];

    for (let i=0; i < taskList.length; i++) {

        if (Task.status == 0) {

            if (Task.tarefa != taskList[i].tarefa) {
                lista.push(taskList[i]);
    
            } else {
                Task.status = 1;
                lista.push(Task);
                alert("SUCESSO!! Tarefa marcada como realizada");
            }
        } else {
            if (Task.tarefa != taskList[i].tarefa) {
                lista.push(taskList[i]);
    
            } else {
                Task.status = 0;
                lista.push(Task);
                alert("Tarefa marcada como não realizada");
            }
        }
    }
    localStorage.setItem("taskList", JSON.stringify(lista));
    TrocaPagina();
}

function Chenge_Task(Task) {
    Task.tarefa = document.getElementById("tarefa-alterar").value;
    Task.dataInicio = document.getElementById("dataInicio-alterar").value;
    Task.dataFim = document.getElementById("dataFim-alterar").value;
    Task.horaInicio = document.getElementById("horaInicio-alterar").value;
    Task.horaFim = document.getElementById("horaFim-alterar").value;
    Task.descricao = document.getElementById("descricao-alterar").value;
    
    lista = [];
    for (let i=0; i < taskList.length; i++) {
        if (i != Task.id) {
            lista.push(taskList[i]);
        } else {
            lista.push(Task);
        }
    }
    localStorage.setItem("taskList", JSON.stringify(lista));
    alert("SUCESSO!! Tarefa Alterada");
    TrocaPagina();

}

function Remove_Task(id) {
    if (taskList !== null && confirm("Deseja realmente apagar a tarefa " + taskList[id].tarefa)) {

        for (let i=0; i < taskList.length; i++) {
            if (taskList[i].id == id) {
                taskList.splice(i, 1);
                for (let j=0; j < taskList.length; j++) {
                    if (taskList[j].id - 1 < 0) {
                        taskList[j].id = 0;
                    } else {
                        taskList[j].id -= 1;
                    }
                }
                break;
            }
        }
    
        localStorage.setItem("taskList", JSON.stringify(taskList));
        alert("SUCESSO!! Tarefa Excluida");
        TrocaPagina();
    } 
}

