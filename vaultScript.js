document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
    }

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

    fetchVaultEntries();
});

function showAddForm() {
    document.getElementById('add-form').style.display = "block";
}

function hideAddForm() {
    document.getElementById('add-form').style.display = "none";
}

function submitAccount() {
    const website = document.getElementById('website-name').value;
    const email = document.getElementById('website-email').value;
    const password = document.getElementById('website-password').value;

    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/vault', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ website, email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Account added successfully');
                fetchVaultEntries();
                hideAddForm();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to add account");
        });
}

function fetchVaultEntries() {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/vault', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayVaultEntries(data.vaultEntries);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to fetch vault entries");
        });
}

function displayVaultEntries(entries) {
    const vaultContainer = document.getElementById('vault-entries');
    vaultContainer.innerHTML = '';

    entries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        entryDiv.innerHTML = `
            <div class="website">${entry.website}</div>
            <div class="email">${entry.email}</div>
            <div class="show-password" data-password="${entry.password}">Show Password</div>
            <button class="delete-account" data-id="${entry._id}"><i class="fas fa-trash-alt"></i> Delete</button>
        `;

        entryDiv.querySelector('.show-password').addEventListener('click', (e) => {
            const password = e.target.getAttribute('data-password');
            alert(`Password: ${password}`);
        });

        entryDiv.querySelector('.delete-account').addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            deleteAccount(id);
        });

        vaultContainer.appendChild(entryDiv);
    });
}

function deleteAccount(id) {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:5000/api/vault/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Account deleted successfully');
                fetchVaultEntries();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to delete account");
        });
}

function deletePasswordStorage() {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/vault', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('All accounts deleted successfully');
                fetchVaultEntries();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to delete all accounts");
        });
}