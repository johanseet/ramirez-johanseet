((window) => {
    const SingUp = {
        htmlElements: {
            usernameInput: document.getElementById('username'),
            nameInput: document.getElementById('name'),
            passwordInput: document.getElementById('password'),
            signupForm: document.getElementById('signupForm'),
            btnLogin: document.getElementById('btnLogin')
        },

        init() {
            SingUp.bindEvents();
        },

        bindEvents() {
            if (SingUp.htmlElements.signupForm) {
                SingUp.htmlElements.signupForm.addEventListener('submit', SingUp.handlers.registerUser);
            }

            if (SingUp.htmlElements.btnSignUp) {
                SingUp.htmlElements.btnLogin.addEventListener('click', SingUp.handlers.login);
            }
        },

        handlers: {
            async registerUser(event) {
                event.preventDefault();
                const username = SingUp.htmlElements.usernameInput.value;
                const name = SingUp.htmlElements.nameInput.value;
                const password = await library.hashPassword(SingUp.htmlElements.passwordInput.value);

                const newUser = {
                    username: username,
                    password: password,
                    name: name
                }

                SingUp.methods.signUp(newUser);
            },

            login() {
                window.location.href = 'login.html';
            }
        },

        methods: {

            signUp(newUser) {
                if (!this.existUser(newUser.username)) {
                    this.saveUser(newUser)
                    alert('Usuario creado.');
                } else {
                    alert('El usuario ya existe.');
                }
            },

            existUser(username) {
                let users = library.getUsers();
                if (users.find(user => user.username === username)) {
                    console.log("El usuario existe.");
                    return true;
                } else {
                    console.log("El usuario no existe.");
                    return false;
                }
            },

            saveUser(newUser) {
                let users = library.getUsers();
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
    };

    SingUp.init();
})();