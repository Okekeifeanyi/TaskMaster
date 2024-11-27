const apiUrl = 'http://localhost:5000/api/tasks';
const authUrl = 'http://localhost:5000/api/auth'; // Login and Register endpoints

// Register user
const register = async () => {
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch(`${authUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  const result = await response.json();
  if (response.ok) {
    alert('Registration successful! Please login.');
  } else {
    alert(result.message);
  }
};

// Login user
const login = async () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch(`${authUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (response.ok) {
    localStorage.setItem('token', result.token);  // Save JWT token in localStorage
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('task-container').style.display = 'block';  // Show task management
    getTasks();  // Fetch tasks after login
  } else {
    alert(result.message);
  }
};

// Fetch tasks and display them
const getTasks = async () => {
  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (response.ok) {
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = tasks.map(task => `
      <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Priority: ${task.priority}</p>
        <p>Deadline: ${task.deadline}</p>
      </div>
    `).join('');
  } else {
    alert('Failed to load tasks');
  }
};

// Create task
const createTask = async () => {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const deadline = document.getElementById('deadline').value;
  const priority = document.getElementById('priority').value;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ title, description, deadline, priority }),
  });

  if (response.ok) {
    const newTask = await response.json();
    console.log(newTask);
    getTasks();  // Refresh task list after creating a new task
  } else {
    alert('Error creating task');
  }
};

// Show create task form
const showCreateForm = () => {
  document.getElementById('task-form').style.display = 'block';
};

// Fetch tasks when page loads
if (localStorage.getItem('token')) {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('task-container').style.display = 'block';
  getTasks();  // Fetch tasks if user is already logged in
} else {
  document.getElementById('login-form').style.display = 'block';  // Show login if not logged in
}
