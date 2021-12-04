let title;
let screens;
let screenPrice;
let adaptive;
let fullPrice;
let rollback = 74;
let servicePercentPrice;
let allServicePrices;
let service1;
let service2;

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
    title = prompt('Как называеться ваш проект?');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
    do {
        screenPrice = parseFloat(prompt('Сколько будет стоить данная работа?'));
    }
    while (!isNumber(screenPrice))
    screenPrice = +screenPrice;
    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeOff = function (variable) {
    console.log(variable, typeof variable);
};

const getAllServicePrices = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');
        }
        if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');
        }
        sum += (() => {
            let n;
            do {
                n = prompt('Сколько это будет стоить?');
            } while (!isNumber(n));
            return +n;
        })();
    }
    return sum;
};

function getFullPrice() {
    return screenPrice + allServicePrices;
}

const getRollbackMessage = function (price) {
    switch (true) {
        case price > 30000:
            return 'Даем скидку в 10%';
            break;
        case price >= 15000 && price <= 30000:
            return 'Даем скидку в 5%';
            break;
        case price >= 0 && price < 15000:
            return 'Скидка не предусмотрена';
            break;
        case price < 0:
            return 'Что то пошло не так';
            break;
    }
};
function getTitle() {
    return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase();
}
function getServicePercentPrices() {
    return fullPrice - (fullPrice * (rollback / 100));
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();
showTypeOff(title);
showTypeOff(screenPrice);
showTypeOff(adaptive);
console.log(screens.split(','));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);