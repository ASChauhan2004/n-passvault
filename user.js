document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if(token){
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            document.querySelector('.username').textContent = user.username;
            document.querySelector('.email').textContent = user.email;
        }
    }else {
        window.location.href = 'login.html';
    }
});

function logout(){
    localStorage.removeItem('tokem');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
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