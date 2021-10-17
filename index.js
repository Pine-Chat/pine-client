"use strict";

// Imports
const { Client } = require("@pinechat/pine.js").client.structures;
const readline = require("readline");

// Variables
let client = new Client({
    bot: false,
    username: "DmmD"
});
let content = "";

// Keypress
process.stdin.setRawMode(true);
readline.emitKeypressEvents(process.stdin);

// Events
client
    .on("start", () => console.log(`${time()} | Server is online at ${server.address}`))
    .on("join", user => console.log(`${time()} | ${user.username} has joined the server!`))
    .on("leave", user => console.log(`${time()} | ${user.username} left the server!`))
    .on("message", message => console.log(`${time()} | ${message.user.username} > ${message.content}`))
    .on("error", () => {})
process.stdin.on("keypress", (s, k) => {
    if(k.name === "c" && k.ctrl) process.exit();
    else if(k.name === "backspace") content = content.slice(0, -1);
    else if(k.name === "return") {
        if(!content) return;
        client.servers[0].send(content);
        content = "";
    }
    else if(/[a-zA-z0-9`~!@#$%^&*()\-_=+\[{\]}\\\|;:'",<.>\/\?]/.test(s)) content += s;
});

// Functions
function time(ms = Date.now()) {
    let date = new Date();
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

function pad(v) {
    return `${v}`.padStart(2, "0");
};

// Starts
client.connect("10.0.0.200", 2075)