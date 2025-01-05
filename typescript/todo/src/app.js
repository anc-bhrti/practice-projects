// Difference Between Interface and Type
// Interface is specifically for defining object shapes and can be extended or merged.
// Type can represent a variety of types (unions, intersections, etc.) but cannot be merged.
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["Pending"] = "Pending";
    TaskStatus["Completed"] = "Completed";
})(TaskStatus || (TaskStatus = {}));
var tasks = [];
var taskIdCounter = 0;
var addTask = function (description) {
    var task = {
        id: taskIdCounter++,
        description: description,
        isCompleted: false,
    };
    tasks.push(task);
    renderTasks();
};
var toggleTaskCompletion = function (id) {
    var task = tasks.find(function (task) { return task.id === id; });
    if (task) {
        task.isCompleted = !task.isCompleted;
        renderTasks();
    }
};
var deleteTask = function (id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    renderTasks();
};
var renderTasks = function () {
    var taskList = document.getElementById("todo-list");
    taskList.innerHTML = "";
    tasks.forEach(function (task) {
        var li = document.createElement("li");
        li.className = task.isCompleted ? "completed" : "";
        li.innerHTML = "\n        <span>".concat(task.description, "</span>\n        <div>\n          <button onclick=\"toggleTask(").concat(task.id, ")\">\n            ").concat(task.isCompleted ? "Undo" : "Complete", "\n          </button>\n          <button onclick=\"removeTask(").concat(task.id, ")\">Delete</button>\n        </div>\n      ");
        taskList.appendChild(li);
    });
};
var form = document.getElementById("todo-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var input = document.getElementById("todo-input");
    if (input.value.trim()) {
        addTask(input.value.trim());
        input.value = "";
    }
});
// Expose functions globally
window.toggleTask = toggleTaskCompletion;
window.removeTask = deleteTask;
