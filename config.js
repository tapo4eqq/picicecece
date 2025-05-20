document.addEventListener('DOMContentLoaded', function() {
    // Данные о компонентах (замените на ваши реальные данные)
    const componentsData = {
        cpu: [
            { id: 'cpu1', name: 'Intel Core i5-12400F', price: 15000 },
            { id: 'cpu2', name: 'AMD Ryzen 5 5600X', price: 18000 },
            { id: 'cpu3', name: 'Intel Core i7-12700K', price: 28000 },
        ],
        mobo: [
            { id: 'mobo1', name: 'ASUS PRIME B660M-A D4', price: 12000 },
            { id: 'mobo2', name: 'MSI B450M MORTAR MAX', price: 8000 },
            { id: 'mobo3', name: 'ASUS ROG STRIX Z690-A GAMING WIFI D4', price: 25000 },
        ],
        gpu: [
            { id: 'gpu1', name: 'NVIDIA GeForce RTX 3060', price: 35000 },
            { id: 'gpu2', name: 'AMD Radeon RX 6600 XT', price: 32000 },
            { id: 'gpu3', name: 'NVIDIA GeForce RTX 3070', price: 55000 },
        ],
        ram: [
            { id: 'ram1', name: 'Kingston Fury Beast 16GB (2x8GB) DDR4 3200MHz', price: 6000 },
            { id: 'ram2', name: 'Corsair Vengeance LPX 32GB (2x16GB) DDR4 3200MHz', price: 12000 },
            { id: 'ram3', name: 'G.Skill Trident Z RGB 32GB (2x16GB) DDR4 3600MHz', price: 15000 },
        ],
        storage: [
            { id: 'storage1', name: 'Samsung 970 EVO Plus 500GB NVMe PCIe Gen3', price: 5000 },
            { id: 'storage2', name: 'Western Digital Blue 1TB SATA III', price: 4000 },
            { id: 'storage3', name: 'Samsung 980 Pro 1TB NVMe PCIe Gen4', price: 10000 },
        ],
        psu: [
            { id: 'psu1', name: 'Corsair RM650x (2021) 650W', price: 8000 },
            { id: 'psu2', name: 'Seasonic FOCUS GX-750 750W', price: 10000 },
            { id: 'psu3', name: 'Corsair HX1000 1000W', price: 18000 },
        ],
        case: [
            { id: 'case1', name: 'NZXT H510', price: 7000 },
            { id: 'case2', name: 'Corsair iCUE 4000X RGB', price: 12000 },
            { id: 'case3', name: 'Fractal Design Define 7', price: 15000 },
        ],
    };

    // Получаем DOM элементы
    const cpuSelect = document.getElementById('cpu-select');
    const moboSelect = document.getElementById('mobo-select');
    const gpuSelect = document.getElementById('gpu-select');
    const ramSelect = document.getElementById('ram-select');
    const storageSelect = document.getElementById('storage-select');
    const psuSelect = document.getElementById('psu-select');
    const caseSelect = document.getElementById('case-select');
    const buildSummary = document.getElementById('build-summary');
    const totalPriceElement = document.getElementById('total-price');
    const saveBuildButton = document.getElementById('save-build');
    const savedBuildsList = document.getElementById('saved-builds-list');

    // Функция для заполнения выпадающего списка опциями
    function populateOptions(selectElement, componentType) {
        componentsData[componentType].forEach(component => {
            const option = document.createElement('option');
            option.value = component.id;
            option.textContent = `${component.name} (${component.price} ₽)`;
            selectElement.appendChild(option);
        });
    }

    // Заполняем все выпадающие списки
    populateOptions(cpuSelect, 'cpu');
    populateOptions(moboSelect, 'mobo');
    populateOptions(gpuSelect, 'gpu');
    populateOptions(ramSelect, 'ram');
    populateOptions(storageSelect, 'storage');
    populateOptions(psuSelect, 'psu');
    populateOptions(caseSelect, 'case');

    // Функция для обновления сборки
    function updateBuildSummary() {
        const selectedComponents = {
            cpu: cpuSelect.value ? componentsData.cpu.find(c => c.id === cpuSelect.value) : null,
            mobo: moboSelect.value ? componentsData.mobo.find(c => c.id === moboSelect.value) : null,
            gpu: gpuSelect.value ? componentsData.gpu.find(c => c.id === gpuSelect.value) : null,
            ram: ramSelect.value ? componentsData.ram.find(c => c.id === ramSelect.value) : null,
            storage: storageSelect.value ? componentsData.storage.find(c => c.id === storageSelect.value) : null,
            psu: psuSelect.value ? componentsData.psu.find(c => c.id === psuSelect.value) : null,
            case: caseSelect.value ? componentsData.case.find(c => c.id === caseSelect.value) : null,
        };

        buildSummary.innerHTML = '';
        let totalPrice = 0;

        for (const componentType in selectedComponents) {
            const component = selectedComponents[componentType];
            if (component) {
                const p = document.createElement('p');
                p.textContent = `${getComponentName(componentType)}: ${component.name} (${component.price} ₽)`;
                buildSummary.appendChild(p);
                totalPrice += component.price;
            }
        }

        totalPriceElement.textContent = totalPrice;

        if (totalPrice === 0) {
            buildSummary.innerHTML = '<p>Выберите компоненты для отображения сборки</p>';
        }
    }

    // Функция для получения названия компонента для отображения
    function getComponentName(componentType) {
        switch (componentType) {
            case 'cpu': return 'Процессор';
            case 'mobo': return 'Материнская плата';
            case 'gpu': return 'Видеокарта';
            case 'ram': return 'Оперативная память';
            case 'storage': return 'Накопитель';
            case 'psu': return 'Блок питания';
            case 'case': return 'Корпус';
            default: return '';
        }
    }

    // Функция для сохранения сборки в localStorage
    function saveBuild() {
        const buildData = {
            cpu: cpuSelect.value,
            mobo: moboSelect.value,
            gpu: gpuSelect.value,
            ram: ramSelect.value,
            storage: storageSelect.value,
            psu: psuSelect.value,
            case: caseSelect.value,
        };

        let savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];
        savedBuilds.push(buildData);
        localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));

        displaySavedBuilds();
    }

    // Функция для отображения сохраненных сборок
    function displaySavedBuilds() {
        savedBuildsList.innerHTML = '';
        const savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];

        savedBuilds.forEach((build, index) => {
            const li = document.createElement('li');
            li.textContent = `Сборка ${index + 1}`;
            li.addEventListener('click', () => loadBuild(build)); // Добавляем обработчик клика
            savedBuildsList.appendChild(li);
        });
    }

    // Функция для загрузки сборки в конфигуратор
    function loadBuild(build) {
        cpuSelect.value = build.cpu;
        moboSelect.value = build.mobo;
        gpuSelect.value = build.gpu;
        ramSelect.value = build.ram;
        storageSelect.value = build.storage;
        psuSelect.value = build.psu;
        caseSelect.value = build.case;

        updateBuildSummary();
    }

    // Назначаем обработчики событий для выпадающих списков
    cpuSelect.addEventListener('change', updateBuildSummary);
    moboSelect.addEventListener('change', updateBuildSummary);
    gpuSelect.addEventListener('change', updateBuildSummary);
    ramSelect.addEventListener('change', updateBuildSummary);
    storageSelect.addEventListener('change', updateBuildSummary);
    psuSelect.addEventListener('change', updateBuildSummary);
    caseSelect.addEventListener('change', updateBuildSummary);

    // Назначаем обработчик события для кнопки "Сохранить сборку"
    saveBuildButton.addEventListener('click', saveBuild);

    // Отображаем сохраненные сборки при загрузке страницы
    displaySavedBuilds();

    // Обновляем сборку при загрузке страницы
    updateBuildSummary();
});