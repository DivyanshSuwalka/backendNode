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

The server exposes the following RESTful API endpoints:

### Auth (`/api/auth`)

-   `GET /`: Get authenticated user data.
-   `POST /`: Authenticate (login) a user and get a token.

### Users (`/api/users`)

-   `POST /`: Register a new user.

### Profiles (`/api/profile`)

-   `GET /me`: Get the current user's profile.
-   `POST /`: Create or update the current user's profile.
-   `GET /`: Get all user profiles.
-   `GET /user/:user_id`: Get a specific user's profile by their ID.
-   `DELETE /`: Delete the current user's profile, user account, and posts.
-   `PUT /experience`: Add profile experience.
-   `DELETE /experience/:exp_id`: Delete an experience from a profile.
-   `PUT /education`: Add profile education.
-   `DELETE /education/:edu_id`: Delete education from a profile.
-   `GET /github/:username`: Get user repositories from GitHub.

### Posts (`/api/posts`)

-   `POST /`: Create a new post.
-   `GET /`: Get all posts.
-   `GET /:id`: Get a specific post by its ID.
-   `DELETE /:id`: Delete a post by its ID.
-   `PUT /like/:id`: Like a post.
-   `PUT /unlike/:id`: Unlike a post.
-   `POST /comment/:id`: Add a comment to a post.
-   `DELETE /comment/:id/:comment_id`: Delete a comment from a post.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
