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
Open your web browser and go to http://localhost:3000.

## Folder Structure

├── public/             # Frontend HTML, CSS, and JavaScript files
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   ├── index.html      # Landing page
│   ├── login.html      # Login page
│   ├── register.html   # Registration page
│   └── my-boards.html  # User-specific boards page
├── server/             # Backend server files
│   ├── models/         # Mongoose models (User and Board)
│   │   ├── User.js
│   │   └── Board.js
│   ├── routes/         # Express routes
│   │   ├── auth.js     # Authentication routes (/register, /login)
│   │   └── boards.js   # Board management routes (POST /, GET /)
│   ├── config.js       # Configuration (MongoDB URI, JWT Secret)
│   └── app.js          # Express application setup
└── package.json        # Node.js dependencies and scripts

## License
This project is licensed under the MIT License. See the LICENSE file for details.
