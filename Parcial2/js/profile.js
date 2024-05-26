(() => {
    const Profile = {
        htmlElements: {
        },

        init() {
            library.redirectIfLoggedIn();
            Profile.bindEvents();
        },

        bindEvents() {
            if (Profile.htmlElements.loginForm) {
                Profile.htmlElements.loginForm.addEventListener('submit', Profile.handlers.login);
            }

            if (Profile.htmlElements.btnSignUp) {
                Profile.htmlElements.btnSignUp.addEventListener('click', Profile.handlers.registerUser);
            }
        },

        handlers: {
        },

        methods: {
        }
    };

    Profile.init();
})();
