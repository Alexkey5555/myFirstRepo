let title = prompt('Как называеться ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
let rollback = 74;
let fullPrice = 2500;
let adaptive = confirm('Нужен ли адаптив на сайте?');
//Lesson03
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = fullPrice - (fullPrice * (rollback / 100));
console.log(Math.ceil(servicePercentPrice));

switch (true) {
    case fullPrice > 30000:
        console.log('Даем скидку в 10%');
        break;
    case fullPrice >= 15000 && fullPrice <= 30000:
        console.log('Даем скидку в 5%');
        break;
    case fullPrice >= 0 && fullPrice < 15000:
        console.log('Скидка не предусмотрена');
        break;
    case fullPrice < 0:
        console.log('Что то пошло не так');
        break;

}





