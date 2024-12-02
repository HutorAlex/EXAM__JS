// Отримання елементів з DOM
const inputPair = document.getElementById('inputPair');
const list = document.getElementById('list');

// Додавання пари у список
function addPair() {
    const value = inputPair.value.trim(); // Видалення зайвих пробілів
    const regex = /^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/; // Формат: Name=Value (букви та цифри)

    // Перевірка формату
    if (!regex.test(value)) {
        alert("Неправильний формат! Використовуйте лише букви та цифри у форматі Name=Value.");
        return;
    }

    // Витягування ім'я та значення
    const [_, name, val] = value.match(regex);
    const pair = `${name}=${val}`;

    // Додавання пари у список
    const option = document.createElement('option');
    option.value = pair;
    option.textContent = pair;
    list.appendChild(option);

    // Очищення поля вводу
    inputPair.value = "";
}

// Сортування за ім'ям
function sortByName() {
    const options = Array.from(list.options); // Усі елементи списку
    options.sort((a, b) => a.value.split('=')[0].localeCompare(b.value.split('=')[0])); // Порівняння імен
    list.innerHTML = ''; // Очистити список
    options.forEach(option => list.appendChild(option)); // Додати відсортовані елементи
}

// Сортування за значенням
function sortByValue() {
    const options = Array.from(list.options);
    options.sort((a, b) => {
        const valueA = a.value.split('=')[1].trim();
        const valueB = b.value.split('=')[1].trim();
        return valueA.localeCompare(valueB);
    });
    list.innerHTML = '';
    options.forEach(option => list.appendChild(option));
}

// Видалення вибраних елементів
function deleteSelected() {
    const selectedOptions = Array.from(list.selectedOptions);
    selectedOptions.forEach(option => option.remove());
}
