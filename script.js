let title = 'JS22';
let screens = 'Простые,Сложные,Интерактивные';
let screenPrice = 55;
let rollback = 74;
let fullPrice = 2500;
let adaptive = true;
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' долларов');
console.log(screens.toLowerCase().split());
console.log(fullPrice * (rollback / 100));