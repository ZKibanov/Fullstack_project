const { getKeyByValue } = require('../utils')
const uuidv4 = require('uuid').v4;

class SessionDb {
    db = {}
    saveSession = (userId) => {
        const sessionId = uuidv4();
        this.db[sessionId] = userId;
        return sessionId
    }
    checkSession = (sessionId) => {
        return this.db[sessionId]
    }
}

class CredentialsDb {
    db = {}

    saveCredentials = (credentials) => {
        const { id } = credentials
        this.db[id] = credentials
    }

    getCredentials = (id) => {
        return this.db[id]
    }
}

class UsersDb {
    db = {}

    saveUser = (user) => {
        this.db[user.id] = user
    }

    getUser = ({ id, userName }) => {
        if (id && this.db.hasOwnProperty(id)) {
            return this.db[id]
        } else if (userName) {
            const userId = getKeyByValue(this.db, 'name', userName);
            if (userId) {
                return this.db[userId]
            }
        }
    }
}

const usersDb = new UsersDb();
const credentialsDb = new CredentialsDb();
const sessionDb = new SessionDb();
module.exports = { usersDb, credentialsDb, sessionDb }