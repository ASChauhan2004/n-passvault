const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});
// Get references to the buttons
const signUpBtn = document.getElementById('sign-up');
const logInBtn = document.getElementById('log-in');

// Event listeners for the buttons
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    signUpUser(); // Call the signup function
});

logInBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    loginUser(); // Call the login function
});

// Function to handle user signup
function signUpUser() {
    var username = document.getElementById('signup-username').value;
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;

    fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Signup Successful');
            // Optionally, redirect to the login page or another page
        } else {
            alert('Signup Failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Signup Failed');
    });
}

function loginUser() {
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    
    try{
        fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user',JSON.stringify({ username: data.username, email: data.email }));
            window.location.href = '/user.html'
        } else {
            alert('Login Failed: ' + data.message);
        }
    })
    } catch(error) {
        console.error('Error:', error);
        alert('Login Failed');
    };
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.fas.fa-user').addEventListener('click', () => {
        window.location.href = '/user.html';
    });

    document.querySelector('.fas.fa-shield-alt').addEventListener('click', () => {
        window.location.href = '/vault.html';
    });

    document.querySelector('.fas.fa-lock').addEventListener('click', () => {
        window.location.href = '/Passcheck.html';
    });

    document.querySelector('.fas.fa-magic').addEventListener('click', () => {
        window.location.href = '/passgen.html';
    });
});
