
// npm install mocha -g
// npm install --save-dev mocha
// npm install --save-dev jest
// npm install --save-dev supertest
// npm install --save-dev chai
// npm install mocha -g
// npm install --save-dev mocha
// npm install chai@4.3.4 

const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const jwt = require('jsonwebtoken');

const API = 'http://localhost:8070';

// https://chat.openai.com
describe('User Registration', () => {
    it('should register a new user successfully', async () => {
        var randomNumber = Math.random();
        const response = await request(API)
            .post('/register')
            .send({
                name: 'test_'+randomNumber,
                email: 'test_'+randomNumber+'@example.com',
                password: 'onetwothree',
                role: 'Admin'
            })
            .expect(200);
            expect(response.status).to.equal(200);
    });

    it('should fail registration with missing data', async () => {
        const response = await request(API)
            .post('/register')
            .send({
                name: 'k',
                email: 'k@k.com',
                password: '',
                role: 'Radiation Safety Supervisor role'
            })
            .expect(400);
            expect(response.text).to.equal('Password getting empty');
    });
});
describe('User Authentication', () => {
    it('should authenticate a user with correct credentials', async () => {
        const response = await request(API)
            .post('/login')
            .send({
                email: 'shezkavya@gmail.com',
                password: '123456'
            })
            .expect(200);
            expect(response.ok).to.equal(true);
    });

    it('should fail authentication with nobody email', async () => {
        const response = await request(API)
            .post('/login')
            .send({
                email: 'nonexistentuserregistered@gmail.com',
                password: 'password'
            })
            .expect(401);
            expect(response.body.error).to.equal('No user with that email');
    });

    it('should fail authentication with incorrect password', async () => {
        const response = await request(API)
            .post('/login')
            .send({
                email: 'shezkavya@gmail.com',
                password: 'Go'
            })
            .expect(401);
            expect(response.body.error).to.equal('Password incorrect');
    });
});
describe('User Protected Routes', () => {
    it('should allow access to protected route with valid token', async () => {
        const user = { name: 'shezkavya@gmail.com' };
        const token = jwt.sign(user, 'your_secret_key_here');

        const response = await request(API)
            .get('/protected')
            .set('authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.message).contains('route is secure');
    });

    it('should deny access to protected route with no token', async () => {
        const response = await request(API)
            .get('/protected')
            .expect(401);
            expect(response.unauthorized).to.equal(true)
    });
});


