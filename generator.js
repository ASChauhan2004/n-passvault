document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.fas.fa-user').addEventListener('click', () => {
        window.location.href = '/user.html';
    });

    document.querySelector('.fas.fa-shield-alt').addEventListener('click', () => {
        window.location.href = '/vault.html';
    });

    document.querySelector('.fas.fa-lock').addEventListener('click', () => {
        window.location.href = '/check.html';
    });

    document.querySelector('.fas.fa-magic').addEventListener('click', () => {
        window.location.href = '/generator.html';
    });

    document.getElementById('clipboard').addEventListener('click', clipboard);
});

document.getElementById('generate').addEventListener('click', function() {
    const length = document.getElementById('length').value;
    document.getElementById('message').textContent = "";

    if (length > 25) {
        document.getElementById('message').textContent = "Max length allowed is 25";
        return; 
    }
    
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSpecial = document.getElementById('include-special').checked;

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$&?';
    
    let charset = '';
    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSpecial) charset += special;
    
    let password = '';
    if (charset.length > 0 && length > 0) {
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
    }

    document.getElementById('password').value = password;
});

function clipboard() {
    var copyText = document.getElementById("password");
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(copyText.value);
    document.getElementById('message').textContent = "Copied to clipboard";
}

