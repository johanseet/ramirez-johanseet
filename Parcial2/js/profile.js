(() => {
    const Profile = {
        htmlElements: {
            displayName: document.getElementById('displayName'),
            nameInput: document.getElementById('name'),
            passwordInput: document.getElementById('password'),
            confirmPasswordInput: document.getElementById('confirmPassword'),
            btnLogout: document.getElementById('btnLogout'),
            userInfo: document.getElementById('userInfo'),
            btnGoBudget: document.getElementById('btnGoBudget'),
        },

        init() {
            library.redirectIfNotLoggedIn();
            Profile.bindEvents();
            Profile.methods.loadUserInfo();
        },

        bindEvents() {
            Profile.htmlElements.userInfo.addEventListener('submit', Profile.handlers.updateUser);
            Profile.htmlElements.btnLogout.addEventListener('click', library.logout);
            Profile.htmlElements.btnGoBudget.addEventListener('click', Profile.handlers.goBudget);
        },

        handlers: {
            async updateUser() {
                const newName = Profile.htmlElements.nameInput.value;
                const newPassword = Profile.htmlElements.passwordInput.value;
                const confirmPassword = Profile.htmlElements.confirmPasswordInput.value;

                const users = library.getUsers();
                const updatedUser = users.find(user => user.username === library.loggedInUser());
                let logout = false;

                if (newName !== updatedUser.name) {
                    updatedUser.name = newName;
                }

                if (newPassword !== '') {
                    if (!library.validatePassword(newPassword)) {
                        alert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
                        return;
                    }
                    if (newPassword !== confirmPassword) {
                        alert('Las contraseñas no coinciden');
                        return;
                    }
                    const hashedPassword = await library.hashPassword(newPassword);
                    console.log(hashedPassword)
                    console.log(updatedUser.password)
                    if (hashedPassword === updatedUser.password) {
                        alert('La nueva contraseña no puede ser igual a la anterior');
                        return;
                    }
                    updatedUser.password = hashedPassword;
                    logout = true;
                }
                console.log(users)
                localStorage.setItem('users', JSON.stringify(users));
                Profile.methods.loadUserInfo();
                alert('Usuario actualizado correctamente');
                if(logout){
                    library.logout();  
                }
            },

            goBudget() {
                window.location.href = 'budget.html'
            }
        },

        methods: {
            loadUserInfo() {
                const name = library.getUserByUsername(library.loggedInUser()).name
                Profile.htmlElements.displayName.textContent = `Perfil de ${name}`;
                Profile.htmlElements.nameInput.value = name;
                Profile.htmlElements.passwordInput.value = '';
                Profile.htmlElements.confirmPasswordInput.value = '';
            }
        }
    };

    Profile.init();
})();
