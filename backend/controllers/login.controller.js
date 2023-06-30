const express = require('express')
const router = express.Router();
const { sessionService } = require('../services/session.service')
const { usersDb } = require('../services/db.service')


router.post('/', (req, res) => {
    const { username, password } = req.body;
    const userId = usersDb.getUser({ userName: username })?.id;
    if (!userId) {
        return res.status(401).send('Invalid username or password')
    } else {
        const sessionId = sessionService.checkCredentials({ userId, password })
        if (sessionId) {
            res.set('Set-Cookie', `session=${sessionId}`)
            res.send('success')
        } else {
            return res.status(401).send('Invalid username or password')
        }
    }
})

module.exports = router;