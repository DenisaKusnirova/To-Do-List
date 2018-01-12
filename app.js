const saveButton = $("#saveButton");
const deleteButton = $("#deleteButton");
const input = $("#inputTask");
const taskContainer = $("#tasks");
const date = $(".currentDate");
const imageContainer = $(".image-container");
const taskStatus = $("#totalNumber");

// Display an image and current date
const image = $("<img src=\"brooklyn-bridge.jpg\" alt=\"Brooklyn bridge\">");
imageContainer.append(image);

var today = new Date();
var dd = today.getDate();
date.append(today);

// Delete all the tasks
deleteButton.click(() => {
  taskContainer.empty();
  taskStatus.empty();
})

// Add a new task and then clean an input field
var data = []

saveButton.click(() => {
  let task = new Task(input.val());
  data.push(task);
  taskContainer.append(task.htmlElement);
  input.val("");
  updateTaskStatus();
})

function createId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

// Write the number of tasks for a day
function getRemainingTasks() {
  var remaining = 0

  data.forEach((task) => {
    if (!task.isChecked) {
      remaining += 1;
    }
  })
  return remaining;
}

function updateTaskStatus() {
  let numberOfTasks = "You have " + getRemainingTasks() + " tasks for today";
  taskStatus.text(numberOfTasks);
}

class Task {
  constructor(text) {
    this.id = createId();
    this.text = text;
    this.isChecked = false;
    this.htmlElement = $("<input type=\"checkbox\" class=\"checkbox\" id=\"" + this.id + "\">" + this.text + "<br>");
    this.htmlElement.change(() => {
      if (this.htmlElement.is(":checked")) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    })
  }
}
