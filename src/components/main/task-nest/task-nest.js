/* Логика todo list: 
Основная логика todo list у нас, это добавлять задачи и удалять по мере выполнение
++ 1. Добавление задачи при нажатии кнопки,
++ 2. Добавление задачи при нажатии enter,
3. Удаление определенной задачи пр нажатии по кнопке корзина:
  3.1 Для этого я думаю нужно понимать какой из, удаляем задачу. Для этого
  у нас есть уникальтный id . Вопрос, как нам понять по какой id мы кликаем?
  Можно например понять, если мы нажмем на checkkbox и поднимемся по родителям
  и оставновимся на элементе где есть id и выведем id. Вот такое рещение 
  Далее,если решим удалить, то также поднимемся к элементу где есть id 
  и удалим ее из массива, тем самым удалив с массива, удалиться и со страницы,
  при нажатии на delete мы будем запускать рендер еще раз.. 
 ++ 3.2 Нужно зачеркивать текст при нажатии на Checkbox :
      То есть, если checkbox у нас checked, то текст зачеркивается( добавляется
      класс определенный)
  3.3 При нажатии на кнопку удалить, удалить задачу! {
      Для начало нужно понять, по какой задаче мы кликаем. Далее поняв какой 
      id, удаляем ее из массива, то есть нужно удалить полностью обьект из массива
      тем самым вызвав еще раз rendertask, тем самым обновив список задач на странице


      }




*/
const dom = {
  addBtn: document.querySelector(".btn-add-task"),
  tasksBlock: document.querySelector(".tasks-block"),
  inputAdd: document.querySelector(".input-add-task"),
};

let tasks = [];

/* Обработчик при клике на кнопки*/

document.body.addEventListener("click", (e) => {
  let target = e.target;
  const deleteBtn = target.classList.contains("btn-delete-task");
  const addBtn = target.classList.contains("btn-add-task");
  const checkbox = target.classList.contains("checkbox");
  // console.log(target);
  if (addBtn) {
    e.preventDefault();
    let text = dom.inputAdd.value;
    if (text.length > 0) {
      addTask(text);
      dom.inputAdd.value = "";
      renderTask(tasks);
    }
  }
  if (deleteBtn) {
    console.log("deleteBTN!!!!!!");
    const taskBlock = target.parentElement.parentElement.parentElement;
    const taskId = taskBlock.getAttribute("id");
    deleteTask(taskId, tasks);
    renderTask(tasks);
  }

  if (checkbox) {
    const taskBlock = target.parentElement.parentElement.parentElement;
    const taskId = taskBlock.getAttribute("id");
    checkedTask(taskId, tasks);
    renderTask(tasks);
  }
});

/* Обработчик при нажатии на Enter  */

document.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    e.preventDefault();
    let text = dom.inputAdd.value;
    if (text.length > 0) {
      addTask(text);
      dom.inputAdd.value = "";
      renderTask(tasks);
    }
  }
});

/* Формирование обьекта задач */

function addTask(text) {
  const newTask = {
    id: Date.now(),
    text,
    state: false,
  };

  tasks.push(newTask);
}

/* Добавление задачи в DOM (отрисовка) */

function renderTask(arr) {
  let htmlList = "";

  arr.forEach((task) => {
    const cls = task.state ? "task-item-block__text_checked" : "";
    const checked = task.state ? "checked" : "";
    const taskHtml = `
            <div class="task-item-block" id="${task.id}">
              <div class="task-item-block__content">
                <label class="task-item-block__checkbox">
                  <input type="checkbox" class="checkbox"/ ${checked}>
                  <div class="checkbox-div"></div>
                </label>
                <p class="task-item-block__text ${cls}">${task.text}</p>
                <div class="btn-block">
                  <button class= "btn-delete-task">
                  </button>
                  <img
                    src="public/svg/tasknest/task.svg"
                    alt=""
                    class="task-item-block__img"
                  />
                </div>
              </div>
            </div>`;
    htmlList = htmlList + taskHtml;
  });
  dom.tasksBlock.innerHTML = htmlList;
}

/* Отлеживает нажат или нет checkbox */
function checkedTask(taskId, tasks) {
  tasks.forEach((task) => {
    if (taskId == task.id) {
      if (task.state == false) {
        task.state = true;
      } else {
        task.state = false;
      }
    }
  });
}

function deleteTask(taskId, tasks) {
  tasks.forEach((task, index) => {
    if (taskId == task.id) {
      tasks.splice(index, 1);
    }
  });
}
