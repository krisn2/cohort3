 let todos = []
    let nextId = 1;

    function addTodo() {
      const input =document.getElementById('todoInput');
      const text = input.value.trim();

      if (text === '') {
        input.focus();
        return;
      }
      const todo = {
        id: nextId++,
        text,
        completed: false,
        createdAt: new Date(),
      };

      todos.push(todo)
      input.value=""
      input.focus();

      renderTodos();
      updateStats();
    }

    function toggleTodo(id) {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        updateStats();
      }
    }

    function deleteTodo(id) {
      todos = todos.filter(t => t.id !== id);
      renderTodos();
      updateStats();
    }

    function renderTodos(){
      const todoList = document.getElementById('todoList');
      
      if (todos.length == 0) {
        todoList.innerHTML = `<div class= "empty-state">No tasks yet. Add one above!</div> `
        return
      }
      todoList.innerHTML = todos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed':''}">
          <div class="todo-content">
            <input type="checkbox" class="checkbox" ${todo.completed ? 'checked':''}
            onchange="toggleTodo(${todo.id})">
            <span class="todo-text">${escapeHtml(todo.text)}</span>
          </div>
          <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        </li>
      `).join('');
    }

    function updateStats() {
      const total = todos.length;
      const completed = todos.filter(t => t.completed).length;

      document.getElementById('totalTasks').textContent = total;
      document.getElementById('completedTasks').textContent = completed;
    }

    function escapeHtml(text){
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

     document.getElementById('todoInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });

        // Initialize the app
        renderTodos();
        updateStats();
        document.getElementById('todoInput').focus();