let title = document.getElementsByTagName('h1')[0];
let btnResult = document.getElementsByClassName('handler_btn')[0];
let btnClear = document.getElementsByClassName('handler_btn')[1];
let btnSum = document.querySelector('.screen-btn');
let otherItemsPercent = document.querySelectorAll('.other-items.percent');
let otherItemsNumber = document.querySelectorAll('.other-items.number');
let inputRange = document.querySelector('.rollback > div > [type=range]');
let span = document.querySelector('.rollback > div > .range-value');
let totalInput = document.getElementsByClassName('total-input');

let total = totalInput[0];
let totalCount = totalInput[1];
let totalCountOther = totalInput[2];
let totalFullCount = totalInput[3];
let totalCountRollback = totalInput[4];

let screens = document.querySelectorAll('.screen ');

let congif;
const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 74,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    isError: false,
    checkValues: function () {
        appData.isError = false;
        screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input[type=text]');

            if (select.value === '' || input.value === '') {
                appData.isError = true
            }
        })
        if (!appData.isError) {
            appData.start();
        }
        else {
            alert('заполните поля');
        }
    },
    init: function () {
        appData.addTitle();
        inputRange.addEventListener('input', function (event) {
            span.textContent = event.target.value + '%';
            appData.rollback = event.target.value;
        })
        btnResult.addEventListener('click', appData.checkValues);
        btnSum.addEventListener('click', appData.addScreenBlock);
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesNumber + appData.servicePricesPercent;
        totalFullCount.value = appData.fullPrice;
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen ');
        let count = 0;
        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selecName = select.options[select.selectedIndex].textContent;
            appData.screens.push({
                id: index,
                name: selecName,
                price: +select.value * +input.value
            });
            count++;
        });
        totalCount.value = count;
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen)
    },
    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }
        })
        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }
        })
    },
    addPrice: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        }
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }
        appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
        totalCountRollback.value = appData.servicePercentPrice;
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrice();
        // appData.getServicePercentPrices();
        // appData.logger()
        appData.showResult();
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.services);
    }
};
appData.init();