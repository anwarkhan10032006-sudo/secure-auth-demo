const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON data and serve static frontend files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory array acting as our database for demonstration
const users = [];

// --- 1. REGISTRATION ROUTE ---
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required.' });
        }

        // Check if user already exists
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists!' });
        }

        // Hash the password with a salt round factor of 10
        // bcrypt automatically creates a unique salt and embeds it into the returned hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user record
        const newUser = {
            id: users.length + 1,
            username: username,
            passwordHash: hashedPassword,
            createdAt: new Date().toLocaleTimeString()
        };

        users.push(newUser);

        // Print to terminal for live presentation proof
        console.log('\n--- NEW USER REGISTERED ---');
        console.log(`Username: ${newUser.username}`);
        console.log(`Stored Hash: ${newUser.passwordHash}\n`);

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully!',
            user: { username: newUser.username, passwordHash: newUser.passwordHash }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error during registration.' });
    }
});

// --- 2. LOGIN ROUTE ---
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found!' });
        }

        // Compare entered password with stored hash
        // bcrypt extracts the salt embedded in user.passwordHash and hashes the new attempt with it
        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (isMatch) {
            res.json({ success: true, message: `Welcome back, ${user.username}! Login successful.` });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials! Password does not match.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error during login.' });
    }
});

// --- 3. DEMO DATABASE VIEW ROUTE ---
// Allows the frontend to fetch current database records to show in the live UI
app.get('/api/users', (req, res) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`=================================`);
});