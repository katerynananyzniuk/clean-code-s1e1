const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

//New task list item
const createNewTaskElement = function(taskString) {

  let listItem = document.createElement('li');

  let checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  listItem.appendChild(checkBox);

  let label = document.createElement('label');
  label.innerText = taskString;
  label.className = 'task';
  listItem.appendChild(label);

  let editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';
  listItem.appendChild(editInput);

  let editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  listItem.appendChild(editButton);

  let deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  listItem.appendChild(deleteButton);
  
  let deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  return listItem;
}

const addTask = function() {
  
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;

  console.log("Add Task...");
  let listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

//Edit an existing task.
const editTask = function() {
  console.log("Edit Task...");

  let listItem = this.parentNode; //Editable li

  let editInput = listItem.querySelector('input[type="text"]');
  let label = listItem.querySelector('label');
  let editBtn = listItem.querySelector('.edit');
  let containsClass = listItem.classList.contains('edit-mode');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value=label.innerText;
    editBtn.innerText='Save';
  }

  listItem.classList.toggle('edit-mode');
};

//Delete task.
const deleteTask = function() {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  
  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function() {
  console.log("Complete Task...");

  let listItem = this.parentNode;

  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark task incomplete
const taskIncomplete = function() {
  console.log("Incomplete Task...");

  let listItem = this.parentNode;

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest = function() {
  console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  //taskListItem is an item for binding
  let checkBox = taskListItem.querySelector('input[type=checkbox]');
  let editButton = taskListItem.querySelector('button.edit');
  let deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
for (let i=0; i < incompleteTaskHolder.children.length; i++) {

  //bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i=0; i < completedTasksHolder.children.length; i++) {

  //bind events to list items children(taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
