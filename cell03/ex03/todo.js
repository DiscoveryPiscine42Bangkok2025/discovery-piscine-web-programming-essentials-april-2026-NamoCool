document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('ft_list');
    const newBtn = document.getElementById('New');

    function loadTodos() {
        const cookies = document.cookie.split(';');
        let todoCookie = cookies.find(c => c.trim().startsWith('todos='));
        if (todoCookie) {
            try {
                const todos = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
                todos.forEach(text => createTodoElement(text, false));
            } catch (e) {}
        }
    }

    function saveTodos() {
        const todos = [];
        const items = list.children;
        for (let i = 0; i < items.length; i++) {
            todos.push(items[i].textContent);
        }
        
        const date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; expires=" + date.toUTCString() + "; path=/";
    }

    function createTodoElement(text, prepend = true) {
        const div = document.createElement('div');
        div.textContent = text;
        div.className = 'todo-item';
        
        div.onclick = function() {
            if (confirm("Do you want to remove this TO DO?")) {
                div.remove();
                saveTodos();
            }
        };

        if (prepend && list.firstChild) {
            list.insertBefore(div, list.firstChild);
        } else {
            list.appendChild(div);
        }
    }

    newBtn.onclick = function() {
        const text = prompt("Enter a new TO DO:");
        if (text && text.trim() !== "") {
            createTodoElement(text.trim(), true);
            saveTodos();
        }
    };

    // Load existing items on startup
    loadTodos();
});