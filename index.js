// Funktion zum Abrufen der Todos aus dem Local Storage
function getTodosFromLocalStorage() {
  const todosString = localStorage.getItem("todos");
  return todosString ? JSON.parse(todosString) : [];
}

/* Diese Funktion liest die gespeicherten Todos aus dem Local Storage und gibt sie als JavaScript-Array zurück. 
Wenn keine Todos gefunden werden, wird ein leeres Array zurückgegeben. */


// Funktion zum Speichern der Todos im Local Storage
function saveTodosToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
/* Diese Funktion speichert die übergebene Liste von Todos im Local Storage, nachdem sie sie in einen JSON-String umgewandelt hat. */ 

// Funktion zum Anzeigen der Todos in der Liste
function renderTodos() {
  const todos = getTodosFromLocalStorage();
  const todosList = document.getElementById("todos");
  todosList.innerHTML = "";

  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${todo.text}
      <div className="button-box">
      <button class="edit" data-index="${index}">Edit</button>
      <button class="delete" data-index="${index}">Delete</button>
    </div>`;

    const deleteButton = listItem.querySelector(".delete");
    deleteButton.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodosToLocalStorage(todos);
      renderTodos();
    });

    // Bei Abbrechen vom Edit entsteht ein Error
    const editButton = listItem.querySelector(".edit");
    editButton.addEventListener("click", () => {
      const newText = prompt("Neuen Text eingeben:", todo.text);
      if (newText !== null) {
        todo.text = newText;
        saveTodosToLocalStorage(todos);
        renderTodos();
      }
    });

    todosList.appendChild(listItem);
  });
}
/* Diese Funktion rendert die Liste der Todos auf der Webseite. 
Sie holt sich zuerst die Todos aus dem Local Storage, erstellt dann HTML-Elemente für jedes Todo und fügt Edit- und Delete-Buttons hinzu. 
Die Todos werden in einer Liste angezeigt, und die Funktion fügt Event Listener für das Löschen und Bearbeiten hinzu. */ 

// Funktion zum Hinzufügen eines neuen Todos
function addTodo() {
  const todoInput = document.getElementById("todo");
  const text = todoInput.value.trim();

  if (text !== "") {
    const todos = getTodosFromLocalStorage();
    todos.push({ text });
    saveTodosToLocalStorage(todos);
    todoInput.value = "";
    renderTodos();
  }
}
/* Diese Funktion fügt ein neues Todo hinzu. 
Sie holt sich den Text aus dem Eingabefeld, überprüft, ob er nicht leer ist, 
fügt dann das Todo zur Liste hinzu, speichert die aktualisierte Liste im Local Storage und ruft renderTodos() auf, um die Anzeige zu aktualisieren. */ 

// Event Listener für das Eingabefeld, um auf Enter zu reagieren
const todoInput = document.getElementById("todo");
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

// Event Listener für den "Save"-Button
const addButton = document.getElementById("add");
addButton.addEventListener("click", addTodo);
/* Dieser Code fügt einen Event Listener zum "Save"-Button hinzu, 
damit die addTodo()-Funktion aufgerufen wird, wenn der Button geklickt wird. */ 

// Initialisierung: Todos anzeigen
renderTodos();