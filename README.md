# Todo Backend API

This is a simple backend API for a Todo application built with Node.js, Express, and MySQL.

## Features

- User registration and management
- Note creation, retrieval, updating, and deletion

## Requirements

- Node.js
- MySQL
- dotenv package for environment variables

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/todo.git
    cd todo/backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add your database configuration:

    ```plaintext
    HOST=your_database_host
    PORT=your_database_port
    USER=your_database_user
    PASSWORD=your_database_password
    DATABASE=your_database_name
    ```

## Usage

1. Start the server:

    ```bash
    node index.js
    ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

### User Management

- **POST** `/enter` - Create a new user
- **PUT** `/enter` - Update an existing user
- **DELETE** `/enter` - Delete a user

### Notes Management

- **GET** `/notes` - Retrieve notes for a user
- **POST** `/notes` - Create a new note
- **PUT** `/notes` - Update an existing note
- **DELETE** `/notes` - Delete a note

## License

This project is licensed under the MIT License.
