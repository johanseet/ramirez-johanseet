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
            async calcularFibonacci() {
                const num = parseInt(App.htmlElements.inputNumero.value);
                if (!isNaN(num) && num > 0) {
                    await App.methods.mostrarTarjetas(App.methods.getFibonacci(num));
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
            async getFibonacci(num) {
                try {
                    const response = await fetch(`http://127.0.0.1:3000/fibonacci?number=${num}`);
                    if (!response.ok) {
                        throw new Error('Error en la respuesta del servidor');
                    }
                    const data = await response.json();
                    console.log(typeof data)
                    data
                    App.methods.mostrarTarjetas(data);
                } catch (error) {
                    console.error('Error al obtener la secuencia de Fibonacci:', error);
                }
            },
            mostrarTarjetas(numsFibonacci) {
                const fibonacciArray = Object.values(numsFibonacci);
                fibonacciArray.forEach(num => {
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