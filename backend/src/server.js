const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

// conectando ao mongodb
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-751xl.mongodb.net/week9?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// GET, POST, PUT, DELETE

// req.query = acessa query params (para filtros)
// req.params = acessa route params (para edição, delete)
// req.body = acessa o corpo da requisição

app.use(express.json());
app.use(routes);

app.listen(3333);