let title = prompt('Как называеться ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
let rollback = 74;
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let fullPrice;
let servicePercentPrice;
let allServicePrices;

const showTypeOff = function (variable) {
    console.log(variable, typeof variable);
};

const getAllServicePrices = function (price1, price2) {
    return price1 + price2;
};
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
function getFullPrice() {
    return screenPrice + allServicePrices;
};
fullPrice = getFullPrice();
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
function getTitle(title) {
    title = title.trim().toLowerCase();
    return title[0].toUpperCase() + title.slice(1);
}
function getServicePercentPrices() {
    return fullPrice - (fullPrice * (rollback / 100));
}
servicePercentPrice = getServicePercentPrices();
showTypeOff(getTitle(title));
showTypeOff(screenPrice);
showTypeOff(adaptive);
console.log(screens.split(','));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices());