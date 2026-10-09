// Display alert messages in the UI
function showAlert(elementId, message, isSuccess) {
    const alertBox = document.getElementById(elementId);
    alertBox.style.display = 'block';
    alertBox.textContent = message;
    alertBox.style.backgroundColor = isSuccess ? '#28a745' : '#dc3545';
}

// 1. Send Registration Data
async function registerUser() {
    const userInput = document.getElementById('reg-user');
    const passInput = document.getElementById('reg-pass');

    const username = userInput.value;
    const password = passInput.value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    showAlert('reg-alert', data.message, data.success);

    // Clear input fields after submission
    userInput.value = '';
    passInput.value = '';

    loadDatabase(); // Refresh the database view
}

// 2. Send Login Data
async function loginUser() {
    const userInput = document.getElementById('log-user');
    const passInput = document.getElementById('log-pass');

    const username = userInput.value;
    const password = passInput.value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    showAlert('log-alert', data.message, data.success);

    // Clear input fields after submission
    userInput.value = '';
    passInput.value = '';
}

// 3. Fetch and display the Live Database records
async function loadDatabase() {
    const response = await fetch('/api/users');
    const users = await response.json();
    
    const dbView = document.getElementById('db-view');
    if (users.length === 0) {
        dbView.textContent = "Database is empty.";
    } else {
        dbView.textContent = JSON.stringify(users, null, 4);
    }
}

// Load database initially when page opens
loadDatabase();