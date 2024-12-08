//*--------------------------- Отримуємо доступ до елементів на сторінці----------------------*//

// Поле для введення пари "Name=Value"
const inputPair = document.getElementById('inputPair');
// Список, куди будуть додаватися пари
const list = document.getElementById('list');

//------------------------------ Функція для додавання пари в список---------------------------//
function addPair() {
    // Вирізаємо зайві пробіли з введеного значення
    const value = inputPair.value.trim();

    // Перевіряємо, чи є знак "=" у введеному значенні
    if (!value.includes('=')) {
        alert("Неправильний формат! Використовуйте формат Name=Value.");
        return; // Зупиняємо виконання функції
    }

    // Розділяємо на ім'я і значення по символу "="
    const parts = value.split('=');
    // Видаляємо зайві пробіли з імені
    const name = parts[0].trim();
    // Видаляємо зайві пробіли з значення
    const val = parts[1]?.trim();

    // Перевірка на правильність символів (тільки літери та цифри)
    function isValid(str) {
        // Перевіряємо кожен символ на літеру або цифру
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            // Якщо символ не буква або цифра, повертаємо false
            if (!((char >= 'a' && char <= 'z') ||
                (char >= 'A' && char <= 'Z') ||
                (char >= '0' && char <= '9'))) {
                return false; // Неприпустимий символ
            }
        }
        return true; // Усі символи правильні
    }

    // Перевіряємо ім'я і значення
    if (!isValid(name) || !isValid(val)) {
        alert("Неправильний формат! Використовуйте тільки букви і цифри.");
        return; // Зупиняємо виконання функції
    }

    // Формуємо пару у форматі "Name=Value"
    const pair = `${name}=${val}`;
    // Створюємо новий елемент списку
    const option = document.createElement('option');
    // Встановлюємо значення та текст елемента
    option.value = pair;
    option.textContent = pair;
    // Додаємо елемент у список
    list.appendChild(option);

    // Очищаємо поле вводу
    inputPair.value = "";
}

//--------------------------- Обробляємо натискання клавіші Enter-----------------------------------//
inputPair.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Запобігаємо переходу на наступний елемент
        addPair(); // Викликаємо функцію додавання пари
    }
});

//---------------------------- Функція для сортування списку за ім'ям----------------------------------//
function sortByName() {
    // Отримуємо всі елементи списку
    const options = Array.from(list.options);
    // Сортуємо елементи за ім'ям (до знака "=")
    options.sort((a, b) => a.value.split('=')[0].localeCompare(b.value.split('=')[0]));
    // Очищаємо список перед додаванням відсортованих елементів
    list.innerHTML = '';
    // Додаємо відсортовані елементи назад
    options.forEach(option => list.appendChild(option));
}

//--------------------------------- Функція для сортування списку за значенням-----------------------//
function sortByValue() {
    // Отримуємо всі елементи списку
    const options = Array.from(list.options);
    // Сортуємо елементи за значенням (після знака "=")
    options.sort((a, b) => {
        const valueA = a.value.split('=')[1].trim(); // Значення першого елемента
        const valueB = b.value.split('=')[1].trim(); // Значення другого елемента
        return valueA.localeCompare(valueB); // Порівнюємо значення
    });
    // Очищаємо список перед додаванням відсортованих елементів
    list.innerHTML = '';
    // Додаємо відсортовані елементи назад
    options.forEach(option => list.appendChild(option));
}

//---------------------------------- Функція для видалення вибраних елементів зі списку--------------------//
function deleteSelected() {
    // Отримуємо вибрані елементи списку
    const selectedOptions = Array.from(list.selectedOptions);
    // Видаляємо кожен вибраний елемент
    selectedOptions.forEach(option => option.remove());
}

