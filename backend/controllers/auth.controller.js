const express = require('express')
const router = express.Router();
const { sessionService } = require('../services/session.service')
const { usersDb } = require('../services/db.service')


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const userId = usersDb.getUser({ userName: username })?.id;
    if (!userId) {
        return res.status(401).send('Invalid username or password')
    } else {
        const sessionId = sessionService.tryLogin({ userId, password })
        if (sessionId) {
            console.log(sessionId)
            res.set('Set-Cookie', `session=${sessionId}`)
            res.send('success')
        } else {
            return res.status(401).send('Invalid username or password')
        }
    }
})

router.post('/logout', (req, res) => {
    const { sessionId } = req.body;
    if (sessionId) {
        sessionService.tryLogout(sessionId)
    }
    res.clearCookie("session");
    return res.status(205)
})

module.exports = router;