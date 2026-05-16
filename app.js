// app.js

// Inicializa a simulação do banco de dados no localStorage
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}
if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', JSON.stringify([]));
}

// Elementos Globais
const authContainer = document.getElementById('auth-container');
const loginFormContainer = document.getElementById('login-form-container');
const registerFormContainer = document.getElementById('register-form-container');
const dashboardContainer = document.getElementById('dashboard-container');

// Elementos: Formulários
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const taskForm = document.getElementById('task-form');

// Elementos: Login
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginEmailError = document.getElementById('login-email-error');
const loginPasswordError = document.getElementById('login-password-error');
const loginGeneralError = document.getElementById('login-general-error');

// Elementos: Cadastro
const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerNameError = document.getElementById('register-name-error');
const registerEmailError = document.getElementById('register-email-error');
const registerPasswordError = document.getElementById('register-password-error');
const registerGeneralError = document.getElementById('register-general-error');

// Navegação entre formulários
const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');

// Elementos: Dashboard
const greeting = document.getElementById('greeting');
const logoutBtn = document.getElementById('logout-btn');
const taskTitle = document.getElementById('task-title');
const taskTitleError = document.getElementById('task-title-error');
const taskType = document.getElementById('task-type');
const taskDesc = document.getElementById('task-desc');
const tasksList = document.getElementById('tasks-list');
const noTasksMsg = document.getElementById('no-tasks-msg');

// Helpers de validação visual
const showError = (element, message) => {
    element.textContent = message;
    element.classList.remove('hidden');
};

const hideError = (element) => {
    element.classList.add('hidden');
};

const clearAuthErrors = () => {
    [loginEmailError, loginPasswordError, loginGeneralError, 
     registerNameError, registerEmailError, registerPasswordError, registerGeneralError]
     .forEach(hideError);
};

// Alternar entre Telas de Login e Cadastro
showRegisterBtn.addEventListener('click', () => {
    loginFormContainer.classList.add('hidden');
    registerFormContainer.classList.remove('hidden');
    clearAuthErrors();
    loginForm.reset();
});

showLoginBtn.addEventListener('click', () => {
    registerFormContainer.classList.add('hidden');
    loginFormContainer.classList.remove('hidden');
    clearAuthErrors();
    registerForm.reset();
});

// Fluxo de Cadastro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAuthErrors();
    
    const name = registerName.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();
    let hasError = false;

    if (!name) { showError(registerNameError, 'Nome é obrigatório.'); hasError = true; }
    if (!email) { showError(registerEmailError, 'E-mail é obrigatório.'); hasError = true; }
    if (!password) { showError(registerPasswordError, 'Senha é obrigatória.'); hasError = true; }

    if (hasError) return;

    const users = JSON.parse(localStorage.getItem('users'));
    if (users.some(u => u.email === email)) {
        showError(registerGeneralError, 'Este e-mail já está em uso.');
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Login automático
    localStorage.setItem('currentUser', JSON.stringify({ name, email }));
    registerForm.reset();
    checkAuth();
});

// Fluxo de Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAuthErrors();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();
    let hasError = false;

    if (!email) { showError(loginEmailError, 'E-mail é obrigatório.'); hasError = true; }
    if (!password) { showError(loginPasswordError, 'Senha é obrigatória.'); hasError = true; }

    if (hasError) return;

    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email);

    if (!user) {
        showError(loginGeneralError, 'E-mail não encontrado.');
        return;
    }

    if (user.password !== password) {
        showError(loginGeneralError, 'Senha incorreta.');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
    loginForm.reset();
    checkAuth();
});

// Fluxo de Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    checkAuth();
});

// Helpers do Dashboard
const getTypeStyles = (type) => {
    switch (type) {
        case 'Trabalho': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
        case 'Pessoal': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
        case 'Estudos': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
        default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
};

const renderTasks = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const todos = JSON.parse(localStorage.getItem('todos'));
    const userTodos = todos.filter(t => t.userId === currentUser.email);

    tasksList.innerHTML = '';

    if (userTodos.length === 0) {
        noTasksMsg.classList.remove('hidden');
        tasksList.classList.add('hidden');
        return;
    }

    noTasksMsg.classList.add('hidden');
    tasksList.classList.remove('hidden');

    // Ordem: Pendentes primeiro, mantendo a ordem de criação
    const sortedTodos = [...userTodos].sort((a, b) => {
        if (a.done === b.done) return b.id - a.id;
        return a.done ? 1 : -1;
    });

    sortedTodos.forEach(task => {
        const card = document.createElement('div');
        card.className = `glass border rounded-xl p-4 transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${task.done ? 'opacity-50' : 'hover:border-slate-400'}`;
        
        card.innerHTML = `
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-2">
                    <h3 class="font-semibold text-lg truncate ${task.done ? 'line-through text-slate-400' : 'text-white'}">${task.title}</h3>
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTypeStyles(task.type)}">
                        ${task.type}
                    </span>
                </div>
                ${task.description ? `<p class="text-sm text-slate-300 line-clamp-2 ${task.done ? 'line-through text-slate-500' : ''}">${task.description}</p>` : ''}
            </div>
            ${!task.done ? `
                <button onclick="completeTask(${task.id})" class="shrink-0 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium py-1.5 px-4 rounded-lg transition-colors text-sm">
                    Concluir
                </button>
            ` : `
                <span class="text-emerald-500 text-sm font-medium flex items-center gap-1 shrink-0">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Concluída
                </span>
            `}
        `;
        tasksList.appendChild(card);
    });
};

// Criação de Tarefa
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideError(taskTitleError);

    const title = taskTitle.value.trim();
    const type = taskType.value;
    const description = taskDesc.value.trim();

    if (!title) {
        showError(taskTitleError, 'Título da tarefa é obrigatório.');
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const todos = JSON.parse(localStorage.getItem('todos'));

    const newTask = {
        id: Date.now(),
        userId: currentUser.email,
        title,
        type,
        description,
        done: false
    };

    todos.push(newTask);
    localStorage.setItem('todos', JSON.stringify(todos));
    
    taskForm.reset();
    taskType.value = 'Trabalho'; 
    renderTasks();
});

// Ação Global: Concluir Tarefa
window.completeTask = (id) => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const taskIndex = todos.findIndex(t => t.id === id);
    
    if (taskIndex !== -1) {
        todos[taskIndex].done = true;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTasks();
    }
};

// Verificação Global de Autenticação
const checkAuth = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        // Usuário logado: Mostra Dashboard
        authContainer.classList.add('hidden');
        document.body.classList.remove('items-center', 'justify-center');
        dashboardContainer.classList.remove('hidden');
        
        // Atualiza UI do Dashboard
        const firstName = currentUser.name.split(' ')[0];
        greeting.textContent = `Olá, ${firstName}`;
        renderTasks();
    } else {
        // Usuário não logado: Mostra Auth
        dashboardContainer.classList.add('hidden');
        document.body.classList.add('items-center', 'justify-center');
        authContainer.classList.remove('hidden');
        loginFormContainer.classList.remove('hidden');
        registerFormContainer.classList.add('hidden');
    }
};

// Iniciar a Aplicação
checkAuth();
