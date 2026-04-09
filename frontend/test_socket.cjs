const io = require("socket.io-client");
const socket = io("http://localhost:5001");
socket.on("connect", () => {
    console.log("Connected to socket");
    socket.emit("search", "ea");
});
socket.on("searchResults", (data) => {
    console.log("Received results:", data);
    process.exit(0);
});
setTimeout(() => {
    console.log("Timeout waiting for results");
    process.exit(1);
}, 3000);
