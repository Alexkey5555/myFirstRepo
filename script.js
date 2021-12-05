const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 74,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',
    asking: function () {
        appData.title = prompt('Как называеться ваш проект?');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
        do {
            appData.screenPrice = parseFloat(prompt('Сколько будет стоить данная работа?'));
        }
        while (!appData.isNumber(appData.screenPrice))
        appData.screenPrice = +appData.screenPrice;
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getAllServicePrices: function () {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
            }
            if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
            }
            sum += (() => {
                let n;
                do {
                    n = prompt('Сколько это будет стоить?');
                } while (!appData.isNumber(n));
                return +n;
            })();
        }
        return sum;
    },
    getFullPrice: function () {
        return appData.screenPrice + appData.allServicePrices;
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
        return appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
    },
    getServicePercentPrices: function () {
        return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.getRollbackMessage(appData.fullPrice));
        appData.logger()
    },
    logger: function () {
        for (let key in appData) {
            console.log('Свойства и методы: ' + appData[key]);
        }
    }
};

appData.start();