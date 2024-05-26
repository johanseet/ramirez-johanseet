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
            displayUsername: document.getElementById('displayUsername'),
            totalDisplay: document.getElementById('totalDisplay'),
            legend: document.getElementById('legend')
        },
        init() {
            library.redirectIfNotLoggedIn();
            this.bindEvents();
            this.methods.selectType();
            this.methods.displayUsername();
            this.methods.renderTable();
            this.methods.renderChart();
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
                Budget.methods.renderTable();
                Budget.methods.renderChart();
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
            renderTable() {
                let userBudget = library.getUserBudget();
                const listBudget = Budget.htmlElements.listBudget;
                listBudget.innerHTML = '';

                if (userBudget && userBudget.budget.length > 0) {
                    userBudget.budget.forEach(item => {
                        const row = document.createElement('tr');
                        const debitCell = document.createElement('td');
                        const creditCell = document.createElement('td');

                        if (item.type === 'credit') {
                            creditCell.textContent = item.amount.toFixed(2);
                            debitCell.textContent = '0.00';
                        } else if (item.type === 'debit') {
                            debitCell.textContent = `-${item.amount.toFixed(2)}`;
                            debitCell.style.color = 'red';
                            creditCell.textContent = '0.00';
                        }

                        row.appendChild(debitCell);
                        row.appendChild(creditCell);
                        listBudget.appendChild(row);
                    });
                }

                if (Budget.htmlElements.totalDisplay) {
                    Budget.htmlElements.totalDisplay.textContent = `Total: ${userBudget.total.toFixed(2)}`;
                }
            },
            renderChart() {
                let userBudget = library.getUserBudget();

                let totalCredit = 0;
                let totalDebit = 0;

                if (userBudget && userBudget.budget.length > 0) {
                    userBudget.budget.forEach(item => {
                        if (item.type === 'credit') {
                            totalCredit += item.amount;
                        } else if (item.type === 'debit') {
                            totalDebit += item.amount;
                        }
                    });
                }

                const totalAmount = totalCredit + totalDebit;
                const creditPercentage = totalAmount > 0 ? (totalCredit / totalAmount) * 100 : 0;
                const debitPercentage = totalAmount > 0 ? (totalDebit / totalAmount) * 100 : 0;

                const chart = Budget.htmlElements.chart;
                chart.innerHTML = '';

                const debitBar = document.createElement('div');
                debitBar.classList.add('bar');
                debitBar.style.width = debitPercentage + '%';
                debitBar.style.backgroundColor = 'red';
                debitBar.textContent = `${debitPercentage.toFixed(2)}%`;
                chart.appendChild(debitBar);

                const creditBar = document.createElement('div');
                creditBar.classList.add('bar');
                creditBar.style.width = creditPercentage + '%';
                creditBar.style.backgroundColor = 'green';
                creditBar.textContent = `${creditPercentage.toFixed(2)}%`;
                chart.appendChild(creditBar);

                Budget.htmlElements.legend.innerHTML = `<p>Total de ingresos: ${totalCredit.toFixed(2)}</p><p>Total de egresos: ${totalDebit.toFixed(2)}</p>`;

            }

        }
    };

    Budget.init();
})();
