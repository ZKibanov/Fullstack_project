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
    deleteSession = (sessionId) => {
        if (this.db.hasOwnProperty(sessionId)) {
            delete this.db[sessionId]
            return true;
        }
        return false;
    }
}

class CredentialsDb {
    db = {}

    saveCredentials = (credentials) => {
        const { id } = credentials
        this.db[id] = credentials
        return true
    }

    getCredentials = (id) => {
        return this.db[id]
    }

    deleteCredentials = (id) => {
        delete this.db[id]
        return true
    }
}

class UsersDb {
    db = {}

    saveUser = (user) => {
        this.db[user.id] = user
        return true;
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

    deleteUser = ({id, userName}) => {
        if (id && this.db.hasOwnProperty(id)) {
            delete this.db[id]
            return true;
        } else if (userName) {
            const userId = getKeyByValue(this.db, 'name', userName);
            if (userId) {
                delete this.db[userId]
                return true
            }
        }
    }
}

const usersDb = new UsersDb();
const credentialsDb = new CredentialsDb();
const sessionDb = new SessionDb();
module.exports = { usersDb, credentialsDb, sessionDb }