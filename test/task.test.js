process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const server = require('../app');
const User = require('../model/UserModel');
const Task = require('../model/TaskModel');

chai.use(chaiHttp);

let user1Token, user2Token;
let task1Title, task2Title;

describe('Task API Tests', () => {
    before(async function () {
        this.timeout(10000); // Extend timeout for database operations
        await User.deleteMany({});
        await Task.deleteMany({});

        // Create users
        const user1 = new User({ fullName: 'User One', email: 'user1@example.com', password: 'password123' });
        const user2 = new User({ fullName: 'User Two', email: 'user2@example.com', password: 'password123' });
        const savedUser1 = await user1.save();
        const savedUser2 = await user2.save();

        // Generate JWT tokens
        user1Token = jwt.sign({ userid: savedUser1._id }, process.env.SECRET_KEY || 'defaultSecretKey', { expiresIn: '1h' });
        user2Token = jwt.sign({ userid: savedUser2._id }, process.env.SECRET_KEY || 'defaultSecretKey', { expiresIn: '1h' });

        // Create tasks
        const task1 = new Task({
            title: 'Task 1',
            status: 'pending',
            priority: 1,
            dueDate: new Date(),
            user: savedUser1._id,
        });

        const task2 = new Task({
            title: 'Task 2',
            status: 'completed',
            priority: 3,
            dueDate: new Date(),
            user: savedUser2._id,
        });

        const savedTask1 = await task1.save();
        const savedTask2 = await task2.save();

        task1Title = savedTask1.title;
        task2Title = savedTask2.title;
    });

    after(async () => {
        await User.deleteMany({});
        await Task.deleteMany({});
    });

    describe('CRUD Operations', () => {
        it('should create a task for the authenticated user', async () => {
            const task = {
                title: 'New Task',
                status: 'pending',
                priority: 2,
            };

            const res = await chai
                .request(server)
                .post('/tasks')
                .set('x-auth-token', user1Token)
                .send(task);

            expect(res).to.have.status(201);
            expect(res.body).to.have.property('title', task.title);
        });

        it('should retrieve a task by title for the owner', async () => {
            const res = await chai
                .request(server)
                .get(`/tasks/${task1Title}`)
                .set('x-auth-token', user1Token);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('title', task1Title);
        });

        it('should not retrieve a task by title for a non-owner', async () => {
            const res = await chai
                .request(server)
                .get(`/tasks/${task1Title}`)
                .set('x-auth-token', user2Token);

            expect(res).to.have.status(404);
        });

        it('should update a task by title for the owner', async () => {
            const updatedTask = {
                title: 'Updated Task 1',
                status: 'completed',
            };

            const res = await chai
                .request(server)
                .put(`/tasks/${task1Title}`)
                .set('x-auth-token', user1Token)
                .send(updatedTask);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('title', updatedTask.title);
        });

        it('should not update a task by title for a non-owner', async () => {
            const res = await chai
                .request(server)
                .put(`/tasks/${task1Title}`)
                .set('x-auth-token', user2Token)
                .send({ title: 'Hacked Task' });

            expect(res).to.have.status(404);
        });

        it('should delete a task by title for the owner', async () => {
            const res = await chai
                .request(server)
                .delete(`/tasks/${task2Title}`)
                .set('x-auth-token', user2Token);

            expect(res).to.have.status(200);
        });

        it('should not delete a task by title for a non-owner', async () => {
            const res = await chai
                .request(server)
                .delete(`/tasks/${task2Title}`)
                .set('x-auth-token', user1Token);

            expect(res).to.have.status(404);
        });
    });
});
