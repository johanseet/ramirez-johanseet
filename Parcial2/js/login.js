(() => {
    const Login = {
        htmlElements: {
            usernameInput: document.getElementById('username'),
            passwordInput: document.getElementById('password'),
            loginForm: document.getElementById('loginForm'),
            btnSignUp: document.getElementById('btnSignUp')
        },

        init() {
            Login.bindEvents();
        },

        bindEvents() {
            if (Login.htmlElements.loginForm) {
                Login.htmlElements.loginForm.addEventListener('submit', Login.handlers.login);
            }

            if (Login.htmlElements.btnSignUp) {
                Login.htmlElements.btnSignUp.addEventListener('click', Login.handlers.registerUser);
            }
        },

        handlers: {
            async login(event) {
                event.preventDefault();
                const username = Login.htmlElements.usernameInput.value;
                const password = Login.htmlElements.passwordInput.value;
                const isLoggedIn = await Login.methods.verifyPassword(username, password);

                if (isLoggedIn) {
                    window.location.href = 'profile.html';
                } else {
                    alert('Usuario o contraseña incorrecta');
                }
            },

            registerUser() {
                window.location.href = 'signup.html';
            }
        },

        methods: {
            async verifyPassword(username, password) {
                const users = library.getUsers();
                const user = users.find(user => user.username === username);
                if (user) {
                    const hashedPassword = await library.hashPassword(password);
                    if (user.password === hashedPassword) {
                        localStorage.setItem('user', username);
                        return true;
                    }
                }
                return false;
            }
        }
    };

    Login.init();
})();
