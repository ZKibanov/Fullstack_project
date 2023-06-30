const { credentialsDb, usersDb, sessionDb } = require('./db.service')

class SessionService {
    checkCredentials = ({ userId, username, password }) => {
        if (userId) {
            //TODO: если юзер есть, а пароля нет - обязать сделать пароль
            if (credentialsDb.getCredentials(userId)?.password === password) {
                return sessionDb.saveSession(userId)
            }
        } else if (username) {
            const userId = usersDb.getUser({ userName: username })?.id;
            if (credentialsDb.getCredentials(userId)?.password === password) {
                return sessionDb.saveSession(userId)
            }
        }
    }
}

const sessionService = new SessionService();
module.exports = { sessionService }