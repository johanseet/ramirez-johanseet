((global) => {
    const library = {
        getUsers() {
            const dataUsers = localStorage.getItem('users');
            return dataUsers ? JSON.parse(dataUsers) : [];
        },
        getUsersBudget() {
            const dataUserBudget = localStorage.getItem('usersBudget');
            return dataUserBudget ? JSON.parse(dataUserBudget) : {};
        },
        getUserBudget() {
            const user = localStorage.getItem('user');
            console.log(user)
            const usersBudget = JSON.parse(localStorage.getItem('usersBudget'));
            console.log(usersBudget[user])
            return usersBudget[user];
        },
        loggedInUser() {
            return localStorage.getItem('user');
        },
        async hashPassword(password) {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hash = await crypto.subtle.digest('SHA-256', data);
            return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
        },
        isUserLoggedIn() {
            return localStorage.getItem('user') !== null;
        },
        redirectIfLoggedIn() {
            if (library.isUserLoggedIn()) {
                const pathname = window.location.pathname;
                if (pathname.endsWith('login.html') || pathname.endsWith('signup.html')) {
                    window.location.href = 'profile.html';
                }
            }
        },
        redirectIfNotLoggedIn() {
            if (!this.isUserLoggedIn()) {
                const currentPath = window.location.pathname.split('/').pop();
                if (currentPath !== 'login.html' && currentPath !== 'signup.html') {
                    window.location.href = 'login.html';
                }
            }
        }

    };

    global.library = library;
})(window);
