(() => {
    const App = {
        colors: {
            '#ff0000': 'Rojo',
            '#00ff00': 'Verde',
            '#0000ff': 'Azul',
            '#ffff00': 'Amarillo'
        },
        candidatos: [],
        htmlElements: {
            inputNombre: document.getElementById('name'),
            btnAgregarCandidato: document.getElementById('btnAgregarCandidato'),
            selectColor: document.getElementById('color'),
            listaCandidato: document.getElementById('listCandidato'),
            chart: document.getElementById('chart')
        },
        init() {
            this.bindEvents();
            this.methods.colorSelect();
        },
        bindEvents() {
            // document.querySelector('button').addEventListener('click', this.handlers.agregarCandidato);
            App.htmlElements.btnAgregarCandidato.addEventListener('click', () => {
                App.handlers.agregarCandidato();
            });
        },
        handlers: {
            agregarCandidato() {
                const name = App.htmlElements.inputNombre.value;
                let color = App.htmlElements.selectColor.value;
                if (color === 'random') {
                    let availableColors = Object.keys(App.colors).filter(c => !App.candidatos.some(candidato => candidato.color === c));
                    if (availableColors.length === 0) {
                        alert('¡Todos los colores ya han sido seleccionados!');
                        return;
                    }
                    color = availableColors[Math.floor(Math.random() * availableColors.length)];
                } else {
                    if (App.candidatos.some(candidato => candidato.color === color)) {
                        alert('¡Este color ya ha sido seleccionado!');
                        return;
                    }
                }

                if (name && color) {
                    const candidato = { name, color, points: 0 };
                    App.candidatos.push(candidato);
                    App.methods.renderCandidatos();
                }
            },
            eliminarCandidato(index) {
                App.candidatos.splice(index, 1);
                App.methods.renderCandidatos();
            },
            agregarPunto(index) {
                App.candidatos[index].points++;
                App.methods.renderCandidatos();
            }
        },
        methods: {
            renderCandidatos() {
                App.htmlElements.inputNombre.value = '';
                App.htmlElements.selectColor.value = 'random';
                App.htmlElements.listaCandidato.innerHTML = '';
                App.htmlElements.chart.innerHTML = '';

                // Calcular el total de puntos
                const totalPoints = App.candidatos.reduce((acc, candidato) => acc + candidato.points, 0);

                // Generar la barra de porcentaje para cada candidato
                let offset = 0;
                App.candidatos.forEach((candidato, index) => {
                    const percentage = totalPoints > 0 ? (candidato.points / totalPoints) * 100 : 0;
                    const bar = document.createElement('div');
                    bar.classList.add('bar');
                    bar.style.width = percentage + '%';
                    bar.style.backgroundColor = candidato.color;
                    bar.style.transitionDelay = index * 0.1 + 's';

                    const span = document.createElement('span');
                    span.textContent = percentage.toFixed(2) + '%';
                    bar.appendChild(span);
                    App.htmlElements.chart.appendChild(bar);
                });

                // Renderizar la lista de candidatos
                App.candidatos.forEach((candidato, index) => {
                    const row = `<tr>
                                    <td>${candidato.name}</td>
                                    <td><span style="color: ${candidato.color};">${App.colors[candidato.color]}</span></td>
                                    <td>${candidato.points}</td>
                                    <td>
                                    <button id="btnAgregarPunto${index}">Agregar Punto</button>
                                    <button id="btnEliminar${index}">Eliminar</button>
                                    </td>
                                </tr>`;
                    App.htmlElements.listaCandidato.innerHTML += row;

                    // Asignar manejadores de eventos a los botones
                    const btnAgregarPunto = document.getElementById(`btnAgregarPunto${index}`);
                    btnAgregarPunto.addEventListener('click', () => {
                        App.handlers.agregarPunto(index);
                    });

                    const btnEliminar = document.getElementById(`btnEliminar${index}`);
                    btnEliminar.addEventListener('click', () => {
                        App.handlers.eliminarCandidato(index);
                    });
                });
            },
            colorSelect() {
                Object.keys(App.colors).forEach(color => {
                    const option = document.createElement('option');
                    option.value = color;
                    option.textContent = App.colors[color];
                    App.htmlElements.selectColor.appendChild(option);
                });
                const randomOption = document.createElement('option');
                randomOption.value = 'random';
                randomOption.textContent = 'Aleatorio';
                App.htmlElements.selectColor.appendChild(randomOption);
            }
        }
    };

    App.init();
})();