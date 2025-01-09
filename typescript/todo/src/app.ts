// Difference Between Interface and Type
// Interface is specifically for defining object shapes and can be extended or merged.
// Type can represent a variety of types (unions, intersections, etc.) but cannot be merged.

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

enum TaskStatus {
  Pending = "Pending",
  Completed = "Completed",
}


let tasks: Task[] = [];
let taskIdCounter = 0;

const addTask = (description: string): void => {
  const task: Task = {
    id: taskIdCounter++,
    description,
    isCompleted: false,
  };
  tasks.push(task);
  renderTasks();
};

const toggleTaskCompletion = (id: number): void => {
  const task = tasks.find((task) => task.id === id); 
  // task.find() is an array method to in js; find returns the first element in ana array that staisfies or else undefined if not found.
  // if task with id could not be found task will be undefined.
  // A callback function is a function that is passed as an argument to another function, and it is called (invoked) inside that function. 
  if (task) { 
//if(task) checks whetehr tsk is defined or not, if it is not defined it will not execute the if statement
    task.isCompleted = !task.isCompleted;
    renderTasks(); // to update the ui
  }
};

const deleteTask = (id: number): void => {
  tasks = tasks.filter((task) => task.id !== id);
// here we have used filter because filter returns a new array that satisfies the given condition, it could be empty array but not undefined
  renderTasks();
};

//use filter for deleting; use find for toggling

const renderTasks = (): void => {
  const taskList = document.getElementById("todo-list")!;
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.isCompleted ? "completed" : "";
    li.innerHTML = `
      <span>${task.description}</span>
      <div>
        <button onclick="toggleTask(${task.id})">
          ${task.isCompleted ? "Undo" : "Complete"}
        </button>
        <button onclick="removeTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
};

const form = document.getElementById("todo-form") as HTMLFormElement; //HTMLFormElemet is a ts way of telling that this is an HTML form.
form.addEventListener("submit", (event) => {
event.preventDefault();
const input = document.getElementById("todo-input") as HTMLInputElement;
if (input.value.trim()) {
  addTask(input.value.trim()); //input.value gets the value entered by user and trim remives any leading or trailing white spaces
  input.value = "";
}
});

// Expose functions globally
// (window as any).toggleTask = toggleTaskCompletion;
// (window as any).removeTask = deleteTask;
