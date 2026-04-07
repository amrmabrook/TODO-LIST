// localStorage.clear();
let deleteBtn = document.querySelector(".del");
let tasks = document.querySelector(".tasks");
let inputText = document.querySelector(".text");
let addBtn = document.querySelector(".add");
//setting
let myData = [];
let editRow = null;
// localStorage.clear();

//get data from localstorage
if (localStorage.getItem("task")) {
  myData = JSON.parse(localStorage.task);
}

getFromlocal();

addBtn.addEventListener("click", (e) => {
  if (inputText.value !== "") {
    creatTask(inputText.value);
    showtasks(myData);

    inputText.value = "";
  } else {
    showAlert("Error please fill in feild", "error");

    return false;
  }
});

tasks.onclick = (e) => {
  if (e.target.classList.contains("del")) {
    //delete from localstorage
    deletTask(e.target.parentElement.getAttribute("data-id"));
    //delete from page
    e.target.parentElement.remove();
    showAlert("Deleted successfully", "success");
  }
  //update status
  if (e.target.classList.contains("task")) {
    //update status of tasks on localstorge
    updateStatus(e.target.getAttribute("data-id"));
    //task is done on page
    e.target.classList.toggle("done");
  }

  //update task
  if (e.target.classList.contains("edit")) {
    editTask(e.target.parentElement.getAttribute("data-id"));
  }
};

//creatTask
function creatTask(text) {
  if (addBtn.textContent == "Up Date") {
    myData = myData.map((el) => {
      if (el.id == editRow) {
        return {...el, title: text};
      }
      return el;
    });
    editRow = null;
    addBtn.textContent = "Add task";
  } else {
    const task = {
      id: Date.now(),
      title: text,
      completed: false,
    };
    myData.push(task);
  }

  //add data to localstorg
  storData(myData);
}
//[2]funciton to create task
function showtasks(arr) {
  tasks.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    //create task
    let mytask = document.createElement("div");
    mytask.textContent = arr[i].title;
    mytask.className = "task";
    mytask.setAttribute("data-id", arr[i].id);
    if (arr[i].completed) {
      mytask.classList.add("done");
    }

    //create delete button
    let delbutton = document.createElement("i");
    delbutton.classList = "fa-solid fa-trash-can del";

    //creat edit button
    let editBtn = document.createElement("i");
    editBtn.classList = "fa-solid fa-pen-to-square edit";

    //appended elements
    mytask.appendChild(delbutton);
    mytask.appendChild(editBtn);
    //add task to page
    tasks.appendChild(mytask);
  }
}

//[3] function to add tasks to localstorage
function storData(myData) {
  localStorage.setItem("task", JSON.stringify(myData));
}

//[4]functio to get data from localstorage
function getFromlocal() {
  let data = localStorage.getItem("task");
  if (data) {
    myData = JSON.parse(data);
  }
  showtasks(myData);
}

//[5]delete from localstorage
function deletTask(taskid) {
  myData = myData.filter((el) => {
    return el.id != taskid;
  });
  //update localstorage
  storData(myData);
}

//[6] function to update status of task
function updateStatus(taskid) {
  for (let i = 0; i < myData.length; i++) {
    if (myData[i].id == taskid) {
      myData[i].completed == false
        ? (myData[i].completed = true)
        : (myData[i].completed = false);
    }
  }
  storData(myData);
}

//[7]function show alerts
function showAlert(msg, cls) {
    //remove alert before 
    document.querySelectorAll(".alert").forEach(el=>{el.remove()})
//create alert
  let myalert = document.createElement("div");
  myalert.className = `alert ${cls}`;
  myalert.textContent = msg;


  let exitBtn = document.createElement("button");
  exitBtn.className = "exit";
  exitBtn.textContent = "X";

  //exit event
  exitBtn.onclick = () => {
    myalert.remove();
  };

  myalert.appendChild(exitBtn);
  document.querySelector(".todo-app").appendChild(myalert);

  setTimeout(()=>{
    myalert.remove();
  },4000)
}

//[8] function to edit task
function editTask(taskId) {
  editRow = taskId;
  let mynew = myData.find((el) => {
    return el.id == editRow;
  });
  console.log(mynew);
  if (mynew) {
    inputText.value = mynew.title;
    addBtn.textContent = "Up Date";
  }
}
