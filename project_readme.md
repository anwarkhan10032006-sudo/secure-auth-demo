# Secure Authentication Demo

A lightweight, full-stack web application demonstrating secure user registration and authentication using salted password hashing. Built to visualize how backend servers securely store and verify user credentials without ever saving plain-text passwords.

## 🚀 Features

*   **User Registration:** Securely hashes user passwords using `bcrypt` before storing them.
*   **User Authentication:** Compares login credentials against securely stored hashes.
*   **Live Database View:** A real-time UI panel that displays the simulated database records, allowing users to visually inspect how salts and hashes are generated.
*   **Unique Salting:** Demonstrates that identical passwords result in completely different hashes due to unique, randomly generated salts.

## 🛠️ Technologies Used

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript
*   **Backend:** Node.js, Express.js
*   **Security:** `bcrypt` (Cryptography library)

## 📁 Project Structure

```text
secure-auth-demo/
├── public/
│   ├── index.html       # Main UI structure
│   ├── style.css        # Dark-mode styling
│   └── script.js        # Frontend logic and API requests
├── server.js            # Node.js/Express backend server
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## 💻 How to Run Locally

1. **Clone the repository** (or download the files).
2. **Open a terminal** and navigate to the project directory:
   ```bash
   cd secure-auth-demo
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the server:**
   ```bash
   node server.js
   ```
5. **Open your browser** and navigate to:
   ```text
   http://localhost:3000
   ```

## 🧠 Core Concepts Demonstrated

### 1. What is a Salt?
A salt is random data added to a password before it is hashed. In this project, `bcrypt` automatically generates a unique 22-character salt for every single user. This guarantees that even if two users have the exact same password (e.g., `password123`), their final stored hashes will look completely different.

### 2. The Bcrypt Hash Structure
When you view the live database panel, you will see a stored hash that looks something like this: 
`$2b$10$JwjGUznyfnGErOtOgJOpve1C0Bm7uGAdZx7EbAK4PeRXzg9SLDUei`

*   **`$2b$`**: The bcrypt algorithm identifier.
*   **`10$`**: The cost factor (1,024 rounds of hashing), making the process computationally heavy to prevent brute-force attacks.
*   **`JwjGUznyfnGErOtOgJOpve`**: The unique 22-character salt.
*   **`1C0Bm7uGAdZx7EbAK4PeRXzg9SLDUei`**: The resulting encrypted hash digest.

### 3. How Authentication Works
During login, the server **does not** decrypt the stored hash (hashes are one-way functions). Instead, it looks up the user by their username, extracts the unique salt from their stored string, hashes the *new* login attempt with that same salt, and checks if the resulting strings match perfectly.