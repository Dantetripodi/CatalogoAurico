document.addEventListener('DOMContentLoaded', function() {
    // Base de datos de perfumes
    const perfumes = [
        {
            id: 1,
            nombre: "Kit Limpieza personal Aurico",
            marca: "Aurico",
            genero: "Spray",
            familia: "floral",
            precio: 21000,
            popularidad:"",
            imagen: "img/kitLimpieza.jpg",
            descripcion: "Estas brumas energéticas realizadas a través de una receta ancestral con plantas y aceites esenciales respetando el tiempo de macerado, filtradas e intencionadas con gemoterapia sagrada, tienen un alto poder energético para utilizar en personas y mascotas.",
            notas: "Jazmín, Rosa, Ylang-Ylang"
        },
        {
            id: 2,
            nombre: "Spray Limpieza",
            marca: "Aurico",
            genero: "Spray",
            familia: "amaderado",
            precio:"--",
            popularidad: 4,
            imagen: "img/limpieza.jpg",
            descripcion: "ruda, romero, salvia blanca e incienso",
            notas: "-"
        },
        {
            id: 3,
            nombre: "Spray Proteccion",
            marca: "Aurico",
            genero: "Spray",
            familia: "oriental",
            precio:"--" ,
            popularidad: 5,
            imagen: "img/proteccion.jpg",
            descripcion: "lavanda, salvia, menta, anis y cilantro.",
            notas: "-"
        },
        {
            id: 4,
            nombre: "Spray Revitalizar",
            marca: "Aurico",
            genero: "Spray",
            familia: "citrico",
            precio: "--",
            popularidad: 4,
            imagen: "img/revitalizar.jpg",
            descripcion: "naranja, pomelo rosado, mandarina, limón y Clavo de olor.",
            notas: "-"
        },
        {
            id: 5,
            nombre: "Roll Cereza",
            marca: "Aurico",
            genero: "Roll",
            familia: "oriental",
            precio: 18000,
            popularidad: 5,
            imagen: "img/roll-cereza.jpg",
            descripcion: "Roll on aromatico con base de aceite de Rosa Mosqueta y dos tipos de macerados...Cereza y Vainilla: Autoestima, endulza las emociones y potencia la energía femenina.",
            notas: "Sambac, Orquídea, Pachulí"
        },
        {
            id: 6,
            nombre: "Roll Citrico",
            marca: "Aurico",
            genero: "Roll",
            familia: "citrico",
            precio: 18000,
            popularidad: 4,
            imagen: "img/roll-citrico.jpg",
            descripcion: "Roll on aromatico con base de aceite de Rosa Mosqueta y dos tipos de macerados..Citricos: Energiza, calma los nervios y revitaliza.",
            notas: "Limón, Neroli, Maderas Marinas"
        },
        {
            id: 7,
            nombre: "Spray Ambiental",
            marca: "Aurico",
            genero: "Spray",
            familia: "oriental",
            precio: 19000,
            popularidad: 5,
            imagen: "img/sprayAmbiental.jpg",
            descripcion: "Nuestro Spray de limpieza energética para espacios es el resultado de una receta ancestral. Sus propiedades se obtienen a través del resultado de una maceración de cuatro meses con ingredientes orgánicos.Es ideal para limpiar y armonizar nuestros espacios neutralizando las energías densas que afectan a los mismos, dejando un ambiente armonioso y con un aroma sutil..",
            notas: "Naranja, Rosa, Pachulí"
        },
        {
            id: 8,
            nombre: "Unguento Perfumado",
            marca: "Aurico",
            genero: "Unguento",
            familia: "oriental",
            precio: 21000,
            popularidad: 5,
            imagen: "img/unguento-calendula.jpg",
            descripcion: "Nuestro Unguento de Calendula es un producto natural realizado a traves de una receta ancestral con cuatro meses de maceracion, contiene manteca de karite organica y vitamina e concentrada..",
            notas: "Naranja, Rosa, Pachulí"
        },
        {
            id: 9,
            nombre: "Aceite para Masajes",
            marca: "Aurico",
            genero: "Aceites",
            familia: "oriental",
            precio: 21000,
            popularidad: 5,
            imagen: "img/aceiteMasajes.jpg",
            descripcion: "Aceite de Romero para masajes una maceracion de Romero, Lavanda y Clavo de olor en base de aceite de Rosa Mosqueta Organico.Descontracturante, Descongestivo y Calmante.",
            notas: "Naranja, Rosa, Pachulí"
        },
    ];

    // Variables de filtro
    let currentFilters = {
        genero: 'todos',
        familia: 'todos',
        precio: 'todos',
        search: ''
    };

    // Elementos del DOM
    const perfumesContainer = document.getElementById('perfumes-container');
    const noResultsElement = document.getElementById('no-results');
    const resultsCountElement = document.getElementById('results-count');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    const resetFiltersButton = document.getElementById('reset-filters');
    const sortSelect = document.getElementById('sort-select');

    // Inicializar catálogo
    renderPerfumes(perfumes);

    // Event listeners para filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            const filterValue = this.dataset.value;
            
            // Actualizar filtros
            currentFilters[filterType] = filterValue;
            
            // Actualizar estado activo de los botones
            document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(btn => {
                btn.classList.remove('active', 'bg-purple-600', 'text-white');
            });
            
            if (filterValue !== 'todos') {
                this.classList.add('active', 'bg-purple-600', 'text-white');
            }
            
            // Filtrar y renderizar
            filterAndRender();
        });
    });

    // Event listener para búsqueda
    searchInput.addEventListener('input', function() {
        currentFilters.search = this.value.toLowerCase();
        filterAndRender();
    });

    searchButton.addEventListener('click', function() {
        currentFilters.search = searchInput.value.toLowerCase();
        filterAndRender();
    });

    // Event listener para reiniciar filtros
    resetFiltersButton.addEventListener('click', function() {
        // Resetear filtros
        currentFilters = {
            genero: 'todos',
            familia: 'todos',
            precio: 'todos',
            search: ''
        };
        
        // Resetear UI
        filterButtons.forEach(btn => {
            btn.classList.remove('active', 'bg-purple-600', 'text-white');
        });
        
        searchInput.value = '';
        sortSelect.value = 'nombre-asc';
        
        // Renderizar
        filterAndRender();
    });

    // Event listener para ordenar
    sortSelect.addEventListener('change', function() {
        filterAndRender();
    });

    // Función para filtrar y renderizar
    function filterAndRender() {
        let filteredPerfumes = [...perfumes];
        
        // Aplicar filtros
        if (currentFilters.genero !== 'todos') {
            filteredPerfumes = filteredPerfumes.filter(p => p.genero === currentFilters.genero);
        }
        
        if (currentFilters.familia !== 'todos') {
            filteredPerfumes = filteredPerfumes.filter(p => p.familia === currentFilters.familia);
        }
        
        if (currentFilters.precio !== 'todos') {
            const [min, max] = currentFilters.precio.split('-').map(Number);
            if (currentFilters.precio === '100+') {
                filteredPerfumes = filteredPerfumes.filter(p => p.precio >= 100);
            } else {
                filteredPerfumes = filteredPerfumes.filter(p => p.precio >= min && p.precio <= max);
            }
        }
        
        if (currentFilters.search) {
            filteredPerfumes = filteredPerfumes.filter(p => 
                p.nombre.toLowerCase().includes(currentFilters.search) || 
                p.marca.toLowerCase().includes(currentFilters.search) ||
                p.notas.toLowerCase().includes(currentFilters.search)
            );
        }
        
        // Aplicar ordenamiento
        const sortValue = sortSelect.value;
        filteredPerfumes.sort((a, b) => {
            switch (sortValue) {
                case 'nombre-asc':
                    return a.nombre.localeCompare(b.nombre);
                case 'nombre-desc':
                    return b.nombre.localeCompare(a.nombre);
                case 'precio-asc':
                    return a.precio - b.precio;
                case 'precio-desc':
                    return b.precio - a.precio;
                case 'popularidad':
                    return b.popularidad - a.popularidad;
                default:
                    return 0;
            }
        });
        
        // Actualizar contador de resultados
        resultsCountElement.textContent = filteredPerfumes.length;
        
        // Mostrar u ocultar mensaje de no resultados
        if (filteredPerfumes.length === 0) {
            noResultsElement.style.display = 'block';
            perfumesContainer.style.display = 'none';
        } else {
            noResultsElement.style.display = 'none';
            perfumesContainer.style.display = 'grid';
        }
        
        // Renderizar perfumes filtrados
        renderPerfumes(filteredPerfumes);
    }

    // Función para renderizar perfumes
    function renderPerfumes(perfumesToRender) {
        perfumesContainer.innerHTML = '';
        
        perfumesToRender.forEach(perfume => {
            const perfumeCard = document.createElement('div');
            perfumeCard.className = 'perfume-card bg-white rounded-xl shadow-md overflow-hidden fade-in';
            
            // Determinar color de etiqueta según género
            let genderColor = '';
            let genderText = '';
            switch(perfume.genero) {
                case 'Roll':
                    genderColor = 'bg-blue-100 text-pink-800';
                    genderText = 'ROLL';
                    break;
                case 'Spray':
                    genderColor = 'bg-blue-100 text-blue-800';
                    genderText = 'SPRAY';
                    break;
                case 'Unguento':
                    genderColor = 'bg-blue-100 text-purple-800';
                    genderText = 'UNGUENTO';
                    break;
                case 'Aceites':
                    genderColor = 'bg-blue-100 text-pink-800';
                    genderText = 'ACEITES';
                    break;
                case '':
                    genderColor = 'bg-blue-100 text-blue-800';
                    genderText = '';
                    break;
            }
            
            // Determinar icono según familia olfativa
            let familyIcon = '';
            switch(perfume.familia) {
                case 'floral':
                    familyIcon = 'fa-spa';
                    break;
                case 'citrico':
                    familyIcon = 'fa-lemon';
                    break;
                case 'oriental':
                    familyIcon = 'fa-moon';
                    break;
                case 'amaderado':
                    familyIcon = 'fa-tree';
                    break;
            }
            
            perfumeCard.innerHTML = `
                <div class="relative">
                    <img src="${perfume.imagen}" alt="${perfume.nombre}" class="w-full h-64 object-cover">
                    <span class="absolute top-3 right-3 ${genderColor} text-xs font-semibold px-2.5 py-0.5 rounded-full">${genderText}</span>
                </div>
                <div class="p-5">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold text-gray-800">${perfume.nombre}</h3>
                        <span class="text-gray-500"><i class="fas ${familyIcon}"></i></span>
                    </div>
                    <p class="text-gray-600 mb-1">${perfume.marca}</p>
                    <p class="text-sm text-gray-500 mb-4">${perfume.descripcion}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-black-700">$${perfume.precio}</span>
                        <button class="add-to-cart px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-purple-700 transition" data-id="${perfume.id}">
                            <i class="fas fa-shopping-cart mr-2"></i>Comprar
                        </button>
                    </div>
                </div>
            `;
            
            perfumesContainer.appendChild(perfumeCard);
        });
        
        // Agregar event listeners a los botones de compra
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const perfumeId = parseInt(this.dataset.id);
                const selectedPerfume = perfumes.find(p => p.id === perfumeId);
                alert(`Has añadido ${selectedPerfume.nombre} de ${selectedPerfume.marca} al carrito.`);
            });
        });
    }
});