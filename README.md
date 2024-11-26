# Task Management Application

A Task Management Application built with Node.js, Express, MongoDB, and JWT for authentication and authorization. This application allows users to create, update, delete, and manage tasks while offering different levels of access for admins and regular users.

## Features

- **User Authentication & Authorization**: Users can register, log in, and authenticate using JWT. Admin users have extended access to manage all users and tasks.
- **Task Management**: Users can create, view, update, and delete their tasks.
- **Filter & Sort Tasks**: Users can filter tasks by various criteria (status, priority, due date, etc.) and sort them by fields like `createdAt` and `dueDate`.
- **Admin Access**: Admin users can view, update, and delete any user or task in the system.

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: AJV (JSON Schema validation)
- **Environment Variables**: dotenv
- **Logging**: Custom middleware for request logging

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version >= 16.x)
- [MongoDB](https://www.mongodb.com/) or access to a MongoDB Atlas cluster
- [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/)) for managing dependencies

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```
2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```bash
    DATABASE_URL=mongodb://your-mongo-db-url
    PORT=5000
    SECRET_KEY=your-secret-key-for-jwt
    ```
    - DATABASE_URL: MongoDB connection string (can be a local MongoDB or MongoDB Atlas URL).
    - PORT: Port for the server to run on (default is 5000).
    - SECRET_KEY: A secret key used to sign JWT tokens.
4. Run the application: 
    ```bash
    npm start
    ```
    The app will be available at http://localhost:5000.

## API Endpoints

### **User Routes**
- `POST /user`: Create a new user.
- `GET /user`: Get all users (Admin access only).
- `GET /user/:id`: Get a specific user by ID.
- `PUT /user/:id`: Update user details (Admin access only).
- `DELETE /user/:id`: Delete a user (Admin access only).

### **Login Routes**
- `POST /login`: Log in a user and get a JWT token.

### **Task Routes**
- `POST /tasks`: Create a new task.
- `GET /tasks`: Get a list of tasks with optional filtering and sorting.
- `GET /tasks/:title`: Get a specific task by its title.
- `PUT /tasks/:title`: Update a specific task by its title.
- `DELETE /tasks/:title`: Delete a task by its title.

## Middleware

- **Authentication Middleware**: Ensures only authenticated users can access protected routes.
- **Authorization Middleware**: Admin-specific routes are protected by checking if the user is an admin via JWT.
- **Task Validation Middleware**: Ensures incoming task data is valid based on a predefined schema.
- **Logging Middleware**: Logs each HTTP request for debugging and monitoring purposes.

## Validation

We use **AJV** for input validation throughout the application. Every route that receives user input, such as creating a user or creating a task, will validate the data against a JSON schema.




