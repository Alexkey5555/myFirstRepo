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
            appData.screens.push({ id: i, name: name, price: price });
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
            appData.services[name] = +price;
        }
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    addPrice: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        }
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
    }
};
appData.start();