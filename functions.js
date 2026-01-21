// JavaScript source code
function setImage() {
    let filename = document.getElementById("image-file");
    let reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("photo").src = e.target.result;
    }
    reader.readAsDataURL(filename.files[0]);
}
function setBackground() {
    let color_tool = document.getElementById('choose-color');
    let color = color_tool.value;
    //document.body.style.backgroundImage = "none";
    //document.body.style.backgroundColor = color;
    document.getElementById('color-sample').style.backgroundColor = inverse_color;
    document.getElementById('color-sample').style.width = "200px";
    document.getElementById('color-sample').style.height = "200px";
}
function switchBackground() {
    //let target = document.getElementById("switch-background").src;
    //let path = target.split('/');
    //let file = path[path.length - 1];
    /////////////////////////////////////
    //console.log(file);
    //if (file === "moon.png") document.getElementById("switch-background").src = "img/sun.png";
    //else document.getElementById("switch-background").src = "img/moon.png";
    //document.getElementById("switch-background").src = file === "moon.png" ? "img/sun.png" : "img/moon.png";
    //document.body.style.backgroundImage = "none";
    let delay = document.getElementById("delay").value;
    document.body.style.transition = `background-image ${delay}s, color ${delay}s`;
    document.getElementById("switch-background").style.transition = `background-image ${delay}s, filter ${delay}s`;
    document.body.className = document.body.className === "dark" ? "white" : "dark";
    /*document.body.className = file === "moon.png" ? "dark" : "white";*/
    //document.body.style.backgroundColor = file === "moon.png" ? "black" : "white";
    //document.body.style.color = file === "moon.png" ? "white" : "black";
    /*document.getElementById("switch-background").src = `img/${file === "moon.png" ? "sun.png" : "moon.png"}`;*/
    /*
    ---------------------
    5 == "5":true;
    5 === "5":false;
    ---------------------
    */
}

document.addEventListener
    (
        "mousemove",
        function (event) {
            let x = event.clientX;
            let y = event.clientY;
            document.getElementById("mouse").innerHTML = `X = ${x}, Y = ${y}`;
        }
    );
///////////////////////////////////////////////////////////////////////////////////
//DOM - Document Object Model
function addLeadingZero(number) {
    return number < 10 ? "0" + number : number;
}
document.body.onload = function tick_timer() {
    let time = new Date();
    document.getElementById("full-time").innerHTML = time;
    document.getElementById("hours").innerHTML = addLeadingZero(time.getHours());
    document.getElementById("minutes").innerHTML = addLeadingZero(time.getMinutes());
    document.getElementById("seconds").innerHTML = addLeadingZero(time.getSeconds());

    document.getElementById("years").innerHTML = addLeadingZero(time.getFullYear());
    document.getElementById("months").innerHTML = addLeadingZero(time.getMonth() + 1);
    document.getElementById("days").innerHTML = addLeadingZero(time.getDate());

    document.getElementById("day-of-week").innerHTML = time.toLocaleDateString("ru", { weekday: 'long' });

    document.getElementById('current-date').style.visibility = document.getElementById('show-date').checked ? "visible" : "hidden";
    document.getElementById('day-of-week').style.visibility = document.getElementById('show-weekday').checked ? "visible" : "hidden";

    setTimeout(tick_timer, 100);
}

document.getElementById("btn-start").onclick = function startCountdownTimer() {
    let targetDate = document.getElementById("target-date");
    let targetTime = document.getElementById("target-time");
    let btnStart = document.getElementById("btn-start");
    if (btnStart.value === "Start") {
        btnStart.value = "Stop";
        targetDate.disabled = targetTime.disabled = true;
        tickCountdown();
    }
    else {
        btnStart.value = "Start";
        targetDate.disabled = targetTime.disabled = false;
    }
}
function tickCountdown() {
    let now = new Date();
    let targetDateControl = document.getElementById("target-date");
    let targetTimeControl = document.getElementById("target-time");
    let btnStart = document.getElementById("btn-start");

    if (btnStart.value === "Stop") {

        let targetDateValue = targetDateControl.valueAsDate;
        let targetTimeValue = targetTimeControl.valueAsDate;

        if (!targetDateValue || !targetTimeValue) {
            btnStart.value = "Start";
            targetDateControl.disabled = targetTimeControl.disabled = false;
            document.getElementById("display").innerHTML = "Please select date and time!";
            return;
        }

        // Корректируем дату цели на основе вводимого времени (для консистентности)
        targetTimeValue.setFullYear(targetDateValue.getFullYear());
        targetTimeValue.setMonth(targetDateValue.getMonth());
        targetTimeValue.setDate(targetDateValue.getDate());

        // --- Проверка завершения ---
        let duration = targetTimeValue.getTime() - now.getTime();
        if (duration <= 0) {
            document.getElementById("display").innerHTML = "Time's up!";
            btnStart.value = "Start";
            targetDateControl.disabled = targetTimeControl.disabled = false;
            // Сброс счетчиков в 00:00:00
            document.getElementById("hours-unit").innerHTML = "00";
            document.getElementById("minutes-unit").innerHTML = "00";
            document.getElementById("seconds-unit").innerHTML = "00";
            return;
        }

        // --- Инициализация переменных для результата ---
        let years = 0;
        let months = 0;
        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        // Создаем рабочую копию текущего времени
        let calculationNow = new Date(now.getTime());

        // --- 1. Вычисляем ГОДЫ ---
        let tempDate = new Date(calculationNow.getTime());
        while (true) {
            tempDate.setFullYear(calculationNow.getFullYear() + years + 1);
            if (tempDate.getTime() > targetTimeValue.getTime()) {
                break;
            }
            years++;
        }

        // --- 2. Вычисляем МЕСЯЦЫ ---
        // Начинаем расчет с года, который мы только что посчитали
        calculationNow.setFullYear(calculationNow.getFullYear() + years);

        let currentMonth = calculationNow.getMonth();
        let targetMonth = targetTimeValue.getMonth();
        let targetYear = targetTimeValue.getFullYear();

        while (true) {
            let nextMonthDate = new Date(calculationNow.getTime());
            nextMonthDate.setMonth(currentMonth + 1);

            // Если следующий месяц уже в другом году ИЛИ мы перескакиваем цель
            let nextMonthYear = nextMonthDate.getFullYear();
            let targetYearMatch = nextMonthYear === targetYear;
            let nextMonthExceedsTarget = (nextMonthYear === targetYear && nextMonthDate.getMonth() > targetMonth) || (nextMonthYear > targetYear);

            if (nextMonthExceedsTarget) {
                break;
            }

            // Если следующий месяц совпадает с целевым месяцем и годом, но день/время уже позади, ломаемся
            if (nextMonthYear === targetYear && nextMonthDate.getMonth() === targetMonth) {
                // Проверяем, перескочили ли мы целевое время в этот месяц
                if (nextMonthDate.getTime() > targetTimeValue.getTime()) {
                    break;
                }
            }

            calculationNow = nextMonthDate;
            months++;
            currentMonth = calculationNow.getMonth();
        }

        // --- 3. Оставшееся время (Дни, Часы, Минуты, Секунды) ---

        let remainingDurationMs = targetTimeValue.getTime() - calculationNow.getTime();
        let totalSeconds = Math.trunc(remainingDurationMs / 1000);

        const SECONDS_PER_DAY = 86400;
        const SECONDS_PER_HOUR = 3600;
        const SECONDS_PER_MINUTE = 60;

        // Дни (остаток после годов и месяцев)
        days = Math.floor(totalSeconds / SECONDS_PER_DAY);
        let remainingSecondsAfterDays = totalSeconds % SECONDS_PER_DAY;

        // Часы
        hours = Math.floor(remainingSecondsAfterDays / SECONDS_PER_HOUR);
        let remainingSecondsAfterHours = remainingSecondsAfterDays % SECONDS_PER_HOUR;

        // Минуты
        minutes = Math.floor(remainingSecondsAfterHours / SECONDS_PER_MINUTE);

        // Секунды
        seconds = remainingSecondsAfterHours % SECONDS_PER_MINUTE;


        // --- Отображение результата ---
        document.getElementById("years-unit").innerHTML = addLeadingZero(years);
        document.getElementById("months-unit").innerHTML = addLeadingZero(months);
        document.getElementById("days-unit").innerHTML = addLeadingZero(days); // <-- Дни тоже нужно отображать
        document.getElementById("hours-unit").innerHTML = addLeadingZero(hours);
        document.getElementById("minutes-unit").innerHTML = addLeadingZero(minutes);
        document.getElementById("seconds-unit").innerHTML = addLeadingZero(seconds);

        setTimeout(tickCountdown, 100);
    }
}