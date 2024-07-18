const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");
let tasks = [];

function renderTaskOnHtml(taskTitle, done = false) {
  //Criando as "li"
  const li = document.createElement("li");

  const input = document.createElement("input"); //Criando o input
  input.setAttribute("type", "checkbox"); // adicionando a propriedade do input

  //Adicionando evento para a checkbox
  input.addEventListener("change", (event) => {
    const liToggle = event.target.parentElement;
    const spanToggle = liToggle.querySelector("span");
    const done = event.target.checked;
    if (done) {
      spanToggle.style.textDecoration = "line-through";
    } else {
      spanToggle.style.textDecoration = "none";
    }
    // t = Tarefas
    tasks = tasks.map((t) => {
      if (t.title === spanToggle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }
      return t;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  input.checked = done;
  //Criando o span
  const span = document.createElement("span");
  span.textContent = taskTitle;
  if (done) {
    spanToggle.style.textDecoration = "line-through";
  }
  //Criando o button e adicionando a dinâmica de remover
  const button = document.createElement("button");
  button.textContent = "Remover";
  button.addEventListener("click", (event) => {
    const liRemove = event.target.parentElement;
    const titleRemove = liRemove.querySelector("span").textContent;
    //Removendo através do título
    tasks = -tasks.filter((t) => t.title !== titleRemove);

    todoListUl.removeChild(liRemove);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  //Renderizar no HTML
  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  //Adicionando tarefa no HTML
  todoListUl.appendChild(li);
}

window.onload = () => {
  const tasnkOnLocalStorage = localStorage.getItem("tasks");
  if (!tasnkOnLocalStorage) return;
  tasks = JSON.parse(tasnkOnLocalStorage);
  tasks.forEach((t) => {
    renderTaskOnHtml(t.title, t.done);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault(); //Evita que a página recarregue ao apertar o botão

  const taskTitle = taskTitleInput.value;

  if (taskTitle.lenght < 3) {
    alert("Sua tarefa precisa ser maior");
    return;
  }

  //Adicionando tarefa no array
  tasks.push({
    title: taskTitle,
    done: false,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Salvando tarefa no localstorage

  //Adicionando no HTML
  renderTaskOnHtml(taskTitle);

  //Limpando o input ao clicar no botão
  taskTitleInput.value = "";
});
