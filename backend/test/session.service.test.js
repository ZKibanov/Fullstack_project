const { usersDb, credentialsDb, sessionDb } = require('../services/db.service');
const { sessionService } = require('../services/session.service');
const { testUser, testCredentials } = require('./mockData')
const uuid = require('uuid');

jest.mock('uuid', () => ({ v4: () => '123456789' }));
const testSessionId = uuid.v4();

describe('session.service module', () => {
    beforeAll(() => {
        usersDb.saveUser(testUser)
        credentialsDb.saveCredentials(testCredentials)
    });
    afterAll(() => {
        usersDb.deleteUser(testUser.id)
        credentialsDb.deleteCredentials(testUser.id)
    });

    it('returns sessionId on correct id and password', () => {
        expect(sessionService.tryLogin({ userId: testUser.id, password: testCredentials.password })).toBe(testSessionId);
    })
    it('returns sessionId on correct username and password', () => {
        expect(sessionService.tryLogin({ username: testUser.name, password: testCredentials.password })).toBe(testSessionId);
    })
    test('sessionDb returns undefined if wrong password', () => {
        expect(sessionService.tryLogin({ userId: testUser.id, password: 'wrongpassword' })).toBe(undefined);
    })
    test('sessionDb returns undefined if wrong userName', () => {
        expect(sessionService.tryLogin({ userId: 'wronguserId', password: testCredentials.password })).toBe(undefined);
    })
    test('sessionDb returns undefined if no username or userId', () => {
        expect(sessionService.tryLogin({ password: testCredentials.password })).toBe(undefined);
    })
    test('sessionDb returns userId linked with session', () => {
        expect(sessionDb.checkSession(testSessionId)).toBe(testUser.id);
    })
    it('returns undefined on incorrect username and password', () => {
        expect(sessionService.tryLogin({ username: 'nouser', password: 'nopass' })).toBe(undefined);
    })
    test('tryLogout calls method and returns false if session wasnt existed', () => {
        expect(sessionService.tryLogout('nosessionid')).toBe(false)
    })
    test('tryLogout calls method and returns true if session existed', () => {
        expect(sessionService.tryLogout(testSessionId)).toBe(true)
    })
    test('session was deleted after Logout', () => {
        expect(sessionDb.checkSession(testSessionId)).toBe(undefined);
    })
})