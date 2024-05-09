(() => {
    const App = {
        colors: {
            '#ff0000': 'Rojo',
            '#00ff00': 'Verde',
            '#0000ff': 'Azul',
            '#ffff00': 'Amarillo'
        },
        candidatos: [],
        candidatoIdCounter: 0,
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
            App.htmlElements.btnAgregarCandidato.addEventListener('click', () => {
                App.handlers.agregarCandidato();
            });
            if (!App.htmlElements.listaCandidato.hasAttribute('data-eventos-asignados')) {
                console.log(App.htmlElements.listaCandidato.hasAttribute('data-eventos-asignados'))

                App.htmlElements.listaCandidato.addEventListener('click', (event) => {
                    const target = event.target;
                    if (target.classList.contains('btnAgregarPunto')) {
                        const id = parseInt(target.getAttribute('data-id'));
                        App.handlers.agregarPunto(id);
                    } else if (target.classList.contains('btnEliminarCandidato')) {
                        const id = parseInt(target.getAttribute('data-id'));
                        App.handlers.eliminarCandidato(id);
                    }
                });

                App.htmlElements.listaCandidato.setAttribute('data-eventos-asignados', 'true');
            }
        },
        handlers: {
            agregarCandidato() {
                const name = App.htmlElements.inputNombre.value;
                if (!name) {
                    alert('Por favor, ingrese el nombre del candidato.');
                    return;
                }
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
                    const candidato = { id: App.candidatoIdCounter++, name, color, points: 0 };
                    App.candidatos.push(candidato);
                    console.log(`Se agregó un candidato nuevo ${candidato.name}. : ${JSON.stringify(App.candidatos)}`);
                    App.methods.renderCandidatos();
                }
            },
            agregarPunto(id) {
                const candidato = App.candidatos.find(candidato => candidato.id === id);
                if (candidato) {
                    console.log(`Candidato agregar punto: ${candidato.id}`);
                    candidato.points++;
                    console.log(`Candidato puntos: ${candidato.points}`);
                    App.methods.renderCandidatos();
                }
            },
            eliminarCandidato(id) {
                console.log(id)
                App.candidatos = App.candidatos.filter(candidato => candidato.id !== id);
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

                console.log(`Lista de candidato actual: ${JSON.stringify(App.candidatos)}`);
                console.log(`Total de votos: ${totalPoints}`);

                // Generar la barra de porcentaje para cada candidato
                let offset = 0;
                App.candidatos.forEach((candidato, index) => {
                    const percentage = totalPoints > 0 ? (candidato.points / totalPoints) * 100 : 0;
                    console.log(`Porcentaje de votos candidato ${candidato.name}: ${percentage}`);
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
                    const id = `candidato-${candidato.id}`;
                    const row = `<tr id="${id}">
                                    <td>${candidato.name}</td>
                                    <td><span style="color: ${candidato.color};">${App.colors[candidato.color]}</span></td>
                                    <td>${candidato.points}</td>
                                    <td>
                                    <button class="btnAgregarPunto" data-id="${candidato.id}">Agregar Punto</button>
                                    <button class="btnEliminarCandidato" data-id="${candidato.id}">Eliminar</button>
                                    </td>
                                </tr>`;
                    App.htmlElements.listaCandidato.innerHTML += row;
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
