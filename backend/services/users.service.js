const uuidv4 = require('uuid').v4;
const {usersDb, credentialsDb} = require('./db.service')

class UsersService {
    validateUser = ({ userName, password }) => {
        if (userName && password && typeof userName === 'string') {
            const isLoginBusy = this.getUser({ userName })
            if (!!isLoginBusy || userName === 'admin') {
                return ({
                    isValid: false,
                    message: 'Пользователь с таким именем уже существует'
                })
            } else if (userName.trim().length > 20) {
                return ({
                    isValid: false,
                    message: 'Длина имени пользователя не должна быть больше 20 символов'
                })
            } else if (typeof password !== 'string' || password.length < 3) {
                return ({
                    isValid: false,
                    message: 'Длина пароля должна быть больше 3 символов'
                })
            };

            return { isValid: true };
        }
        return {isValid: false, message: 'Неправильный формат имени и/или пароля'}
    }

    addUser = ({ userName, password }) => {
        const newUser = {
            id: uuidv4(),
            name: userName.trim(),
            role: 'user'
        }

        usersDb.saveUser(newUser)

        credentialsDb.saveCredentials({
            id: newUser.id,
            password
        })

        return newUser;
    }

    getUser = ({ id, userName }) => {
        return usersDb.getUser({id, userName})
    }
}

module.exports = new UsersService();