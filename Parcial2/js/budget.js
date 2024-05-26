(() => {
    const Budget = {
        type: [
            { id: 'credit', name: 'Crédito' },
            { id: 'debit', name: 'Débito' }
        ],
        htmlElements: {
            inputAmount: document.getElementById('amount'),
            btnAddAmount: document.getElementById('btnAddAmount'),
            selectType: document.getElementById('type'),
            listBudget: document.getElementById('listBudget'),
            chart: document.getElementById('chart'),
            displayUsername: document.getElementById('displayUsername')
        },
        init() {
            library.redirectIfNotLoggedIn();
            this.bindEvents();
            this.methods.selectType();
            this.methods.displayUsername();
            this.methods.renderBudget();
        },
        bindEvents() {
            Budget.htmlElements.btnAddAmount.addEventListener('click', () => {
                Budget.handlers.addAmount();
            });
        },
        handlers: {
            addAmount() {
                let amount = Budget.htmlElements.inputAmount.value;
                const regex = /^\d+\.\d{2}$/;

                if (parseFloat(amount) <= 0 || !amount.trim()) {
                    alert('El monto debe ser mayor que 0.00');
                    return;
                }

                if (amount.indexOf('.') === -1) {
                    amount += '.00';
                }

                if (!regex.test(amount)) {
                    alert('El monto debe tener el formato correcto, por ejemplo, 0.01, 1.00');
                    return;
                }

                Budget.methods.addAmount(Budget.htmlElements.selectType.value, parseFloat(amount));
                Budget.methods.renderBudget();
            }
        },
        methods: {
            displayUsername() {
                Budget.htmlElements.displayUsername.textContent = `Presupuesto de ${library.loggedInUser()}`;
            },
            selectType() {
                Budget.type.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type.id;
                    option.textContent = type.name;
                    Budget.htmlElements.selectType.appendChild(option);
                });
            },
            addAmount(selectedType, amount) {
                let userBudget = library.getUserBudget();
                
                if (!userBudget) {
                    alert('Error: No se encontró presupuesto para el usuario.');
                    return;
                }

                if (selectedType === 'debit' && userBudget.total < amount) {
                    alert('Error: No tiene fondos suficientes.');
                    return;
                }

                const nextId = userBudget.budget.length > 0 ? userBudget.budget[userBudget.budget.length - 1].id + 1 : 1;

                userBudget.budget.push({ id: nextId, type: selectedType, amount: amount });

                if (selectedType === 'credit') {
                    userBudget.total += amount;
                } else if (selectedType === 'debit') {
                    userBudget.total -= amount;
                }

                let usersBudget = library.getUsersBudget();
                usersBudget[library.loggedInUser()] = userBudget;
                localStorage.setItem('usersBudget', JSON.stringify(usersBudget));
            },
            renderBudget() {
                let userBudget = library.getUserBudget();
                const listBudget = Budget.htmlElements.listBudget;
                listBudget.innerHTML = '';

                if (userBudget && userBudget.budget.length > 0) {
                    userBudget.budget.forEach(item => {
                        const row = document.createElement('tr');
                        const typeCell = document.createElement('td');
                        const amountCell = document.createElement('td');

                        typeCell.textContent = item.type;
                        amountCell.textContent = item.amount.toFixed(2);

                        row.appendChild(typeCell);
                        row.appendChild(amountCell);
                        listBudget.appendChild(row);
                    });
                }

                const totalDisplay = document.getElementById('totalDisplay');
                if (totalDisplay) {
                    totalDisplay.textContent = `Total: ${userBudget.total.toFixed(2)}`;
                }
            }
        }
    };

    Budget.init();
})();
