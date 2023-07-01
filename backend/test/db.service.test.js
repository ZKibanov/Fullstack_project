const { usersDb, credentialsDb, sessionDb } = require('../services/db.service');
const {testUser, testCredentials} = require('./mockData')
const uuid = require('uuid');

jest.mock('uuid', () => ({ v4: () => '123456789' }));
const testSessionId = uuid.v4();

describe('database module', () => {
    describe('usersDb module', () => {
        test('adds user in usersDb', () => {
            expect(usersDb.saveUser(testUser)).toBe(true);
        })
        test('was user created, and returned by name', () => {
            expect(usersDb.getUser({ userName: testUser.name })).toEqual(testUser);
        })
        test('was user created, and returned by id', () => {
            expect(usersDb.getUser({ id: testUser.id })).toEqual(testUser);
        })
        test('deleteUser method was called and returned true', () => {
            expect(usersDb.deleteUser({ id: testUser.id })).toBe(true);
        })
        test('was user deleted from db', () => {
            expect(usersDb.getUser({ id: testUser.id })).toBe(undefined);
        })
        it('adds user in usersDb to test next method', () => {
            expect(usersDb.saveUser(testUser)).toBe(true);
        })
        test('deleteUser method was called with wrong username and returned false', () => {
            expect(usersDb.deleteUser({ userName: 'nouser' })).toBe(undefined);
        })
        test('deleteUser method was called with name and returned true', () => {
            expect(usersDb.deleteUser({ userName: testUser.name })).toBe(true);
        })
    })
    describe('usersDb module', () => {
        test('adds credentials to credentialsDb', () => {
            expect(credentialsDb.saveCredentials(testCredentials)).toBe(true);
        })
        test('was credentials created, and returned by id', () => {
            expect(credentialsDb.getCredentials(testCredentials.id)).toEqual(testCredentials);
        })
        test('deleteCredentials method was called and returned true', () => {
            expect(credentialsDb.deleteCredentials(testCredentials.id)).toBe(true);
        })
        test('was credentials deleted from db', () => {
            expect(credentialsDb.getCredentials(testCredentials.id)).toEqual(undefined);
        })
    })
    describe('sessionDb module', () => {
        test('adds session to sessionDb and returns sessionId', () => {
            expect(sessionDb.saveSession(testUser.id)).toBe(testSessionId);
        })
        test('returns userId linked with session', () => {
            expect(sessionDb.checkSession(testSessionId)).toBe(testUser.id);
        })
        test('deleteSession method was called and returned true', () => {
            expect(sessionDb.deleteSession(testSessionId)).toBe(true);
        })
        test('session was deleted', () => {
            expect(sessionDb.checkSession(testSessionId)).toBe(undefined);
        })
    })
});