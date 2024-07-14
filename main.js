document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    // Check if user is logged in
    if (token) {
        document.querySelector('nav ul').innerHTML = `
            <li><a href="/">Home</a></li>
            <li><a href="/my-boards.html">My Boards</a></li>
            <li><a href="/all-boards.html">All Boards</a></li> <!-- Added link to All Boards -->
            <li><a href="#" id="logout">Logout</a></li>
        `;

        // Logout function
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            location.reload();
        });

        // Fetch and display user's boards
        fetch('/boards', {
            headers: { 'Authorization': token }
        })
        .then(response => response.json())
        .then(boards => {
            const boardsSection = document.getElementById('boards');
            boards.forEach(board => {
                const boardElement = document.createElement('div');
                boardElement.className = 'board';
                boardElement.innerHTML = `<h3>${board.title}</h3>`;
                board.items.forEach(item => {
                    boardElement.innerHTML += `<p><a href="${item.link}" target="_blank">${item.name}</a></p>`;
                });
                boardsSection.appendChild(boardElement);
            });
        })
        .catch(err => console.error('Error fetching boards:', err));

        // Fetch and display all boards (new section)
        fetch('/all-boards') // Assuming you have a route /all-boards in your server
            .then(response => response.json())
            .then(boards => {
                const allBoardsSection = document.getElementById('allBoards');
                boards.forEach(board => {
                    const boardElement = document.createElement('div');
                    boardElement.className = 'board';
                    boardElement.innerHTML = `<h3>${board.title}</h3>`;
                    board.items.forEach(item => {
                        boardElement.innerHTML += `<p><a href="${item.link}" target="_blank">${item.name}</a></p>`;
                    });
                    allBoardsSection.appendChild(boardElement);
                });
            })
            .catch(err => console.error('Error fetching all boards:', err));
    }

    // Handle user registration
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.get('username'),
                    password: formData.get('password')
                })
            })
            .then(response => {
                if (response.ok) {
                    alert('Registration successful');
                    window.location.href = '/login.html';
                } else {
                    alert('Error registering user');
                }
            })
            .catch(err => console.error('Error registering user:', err));
        });
    }

    // Handle user login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.get('username'),
                    password: formData.get('password')
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    window.location.href = '/';
                } else {
                    alert('Invalid credentials');
                }
            })
            .catch(err => console.error('Error logging in user:', err));
        });
    }

    // Handle creating new boards
    const boardForm = document.getElementById('boardForm');
    if (boardForm) {
        boardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(boardForm);
            const items = formData.getAll('items').map((item, index) => ({
                name: item,
                link: formData.getAll('links')[index]
            }));

            fetch('/boards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    title: formData.get('title'),
                    items: items
                })
            })
            .then(response => {
                if (response.ok) {
                    alert('Board created successfully');
                    window.location.href = '/my-boards.html';
                } else {
                    alert('Error creating board');
                }
            })
            .catch(err => console.error('Error creating board:', err));
        });
    }
});
