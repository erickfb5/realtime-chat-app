# **[Real-time Chat App](https://realtime-chat-app-55s5.onrender.com)**

 A real-time chat application built using [Express.js](https://expressjs.com), Socket.io, and [Passport.js](https://www.passportjs.org/) for user authentication. This application allows users to chat in real-time with others, provides user authentication through Passport.js, and stores chat data in a [MongoDB](https://www.mongodb.com/) database. It's a fully-featured chat platform with user-friendly features.

## Table of Contents


- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time chat functionality using Socket.io
- User authentication and registration using Passport.js
- MongoDB integration for storing chat data and user information
- Express.js server for handling requests and serving pages

## Installation
1. Clone this repository to your local machine using:
    ```bash
    git clone https://github.com/erickfb5/realtime-chat-app.git
2. Navigate to the project directory:
   ```bash
   cd realtime-chat-app
3. Install the required dependencies:
   ```bash
   npm install
4. Rename the `.env.example` file to `.env` and update the required environment variables.   
5. Start the server:
   ```bash
   npm start
## Usage
-   Open your web browser and navigate to http://localhost:3000
-   Register a new account or log in if you already have an account.
-   Go to http://localhost:3000/chat and start chatting with other users in real-time.

## Technologies Used

- Express.js
- Socket.io
- Passport.js
- MongoDB
- Pug (Template Engine)

## Dependencies
- **```bcrypt```**: Library for hashing and salting passwords
- **```connect-mongo```**: MongoDB session store for Express.js.
- **```cookie-parser```**: Middleware for parsing cookies in Express.js.
- **```dotenv```**: Loads environment variables from a .env file.
- **```express```**: Web application framework for Node.js.
- **```express-session```**: Session middleware for Express.js.
- **```mongodb```**: Official MongoDB driver for Node.js.
- **```passport```**: Authentication middleware for Node.js.
- **```passport-github```**: GitHub authentication strategy for Passport.js.
- **```passport-local```**: Local authentication strategy for Passport.js.
- **```passport.socketio```**: Passport.js middleware for Socket.io.
- **```pug```**: Template engine for generating HTML.
- **```socket.io```**: Library for enabling real-time, bidirectional communication.

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

- Fork the repository on GitHub.
- Make your changes and commit them to your fork.
- Create a pull request from your fork to this repository. 

# License
This project is licensed under the **[MIT License](https://spdx.org/licenses/MIT.html)**.