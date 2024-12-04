process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../app.js');
const User = require('../models/User.js');

chai.use(chaiHttp);

let userId; // Global variable to store user ID
let userEmail;
let userPw;

describe('User API Tests', () => {
    /**
     * Tests for POST /user
     */
    describe('POST /user', () => {
        const validUser = {
            fullName: 'Youssef',
            password: '123456',
            email: 'joekamel3@gmail.com',
        };

        it('should create a valid user', async () => {
            const res = await chai.request(server).post('/user').send(validUser);
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('fullName', validUser.fullName);
            expect(res.body).to.have.property('email', validUser.email);

            // Store for later tests
            userId = res.body._id;
            userEmail = validUser.email;
            userPw = validUser.password;
        });

        it('should return 400 for missing fields', async () => {
            const invalidUser = { email: 'invalid@example.com' };
            const res = await chai.request(server).post('/user').send(invalidUser);
            expect(res).to.have.status(400);
        });

        it('should return 400 for invalid full name', async () => {
            const invalidUser = { ...validUser, fullName: 'youssef' };
            const res = await chai.request(server).post('/user').send(invalidUser);
            expect(res).to.have.status(400);
        });

        it('should return 400 for invalid email format', async () => {
            const invalidUser = { ...validUser, email: 'joekamel3@gmail' };
            const res = await chai.request(server).post('/user').send(invalidUser);
            expect(res).to.have.status(400);
        });
    });

    /**
     * Tests for GET /user/:id
     */
    describe('GET /user/:id', () => {
        it('should retrieve a user by ID', async () => {
            const res = await chai.request(server).get(`/user/${userId}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('_id', userId);
        });

        it('should return 404 for a non-existing user ID', async () => {
            const res = await chai.request(server).get('/user/123456789012345678901234');
            expect(res).to.have.status(404);
        });
    });

    /**
     * Tests for GET /user
     */
    describe('GET /user', () => {
        it('should return 401 for unauthorized access', async () => {
            const res = await chai.request(server).get('/user');
            expect(res).to.have.status(401);
        });
    });

    /**
     * Tests for POST /login
     */
    describe('POST /login', () => {
        it('should return 400 for missing email or password', async () => {
            const res = await chai.request(server).post('/login').send({ email: userEmail });
            expect(res).to.have.status(400);
        });

        it('should return 400 for incorrect email or password', async () => {
            const res = await chai.request(server).post('/login').send({ email: userEmail, password: 'WRONGPASSWORD' });
            expect(res).to.have.status(400);
        });

        it('should return 200 for successful login', async () => {
            const res = await chai.request(server).post('/login').send({ email: userEmail, password: userPw });
            expect(res).to.have.status(200);
            expect(res.header).to.have.property('x-auth-token');
        });
    });
    after(async () => {
        await User.deleteMany({});
    });
});
