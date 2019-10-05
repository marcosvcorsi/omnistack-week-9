const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

// conectando ao mongodb
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-751xl.mongodb.net/week9?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// socket
io.on('connection', socket => {
    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
})

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

// GET, POST, PUT, DELETE

// req.query = acessa query params (para filtros)
// req.params = acessa route params (para edição, delete)
// req.body = acessa o corpo da requisição

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);