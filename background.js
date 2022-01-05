window.setInterval(function () {
  let todoList = [];
  let time = new Date().getTime();
  let endTime = time + 1000 * 20;
  if (localStorage.getItem("todoList")) {
    todoList = JSON.parse(localStorage.getItem("todoList"));
    console.log(todoList);
    for (let i = 0; i < todoList.length; i++) {
      console.log(time);
      if (todoList[i].nextTime <= endTime) {
        alert("别忘记哦," + todoList[i].info);
        todoList[i].nextTime += todoList[i].time * 60 * 1000;
      }
    }
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
}, 1000 * 20);

function addList(todo) {
  let todoList = [];
  if (localStorage.getItem("todoList")) {
    todoList = JSON.parse(localStorage.getItem("todoList"));
  }
  if (todoList.length >= 5) {
    alert("宝贝，最多只支持五条哦");
  } else {
    todoList.push(todo);
    console.log(todoList);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
}

function getList() {
  return JSON.parse(localStorage.getItem("todoList"));
}
