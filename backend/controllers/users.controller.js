const express = require('express')
const router = express.Router();
const usersService = require('../services/users.service')


router.get('/', (req, res) => {
    const { name: userName, id } = req.body || {};

    if (!id && !userName) {
        res.send('Для данного запроса требуется передать id или имя пользователя')
    }

    const user = usersService.getUser({ id, userName })

    if (user) {
        res.send(JSON.stringify(user))
    } else {
        res.sendStatus(404)
    }

})

router.post('/', (req, res) => {
    const { name, password } = req.body || {};
    const validation = usersService.validateUser({ userName: name, password })

    if (validation.isValid) {
        const newUser = usersService.addUser({ userName: name, password })
        res.send(JSON.stringify(newUser))
    } else if (!validation.isValid) {
        res.send(validation.message)
    } else {
        res.send('Неправильный формат имени и/или пароля')
    }

})

router.delete(':name', (req, res) => {
    console.log('Check auth, ask password | isAdmin, close session', req.params)
    res.send('ok')
})

module.exports = router;