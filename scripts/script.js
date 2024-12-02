// Отримання елементів з DOM
const inputPair = document.getElementById('inputPair'); // Поле для введення пари
const list = document.getElementById('list'); // Список пар

// Функція додавання пари
function addPair() {
    const value = inputPair.value.trim(); // Видаляємо зайві пробіли
    const regex = /^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/; // Перевірка формату "Ім'я=Значення"

    // Якщо формат невірний, показуємо попередження
    if (!regex.test(value)) {
        alert("Неправильний формат! Використовуйте формат Ім'я=Значення (лише латинські букви та цифри).");
        return;
    }

    // Витягуємо ім'я та значення за допомогою регулярного виразу
    const [_, name, val] = value.match(regex);
    const pair = `${name}=${val}`; // Створюємо рядок у форматі "Ім'я=Значення"

    // Додаємо пару в список
    const option = document.createElement('option');
    option.value = pair;
    option.textContent = pair;
    list.appendChild(option);

    // Очищуємо поле введення
    inputPair.value = "";
}

// Функція сортування за ім'ям
function sortByName() {
    const options = Array.from(list.options); // Отримуємо всі опції зі списку
    options.sort((a, b) => a.value.split('=')[0].localeCompare(b.value.split('=')[0])); // Сортуємо за ім'ям

    // Очищаємо список і додаємо сортувані елементи
    list.innerHTML = '';
    options.forEach(option => list.appendChild(option));
}

// Функція сортування за значенням

function sortByValue() {
    const options = Array.from(list.options); // Отримуємо всі елементи списку як масив
    options.sort((a, b) => {
        const valueA = a.value.split("=")[1].trim(); // Витягуємо "значення" з пари
        const valueB = b.value.split("=")[1].trim(); // Те саме для іншого елемента
        return valueA.localeCompare(valueB); // Порівнюємо значення
    });

    // Очищуємо список і додаємо відсортовані елементи
    list.innerHTML = "";
    options.forEach(option => list.appendChild(option));
}

// Функція видалення обраних елементів
function deleteSelected() {
    const selectedOptions = Array.from(list.selectedOptions); // Отримуємо обрані елементи
    selectedOptions.forEach(option => option.remove()); // Видаляємо обрані елементи
}