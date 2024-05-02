(() => {
    const App = {
        htmlElements: {
            inputNumero: document.getElementById('numero'),
            resultado: document.getElementById('resultado'),
            btnCalcular: document.getElementById('btnCalcular')
        },
        init() {
            App.bindEvents();
        },
        bindEvents() {
            App.htmlElements.btnCalcular.addEventListener('click', () => {
                App.handlers.calcularFibonacci();
            });

            App.htmlElements.resultado.addEventListener('click', (event) => {
                if (event.target.classList.contains('card-content')) {
                    App.handlers.eliminarTarjeta(event.target.parentNode);
                }
            });
        },
        handlers: {
            calcularFibonacci() {
                const num = parseInt(App.htmlElements.inputNumero.value);
                if (!isNaN(num) && num > 0) {
                    App.methods.mostrarTarjetas(App.methods.generarListaFibonacci(num));
                } else {
                    alert('Por favor, ingrese un número válido mayor que cero.');
                }
            },
            eliminarTarjeta(cardElement) {
                if (confirm('¿Desea eliminar esta tarjeta?')) {
                    App.htmlElements.resultado.removeChild(cardElement.parentNode);
                }
            }
        },
        methods: {
            generarListaFibonacci(num) {
                const numsFibonacci = [0, 1];
                for (let i = 2; i < num; i++) {
                    numsFibonacci.push(numsFibonacci[i - 1] + numsFibonacci[i - 2]);
                }
                return numsFibonacci;
            },
            mostrarTarjetas(numsFibonacci) {
                numsFibonacci.forEach(num => {
                    const tarjeta = document.createElement('div');
                    tarjeta.className = 'col s12 m3';
                    tarjeta.innerHTML = `<div class="card teal lighten-1"><div class="card-content black-text center-align "><h5>${num}</h5></div></div>`;
                    App.htmlElements.resultado.appendChild(tarjeta);
                });
            }
        }
    };
    App.init();
})();