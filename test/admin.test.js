process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../app.js');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

chai.use(chaiHttp);

const SECRET_KEY = process.env.SECRET_KEY || 'defaultSecretKey';
const ADMIN_JWT = jwt.sign({ isAdmin: true }, SECRET_KEY, { expiresIn: '1h' });
const NOT_ADMIN_JWT = jwt.sign({ isAdmin: false }, SECRET_KEY, { expiresIn: '1h' });

let testUserId; // Store the user ID for testing

describe('User API Permissions Tests', () => {
    // Set up test user before all tests
    before(async function () {
        this.timeout(10000); // Extend timeout for database operations if needed
        try {
            await User.deleteMany({}); // Clean up existing users
            const testUser = new User({
                fullName: 'Test User',
                email: 'testuser2@example.com',
                password: 'hashedpassword123',
            });
            const savedUser = await testUser.save();
            testUserId = savedUser._id;
        } catch (err) {
            console.error('Error during setup:', err);
            throw err;
        }
    });

    // Clean up after all tests
    after(async () => {
        try {
            await User.deleteMany({});
        } catch (err) {
            console.error('Error during cleanup:', err);
        }
    });

    describe('GET /user', () => {
        it('should return all users with admin token', async () => {
            const res = await chai.request(server).get('/user').set('x-auth-token', ADMIN_JWT);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
        });

        it('should return 401 for missing token', async () => {
            const res = await chai.request(server).get('/user');
            expect(res).to.have.status(401);
        });

        it('should return 403 for non-admin token', async () => {
            const res = await chai.request(server).get('/user').set('x-auth-token', NOT_ADMIN_JWT);
            expect(res).to.have.status(403);
        });
    });

    describe('PUT /user/:id', () => {
        const updatedUser = {
            fullName: 'Updated User',
            email: 'updateduser@example.com',
        };

        it('should update user details with admin token', async () => {
            const res = await chai
                .request(server)
                .put(`/user/${testUserId}`)
                .set('x-auth-token', ADMIN_JWT)
                .send(updatedUser);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('fullName', updatedUser.fullName);
            expect(res.body).to.have.property('email', updatedUser.email);
        });

        it('should return 403 for non-admin token', async () => {
            const res = await chai
                .request(server)
                .put(`/user/${testUserId}`)
                .set('x-auth-token', NOT_ADMIN_JWT);

            expect(res).to.have.status(403);
        });
    });

    describe('DELETE /user/:id', () => {
        it('should return 403 for non-admin token', async () => {
            const res = await chai
                .request(server)
                .delete(`/user/${testUserId}`)
                .set('x-auth-token', NOT_ADMIN_JWT);

            expect(res).to.have.status(403);
        });

        it('should delete user with admin token', async () => {
            const res = await chai
                .request(server)
                .delete(`/user/${testUserId}`)
                .set('x-auth-token', ADMIN_JWT);

            expect(res).to.have.status(200);
        });
    });
});
