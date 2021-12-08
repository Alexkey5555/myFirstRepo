let title = document.getElementsByTagName('h1')[0];
let btnResult = document.getElementsByClassName('handler_btn')[0];
let btnClear = document.getElementsByClassName('handler_btn')[1];
let btnSum = document.querySelector('.screen-btn');
let otherItems1 = document.querySelectorAll('.other-items.percent');
let otherItems2 = document.querySelectorAll('.other-items.number');
let inputRange = document.querySelector('.rollback > div > [type=range]');
let span = document.querySelector('.rollback > div > .range-value');
let totalInput = function () {
    let input = document.getElementsByClassName('total-input');
    for (let i = 0; i < input.length; i++) {
        console.log(input[i]);
    }
};
let screen = document.querySelectorAll('.screen ');

console.log(title);
console.log(btnResult);
console.log(btnSum);
console.log(otherItems1);
console.log(otherItems2);
console.log(inputRange);
console.log(span);
totalInput();
console.log(screen);

let congif;
const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 74,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},
    asking: function () {
        do {
            appData.title = prompt('Как называеться ваш проект?');
        } while (appData.isNumber(appData.title));

        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt('Какие типы экранов нужно разработать?');
            } while (appData.isNumber(name))
            let price = 0;
            do {
                price = prompt('Сколько будет стоить данная работа?');
            }
            while (!appData.isNumber(price))
            appData.screens.push({ id: i, name: name, price: +price });
        }

        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt('Какой дополнительный тип услуги нужен?');
            } while (appData.isNumber(name))
            let price = 0;

            do {
                price = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(price));

            appData.services[name + i] = +price;


        }
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    addPrice: function () {
        // for (let screen of appData.screens) {
        //     appData.screenPrice += +screen.price
        // }
        appData.screenPrice = appData.screens.reduce(function (sum, item) {
            return sum + item.price;
        }, 0);
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key]
        }
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },
    getRollbackMessage: function (price) {
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
    },
    getTitle: function () {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    start: function () {
        appData.asking();
        appData.addPrice();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();

        appData.logger()
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.services);
    }
};
// appData.start();