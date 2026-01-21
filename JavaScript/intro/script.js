// JavaScript source code

function Factorial(n)
{
    let f = BigInt(1);
    // document.write(typeof (f));
    /// document.write("<pre>"); // учитываются пробелы и знаки переноса
    for (let i = 1n; i <= n; i++)
    {
        f *= i;
        // document.writeln(`${i}! = ${f};`);
    }
    // document.write("</pre>");
    return f;
}

function Factorial2()
{
    let source_input_field = document.getElementById("factorial-source");
    // alert("Привет");
    let source_value = source_input_field.value;
    let factorial_result = document.getElementById("factorial-result");
    factorial_result.innerHTML = Factorial(source_value);
}

//----------------------------
//Возведение в степень
//______________________________
function calculatePower(base, exponent)
{
    // Используем оператор **
    return base ** exponent;
}

document.addEventListener('DOMContentLoaded', () => {
    const baseInput = document.getElementById('base');
    const exponentInput = document.getElementById('exponent');
    const calculateButton = document.getElementById('calculateButton');
    const resultOutput = document.getElementById('resultOutput');

    function handleCalculation() {
        // Получаем значения из полей ввода
        const base = parseFloat(baseInput.value);
        const exponent = parseFloat(exponentInput.value);

        // Проверяем, являются ли значения числами
        if (isNaN(base) || isNaN(exponent)) {
            resultOutput.textContent = "Ошибка: Введите корректные числа.";
            return;
        }

        // Вычисляем результат
        const result = calculatePower(base, exponent);

        // Выводим результат на страницу
        resultOutput.textContent = `${base} в степени ${exponent} = ${result}`;
    }

    // Привязываем функцию к клику на кнопку
    calculateButton.addEventListener('click', handleCalculation);

    // Также запускаем расчет при первом входе (для отображения значения по умолчанию)
    handleCalculation();
});

////function Power() {
////    let number = document.getElementById("number-for-power").value;
////    let power = document.getElementById("power-for-number").value;
////    let result = document.getElementById("power-result");
////    result.innerHTML = Math.pow(number, power);
//}//

//---
//Последовательность Фебоначчи
//---

/**
 * Генерирует массив с первыми N числами ряда Фибоначчи.
 * (Остается без изменений)
 */
function generateFibonacci(n)
{
    console.log(`--- Запуск генерации для N = ${n} ---`); // <-- ЛОГ 1

    if (n <= 0) {
        console.log("N <= 0, возвращаем пустой массив."); // <-- ЛОГ 2
        return [];
    }

    if (n === 1) {
        console.log("N = 1, возвращаем [0]."); // <-- ЛОГ 3
        return [0];
    }

    let sequence = [0, 1];

    for (let i = 2; i < n; i++) {
        const nextNumber = sequence[i - 1] + sequence[i - 2];
        sequence.push(nextNumber);
    }

    console.log("Генерация завершена. Массив:", sequence); // <-- ЛОГ 4
    return sequence;
}

document.addEventListener('DOMContentLoaded', () => {
    const countInput = document.getElementById('count');
    const limitPresetSelect = document.getElementById('limitPreset');
    const generateButton = document.getElementById('generateButton');
    const result = document.getElementById('result');

    const MAX_COUNT = 50;

    function getCountFromInputs() {
        const selectedValue = limitPresetSelect.value;
        if (selectedValue) {
            return parseInt(selectedValue);
        }
        return parseInt(countInput.value);
    }

    function handleGeneration() {
        let count = getCountFromInputs();
        console.log(`Полученное значение для генерации: ${count}`); // <-- ЛОГ 5

        // 1. Проверка на корректность
        if (isNaN(count) || count < 1) {
            result.textContent = "Пожалуйста, введите положительное целое число.";
            return;
        }

        // 2. Применяем ограничение
        if (count > MAX_COUNT) {
            count = MAX_COUNT;
            limitPresetSelect.value = MAX_COUNT.toString();
            countInput.value = MAX_COUNT;
        }

        // 3. Генерируем ряд
        const fibSequence = generateFibonacci(count);

        // 4. Форматируем и выводим
        const outputString = fibSequence.join(', ');
        console.log(`Выводимая строка: "${outputString}"`); // <-- ЛОГ 6

        result.textContent = outputString;
    }

    generateButton.addEventListener('click', handleGeneration);
    limitPresetSelect.addEventListener('change', handleGeneration);
    countInput.addEventListener('input', handleGeneration);

    // Запускаем генерацию при первой загрузке
    handleGeneration();
});

/*        Fibonacci 2*/
function NumberMaxFib() {
    let number = document.getElementById("number-max-fib").value;
    let result = document.getElementById("number-max-fib-result");
    result.innerHTML = "";
    let a = 0;
    let b = 1;
    let next;
    if (number != 0) {
        result.innerHTML += `${a}, ${b}`;
        for (let i = 0; i <= number; i += a) {
            result.innerHTML += ", ";
            next = a + b;
            result.innerHTML += `${next}`;
            a = b;
            b = next;
        }
    }
}

function NumberCountFib() {
    let number = document.getElementById("number-count-fib").value;
    let result = document.getElementById("number-count-fib-result");
    result.innerHTML = "";
    let a = 0;
    let b = 1;
    let next;

    if (number > 1) {
        result.innerHTML += `${a}, ${b}`;
        for (let i = 2; i < number; i++) {
            result.innerHTML += ", ";
            next = a + b;
            result.innerHTML += `${next}`;
            a = b;
            b = next;
        }
    }
}

/*number system*/

function decimalToBinary()
{
    let number = document.getElementById("decimal-to-binary").value;
    let result = document.getElementById("decimal-to-binary-result");
    result.innerHTML = Number(number).toString(2);
}

function decimalToHexadecimal()
{
    let number = document.getElementById("decimal-to-hexadecimal").value;
    let result = document.getElementById("decimal-to-hexadecimal-result");
    result.innerHTML = Number(number).toString(16);
}

function binaryToDecimal()
{
    let number = document.getElementById("binary-to-decimal").value;
    let result = document.getElementById("binary-to-decimal-result");
    result.innerHTML = parseInt(number, 2);
}
function binaryToHexadecimal()
{
    let number = document.getElementById("binary-to-hexadecimal").value;
    let result = document.getElementById("binary-to-hexadecimal-result");
    let decimal = parseInt(number, 2);
    if (isNaN(decimal)) {
        result.innerHTML = "Ошибка: Введенное значение не является корректным двоичным числом.";
        return; // Прерываем выполнение, если ввод невалиден
    }
    result.innerHTML = Number(decimal).toString(16);
}
function hexadecimalToDecimal()
{
    let number = document.getElementById("hexadecimal-to-decimal").value;
    let result = document.getElementById("hexadecimal-to-decimal-result");
    result.innerHTML = parseInt(number, 16);
}

