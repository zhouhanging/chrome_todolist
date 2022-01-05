document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addList").addEventListener("click", handler);
});
let todoList = [];
function handler() {
  let todoInfo = document.getElementsByName("inputTodoInfo")[0].value;
  if (todoInfo.length > 0) {
    let selectTimeIndex = document.getElementById("selectTime").selectedIndex;
    let selectTime = [15, 10, 5, 1];
    let todo = {
      info: todoInfo,
      createTime: new Date().getTime(),
      nextTime: new Date().getTime() + selectTime[selectTimeIndex] * 60 * 1000,
      time: selectTime[selectTimeIndex],
    };
    var bg = chrome.extension.getBackgroundPage(); // 核心api
    bg.addList(todo);
    document.getElementsByName("inputTodoInfo")[0].value = "";
    getList();
  } else {
    alert("还没有输入内容哦");
  }
}
window.onload = function () {
  getList();
};

function getList() {
  let listDiv = document.getElementById("todo");
  var bg = chrome.extension.getBackgroundPage(); // 核心api
  todoList = bg.getList();
  let todoView = ``;
  if (todoList.length > 0) {
    for (let i = 0; i < todoList.length; i++) {
      todoView += `
            <div class="todo infoView">
            <div class="centerView">
            <div class="todoTitle">${todoList[i].info}</div>
            <div class="infoView pflex">
                <div style="width:50%">创建时间:</div>
                <div style="width:50%">${timestampToTime(
                  todoList[i].createTime
                )}</div>
            </div>
            <div class="infoView pflex">
                <div style="width:50%">提醒周期:</div>
                <div style="width:50%">${todoList[i].time}分钟</div>
            </div>
            <div class="infoView pflex" style="justify-content: flex-end;">
                <button class="finish">完成待办</button>
            </div>
        </div>
        </div>`;
    }
    listDiv.innerHTML = todoView;
    let finishButton = document.getElementsByClassName("finish");
    for (let i = 0; i < finishButton.length; i++) {
      console.log(finishButton[i]);
      finishButton[i].onclick = function () {
        finish(i);
      };
    }
  } else {
    listDiv.innerHTML = "";
  }
}

function finish(i) {
  todoList.splice(i, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  getList();
}

function timestampToTime(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() + " ";
  var h = date.getHours() + ":";
  var m = date.getMinutes() + ":";
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}
