# PinToReality

PinToReality is a web application that allows users to discover, share, and shop outfits inspired by their Pinterest boards.

## Features

### User Registration and Authentication:

Users can register with a username and password securely hashed using bcrypt.
Authentication is handled via JWT tokens issued upon successful login.

### Board Management:

Users can create new boards containing items inspired by their fashion ideas.
Boards are stored in MongoDB and associated with the user who created them.

### User Interface:

The frontend is built with HTML, CSS, and JavaScript.
Responsive design ensures usability across devices.

## Technology Stack

### Frontend:
HTML, CSS, JavaScript
LocalStorage for token management

### Backend:
Node.js with Express.js
MongoDB with Mongoose for data storage
Authentication with JWT (JSON Web Tokens)
bcrypt for password hashing

## Access PinToReality:
Copy the codes into vscode.
Open your web browser and go to http://localhost:3000.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
