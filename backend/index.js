const express = require('express');
var bodyParser = require('body-parser');
const {sessionDb} = require('./services/db.service');
const usersController = require('./controllers/users.controller')
const loginController = require('./controllers/login.controller')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/users', usersController)
app.use('/login', loginController)

app.get('/', (req, res) => {
    const sessionId = req.headers.cookie.split('=')[1];
    const userId = sessionDb.checkSession(sessionId);
    if (!userId) {
        return res.status(401).send('Пожалуйста авторизуйтесь или зарегистрируйтесь')
    } else {
        res.send(userId);
    }
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})