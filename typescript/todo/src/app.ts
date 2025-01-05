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
    if (task) {
      task.isCompleted = !task.isCompleted;
      renderTasks();
    }
  };

  const deleteTask = (id: number): void => {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
  };

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

const form = document.getElementById("todo-form") as HTMLFormElement;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("todo-input") as HTMLInputElement;
  if (input.value.trim()) {
    addTask(input.value.trim());
    input.value = "";
  }
});

// Expose functions globally
(window as any).toggleTask = toggleTaskCompletion;
(window as any).removeTask = deleteTask;
