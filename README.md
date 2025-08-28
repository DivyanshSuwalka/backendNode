# MERN Stack Backend Server

This repository contains the backend server for a MERN (MongoDB, Express, React, Node.js) stack application. It provides a RESTful API for handling user authentication, managing user profiles, and handling posts.

## ✨ Features

-   **User Authentication:** Secure user registration and login functionality using JSON Web Tokens (JWT).
-   **Profile Management:** Full CRUD (Create, Read, Update, Delete) operations for user profiles.
-   **Post Management:** Functionality for users to create, view, like, comment on, and delete posts.
-   **Password Encryption:** Uses `bcryptjs` to hash user passwords for secure storage.
-   **Input Validation:** Implements `express-validator` to validate incoming data.

## 🚀 Tech Stack

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB with Mongoose
-   **Authentication:** JSON Web Token (jsonwebtoken)
-   **Password Hashing:** bcryptjs
-   **Validation:** express-validator
-   **Environment Variables:** config (similar to dotenv)

## 📦 Getting Started

To get a local copy of the server up and running, follow these steps.

### Prerequisites

Make sure you have Node.js, npm, and MongoDB installed and running on your local machine.

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repository:
    ```sh
    git clone [https://github.com/DivyanshSuwalka/backendNode.git](https://github.com/DivyanshSuwalka/backendNode.git)
    ```
2.  Navigate into the project directory:
    ```sh
    cd backendNode
    ```
3.  Install the required NPM packages:
    ```sh
    npm install
    ```

### Configuration

1.  Navigate to the `config` directory.
2.  Open the `default.json` file.
3.  Replace the placeholder values for `mongoURI` and `jwtSecret` with your own credentials.

    ```json
    {
      "mongoURI": "your_mongodb_connection_string",
      "jwtSecret": "your_super_secret_jwt_key"
    }
    ```

### Running the Server

-   To run the server with automatic restarts on file changes (using nodemon):
    ```sh
    npm run server
    ```
-   To run the server in a standard way:
    ```sh
    npm start
    ```

The API will be available at `http://localhost:5000`.

## 🔌 API Endpoints

### Auth 

-   `POST /signup`: Verifies(data sanitization) and registers user data.
-   `POST /login`: Authenticate (login) a user and get a token.
-   `POST /logout`: logout the user.

### adminRouter (admin only)

-   `GET /admin/allstudents` - view all students
-   `GET /admin/student/:id` - view student along with course ID
-   `DELETE /admin/student/:_id` - delete a student using student-id

### courseRouter (admin only)
-   `GET /courses` - view all courses
-   `POST /course` - creating a course
-   `GET /courses/:id` - view course along with all associated students
-   `DELETE /course/:course-id` - delete a course using the course ID

### studentRouter (for students)

-   `POST /student/enroll` - enroll for a course
-   `POST /student/unenroll` - unenroll from a course

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
