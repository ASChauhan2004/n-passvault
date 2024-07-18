document.getElementById('check').addEventListener('click', function() {
    const password = document.getElementById('password').value;
    checkPasswordStrength(password);
});

function checkPasswordStrength(password) {
    let strength = document.getElementById('strength');
    let timeToCrack = document.getElementById('time-to-crack');
    
    let strengthValue = 0;
    const regexes = [
        /[a-z]/,
        /[A-Z]/,
        /[0-9]/,
        /[!@#$&?]/
    ];

    regexes.forEach((regex) => {
        if (regex.test(password)) {
            strengthValue++;
        }
    });

    if (password.length >= 8) {
        strengthValue++;
    }
    if (password.length >= 12) {
        strengthValue++;
    }

    switch (strengthValue) {
        case 0:
        case 1:
            strength.textContent = 'Password Strength: Very Weak';
            strength.style.color = 'red';
            break;
        case 2:
            strength.textContent = 'Password Strength: Weak';
            strength.style.color = 'orange';
            break;
        case 3:
            strength.textContent = 'Password Strength: Moderate';
            strength.style.color = 'yellow';
            break;
        case 4:
            strength.textContent = 'Password Strength: Strong';
            strength.style.color = 'lightgreen';
            break;
        case 5:
            strength.textContent = 'Password Strength: Very Strong';
            strength.style.color = 'green';
            break;
        default:
            strength.textContent = '';
    }

    timeToCrack.textContent = 'Estimated Time to Crack: ' + estimateCrackTime(password);
}

function estimateCrackTime(password) {
    const charsetSizes = {
        lowercase: 26,
        uppercase: 26,
        numbers: 10,
        special: 32 // This is an estimate; the actual number of special characters can vary
    };

    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += charsetSizes.lowercase;
    if (/[A-Z]/.test(password)) charsetSize += charsetSizes.uppercase;
    if (/[0-9]/.test(password)) charsetSize += charsetSizes.numbers;
    if (/[!@#$&?]/.test(password)) charsetSize += charsetSizes.special;

    const combinations = Math.pow(charsetSize, password.length);
    const crackSpeed = 1e10; // Assume 10 billion attempts per second for modern hardware
    const secondsToCrack = combinations / crackSpeed;

    if (secondsToCrack < 60) {
        return secondsToCrack.toFixed(2) + ' seconds';
    } else if (secondsToCrack < 3600) {
        return (secondsToCrack / 60).toFixed(2) + ' minutes';
    } else if (secondsToCrack < 86400) {
        return (secondsToCrack / 3600).toFixed(2) + ' hours';
    } else if (secondsToCrack < 31536000) {
        return (secondsToCrack / 86400).toFixed(2) + ' days';
    } else if (secondsToCrack < 315360000){
        return (secondsToCrack / 31536000).toFixed(2) + ' years';
    } else{
        return(secondsToCrack/315360000).toFixed(2) + ' decades';

    }
}

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
});