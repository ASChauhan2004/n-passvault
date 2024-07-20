document.addEventListener('DOMContentLoaded', () => {
    fetchVaultEntries();
    const autofillBtn = document.getElementById('autofill-btn');

    // Check if the current website matches any vault entry
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = new URL(tabs[0].url);
        let domain = url.hostname;

        // Fetch vault entries and check for a match
        fetchVaultEntries().then(entries => {
            const matchingEntry = entries.find(entry => entry.website.includes(domain));
            if (matchingEntry) {
                autofillBtn.style.display = 'block';
                autofillBtn.addEventListener('click', () => {
                    autofillCredentials(matchingEntry);
                });
            }
        });
    });
});

function autofillCredentials(entry) {
    chrome.tabs.executeScript({
        code: `
            document.querySelector('input[type=text]').value = '${entry.email}';
            document.querySelector('input[type=password]').value = '${entry.password}';
        `
    });
}

async function fetchVaultEntries() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:5000/api/vault', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const result = await response.json();
        if (result.success) {
            return result.vaultEntries;
        } else {
            console.error('Failed to fetch vault entries', result.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching vault entries', error);
        return [];
    }
}


