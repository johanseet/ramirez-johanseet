(() => {
    const App = {
        htmlElements: {
            usernameInput: document.getElementById('username'),
            passwordInput: document.getElementById('password'),
            loginForm: document.getElementById('loginForm'),
            userInfo: document.getElementById('userInfo'),
            btnLogout: document.getElementById('btnLogout')
        },

        init() {
            if (App.methods.tieneSesion()) {
                if (window.location.pathname.includes('login.html')) {
                    window.location.href = 'profile.html';
                }
            } else {
                if (window.location.pathname.includes('profile.html')) {
                    window.location.href = 'login.html';
                }
            }

            App.bindEvents();
            if (App.methods.tieneSesion()) {
                App.methods.mostrarPerfil();
            }
        },

        bindEvents() {
            if (App.htmlElements.loginForm) {
                App.htmlElements.loginForm.addEventListener('submit', App.handlers.iniciarSesion);
            }

            if (App.htmlElements.btnLogout) {
                App.htmlElements.btnLogout.addEventListener('click', App.handlers.cerrarSesion);
            }
        },

        handlers: {
            iniciarSesion(event) {
                event.preventDefault();
                const username = App.htmlElements.usernameInput.value;
                const password = App.htmlElements.passwordInput.value;
                if (App.methods.login(username, password)) {
                    window.location.href = 'profile.html';
                } else {
                    alert('Credenciales incorrectas');
                }
            },

            cerrarSesion() {
                App.methods.logout();
                window.location.href = 'login.html';
            }
        },

        methods: {
            tieneSesion() {
                return localStorage.getItem('tieneSesion') === 'true';
            },

            login(username, password) {
                // Verificar si las credenciales coinciden
                if (username === 'admin' && password === 'Password') {
                    localStorage.setItem('tieneSesion', 'true');
                    localStorage.setItem('username', username);
                    return true;
                }
                return false;
            },

            logout() {
                localStorage.setItem('tieneSesion', 'false');
                localStorage.removeItem('username');
            },

            mostrarPerfil() {
                const username = localStorage.getItem('username');
                App.htmlElements.userInfo.innerHTML = `Bienvenido, ${username}`;
            }
        }
    };

    App.init();
})();
