function submitLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!validateForm(username, password)) {
    return;
  }

  const loginButton = document.getElementById('loginButton');
  loginButton.disabled = true;

  fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Application-Key':
        'TU2ecedd420922b9c533378fbfd1a1135f335e072a347689002caa1a73ac6c0c4a98954a78a147ea2b7ae10bdefe2fb198',
    },
    body: JSON.stringify({
      UserName: username,
      PassWord: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status) {
        setTimeout(() => {
          const notification = document.getElementById('notification');
          notification.classList.remove('hidden');
          setTimeout(() => {
            notification.classList.add('hidden');
          }, 3000);
        }, 1000);
      } else {
        const errorMessage = document.getElementById('errorMessage');

        errorMessage.innerHTML += data.message + '<br>';
        errorMessage.classList.remove('hidden');
      }
    })
    .catch((error) => console.error('Error:', error));

  loginButton.disabled = false;
}

function call_REST_API_Hello() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const url =
    'http://localhost:8080/hello?' +
    new URLSearchParams({ myName: username, lastName: password }).toString();

  fetch(url)
    .then((response) => response.text())
    .then((text) => {
      document.getElementById('message').innerText = text;
    })
    .catch((error) => console.error('Error:', error));
}

function togglePassword() {
  const password = document.getElementById('password');

  const type =
    password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  document.querySelector('svg').classList.toggle('text-sky-500');
}

function validateForm(username, password) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.innerHTML = '';
  errorMessage.classList.add('hidden');

  const usernameRegex = /^[0-9]{10}$/;
  const passwordRegex = /^[0-9]{13}$/;

  let isValid = true;

  if (!usernameRegex.test(username)) {
    showError('Username must be 10 numeric characters.');
    isValid = false;
  }

  if (!passwordRegex.test(password)) {
    showError('Password must be 13 numeric characters.');
    isValid = false;
  }

  return isValid;
}

function showError(message) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.innerHTML += message + '<br>';
  errorMessage.classList.remove('hidden');
}
