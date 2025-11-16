// Local storage user list (synced P2P later)
let users = JSON.parse(localStorage.getItem("users") || "{}");
let localUser = null;

// UI navigation
function showRegister() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("register-screen").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
}

function goBack() {
    document.getElementById("register-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}

// Registration
function registerUser() {
    let u = document.getElementById("reg-username").value.trim();
    let p = document.getElementById("reg-password").value.trim();

    if (!u || !p) return alert("Fill all fields.");

    if (users[u]) return alert("Username already exists.");

    users[u] = p;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created!");

    goBack();
}

// Login
function loginUser() {
    let u = document.getElementById("login-username").value.trim();
    let p = document.getElementById("login-password").value.trim();

    if (!users[u]) return alert("User does not exist.");
    if (users[u] !== p) return alert("Wrong password.");

    localUser = u;

    // Enter chat
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("chat-screen").classList.remove("hidden");

    document.getElementById("current-user").textContent = localUser;
}

// Add message with bubble UI
function addMessage(username, message) {
    const container = document.getElementById("messages");
    const msgEl = document.createElement("div");

    msgEl.classList.add("message");
    msgEl.classList.add(username === localUser ? "local" : "remote");

    msgEl.innerHTML = `<strong>${username}</strong><br>${message}`;

    container.appendChild(msgEl);
    container.scrollTop = container.scrollHeight;
}

// Local send (P2P propagation comes later)
function sendMessage() {
    const input = document.getElementById("msg-input");
    const text = input.value.trim();

    if (!text) return;

    addMessage(localUser, text);

    input.value = "";
}

// Enter key
function checkEnter(e) {
    if (e.key === "Enter") sendMessage();
}
