(() => {
    const SignUp = {
        htmlElements: {
            usernameInput: document.getElementById('username'),
            nameInput: document.getElementById('name'),
            passwordInput: document.getElementById('password'),
            signupForm: document.getElementById('signupForm'),
            btnLogin: document.getElementById('btnLogin')
        },

        init() {
            library.redirectIfLoggedIn();
            SignUp.bindEvents();
        },

        bindEvents() {
            if (SignUp.htmlElements.signupForm) {
                SignUp.htmlElements.signupForm.addEventListener('submit', SignUp.handlers.registerUser);
            }

            if (SignUp.htmlElements.btnLogin) {
                SignUp.htmlElements.btnLogin.addEventListener('click', SignUp.handlers.login);
            }
        },

        handlers: {
            async registerUser(event) {
                event.preventDefault();
                const username = SignUp.htmlElements.usernameInput.value;
                const name = SignUp.htmlElements.nameInput.value;
                const password = SignUp.htmlElements.passwordInput.value;
                if (!library.validatePassword(password)) {
                    alert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
                    return;
                }
                const hashedPassword = await library.hashPassword(SignUp.htmlElements.passwordInput.value);

                const newUser = {
                    username: username,
                    password: hashedPassword,
                    name: name
                }

                SignUp.methods.signUp(newUser);
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

                let usersBudget = library.getUsersBudget();
                usersBudget[newUser.username] = {
                    "budget": [],
                    "total": 0.00
                };
                localStorage.setItem('usersBudget', JSON.stringify(usersBudget))

                SignUp.htmlElements.usernameInput.value = '';
                SignUp.htmlElements.nameInput.value = '';
                SignUp.htmlElements.passwordInput.value = '';
            }
        }
    };

    SignUp.init();
})();