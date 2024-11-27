const API_URL = 'http://localhost:5000/api';  // Replace with your actual backend URL

// Handle user login
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();

  if (data.token) {
    localStorage.setItem('authToken', data.token);  // Store the token
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid credentials');
  }
});
